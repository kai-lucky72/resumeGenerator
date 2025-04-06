import { v4 as uuidv4 } from 'uuid';
import { 
  User, 
  InsertUser, 
  Resume, 
  InsertResume,
  ResumeData 
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Resume operations
  getResume(id: number): Promise<Resume | undefined>;
  getResumesByUserId(userId: number): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: number, data: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumes: Map<number, Resume>;
  private userIdCounter: number;
  private resumeIdCounter: number;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.userIdCounter = 1;
    this.resumeIdCounter = 1;
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
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getResume(id: number): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async getResumesByUserId(userId: number): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(
      (resume) => resume.userId === userId,
    );
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.resumeIdCounter++;
    const now = new Date().toISOString();
    // Make sure userId is never undefined, set to null if it's not provided
    const userId = insertResume.userId === undefined ? null : insertResume.userId;
    
    // Set default values for template and color if they're undefined
    const template = insertResume.template || 'professional';
    const color = insertResume.color || 'indigo';
    
    // Extract only the properties we need to avoid carrying over any undefined values
    const resume: Resume = { 
      id,
      name: insertResume.name,
      data: insertResume.data,
      userId: userId,
      template: template,
      color: color,
      createdAt: now,
      updatedAt: now
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async updateResume(id: number, data: Partial<InsertResume>): Promise<Resume | undefined> {
    const resume = this.resumes.get(id);
    if (!resume) return undefined;

    // Prepare the updates with proper type handling
    const updates: Partial<Resume> = {};
    
    // Only copy over properties that are defined or have default values
    if ('name' in data) updates.name = data.name;
    if ('data' in data) updates.data = data.data;
    if ('userId' in data) updates.userId = data.userId === undefined ? null : data.userId;
    if ('template' in data) updates.template = data.template || 'professional';
    if ('color' in data) updates.color = data.color || 'indigo';
    
    // Update the timestamp
    updates.updatedAt = new Date().toISOString();
    
    const updatedResume: Resume = {
      ...resume,
      ...updates
    };
    
    this.resumes.set(id, updatedResume);
    return updatedResume;
  }

  async deleteResume(id: number): Promise<boolean> {
    return this.resumes.delete(id);
  }
}

export const storage = new MemStorage();
