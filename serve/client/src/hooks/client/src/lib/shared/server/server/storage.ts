import { IStorage } from "./types";
import { User, InsertUser, ProgressRecord, InsertProgressRecord, SocialSkill, InsertSocialSkill } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progress: Map<number, ProgressRecord>;
  private socialSkills: Map<number, SocialSkill>;
  sessionStore: session.Store;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.progress = new Map();
    this.socialSkills = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProgressByUserId(userId: number): Promise<ProgressRecord[]> {
    return Array.from(this.progress.values()).filter(
      (progress) => progress.userId === userId,
    );
  }

  async createProgress(insertProgress: InsertProgressRecord): Promise<ProgressRecord> {
    const id = this.currentId++;
    const progress: ProgressRecord = { ...insertProgress, id };
    this.progress.set(id, progress);
    return progress;
  }

  async getSocialSkillsByUserId(userId: number): Promise<SocialSkill[]> {
    return Array.from(this.socialSkills.values()).filter(
      (skill) => skill.userId === userId,
    );
  }

  async createSocialSkill(insertSkill: InsertSocialSkill): Promise<SocialSkill> {
    const id = this.currentId++;
    const skill: SocialSkill = { ...insertSkill, id };
    this.socialSkills.set(id, skill);
    return skill;
  }
}

export const storage = new MemStorage();
