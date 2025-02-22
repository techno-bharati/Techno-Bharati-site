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
import { useCallback, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createRegistration } from "@/app/actions/registration";
import { toast } from "sonner";
import { SuccessDialog } from "@/components/register/SuccessDialog";
import { getEventFeeByName } from "@/lib/constants";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const RegistrationForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [totalFee, setTotalFee] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');

  const form = useForm<z.infer<typeof userRegistrationFormSchema>>({
    resolver: zodResolver(userRegistrationFormSchema),
    defaultValues: {
      collegeName: "",
      events: undefined,
      payss: undefined,
      paymentMode: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createRegistration,
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Registration successful!", { id: "form-submit" });
        form.reset({
          collegeName: "",
          events: undefined,
          payss: undefined,
          paymentMode: "ONLINE",
        });
        setSelectedFile(null);
        setTotalFee(0);
        setShowSuccessDialog(true);
      } else {
        toast.error(data.error || "Something went wrong");
      }
    },
    onError: (error) => {
      toast.error("Failed to submit registration", { id: "form-submit" });
      console.error(error);
    },
  });

  const onSubmit = useCallback(
    async (data: z.infer<typeof userRegistrationFormSchema>) => {
      try {
        if (!data.payss) {
          toast.error("Please upload a payment screenshot");
          return;
        }
        toast.loading("Submitting..", { id: "form-submit" });
        mutate({
          ...data,
          paymentMode: data.paymentMode
        });
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Failed to submit form", { id: "form-submit" });
      }
    },
    [mutate]
  );

  const onError = (errors: any) => {
    console.log("Form Errors:", errors);
  };

  const selectedEvent = form.watch("events");

  useEffect(() => {
    const teamSize = form.watch("numberOfTeamMembers");

    if (selectedEvent) {
      const fee = getEventFeeByName(selectedEvent, teamSize);
      setTotalFee(fee || 0);
    }
  }, [
    form.watch("events"),
    form.watch("numberOfTeamMembers"),
    form,
    selectedEvent,
  ]);

  useEffect(() => {
    if (selectedEvent === "Startup Sphere") {
      form.setValue("numberOfTeamMembers", 1);
    }
  }, [selectedEvent, form]);

  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 5) {
      onChange(value);
    }
  };

  return (
    <>
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
                  <Input placeholder="Enter your college name" {...field} disabled={isPending} />
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
                <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an event" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Startup Sphere">
                      Startup Sphere
                    </SelectItem>
                    <SelectItem value="Face To Face">Face To Face</SelectItem>
                    <SelectItem value="Python Worriors">
                      Python Warriors
                    </SelectItem>
                    <SelectItem value="FreeFire Battleship">
                      FreeFire Battleship
                    </SelectItem>
                    <SelectItem value="AI Tales">AI Tales</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      <Input placeholder="Enter your name" {...field} disabled={isPending} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {selectedEvent === "FreeFire Battleship" && (
            <>
              <FormField
                control={form.control}
                name="squadName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Squad Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter squad name" {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-6">
                <h3 className="font-semibold">Squad Players</h3>
                <FormDescription>All 4 players are required</FormDescription>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-4 p-4 border rounded-lg">
                    <h4 className="font-medium">
                      {index === 0 ? "Squad Leader" : `Player ${index + 1}`}
                    </h4>
                    <FormField
                      control={form.control}
                      name={`players.${index}.playerName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter player name" {...field} disabled={isPending} />
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
                            <Input
                              placeholder="Enter Free Fire ID"
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
                      name={`players.${index}.contactNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter contact number"
                              type="tel"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {index === 0 && (
                      <FormField
                        control={form.control}
                        name={`players.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Squad Leader Only)</FormLabel>
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
                    )}
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
                    <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
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
                      <Select 
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : "1"}
                        disabled={isPending}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of team members" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 5 }, (_, index) => (
                            <SelectItem key={index + 1} value={`${index + 1}`}>
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Minimum 1 (Team Leader) and maximum of 5 team members allowed
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
                      <Input placeholder="Enter team name" {...field} disabled={isPending} />
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

                <FormField
                  control={form.control}
                  name="teamLeader.contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Leader Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact number" {...field} disabled={isPending} />
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
                          disabled={isPending}
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
                    <div
                      key={index}
                      className="space-y-4 p-4 border rounded-lg"
                    >
                      <h4>Team Member {index + 1}</h4>
                      <FormField
                        control={form.control}
                        name={`teamMembers.${index}.studentName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter name" {...field} disabled={isPending} />
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
                                disabled={isPending}
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
                                disabled={isPending}
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
            name="paymentMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Mode</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setPaymentMode(value as 'ONLINE' | 'OFFLINE');
                  }} 
                  value={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment mode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ONLINE">Online Payment</SelectItem>
                    <SelectItem value="OFFLINE">Offline Payment</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="payss"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>
                  {form.watch("paymentMode") === "ONLINE" 
                    ? "Upload Payment Screenshot" 
                    : "Upload Receipt Photo"}
                </FormLabel>
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
                    disabled={isPending}
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

          <div className="mt-4 p-4 bg-primary/5 rounded-lg flex items-start gap-2 justify-between">
            <div>
              <p className="text-lg font-semibold">
                Total Registration Fee: ₹{totalFee}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedEvent === "Startup Sphere"
                  ? "Includes team leader and additional members"
                  : "Per participant fee"}
              </p>
            </div>
            <Separator orientation="vertical" />
            <div>
              <h3 className="text-md text-white flex-1">Payment QR</h3>
              <Image
                alt="payment qr"
                src={"/qr.jpeg"}
                width={100}
                height={100}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </>
  );
};

export default RegistrationForm;
