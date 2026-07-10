
DROP POLICY "Anyone can join the waitlist" ON public.waitlist_emails;
CREATE POLICY "Anyone can join the waitlist"
  ON public.waitlist_emails
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(email) BETWEEN 5 AND 320
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
