import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { z } from "zod";
import { insertProgressSchema, insertSocialSkillSchema } from "@shared/schema";
import ttsRouter from "./tts";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Mount the TTS router
  app.use("/api", ttsRouter);

  app.get("/api/progress/:userId", async (req, res) => {
    const progress = await storage.getProgressByUserId(parseInt(req.params.userId));
    res.json(progress);
  });

  app.post("/api/progress", async (req, res) => {
    const data = insertProgressSchema.parse(req.body);
    const progress = await storage.createProgress(data);
    res.status(201).json(progress);
  });

  app.get("/api/social-skills/:userId", async (req, res) => {
    const skills = await storage.getSocialSkillsByUserId(parseInt(req.params.userId));
    res.json(skills);
  });

  app.post("/api/social-skills", async (req, res) => {
    const data = insertSocialSkillSchema.parse(req.body);
    const skill = await storage.createSocialSkill(data);
    res.status(201).json(skill);
  });

  const httpServer = createServer(app);
  return httpServer;
}
