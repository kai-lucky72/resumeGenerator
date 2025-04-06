# Professional Resume Builder

A modern, feature-rich resume generator that creates detailed, professional resumes with customizable templates and PDF export functionality.

## ✨ Features

- **Multiple Templates**: Choose from Professional, Minimalist, and Modern elegant templates
- **Color Customization**: Personalize your resume with different color schemes
- **Comprehensive Sections**:
  - Personal Information with social profiles (LinkedIn, GitHub, website)
  - Professional Summary
  - Work Experience
  - Education
  - Technical & Soft Skills with Tools section
  - Projects with technologies and links
  - Certifications with credential IDs
  - Achievements & Awards
  - Languages with proficiency levels
  - Volunteer Experience
- **Live Preview**: See changes in real-time as you edit
- **PDF Export**: Download your resume as a polished PDF document
- **Responsive Design**: Create resumes on any device - desktop, tablet, or mobile
- **In-Memory Storage**: Save your resumes for future editing

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn package manager

### Running on Replit

1. Click the green "Run" button at the top of the page
2. Wait for the server to start (you'll see "serving on port 5000" in the console)
3. The app will open in a new tab automatically

## 💻 Usage Guide

1. **Fill in Your Information**:
   - Start by completing the Personal Information section
   - Add your work experience, education, and skills
   - Include projects, certifications, and other optional sections as needed

2. **Customize Your Resume**:
   - Select a template that fits your style (Professional, Minimalist, or Modern)
   - Choose a color scheme that represents your personal brand

3. **Review and Export**:
   - Use the live preview to see how your resume looks
   - Make any final adjustments
   - Click "Download PDF" to export your completed resume

## 🧩 Project Structure

```
professional-resume-builder/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   │   ├── resume-builder/  # Resume form components
│   │   │   │   └── templates/   # Resume templates
│   │   │   └── ui/          # UI component library
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Application pages
│   │   └── App.tsx          # Main application component
├── server/                  # Backend Express server
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   └── storage.ts           # In-memory data storage
├── shared/                  # Shared code between client and server
│   └── schema.ts            # Data schemas and types
└── package.json             # Project dependencies and scripts
```

## 🛠️ Technologies Used

- **Frontend**:
  - React with TypeScript
  - TailwindCSS for styling
  - Shadcn UI components
  - React Hook Form for form handling
  - TanStack Query for data fetching
  - Zod for schema validation

- **Backend**:
  - Express.js
  - TypeScript
  - PDF generation with html-to-pdf and jspdf

## ✨ Features in Detail

### Multiple Resume Sections
The resume builder includes all essential sections for a professional resume:

- **Personal Information**: Contact details including email, phone, location, and professional profiles
- **Professional Summary**: A concise overview of your professional background
- **Work Experience**: Your work history with company details, dates, and responsibilities
- **Education**: Academic background with institutions, degrees, and dates
- **Skills**: Technical skills, tools, and soft skills
- **Projects**: Showcase your portfolio with descriptions and technologies used
- **Certifications**: Professional certifications and credentials
- **Languages**: Language proficiency levels
- **Achievements**: Awards and special recognitions
- **Volunteer Experience**: Community involvement and volunteer work

### Customization
- Multiple template designs to choose from
- Color scheme customization to match your personal brand
- Real-time preview to see changes as you make them

### Export Options
- High-quality PDF export
- Print-ready resume formats

## 📝 License

This project is open source and available under the MIT License.

---

Made with ❤️ using React, TypeScript, and Express.js
