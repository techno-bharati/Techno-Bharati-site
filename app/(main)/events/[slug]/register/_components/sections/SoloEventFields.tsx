"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/hooks/useRegistrationForm";
import RequiredAsterisk from "@/components/RequiredAstrick";

interface SoloEventFieldsProps {
  form: UseFormReturn<FormValues>;
  isPending: boolean;
}

export function SoloEventFields({ form, isPending }: SoloEventFieldsProps) {
  return (
    <div className="space-y-4 md:col-span-2">
      <div className="grid grid-cols-2 gap-4 border p-4 rounded-xl">
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Student Name <RequiredAsterisk />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Contact Number <RequiredAsterisk />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your contact number"
                  {...field}
                  disabled={isPending}
                />
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
              <FormLabel>
                Email <RequiredAsterisk />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
