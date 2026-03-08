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
import { PhoneOtpField } from "./PhoneOtpField";

interface TeamLeaderFieldsProps {
  form: UseFormReturn<FormValues>;
  isPending: boolean;
}

export function TeamLeaderFields({ form, isPending }: TeamLeaderFieldsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Team Leader Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-xl">
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Team Leader Name <RequiredAsterisk />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter team leader name"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PhoneOtpField
          form={form}
          name="contactNumber"
          label="Team Leader Contact Number"
          isPending={isPending}
          placeholder="Enter contact number"
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Team Leader Email <RequiredAsterisk />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  type="email"
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
