import { useState } from "react";
import { Experience, experienceSchema } from "@shared/schema";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash, Plus } from "lucide-react";

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export default function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const form = useForm<Experience>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      currentPosition: false,
      description: ""
    },
    mode: "onChange"
  });

  const onSubmit = (data: Experience) => {
    if (editingId) {
      const updatedExperiences = experiences.map(exp => 
        exp.id === editingId ? { ...data, id: editingId } : exp
      );
      onChange(updatedExperiences);
      setEditingId(null);
    } else {
      const newExperience = { ...data, id: uuidv4() };
      onChange([...experiences, newExperience]);
      setIsAdding(false);
    }
    form.reset();
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setIsAdding(true);
    form.reset(experience);
  };

  const handleDelete = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
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

  const handleCurrentPositionChange = (checked: boolean) => {
    if (checked) {
      form.setValue('endDate', '');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-semibold text-neutral-800">Work Experience</CardTitle>
        <Button
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            form.reset({
              company: "",
              position: "",
              location: "",
              startDate: "",
              endDate: "",
              currentPosition: false,
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
              {editingId ? "Edit Experience" : "Add Experience"}
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Company Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Tech Innovations Inc." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-700">Position *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. Senior Software Engineer" />
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
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-neutral-700">End Date</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="month" 
                              disabled={form.watch('currentPosition')} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentPosition"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                handleCurrentPositionChange(checked as boolean);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-xs text-gray-500 font-normal">
                            I currently work here
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-neutral-700">Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. San Francisco, CA" />
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
                      <FormLabel className="text-sm font-medium text-neutral-700">Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe your responsibilities and achievements. Use bullet points (•) to separate items."
                          rows={4}
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
        ) : experiences.length === 0 ? (
          <div className="text-center p-6 border border-dashed border-gray-300 rounded-md">
            <p className="text-neutral-600 mb-2">No work experience added yet</p>
            <Button 
              onClick={() => setIsAdding(true)} 
              variant="outline"
              size="sm"
              className="text-primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add your first experience
            </Button>
          </div>
        ) : null}

        {!isAdding && experiences.map((experience, index) => (
          <div key={experience.id || index} className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium text-neutral-800">
                {experience.position} at {experience.company}
              </h3>
              <div className="flex space-x-2">
                <Button 
                  onClick={() => handleEdit(experience)} 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-neutral-500 hover:text-neutral-700"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => handleDelete(experience.id!)} 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-neutral-500 hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm mb-2">
              <div className="text-neutral-600">
                <span className="font-medium">Duration: </span>
                {new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                {' - '}
                {experience.currentPosition 
                  ? 'Present' 
                  : experience.endDate 
                    ? new Date(experience.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                    : ''}
              </div>
              {experience.location && (
                <div className="text-neutral-600">
                  <span className="font-medium">Location: </span>
                  {experience.location}
                </div>
              )}
            </div>
            <div className="text-neutral-700 text-sm whitespace-pre-line">
              {experience.description}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
