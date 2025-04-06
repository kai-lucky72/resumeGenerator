import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(date);
}

export function formatDateRange(startDate: string, endDate?: string, currentPosition?: boolean): string {
  const formattedStart = formatDate(startDate);
  
  if (currentPosition) {
    return `${formattedStart} - Present`;
  }
  
  const formattedEnd = endDate ? formatDate(endDate) : '';
  
  if (formattedStart && formattedEnd) {
    return `${formattedStart} - ${formattedEnd}`;
  }
  
  return formattedStart;
}

export function createBulletPoints(text: string): string[] {
  if (!text) return [];
  
  // Split by newlines or bullet points with a space
  return text
    .split(/\n|•\s/)
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

export const defaultResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: {
    technical: '',
    soft: ''
  }
};

export function splitSkillsString(skillsString: string): string[] {
  if (!skillsString) return [];
  return skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
}

export function downloadPdf(pdfBlob: Blob, filename: string = 'resume.pdf') {
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const AVAILABLE_TEMPLATES = [
  { id: 'professional', name: 'Professional' },
  { id: 'modern', name: 'Modern' },
  { id: 'minimalist', name: 'Minimalist' }
];

export const AVAILABLE_COLORS = [
  { id: 'indigo', name: 'Indigo', value: '#4F46E5' },
  { id: 'cyan', name: 'Cyan', value: '#0891B2' },
  { id: 'emerald', name: 'Emerald', value: '#059669' },
  { id: 'rose', name: 'Rose', value: '#E11D48' },
  { id: 'gray', name: 'Gray', value: '#374151' }
];
