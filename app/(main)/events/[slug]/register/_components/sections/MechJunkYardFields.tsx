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
import { TeamLeaderFields } from "../TeamLeaderFields";
import { ParticipantCard } from "../ParticipantCard";
import RequiredAsterisk from "@/components/RequiredAstrick";

interface MechJunkYardFieldsProps {
  form: UseFormReturn<FormValues>;
  isPending: boolean;
  hasThirdMember: boolean;
  onToggleThirdMember: (checked: boolean) => void;
}

export function MechJunkYardFields({
  form,
  isPending,
  hasThirdMember,
  onToggleThirdMember,
}: MechJunkYardFieldsProps) {
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

      <TeamLeaderFields form={form} isPending={isPending} />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Team Members</h3>
          <label className="flex items-center gap-3 text-sm select-none">
            <input
              type="checkbox"
              checked={hasThirdMember}
              onChange={(e) => onToggleThirdMember(e.target.checked)}
              disabled={isPending}
            />
            Add Team Member 3 (optional, max 3 members)
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ParticipantCard
            form={form}
            participantKey="participant2"
            label="Team Member 2"
            isPending={isPending}
          />

          {hasThirdMember && (
            <ParticipantCard
              form={form}
              participantKey="participant3"
              label="Team Member 3"
              isPending={isPending}
            />
          )}
        </div>
      </div>
    </div>
  );
}
