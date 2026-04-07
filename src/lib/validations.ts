import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const delegateSchema = z.object({
  salutation: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  organization: z.string().optional(),
  country: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  specialRequests: z.string().optional(),
});

export const individualRegistrationSchema = z.object({
  contactName: z.string().min(1, "Name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().optional(),
  country: z.string().optional(),
  membershipType: z.enum(["MEMBER", "NON_MEMBER"]),
  delegate: delegateSchema,
});

export const groupRegistrationSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  organizationUrl: z.string().url().optional().or(z.literal("")),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().optional(),
  country: z.string().optional(),
  membershipType: z.enum(["MEMBER", "NON_MEMBER"]),
  delegates: z.array(delegateSchema).min(1, "At least one delegate is required"),
});

export const speakerApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().min(1, "Organization is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  topicProposal: z.string().min(50, "Topic proposal must be at least 50 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type DelegateInput = z.infer<typeof delegateSchema>;
export type IndividualRegistrationInput = z.infer<typeof individualRegistrationSchema>;
export type GroupRegistrationInput = z.infer<typeof groupRegistrationSchema>;
export type SpeakerApplicationInput = z.infer<typeof speakerApplicationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
