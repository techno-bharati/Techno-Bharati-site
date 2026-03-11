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

  const playerCount = selectedEvent === "FreeFire" ? 5 : 4;
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

        <FormDescription>
          {selectedEvent === "FreeFire"
            ? "5 players required"
            : "4 players required"}
        </FormDescription>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: playerCount }).map((_, index) => {
            const isOptionalPlayer = index === 4;
            return (
              <div key={index} className="space-y-4 p-4 border rounded-xl">
                <h4 className="font-medium">
                  {index === 0
                    ? "Squad Leader"
                    : index === 4
                      ? "Player 5 (Optional)"
                      : `Player ${index + 1}`}
                </h4>

                <FormField
                  control={form.control}
                  name={`players.${index}.playerName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name {!isOptionalPlayer && <RequiredAsterisk />}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter player name"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              isOptionalPlayer && e.target.value === ""
                                ? undefined
                                : e.target.value
                            )
                          }
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
                        {idLabel} {!isOptionalPlayer && <RequiredAsterisk />}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={idPlaceholder}
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              isOptionalPlayer && e.target.value === ""
                                ? undefined
                                : e.target.value
                            )
                          }
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

                    <FormField
                      control={form.control}
                      name="players.0.contactNumber"
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
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
