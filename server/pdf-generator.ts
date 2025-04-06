// PDF generator module for server-side PDF generation
import puppeteer from 'puppeteer';

/**
 * Generates a PDF from HTML content
 * @param html The HTML content to convert to PDF
 * @returns A promise that resolves to a Buffer containing the PDF data
 */
export const generatePdf = async (html: string): Promise<Buffer> => {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch({
      headless: true, // Using boolean instead of 'new' string
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set content to the HTML
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    // Close the browser
    await browser.close();
    
    // Explicitly convert to Buffer if needed
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
