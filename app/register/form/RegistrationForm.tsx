"use client";

import { useForm, Controller } from "react-hook-form";
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
      events: undefined,
      payss: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof userRegistrationFormSchema>) => {
    console.log("Form Data:", data);
  };

  const onError = (errors: any) => {
    console.log("Form Errors:", errors);
  };

  const selectedEvent = form.watch("events");

  // Helper function to convert string to number
  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 4) {
      onChange(value);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
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
          name="events"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Event</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
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

        {/* Face To Face, Python Warriors, and AI Tales Form */}
        {(selectedEvent === "Face To Face" ||
          selectedEvent === "Python Worriors" ||
          selectedEvent === "AI Tales") && (
          <>
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
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your contact number" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* FireFire Battleship Form */}
        {selectedEvent === "FireFire Battleship" && (
          <>
            <FormField
              control={form.control}
              name="squadName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Squad Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter squad name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-6">
              <h3 className="font-semibold">Squad Players</h3>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Player {index + 1}</h4>
                  <FormField
                    control={form.control}
                    name={`players.${index}.playerName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter player name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`players.${index}.freeFireId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Fire ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Free Fire ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`players.${index}.contactNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter contact number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {selectedEvent === "Startup Sphere" && (
          <>
            <FormField
              control={form.control}
              name="startupCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Idea Presentation">
                        Idea Presentation
                      </SelectItem>
                      <SelectItem value="Project Exibition">
                        Project Exhibition
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfTeamMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Team Members</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={4}
                      placeholder="Enter number of team members"
                      onChange={(e) => handleNumberInput(e, field.onChange)}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum of 4 team members allowed
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter team name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="font-semibold">Team Leader Details</h3>
              <FormField
                control={form.control}
                name="teamLeader.studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Leader Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter team leader name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamLeader.contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Leader Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamLeader.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Leader Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.watch("numberOfTeamMembers") > 1 && (
              <div className="space-y-6">
                <h3 className="font-semibold">Team Members</h3>
                {Array.from({
                  length: form.watch("numberOfTeamMembers") - 1,
                }).map((_, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <h4>Team Member {index + 1}</h4>
                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.studentName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.contactNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter contact number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`teamMembers.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <FormField
          control={form.control}
          name="payss"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Upload Payment Screenshot</FormLabel>
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
                  {...field}
                  value={undefined}
                />
              </FormControl>
              <FormDescription>
                Image size should be 250kb or smaller
              </FormDescription>
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
