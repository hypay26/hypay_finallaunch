import { createServerFn } from "@tanstack/react-start";

function cleanEnvValue(val: string): string {
  let cleaned = val.trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1);
  }
  return cleaned;
}

export const submitWaitlistEmail = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const fs = await import("node:fs");
    const path = await import("node:path");

    let scriptUrl = process.env.VITE_GOOGLE_SCRIPT_URL || process.env.GOOGLE_SCRIPT_URL;

    // Fallback: Read directly from .env file if process.env isn't populated in dev
    if (!scriptUrl || scriptUrl.trim() === "") {
      try {
        const envPath = path.join(process.cwd(), ".env");
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, "utf8");
          const match = content.match(/VITE_GOOGLE_SCRIPT_URL\s*=\s*([^\r\n]+)/);
          if (match && match[1]) {
            scriptUrl = cleanEnvValue(match[1]);
          }
        }
      } catch (err) {
        console.error("[Google Sheets Server Fn] Error reading .env file:", err);
      }
    }

    if (!scriptUrl || scriptUrl.trim() === "" || scriptUrl.includes("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL")) {
      throw new Error(
        "Google Apps Script Web App URL is not configured. Please add VITE_GOOGLE_SCRIPT_URL to your .env file."
      );
    }

    try {
      const response = await fetch(scriptUrl.trim(), {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          email: data.email,
          timestamp: new Date().toISOString(),
        }),
        redirect: "follow",
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Google Apps Script error (${response.status}): ${text}`);
      }

      let resData: any = {};
      try {
        resData = await response.json();
      } catch {
        // If Google Apps Script returns html or plain text, assume success if HTTP 200
        resData = { success: true };
      }

      if (resData.result === "error" || resData.status === "error" || resData.success === false) {
        throw new Error(resData.message || resData.error || "Failed to append row to Google Sheet.");
      }

      return { success: true };
    } catch (err: any) {
      console.error("[Google Sheets Submission Error]:", err);
      throw new Error(err.message || "Failed to submit to Google Sheets.");
    }
  });
