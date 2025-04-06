import { ResumeData } from "@shared/schema";
import { 
  createBulletPoints, 
  formatDateRange, 
  splitSkillsString,
  AVAILABLE_COLORS
} from "@/lib/utils";
import { Mail, Phone, MapPin, Link, Globe, Github } from "lucide-react";

interface ModernTemplateProps {
  resumeData: ResumeData;
  colorScheme: string;
}

export default function ModernTemplate({ resumeData, colorScheme }: ModernTemplateProps) {
  const { 
    personalInfo, 
    experience, 
    education, 
    skills,
    projects,
    certifications,
    achievements,
    languages,
    volunteer 
  } = resumeData;
  
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
          
          {personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-4 w-4 mr-1 opacity-80" />
              {personalInfo.github}
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
        
        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
              Projects
            </h2>
            
            {projects.map((project, index) => (
              <div key={project.id || index} className={index !== projects.length - 1 ? "mb-5" : ""}>
                <div className="flex flex-wrap justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-800">{project.title}</h3>
                    <p className="text-neutral-600 mb-1 italic text-sm">Technologies: {project.technologies}</p>
                  </div>
                  {project.startDate && (
                    <span className="text-neutral-500 text-sm font-medium" style={{ color: colorValue }}>
                      {formatDateRange(project.startDate, project.endDate)}
                    </span>
                  )}
                </div>
                
                {project.link && (
                  <p className="text-sm text-blue-600 mb-1">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                  </p>
                )}
                
                <ul className="mt-2 space-y-1">
                  {createBulletPoints(project.description).map((bullet, i) => (
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
        
        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
              Certifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div key={cert.id || index} className="bg-gray-50 p-3 rounded">
                  <h3 className="font-medium text-neutral-800">{cert.name}</h3>
                  <p className="text-neutral-600 text-sm">
                    {cert.issuer}
                    {cert.date && <span> • {cert.date}</span>}
                  </p>
                  {cert.credentialID && (
                    <p className="text-sm text-neutral-500 mt-1">ID: {cert.credentialID}</p>
                  )}
                  {cert.certificateUrl && (
                    <p className="text-sm text-blue-600 mt-2">
                      <a 
                        href={cert.certificateUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <span className="mr-1">View Certificate</span>
                        <Link className="h-3 w-3" />
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
              Achievements
            </h2>
            
            <ul className="space-y-2">
              {achievements.map((achievement, index) => (
                <li key={achievement.id || index} className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-neutral-800">{achievement.title}</h3>
                    {achievement.date && <span className="text-neutral-500 text-sm">{achievement.date}</span>}
                  </div>
                  {achievement.description && (
                    <p className="text-sm text-neutral-700 mt-1">{achievement.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Volunteer Experience Section */}
        {volunteer && volunteer.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
              Volunteer Experience
            </h2>
            
            {volunteer.map((vol, index) => (
              <div key={vol.id || index} className={index !== volunteer.length - 1 ? "mb-4" : ""}>
                <div className="flex flex-wrap justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-800">{vol.role}</h3>
                    <p className="text-neutral-600 mb-1">{vol.organization}</p>
                  </div>
                  {vol.startDate && (
                    <span className="text-neutral-500 text-sm font-medium" style={{ color: colorValue }}>
                      {formatDateRange(vol.startDate, vol.endDate)}
                    </span>
                  )}
                </div>
                
                {vol.description && (
                  <p className="text-sm text-neutral-700 mt-1">{vol.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Skills Section */}
        <div className="mb-6">
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
            
            {skills.tools && (
              <div>
                <h3 className="font-medium text-neutral-800 mb-2">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {splitSkillsString(skills.tools).map((tool, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: `${colorValue}15`, color: colorValue }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Languages Section */}
        {languages && languages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3 uppercase tracking-wider border-b pb-1" style={{ color: colorValue }}>
              Languages
            </h2>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {languages.map((lang, index) => (
                <div 
                  key={lang.id || index} 
                  className="px-4 py-2 rounded"
                  style={{ backgroundColor: `${colorValue}10` }}
                >
                  <span className="font-medium text-neutral-800">{lang.name}</span>
                  {lang.proficiency && (
                    <span className="text-neutral-600 text-sm ml-1">({lang.proficiency})</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
