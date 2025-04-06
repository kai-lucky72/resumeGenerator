import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Language, languageSchema } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Globe, Pencil, Plus, Trash2 } from "lucide-react";

interface LanguagesFormProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
}

export default function LanguagesForm({ languages, onChange }: LanguagesFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const form = useForm<Language>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      id: "",
      name: "",
      proficiency: "",
    },
  });
  
  const onSubmit = (data: Language) => {
    if (editingIndex !== null) {
      // Update existing language
      const updatedLanguages = [...languages];
      updatedLanguages[editingIndex] = { ...data, id: languages[editingIndex].id };
      onChange(updatedLanguages);
    } else {
      // Add new language
      onChange([...languages, { ...data, id: uuidv4() }]);
    }
    
    // Reset form and editing state
    form.reset();
    setEditingIndex(null);
  };
  
  const handleEdit = (language: Language, index: number) => {
    setEditingIndex(index);
    form.reset({
      id: language.id,
      name: language.name,
      proficiency: language.proficiency,
    });
  };
  
  const handleDelete = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    onChange(updatedLanguages);
    
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
          <Globe className="h-5 w-5" />
          <span>Languages</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language *</FormLabel>
                  <FormControl>
                    <Input placeholder="English, French, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="proficiency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level *</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Native">Native</SelectItem>
                      <SelectItem value="Fluent">Fluent</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <span>Add Language</span>
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>Update Language</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        
        {languages.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Added Languages</h3>
            
            {languages.map((language, index) => (
              <div key={language.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{language.name}</h4>
                      <span className="text-sm text-muted-foreground ml-2">({language.proficiency})</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(language, index)}
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