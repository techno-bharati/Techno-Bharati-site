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
import { UseFormReturn } from "react-hook-form";
import type { FormValues } from "@/hooks/useRegistrationForm";
import RequiredAsterisk from "@/components/RequiredAstrick";
import { PhoneOtpField } from "../PhoneOtpField";

interface SquadEventFieldsProps {
  form: UseFormReturn<FormValues>;
  isPending: boolean;
  selectedEvent?: "BGMI" | "FreeFire";
}

export function SquadEventFields({
  form,
  isPending,
  selectedEvent = "BGMI",
}: SquadEventFieldsProps) {
  const idLabel = selectedEvent === "FreeFire" ? "FreeFire ID" : "BGMI ID";
  const idPlaceholder =
    selectedEvent === "FreeFire" ? "Enter FreeFire ID" : "Enter BGMI ID";
  return (
    <>
      <FormField
        control={form.control}
        name="squadName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Squad Name <RequiredAsterisk />
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter squad name"
                {...field}
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-3 md:col-span-2 w-full">
        <h3 className="font-semibold">Squad Players</h3>
        <FormDescription>All 4 players are required</FormDescription>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-xl">
              <h4 className="font-medium">
                {index === 0 ? "Squad Leader" : `Player ${index + 1}`}
              </h4>

              <FormField
                control={form.control}
                name={`players.${index}.playerName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <RequiredAsterisk />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter player name"
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
                name={`players.${index}.bgmiId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {idLabel} <RequiredAsterisk />
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={idPlaceholder}
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {index === 0 && (
                <>
                  <FormField
                    control={form.control}
                    name="players.0.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter squad leader's email"
                            type="email"
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
                    name="players.0.contactNumber"
                    label="Contact Number"
                    isPending={isPending}
                    placeholder="Enter your contact number"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
