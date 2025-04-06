import { ResumeData } from "@shared/schema";
import { 
  createBulletPoints, 
  formatDateRange, 
  splitSkillsString,
  AVAILABLE_COLORS
} from "@/lib/utils";
import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

interface ModernTemplateProps {
  resumeData: ResumeData;
  colorScheme: string;
}

export default function ModernTemplate({ resumeData, colorScheme }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData;
  
  const colorValue = AVAILABLE_COLORS.find(c => c.id === colorScheme)?.value || '#0891B2';
  
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div 
        className="px-8 py-6"
        style={{ backgroundColor: colorValue }}
      >
        <h1 className="text-3xl font-bold text-white mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-white opacity-90 mb-4">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap text-sm text-white gap-x-4 gap-y-2">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1 opacity-80" />
              {personalInfo.email}
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1 opacity-80" />
              {personalInfo.phone}
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 opacity-80" />
              {personalInfo.location}
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Link className="h-4 w-4 mr-1 opacity-80" />
              {personalInfo.linkedin}
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1 opacity-80" />
              {personalInfo.website}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-8">
        {/* Summary Section */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
              About Me
            </h2>
            <p className="text-neutral-700 mt-2">{personalInfo.summary}</p>
          </div>
        )}
        
        {/* Experience Section */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
              Professional Experience
            </h2>
            
            {experience.map((exp, index) => (
              <div key={exp.id || index} className={index !== experience.length - 1 ? "mb-5" : ""}>
                <div className="flex flex-wrap justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-800 text-lg">{exp.position}</h3>
                    <p className="text-neutral-600 mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  </div>
                  <span className="text-neutral-500 text-sm font-medium" style={{ color: colorValue }}>
                    {formatDateRange(exp.startDate, exp.endDate, exp.currentPosition)}
                  </span>
                </div>
                
                <ul className="mt-2 space-y-1">
                  {createBulletPoints(exp.description).map((bullet, i) => (
                    <li key={i} className="text-neutral-700 text-sm flex items-start">
                      <span className="mr-2 text-lg" style={{ color: colorValue }}>•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        
        {/* Education Section */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
              Education
            </h2>
            
            {education.map((edu, index) => (
              <div key={edu.id || index} className={index !== education.length - 1 ? "mb-4" : ""}>
                <div className="flex flex-wrap justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-800">{edu.degree}</h3>
                    <p className="text-neutral-600 mb-1">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                  </div>
                  <span className="text-neutral-500 text-sm font-medium" style={{ color: colorValue }}>
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                
                {edu.description && (
                  <p className="text-sm text-neutral-700 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Skills Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
            Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.technical && (
              <div>
                <h3 className="font-medium text-neutral-800 mb-2">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {splitSkillsString(skills.technical).map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: `${colorValue}20`, color: colorValue }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {skills.soft && (
              <div>
                <h3 className="font-medium text-neutral-800 mb-2">Professional</h3>
                <div className="flex flex-wrap gap-2">
                  {splitSkillsString(skills.soft).map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: `${colorValue}10`, color: colorValue }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
