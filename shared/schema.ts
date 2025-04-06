import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Resume schema
export const resumes = pgTable("resumes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  template: text("template").notNull().default("professional"),
  color: text("color").notNull().default("indigo"),
  data: jsonb("data").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// Experience schema for zod validation
export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  currentPosition: z.boolean().optional(),
  description: z.string().min(1, "Description is required"),
  achievements: z.string().optional(), // Added achievements field
});

// Education schema for zod validation
export const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  gpa: z.string().optional(), // Added GPA field
});

// Project schema for zod validation
export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Project title is required"),
  technologies: z.string().min(1, "Technologies used are required"),
  description: z.string().min(1, "Description is required"),
  link: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// Certification schema for zod validation
export const certificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().optional(),
  expiryDate: z.string().optional(),
  credentialID: z.string().optional(),
  certificateUrl: z.string().url("Invalid URL format").optional(),
});

// Achievement/Award schema for zod validation
export const achievementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Achievement title is required"),
  issuer: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
});

// Language schema for zod validation
export const languageSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Language name is required"),
  proficiency: z.string().min(1, "Proficiency level is required"),
});

// Skills schema for zod validation
export const skillsSchema = z.object({
  technical: z.string().min(1, "Technical skills are required"),
  soft: z.string().optional(),
  tools: z.string().optional(), // Added tools field
});

// Volunteer work schema for zod validation
export const volunteerSchema = z.object({
  id: z.string().optional(),
  organization: z.string().min(1, "Organization name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

// Personal info schema for zod validation
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  jobTitle: z.string().min(1, "Professional title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  linkedin: z.string().optional(),
  github: z.string().optional(), // Added GitHub field
  website: z.string().optional(),
  summary: z.string().min(1, "Professional summary is required"),
  photo: z.string().optional(), // Profile photo (base64 encoded)
});

// Full resume data schema
export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  projects: z.array(projectSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  achievements: z.array(achievementSchema).optional(),
  languages: z.array(languageSchema).optional(),
  skills: skillsSchema,
  volunteer: z.array(volunteerSchema).optional(),
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertResume = z.infer<typeof insertResumeSchema>;
export type Resume = typeof resumes.$inferSelect;
export type ResumeData = z.infer<typeof resumeDataSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Volunteer = z.infer<typeof volunteerSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
