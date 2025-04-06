import { useState } from "react";
import { PersonalInfo, personalInfoSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

export default function PersonalInfoForm({ personalInfo, onChange }: PersonalInfoFormProps) {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: "onChange",
  });

  const onSubmit = (data: PersonalInfo) => {
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
        <CardTitle className="text-lg font-semibold text-neutral-800">Personal Information</CardTitle>
        <span className="text-xs text-gray-500">* Required</span>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onChange={handleFieldChange} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">First Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. John" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">Last Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">Professional Title *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Senior Software Engineer" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">Email *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="e.g. john.doe@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">Phone *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. (123) 456-7890" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">Location *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. New York, NY" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">LinkedIn</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. linkedin.com/in/johndoe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">GitHub</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. github.com/johndoe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">Website/Portfolio</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. johndoe.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">Professional Summary *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write a brief summary of your professional background and key strengths"
                      rows={4}
                    />
                  </FormControl>
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
