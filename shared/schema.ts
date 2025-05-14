import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Agent status table
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  endpoint: text("endpoint").notNull(),
  status: text("status").notNull().default("dormant"),
  description: text("description").notNull(),
  config: jsonb("config"),
  lastActive: timestamp("last_active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Activity logs table
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  agentId: integer("agent_id").references(() => agents.id),
  timestamp: timestamp("timestamp").defaultNow(),
  message: text("message").notNull(),
  level: text("level").notNull().default("info"),
  metadata: jsonb("metadata"),
});

// System metrics table
export const systemMetrics = pgTable("system_metrics", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow(),
  cpuUsage: integer("cpu_usage").notNull(),
  memoryUsage: integer("memory_usage").notNull(),
  storageUsage: integer("storage_usage").notNull(),
  networkUsage: integer("network_usage").notNull(),
  operationsCount: integer("operations_count").notNull().default(0),
});

// Tribute configuration table
export const tributeConfig = pgTable("tribute_config", {
  id: serial("id").primaryKey(),
  mode: text("mode").notNull().default("symbolic"),
  creditsAccrued: integer("credits_accrued").notNull().default(0),
  resourceUsageMB: integer("resource_usage_mb").notNull().default(0),
  operationsTracked: integer("operations_tracked").notNull().default(0),
  lastRitualDate: timestamp("last_ritual_date"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Monetization rituals table
export const monetizationRituals = pgTable("monetization_rituals", {
  id: serial("id").primaryKey(),
  startDate: timestamp("start_date").defaultNow(),
  completionDate: timestamp("completion_date"),
  status: text("status").notNull().default("pending"),
  daysAnalyzed: integer("days_analyzed").notNull(),
  recommendedMode: text("recommended_mode"),
  insights: jsonb("insights"),
  dataSelectionConfig: jsonb("data_selection_config").notNull(),
});

// Integrity checks table
export const integrityChecks = pgTable("integrity_checks", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow(),
  status: text("status").notNull(),
  integrity_score: integer("integrity_score").notNull(),
  issues_found: integer("issues_found").notNull().default(0),
  details: jsonb("details"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAgentSchema = createInsertSchema(agents).pick({
  name: true,
  endpoint: true,
  status: true,
  description: true,
  config: true,
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).pick({
  agentId: true,
  message: true,
  level: true,
  metadata: true,
});

export const insertSystemMetricSchema = createInsertSchema(systemMetrics).pick({
  cpuUsage: true,
  memoryUsage: true,
  storageUsage: true,
  networkUsage: true,
  operationsCount: true,
});

export const insertTributeConfigSchema = createInsertSchema(tributeConfig).pick({
  mode: true,
  creditsAccrued: true,
  resourceUsageMB: true,
  operationsTracked: true,
});

export const insertMonetizationRitualSchema = createInsertSchema(monetizationRituals).pick({
  daysAnalyzed: true,
  dataSelectionConfig: true,
});

export const insertIntegrityCheckSchema = createInsertSchema(integrityChecks).pick({
  status: true,
  integrity_score: true,
  issues_found: true,
  details: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Agent = typeof agents.$inferSelect;

export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;

export type InsertSystemMetric = z.infer<typeof insertSystemMetricSchema>;
export type SystemMetric = typeof systemMetrics.$inferSelect;

export type InsertTributeConfig = z.infer<typeof insertTributeConfigSchema>;
export type TributeConfig = typeof tributeConfig.$inferSelect;

export type InsertMonetizationRitual = z.infer<typeof insertMonetizationRitualSchema>;
export type MonetizationRitual = typeof monetizationRituals.$inferSelect;

export type InsertIntegrityCheck = z.infer<typeof insertIntegrityCheckSchema>;
export type IntegrityCheck = typeof integrityChecks.$inferSelect;
