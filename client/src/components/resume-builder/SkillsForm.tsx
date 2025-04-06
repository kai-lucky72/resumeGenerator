import { Skills, skillsSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillsFormProps {
  skills: Skills;
  onChange: (skills: Skills) => void;
}

export default function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const form = useForm<Skills>({
    resolver: zodResolver(skillsSchema),
    defaultValues: skills,
    mode: "onChange"
  });

  const onSubmit = (data: Skills) => {
    onChange(data);
  };

  // Update parent component when form values change
  const handleFieldChange = () => {
    const values = form.getValues();
    onChange(values);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-lg font-semibold text-neutral-800">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={handleFieldChange} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="technical"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">Technical Skills *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="JavaScript, TypeScript, React.js, Node.js, etc."
                      rows={3}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">Enter skills separated by commas</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="soft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">Soft Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Team Leadership, Communication, Problem-solving, etc."
                      rows={2}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500 mt-1">Enter skills separated by commas</p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
