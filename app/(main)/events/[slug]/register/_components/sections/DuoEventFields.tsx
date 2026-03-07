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
import type { EventName } from "@/lib/types/registration";
import {
  CODEFUSION_STYLE_EVENTS,
  FIXED_PAIR_EVENTS,
} from "@/hooks/useRegistrationForm";

interface DuoEventFieldsProps {
  form: UseFormReturn<FormValues>;
  isPending: boolean;
  selectedEvent: EventName;
  codefusionHasSecondParticipant: boolean;
  onToggleCodefusionSecond: (checked: boolean) => void;
  entcDigitalDangalSecondParticipant: boolean;
  onToggleEntcDigitalDangalSecond: (checked: boolean) => void;
}

export function DuoEventFields({
  form,
  isPending,
  selectedEvent,
  codefusionHasSecondParticipant,
  onToggleCodefusionSecond,
  entcDigitalDangalSecondParticipant,
  onToggleEntcDigitalDangalSecond,
}: DuoEventFieldsProps) {
  const isCodefusionStyle = CODEFUSION_STYLE_EVENTS.includes(selectedEvent);
  const isFixedPair = FIXED_PAIR_EVENTS.includes(selectedEvent);
  const isDigitalDangal = selectedEvent === "Digital Dangal";

  const showSecondParticipant =
    isFixedPair ||
    (isCodefusionStyle && codefusionHasSecondParticipant) ||
    (isDigitalDangal && entcDigitalDangalSecondParticipant);

  return (
    <div className="space-y-4 md:col-span-2">
      <FormField
        control={form.control}
        name="teamName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Team Name <RequiredAsterisk />
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter team name"
                {...field}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4 border p-4 rounded-xl">
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Participant 1 Name <RequiredAsterisk />
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
                Participant 1 Contact Number <RequiredAsterisk />
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
                Participant 1 Email <RequiredAsterisk />
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

      {!isFixedPair && (
        <label className="flex items-center gap-2 text-sm select-none">
          <input
            type="checkbox"
            checked={
              isCodefusionStyle
                ? codefusionHasSecondParticipant
                : entcDigitalDangalSecondParticipant
            }
            onChange={(e) => {
              if (isCodefusionStyle) {
                onToggleCodefusionSecond(e.target.checked);
              } else {
                onToggleEntcDigitalDangalSecond(e.target.checked);
              }
            }}
            disabled={isPending}
          />
          Add Participant 2 (optional, max 2 participants)
        </label>
      )}

      {showSecondParticipant && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-xl">
          <FormField
            control={form.control}
            name="participant2.studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Participant 2 Name <RequiredAsterisk />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter participant 2 name"
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
            name="participant2.contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participant 2 Contact Number (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter participant 2 contact number"
                    {...field}
                    value={field.value ?? ""}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="participant2.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participant 2 Email (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter participant 2 email"
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
        </div>
      )}
    </div>
  );
}
