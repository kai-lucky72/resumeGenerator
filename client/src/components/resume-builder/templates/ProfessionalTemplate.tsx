import { ResumeData } from "@shared/schema";
import { 
  createBulletPoints, 
  formatDateRange, 
  splitSkillsString,
  AVAILABLE_COLORS
} from "@/lib/utils";
import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
  colorScheme: string;
}

export default function ProfessionalTemplate({ resumeData, colorScheme }: ProfessionalTemplateProps) {
  const { personalInfo, experience, education, skills } = resumeData;
  
  const colorValue = AVAILABLE_COLORS.find(c => c.id === colorScheme)?.value || '#4F46E5';
  
  return (
    <div className="p-8 bg-white">
      {/* Header Section */}
      <div className="border-b-4 pb-4 mb-6" style={{ borderColor: colorValue }}>
        <h1 className="text-3xl font-bold text-neutral-800 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-neutral-600 mb-4">{personalInfo.jobTitle}</p>
        
        <div className="flex flex-wrap text-sm text-neutral-600 gap-y-1">
          {personalInfo.email && (
            <div className="flex items-center mr-4">
              <Mail className="h-4 w-4 mr-1 text-neutral-400" />
              {personalInfo.email}
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center mr-4">
              <Phone className="h-4 w-4 mr-1 text-neutral-400" />
              {personalInfo.phone}
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1 text-neutral-400" />
              {personalInfo.location}
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center mr-4">
              <Link className="h-4 w-4 mr-1 text-neutral-400" />
              {personalInfo.linkedin}
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1 text-neutral-400" />
              {personalInfo.website}
            </div>
          )}
        </div>
      </div>
      
      {/* Summary Section */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: colorValue }}>
            Professional Summary
          </h2>
          <p className="text-neutral-700 text-sm">{personalInfo.summary}</p>
        </div>
      )}
      
      {/* Experience Section */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3" style={{ color: colorValue }}>
            Experience
          </h2>
          
          {experience.map((exp, index) => (
            <div key={exp.id || index} className={index !== experience.length - 1 ? "mb-4" : ""}>
              <div className="flex flex-wrap justify-between mb-1">
                <h3 className="font-medium text-neutral-800">{exp.position}</h3>
                <span className="text-neutral-500 text-sm">
                  {formatDateRange(exp.startDate, exp.endDate, exp.currentPosition)}
                </span>
              </div>
              
              <div className="flex flex-wrap justify-between mb-1">
                <p className="text-neutral-700">{exp.company}</p>
                {exp.location && (
                  <span className="text-neutral-500 text-sm">{exp.location}</span>
                )}
              </div>
              
              <ul className="list-disc text-sm ml-4 text-neutral-700">
                {createBulletPoints(exp.description).map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      
      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3" style={{ color: colorValue }}>
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={edu.id || index} className={index !== education.length - 1 ? "mb-4" : ""}>
              <div className="flex flex-wrap justify-between mb-1">
                <h3 className="font-medium text-neutral-800">{edu.degree}</h3>
                <span className="text-neutral-500 text-sm">
                  {formatDateRange(edu.startDate, edu.endDate)}
                </span>
              </div>
              
              <div className="flex flex-wrap justify-between mb-1">
                <p className="text-neutral-700">{edu.institution}</p>
                {edu.location && (
                  <span className="text-neutral-500 text-sm">{edu.location}</span>
                )}
              </div>
              
              {edu.description && (
                <p className="text-sm text-neutral-700">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Skills Section */}
      <div>
        <h2 className="text-lg font-semibold mb-3" style={{ color: colorValue }}>
          Skills
        </h2>
        
        {skills.technical && (
          <div className="mb-3">
            <h3 className="font-medium text-neutral-800 mb-1">Technical Skills</h3>
            <div className="flex flex-wrap gap-1">
              {splitSkillsString(skills.technical).map((skill, index) => (
                <span key={index} className="bg-gray-100 text-neutral-700 px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {skills.soft && (
          <div>
            <h3 className="font-medium text-neutral-800 mb-1">Soft Skills</h3>
            <div className="flex flex-wrap gap-1">
              {splitSkillsString(skills.soft).map((skill, index) => (
                <span key={index} className="bg-gray-100 text-neutral-700 px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
