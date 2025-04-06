import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertResumeSchema, 
  resumeDataSchema 
} from "@shared/schema";
import { generatePdf } from "./pdf-generator";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix with /api
  app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
  });

  // Resume CRUD operations
  app.post("/api/resumes", async (req: Request, res: Response) => {
    try {
      const resumeData = insertResumeSchema.parse(req.body);
      
      // Validate the resume data
      resumeDataSchema.parse(resumeData.data);
      
      const resume = await storage.createResume(resumeData);
      res.status(201).json(resume);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating resume:", error);
        res.status(500).json({ message: "Failed to create resume" });
      }
    }
  });

  app.get("/api/resumes/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid resume ID" });
    }

    const resume = await storage.getResume(id);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  });

  app.put("/api/resumes/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid resume ID" });
    }

    try {
      const resumeData = req.body;
      
      // Validate the resume data if present
      if (resumeData.data) {
        resumeDataSchema.parse(resumeData.data);
      }
      
      const updatedResume = await storage.updateResume(id, resumeData);
      if (!updatedResume) {
        return res.status(404).json({ message: "Resume not found" });
      }
      
      res.status(200).json(updatedResume);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error updating resume:", error);
        res.status(500).json({ message: "Failed to update resume" });
      }
    }
  });

  app.delete("/api/resumes/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid resume ID" });
    }

    const deleted = await storage.deleteResume(id);
    if (!deleted) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(204).send();
  });

  // PDF generation endpoint
  app.post("/api/resumes/generate-pdf", async (req: Request, res: Response) => {
    try {
      const { html } = req.body;
      
      if (!html) {
        return res.status(400).json({ message: "Resume HTML content is required" });
      }

      const pdfBuffer = await generatePdf(html);
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Simplified PDF generator function
// In a real implementation, this would use a library like PDFKit or Puppeteer
export const generatePdf = (html: string): Promise<Buffer> => {
  // Here we'd normally use a PDF generation library
  // For this implementation, we're returning a placeholder
  return Promise.resolve(Buffer.from("PDF content would go here"));
};
