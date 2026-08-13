import { getDatabase } from "@netlify/database";

export type SubmissionInput = {
  formType: string;
  businessType?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  website?: string | null;
  volume?: string | null;
  budget?: string | null;
  message?: string | null;
};

export async function createSubmission(input: SubmissionInput) {
  const db = getDatabase();

  const [submission] = await db.sql`
    INSERT INTO submissions (
      form_type, business_type, name, email, phone, company, website, volume, budget, message
    )
    VALUES (
      ${input.formType},
      ${input.businessType ?? null},
      ${input.name},
      ${input.email},
      ${input.phone ?? null},
      ${input.company ?? null},
      ${input.website ?? null},
      ${input.volume ?? null},
      ${input.budget ?? null},
      ${input.message ?? null}
    )
    RETURNING id
  `;

  return submission;
}
