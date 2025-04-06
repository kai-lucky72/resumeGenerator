import { useState } from "react";
import { Education, educationSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from 'uuid';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash, Plus } from "lucide-react";

interface EducationFormProps {
  educations: Education[];
  onChange: (educations: Education[]) => void;
}

export default function EducationForm({ educations, onChange }: EducationFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const form = useForm<Education>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    },
    mode: "onChange"
  });

  const onSubmit = (data: Education) => {
    if (editingId) {
      const updatedEducations = educations.map(edu => 
        edu.id === editingId ? { ...data, id: editingId } : edu
      );
      onChange(updatedEducations);
      setEditingId(null);
    } else {
      const newEducation = { ...data, id: uuidv4() };
      onChange([...educations, newEducation]);
      setIsAdding(false);
    }
    form.reset();
  };

  const handleEdit = (education: Education) => {
    setEditingId(education.id);
    setIsAdding(true);
    form.reset(education);
  };

  const handleDelete = (id: string) => {
    onChange(educations.filter(edu => edu.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setIsAdding(false);
      form.reset();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAdding(false);
    form.reset();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-semibold text-neutral-800">Education</CardTitle>
        <Button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            form.reset({
              institution: "",
              degree: "",
              location: "",
              startDate: "",
              endDate: "",
              description: ""
            });
          }}
          variant="ghost"
          size="sm"
          className="h-8 text-primary"
          disabled={isAdding}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding ? (
          <div className="border border-gray-200 rounded-md p-4 mb-4">
            <h3 className="font-medium text-neutral-800 mb-3">
              {editingId ? "Edit Education" : "Add Education"}
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Institution *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Massachusetts Institute of Technology" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Degree *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Bachelor of Science in Computer Science" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Start Date *</FormLabel>
                        <FormControl>
                          <Input {...field} type="month" />
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
                        <FormLabel className="text-sm font-medium text-neutral-700">End Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="month" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-neutral-700">Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Cambridge, MA" />
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
                      <FormLabel className="text-sm font-medium text-neutral-700">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="e.g. GPA, relevant coursework, achievements, etc."
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : educations.length === 0 ? (
          <div className="text-center p-6 border border-dashed border-gray-300 rounded-md">
            <p className="text-neutral-600 mb-2">No education added yet</p>
            <Button 
              onClick={() => setIsAdding(true)} 
              variant="outline"
              size="sm"
              className="text-primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add your first education
            </Button>
          </div>
        ) : null}

        {!isAdding && educations.map((education, index) => (
          <div key={education.id || index} className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-neutral-800">
                {education.degree}
              </h3>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleEdit(education)} 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-neutral-500 hover:text-neutral-700"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => handleDelete(education.id!)} 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-neutral-500 hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-neutral-600 mb-1">{education.institution}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm mb-2">
              <div className="text-neutral-600">
                {new Date(education.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                {' - '}
                {education.endDate 
                  ? new Date(education.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                  : 'Present'}
              </div>
              {education.location && (
                <div className="text-neutral-600">{education.location}</div>
              )}
            </div>
            {education.description && (
              <div className="text-neutral-700 text-sm">{education.description}</div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
