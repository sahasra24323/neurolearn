import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  grade: text("grade").notNull(),
  contactDetails: text("contact_details").notNull(),
  mentalAge: text("mental_age"),
  neurodiversity: text("neurodiversity").notNull(),
  learningPace: text("learning_pace").notNull(),
});

export const progressRecords = pgTable("progress_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleType: text("module_type").notNull(),
  completedMilestones: jsonb("completed_milestones").$type<string[]>().notNull(),
  currentStreak: integer("current_streak").notNull().default(0),
  lastActivity: text("last_activity").notNull(),
});

export const socialSkills = pgTable("social_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  taskType: text("task_type").notNull(),
  weeklyProgress: integer("weekly_progress").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users);
export const insertProgressSchema = createInsertSchema(progressRecords);
export const insertSocialSkillSchema = createInsertSchema(socialSkills);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ProgressRecord = typeof progressRecords.$inferSelect;
export type SocialSkill = typeof socialSkills.$inferSelect;
