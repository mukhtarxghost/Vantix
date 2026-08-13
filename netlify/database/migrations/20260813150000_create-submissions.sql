CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  form_type TEXT NOT NULL,
  business_type TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  website TEXT,
  volume TEXT,
  budget TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX submissions_email_idx ON submissions (email);
CREATE INDEX submissions_form_type_idx ON submissions (form_type);
CREATE INDEX submissions_created_at_idx ON submissions (created_at);
