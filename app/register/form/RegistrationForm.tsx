"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userRegistrationFormSchema } from "@/schema/userRegistrationForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const RegistrationForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof userRegistrationFormSchema>>({
    resolver: zodResolver(userRegistrationFormSchema),
    defaultValues: {
      collegeName: "",
      studentName: "",
      events: undefined,
      payss: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof userRegistrationFormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg w-full p-6 shadow-lg rounded-lg space-y-6"
      >
        <FormField
          control={form.control}
          name="collegeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>College Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your college name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="events"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Event</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Startup Sphere">Startup Sphere</SelectItem>
                  <SelectItem value="Face To Face">Face To Face</SelectItem>
                  <SelectItem value="Python Worriors">
                    Python Warriors
                  </SelectItem>
                  <SelectItem value="FireFire Battleship">
                    FireFire Battleship
                  </SelectItem>
                  <SelectItem value="AI Tales">AI Tales</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payss"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
              {selectedFile && (
                <p className="text-sm text-gray-500">{selectedFile.name}</p>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
