import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Volunteer, volunteerSchema } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { HeartHandshake, Pencil, Plus, Trash2 } from "lucide-react";
import { formatDateRange } from "@/lib/utils";

interface VolunteerFormProps {
  volunteers: Volunteer[];
  onChange: (volunteers: Volunteer[]) => void;
}

export default function VolunteerForm({ volunteers, onChange }: VolunteerFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [current, setCurrent] = useState(false);
  
  const form = useForm<Volunteer>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      id: "",
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });
  
  const onSubmit = (data: Volunteer) => {
    if (editingIndex !== null) {
      // Update existing volunteer entry
      const updatedVolunteers = [...volunteers];
      updatedVolunteers[editingIndex] = { ...data, id: volunteers[editingIndex].id };
      onChange(updatedVolunteers);
    } else {
      // Add new volunteer entry
      onChange([...volunteers, { ...data, id: uuidv4() }]);
    }
    
    // Reset form and editing state
    form.reset();
    setEditingIndex(null);
    setCurrent(false);
  };
  
  const handleEdit = (volunteer: Volunteer, index: number) => {
    setEditingIndex(index);
    form.reset({
      id: volunteer.id,
      organization: volunteer.organization,
      role: volunteer.role,
      startDate: volunteer.startDate || "",
      endDate: volunteer.endDate || "",
      description: volunteer.description || "",
    });
    setCurrent(!volunteer.endDate);
  };
  
  const handleDelete = (index: number) => {
    const updatedVolunteers = [...volunteers];
    updatedVolunteers.splice(index, 1);
    onChange(updatedVolunteers);
    
    // If deleting the one being edited, reset form
    if (editingIndex === index) {
      form.reset();
      setEditingIndex(null);
      setCurrent(false);
    } else if (editingIndex !== null && index < editingIndex) {
      // If deleting an item before the one being edited, adjust the editing index
      setEditingIndex(editingIndex - 1);
    }
  };
  
  const handleCancel = () => {
    form.reset();
    setEditingIndex(null);
    setCurrent(false);
  };
  
  const handleCurrentChange = (checked: boolean) => {
    setCurrent(checked);
    if (checked) {
      form.setValue("endDate", "");
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <HeartHandshake className="h-5 w-5" />
          <span>Volunteer Experience</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization *</FormLabel>
                  <FormControl>
                    <Input placeholder="Girls in ICT Rwanda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role *</FormLabel>
                  <FormControl>
                    <Input placeholder="Volunteer Instructor" {...field} />
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
                      <Input type="month" disabled={current} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="current" 
                checked={current}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    handleCurrentChange(checked);
                  }
                }}
              />
              <label
                htmlFor="current"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I currently volunteer here
              </label>
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Taught Python basics to high school students, organized workshops, etc."
                      className="min-h-[80px]"
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
                    <span>Add Volunteer Experience</span>
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>Update Volunteer Experience</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        
        {volunteers.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Added Volunteer Experience</h3>
            
            {volunteers.map((volunteer, index) => (
              <div key={volunteer.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{volunteer.role}</h4>
                    <p className="text-sm text-muted-foreground">
                      {volunteer.organization}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateRange(volunteer.startDate || "", volunteer.endDate)}
                    </p>
                    {volunteer.description && (
                      <p className="text-sm mt-1">{volunteer.description}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(volunteer, index)}
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