import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project, projectSchema } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export default function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const form = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      id: "",
      title: "",
      technologies: "",
      description: "",
      link: "",
      startDate: "",
      endDate: "",
    },
  });
  
  const onSubmit = (data: Project) => {
    if (editingIndex !== null) {
      // Update existing project
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = { ...data, id: projects[editingIndex].id };
      onChange(updatedProjects);
    } else {
      // Add new project
      onChange([...projects, { ...data, id: uuidv4() }]);
    }
    
    // Reset form and editing state
    form.reset();
    setEditingIndex(null);
  };
  
  const handleEdit = (project: Project, index: number) => {
    setEditingIndex(index);
    form.reset({
      id: project.id,
      title: project.title,
      technologies: project.technologies,
      description: project.description,
      link: project.link || "",
      startDate: project.startDate || "",
      endDate: project.endDate || "",
    });
  };
  
  const handleDelete = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    onChange(updatedProjects);
    
    // If deleting the one being edited, reset form
    if (editingIndex === index) {
      form.reset();
      setEditingIndex(null);
    } else if (editingIndex !== null && index < editingIndex) {
      // If deleting an item before the one being edited, adjust the editing index
      setEditingIndex(editingIndex - 1);
    }
  };
  
  const handleCancel = () => {
    form.reset();
    setEditingIndex(null);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span>Projects</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="AI-Powered Chatbot for File Organization" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies Used *</FormLabel>
                  <FormControl>
                    <Input placeholder="Java, Gemini API, SQLite, NLP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/yourusername/project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Developed an intelligent system to organize files/folders and respond to queries with stored memory. Improved task efficiency by 40%." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className={editingIndex === null ? "invisible" : ""}
              >
                Cancel
              </Button>
              
              <Button type="submit">
                {editingIndex === null ? (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Add Project</span>
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>Update Project</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        
        {projects.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Added Projects</h3>
            
            {projects.map((project, index) => (
              <div key={project.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {project.technologies}
                    </p>
                    <p className="text-sm mt-2">{project.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(project, index)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}