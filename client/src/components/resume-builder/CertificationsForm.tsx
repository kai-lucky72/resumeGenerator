import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Certification, certificationSchema } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export default function CertificationsForm({ certifications, onChange }: CertificationsFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const form = useForm<Certification>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      id: "",
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialID: "",
    },
  });
  
  const onSubmit = (data: Certification) => {
    if (editingIndex !== null) {
      // Update existing certification
      const updatedCertifications = [...certifications];
      updatedCertifications[editingIndex] = { ...data, id: certifications[editingIndex].id };
      onChange(updatedCertifications);
    } else {
      // Add new certification
      onChange([...certifications, { ...data, id: uuidv4() }]);
    }
    
    // Reset form and editing state
    form.reset();
    setEditingIndex(null);
  };
  
  const handleEdit = (certification: Certification, index: number) => {
    setEditingIndex(index);
    form.reset({
      id: certification.id,
      name: certification.name,
      issuer: certification.issuer,
      date: certification.date || "",
      expiryDate: certification.expiryDate || "",
      credentialID: certification.credentialID || "",
    });
  };
  
  const handleDelete = (index: number) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    onChange(updatedCertifications);
    
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
          <span>Certifications</span>
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
                  <FormLabel>Certification Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduction to Cybersecurity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="issuer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuing Organization *</FormLabel>
                  <FormControl>
                    <Input placeholder="Cisco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Issued</FormLabel>
                    <FormControl>
                      <Input type="month" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
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
              name="credentialID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credential ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC123XYZ" {...field} />
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
                    <span>Add Certification</span>
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>Update Certification</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        
        {certifications.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Added Certifications</h3>
            
            {certifications.map((certification, index) => (
              <div key={certification.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{certification.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {certification.issuer}
                      {certification.date && ` • Issued: ${certification.date}`}
                    </p>
                    {certification.credentialID && (
                      <p className="text-xs mt-1">Credential ID: {certification.credentialID}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(certification, index)}
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