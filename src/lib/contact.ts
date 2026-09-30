import { contactBudgetOptions, contactServiceOptions } from "@/content/home";

/** Shape of the contact form, shared by the client form and the API route. */
export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  service: (typeof contactServiceOptions)[number];
  budget?: (typeof contactBudgetOptions)[number] | "";
  message: string;
  /** Honeypot: real visitors never see or fill this field. */
  website?: string;
};

export const contactLimits = {
  name: 100,
  email: 200,
  company: 120,
  message: 5000,
  messageMin: 20,
} as const;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Result = { ok: true; data: ContactPayload } | { ok: false; errors: Partial<Record<keyof ContactPayload, string>> };

function str(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/** Server-side validation. Never trust the client's checks alone. */
export function validateContact(input: unknown): Result {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const data = {
    name: str(raw.name),
    email: str(raw.email),
    company: str(raw.company),
    service: str(raw.service),
    budget: str(raw.budget),
    message: str(raw.message),
    website: str(raw.website),
  };
  const errors: Partial<Record<keyof ContactPayload, string>> = {};

  if (!data.name) errors.name = "Please tell us your name.";
  else if (data.name.length > contactLimits.name) errors.name = "Name is too long.";

  if (!EMAIL_PATTERN.test(data.email) || data.email.length > contactLimits.email)
    errors.email = "Please enter a valid email address.";

  if (data.company.length > contactLimits.company) errors.company = "Company name is too long.";

  if (!(contactServiceOptions as readonly string[]).includes(data.service)) errors.service = "Please choose a service.";

  if (data.budget && !(contactBudgetOptions as readonly string[]).includes(data.budget))
    errors.budget = "Please choose a budget range.";

  if (data.message.length < contactLimits.messageMin)
    errors.message = `Please share a little more detail (at least ${contactLimits.messageMin} characters).`;
  else if (data.message.length > contactLimits.message) errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: data as ContactPayload };
}
