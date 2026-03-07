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

type ParticipantKey =
  | "participant2"
  | "participant3"
  | "participant4"
  | "participant5";

interface ParticipantCardProps {
  form: UseFormReturn<FormValues>;
  participantKey: ParticipantKey;
  label: string;
  showEmail?: boolean;
  isPending: boolean;
}

export function ParticipantCard({
  form,
  participantKey,
  label,
  showEmail = false,
  isPending,
}: ParticipantCardProps) {
  return (
    <div className="p-4 border rounded-xl space-y-3">
      <h4 className="font-medium">{label}</h4>

      <FormField
        control={form.control}
        name={`${participantKey}.studentName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <RequiredAsterisk />
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter name" {...field} disabled={isPending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`${participantKey}.contactNumber`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Number</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter contact number"
                {...field}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showEmail && (
        <FormField
          control={form.control}
          name={`${participantKey}.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <RequiredAsterisk />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  type="email"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
