import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Achievement, achievementSchema } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Pencil, Plus, Trash2, Trophy } from "lucide-react";

interface AchievementsFormProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export default function AchievementsForm({ achievements, onChange }: AchievementsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const form = useForm<Achievement>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      id: "",
      title: "",
      issuer: "",
      date: "",
      description: "",
    },
  });
  
  const onSubmit = (data: Achievement) => {
    if (editingIndex !== null) {
      // Update existing achievement
      const updatedAchievements = [...achievements];
      updatedAchievements[editingIndex] = { ...data, id: achievements[editingIndex].id };
      onChange(updatedAchievements);
    } else {
      // Add new achievement
      onChange([...achievements, { ...data, id: uuidv4() }]);
    }
    
    // Reset form and editing state
    form.reset();
    setEditingIndex(null);
  };
  
  const handleEdit = (achievement: Achievement, index: number) => {
    setEditingIndex(index);
    form.reset({
      id: achievement.id,
      title: achievement.title,
      issuer: achievement.issuer || "",
      date: achievement.date || "",
      description: achievement.description || "",
    });
  };
  
  const handleDelete = (index: number) => {
    const updatedAchievements = [...achievements];
    updatedAchievements.splice(index, 1);
    onChange(updatedAchievements);
    
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
          <Trophy className="h-5 w-5" />
          <span>Achievements & Awards</span>
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
                  <FormLabel>Achievement Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="First Place, National Coding Challenge" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuing Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Tech Association of Rwanda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Competed against 200 teams and won first place for developing an innovative solution for..."
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
                    <span>Add Achievement</span>
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>Update Achievement</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        
        {achievements.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Added Achievements</h3>
            
            {achievements.map((achievement, index) => (
              <div key={achievement.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.issuer && achievement.issuer}
                      {achievement.date && achievement.issuer && ` • ${achievement.date}`}
                      {achievement.date && !achievement.issuer && achievement.date}
                    </p>
                    {achievement.description && (
                      <p className="text-sm mt-1">{achievement.description}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(achievement, index)}
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