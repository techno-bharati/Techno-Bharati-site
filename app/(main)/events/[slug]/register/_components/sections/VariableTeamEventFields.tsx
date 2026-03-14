"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/hooks/useRegistrationForm";
import { TeamLeaderFields } from "../TeamLeaderFields";
import { ParticipantCard } from "../ParticipantCard";
import RequiredAsterisk from "@/components/RequiredAstrick";

type ParticipantKey =
  | "participant2"
  | "participant3"
  | "participant4"
  | "participant5";

interface VariableTeamEventFieldsProps {
  form: UseFormReturn<FormValues>;
  isPending: boolean;
  minMembers: number;
  maxMembers: number;
  description: string;
}

export function VariableTeamEventFields({
  form,
  isPending,
  minMembers,
  maxMembers,
  description,
}: VariableTeamEventFieldsProps) {
  const teamSize = form.watch("numberOfTeamMembers") ?? minMembers;
  const range = Array.from(
    { length: maxMembers - minMembers + 1 },
    (_, i) => i + minMembers
  );

  return (
    <div className="space-y-3">
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

      <FormField
        control={form.control}
        name="numberOfTeamMembers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Number of Team Members <RequiredAsterisk />
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value ? String(field.value) : String(minMembers)}
                disabled={isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of team members" />
                </SelectTrigger>
                <SelectContent>
                  {range.map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <TeamLeaderFields form={form} isPending={isPending} />
      </div>

      {teamSize >= 2 && (
        <div className="space-y-4 md:col-span-2">
          <h3 className="font-semibold">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: teamSize - 1 }).map((_, index) => {
              const key = `participant${index + 2}` as ParticipantKey;
              return (
                <ParticipantCard
                  key={key}
                  form={form}
                  participantKey={key}
                  label={`Team Member ${index + 1}`}
                  isPending={isPending}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
