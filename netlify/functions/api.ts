import express, { type Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import { storage } from "../../server/storage";
import { resumeDataSchema } from "../../shared/schema";
import puppeteer from "puppeteer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Get a resume by ID
app.get("/api/resumes/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid resume ID" });
  }

  const resume = await storage.getResume(id);
  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  res.json(resume);
});

// Create a new resume
app.post("/api/resumes", async (req: Request, res: Response) => {
  try {
    const validatedData = resumeDataSchema.parse(req.body.resumeData);
    
    const resume = await storage.createResume({
      userId: 1, // Using a default user ID since we don't have authentication
      name: req.body.name || "My Resume",
      resumeData: validatedData,
      template: req.body.template || "professional",
      color: req.body.color || "indigo",
    });

    res.status(201).json(resume);
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(400).json({ message: "Invalid resume data", error });
  }
});

// Update a resume
app.put("/api/resumes/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid resume ID" });
  }

  try {
    const validatedData = resumeDataSchema.parse(req.body.resumeData);
    
    const updatedResume = await storage.updateResume(id, {
      name: req.body.name,
      resumeData: validatedData,
      template: req.body.template,
      color: req.body.color,
    });

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(400).json({ message: "Invalid resume data", error });
  }
});

// Delete a resume
app.delete("/api/resumes/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid resume ID" });
  }

  const success = await storage.deleteResume(id);
  if (!success) {
    return res.status(404).json({ message: "Resume not found" });
  }

  res.status(204).send();
});

// Generate PDF
app.post("/api/resumes/generate-pdf", async (req: Request, res: Response) => {
  try {
    const html = req.body.html;
    if (!html) {
      return res.status(400).json({ message: "HTML content is required" });
    }
    
    // Use puppeteer to generate PDF
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html);
    
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in'
      }
    });
    
    await browser.close();
    
    res.contentType('application/pdf');
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Failed to generate PDF", error });
  }
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Export the serverless handler
export const handler = serverless(app);