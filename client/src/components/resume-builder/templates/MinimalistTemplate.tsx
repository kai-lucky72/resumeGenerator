import { ResumeData } from "@shared/schema";
import { 
  createBulletPoints, 
  formatDateRange, 
  splitSkillsString,
  AVAILABLE_COLORS
} from "@/lib/utils";
import { Mail, Phone, MapPin, Link, Globe, Github } from "lucide-react";

interface MinimalistTemplateProps {
  resumeData: ResumeData;
  colorScheme: string;
}

export default function MinimalistTemplate({ resumeData, colorScheme }: MinimalistTemplateProps) {
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
  
  const colorValue = AVAILABLE_COLORS.find(c => c.id === colorScheme)?.value || '#374151';
  
  return (
    <div className="flex flex-col md:flex-row bg-white">
      {/* Sidebar */}
      <div 
        className="w-full md:w-1/4 p-6 text-white"
        style={{ backgroundColor: colorValue }}
      >
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-1">
            {personalInfo.firstName}<br />{personalInfo.lastName}
          </h1>
          <p className="text-sm opacity-90">{personalInfo.jobTitle}</p>
        </div>
        
        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider border-b border-white border-opacity-30 pb-1">
            Contact
          </h2>
          
          <div className="space-y-2 text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-2 opacity-80" />
                <span className="text-xs">{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-2 opacity-80" />
                <span className="text-xs">{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-2 opacity-80" />
                <span className="text-xs">{personalInfo.location}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Link className="h-3 w-3 mr-2 opacity-80" />
                <span className="text-xs">{personalInfo.linkedin}</span>
              </div>
            )}
            
            {personalInfo.github && (
              <div className="flex items-center">
                <Github className="h-3 w-3 mr-2 opacity-80" />
                <span className="text-xs">{personalInfo.github}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe className="h-3 w-3 mr-2 opacity-80" />
                <span className="text-xs">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Skills Section */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider border-b border-white border-opacity-30 pb-1">
            Skills
          </h2>
          
          {skills.technical && (
            <div className="mb-4">
              <h3 className="text-xs font-medium mb-2 opacity-90">Technical</h3>
              <div className="space-y-1">
                {splitSkillsString(skills.technical).map((skill, index) => (
                  <p key={index} className="text-xs">
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          )}
          
          {skills.tools && (
            <div className="mb-4">
              <h3 className="text-xs font-medium mb-2 opacity-90">Tools</h3>
              <div className="space-y-1">
                {splitSkillsString(skills.tools).map((tool, index) => (
                  <p key={index} className="text-xs">
                    {tool}
                  </p>
                ))}
              </div>
            </div>
          )}
          
          {skills.soft && (
            <div>
              <h3 className="text-xs font-medium mb-2 opacity-90">Professional</h3>
              <div className="space-y-1">
                {splitSkillsString(skills.soft).map((skill, index) => (
                  <p key={index} className="text-xs">
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          )}
          
          {languages && languages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-medium mb-2 opacity-90">Languages</h3>
              <div className="space-y-1">
                {languages.map((lang, index) => (
                  <p key={index} className="text-xs">
                    {lang.name} {lang.proficiency && `- ${lang.proficiency}`}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-8">
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
                  <span className="text-neutral-500 text-xs">
                    {formatDateRange(exp.startDate, exp.endDate, exp.currentPosition)}
                  </span>
                </div>
                
                <div className="flex flex-wrap justify-between mb-2">
                  <p className="text-neutral-600 text-sm">{exp.company} {exp.location && `• ${exp.location}`}</p>
                </div>
                
                <ul className="space-y-1">
                  {createBulletPoints(exp.description).map((bullet, i) => (
                    <li key={i} className="text-neutral-700 text-xs flex items-start">
                      <span className="mr-2">•</span>
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
            <h2 className="text-lg font-semibold mb-3" style={{ color: colorValue }}>
              Education
            </h2>
            
            {education.map((edu, index) => (
              <div key={edu.id || index} className={index !== education.length - 1 ? "mb-4" : ""}>
                <div className="flex flex-wrap justify-between mb-1">
                  <h3 className="font-medium text-neutral-800">{edu.degree}</h3>
                  <span className="text-neutral-500 text-xs">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </span>
                </div>
                
                <div className="flex flex-wrap justify-between mb-1">
                  <p className="text-neutral-600 text-sm">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                </div>
                
                {edu.description && (
                  <p className="text-xs text-neutral-700 mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3" style={{ color: colorValue }}>
              Projects
            </h2>
            
            {projects.map((project, index) => (
              <div key={project.id || index} className={index !== projects.length - 1 ? "mb-4" : ""}>
                <div className="flex flex-wrap justify-between mb-1">
                  <h3 className="font-medium text-neutral-800">{project.title}</h3>
                  {project.startDate && (
                    <span className="text-neutral-500 text-xs">
                      {formatDateRange(project.startDate, project.endDate)}
                    </span>
                  )}
                </div>
                
                <p className="text-neutral-600 text-xs mb-1">
                  <span className="italic">Technologies: {project.technologies}</span>
                </p>
                
                {project.link && (
                  <p className="text-xs text-blue-600 mb-1">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
                  </p>
                )}
                
                <ul className="space-y-1 mt-1">
                  {createBulletPoints(project.description).map((bullet, i) => (
                    <li key={i} className="text-neutral-700 text-xs flex items-start">
                      <span className="mr-2">•</span>
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
            <h2 className="text-lg font-semibold mb-3" style={{ color: colorValue }}>
              Certifications
            </h2>
            
            {certifications.map((cert, index) => (
              <div key={cert.id || index} className={index !== certifications.length - 1 ? "mb-2" : ""}>
                <div className="flex flex-wrap justify-between mb-1">
                  <h3 className="font-medium text-neutral-800 text-sm">{cert.name}</h3>
                  {cert.date && (
                    <span className="text-neutral-500 text-xs">{cert.date}</span>
                  )}
                </div>
                <p className="text-neutral-700 text-xs">{cert.issuer}</p>
                {cert.credentialID && (
                  <p className="text-xs text-neutral-600">ID: {cert.credentialID}</p>
                )}
                {cert.certificateUrl && (
                  <p className="text-xs mt-1">
                    <a 
                      href={cert.certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Certificate
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3" style={{ color: colorValue }}>
              Achievements
            </h2>
            
            <ul className="space-y-1">
              {achievements.map((achievement, index) => (
                <li key={achievement.id || index} className="text-neutral-700 text-xs flex items-start">
                  <span className="mr-2">•</span>
                  <div>
                    <span className="font-medium">{achievement.title}</span>
                    {achievement.date && <span className="text-neutral-500"> ({achievement.date})</span>}
                    {achievement.description && <span>: {achievement.description}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Volunteer Experience Section */}
        {volunteer && volunteer.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3" style={{ color: colorValue }}>
              Volunteer Experience
            </h2>
            
            {volunteer.map((vol, index) => (
              <div key={vol.id || index} className={index !== volunteer.length - 1 ? "mb-4" : ""}>
                <div className="flex flex-wrap justify-between mb-1">
                  <h3 className="font-medium text-neutral-800 text-sm">{vol.role}</h3>
                  {vol.startDate && (
                    <span className="text-neutral-500 text-xs">
                      {formatDateRange(vol.startDate, vol.endDate)}
                    </span>
                  )}
                </div>
                
                <p className="text-neutral-700 text-xs mb-1">{vol.organization}</p>
                
                {vol.description && (
                  <p className="text-xs text-neutral-700">{vol.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
