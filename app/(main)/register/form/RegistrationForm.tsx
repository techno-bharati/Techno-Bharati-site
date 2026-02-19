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
import { createRegistration } from "@/app/(main)/actions/registration";
import { toast } from "sonner";
import { SuccessDialog } from "@/components/register/SuccessDialog";
import {
  calculateGeneralEngineeringGamesFee,
  GENERAL_ENGINEERING_TECHNICAL_FEE,
  CIVIL_TECHNICAL_FEE,
  getEventFeeByName,
  EVENT_TO_ORGANIZING_DEPARTMENT,
  PAYMENT_QR_BY_DEPARTMENT,
} from "@/lib/constants";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export type EventNameOption =
  | "Startup Sphere"
  | "Face To Face"
  | "Python Frontiers"
  | "BGMI"
  | "FreeFire"
  | "AI Tales"
  | "ENTC Project Expo"
  | "Digital Dangal"
  | "Snap & Shine"
  | "Techno Science Quiz"
  | "Poster Competition"
  | "SciTech Model Expo 2K26"
  | "General Engineering Games"
  | "Model Making"
  | "CAD Master"
  | "Videography"
  | "CODEFUSION"
  | "Project Expo"
  | "Treasure Hunt"
  | "Mech Project Expo"
  | "Mech Junk Yard"
  | "Mech IPL Auction";

interface RegistrationFormProps {
  /**
   * Fixed event name for per-event registration pages.
   * When provided, the event select is hidden and this value is used.
   */
  initialEvent?: EventNameOption;
  /**
   * Used for General Engineering games bundle to preselect a game
   * when the user clicks "Register" from a specific game.
   */
  initialSelectedGames?: string[];
}

const RegistrationForm = ({
  initialEvent,
  initialSelectedGames,
}: RegistrationFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [totalFee, setTotalFee] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState<"ONLINE" | "OFFLINE">(
    "ONLINE"
  );
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [otherDepartment, setOtherDepartment] = useState<string>("");
  const [selectedGames, setSelectedGames] = useState<string[]>(
    initialSelectedGames ?? []
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof userRegistrationFormSchema>>({
    resolver: zodResolver(userRegistrationFormSchema),
    defaultValues: {
      collegeName: "",
      events: initialEvent,
      selectedGames: initialSelectedGames,
      groupName: "",
      payss: undefined,
      paymentMode: undefined,
      department: undefined,
      class: undefined,
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
          department: undefined,
          class: undefined,
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
          paymentMode: data.paymentMode,
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
  const teamSize = form.watch("numberOfTeamMembers");
  const formTitle = selectedEvent
    ? `${selectedEvent} Registration`
    : "Event Registration";

  useEffect(() => {
    if (!selectedEvent) {
      setTotalFee(0);
      return;
    }

    if (selectedEvent === "General Engineering Games") {
      setTotalFee(calculateGeneralEngineeringGamesFee(selectedGames.length));
    } else if (
      selectedEvent === "Techno Science Quiz" ||
      selectedEvent === "Poster Competition" ||
      selectedEvent === "SciTech Model Expo 2K26"
    ) {
      setTotalFee(GENERAL_ENGINEERING_TECHNICAL_FEE);
    } else if (
      selectedEvent === "Model Making" ||
      selectedEvent === "CAD Master" ||
      selectedEvent === "Videography"
    ) {
      setTotalFee(CIVIL_TECHNICAL_FEE);
    } else {
      const fee = getEventFeeByName(selectedEvent, teamSize);
      setTotalFee(fee || 0);
    }
  }, [selectedEvent, teamSize, selectedGames.length]);

  useEffect(() => {
    if (selectedEvent === "Startup Sphere") {
      form.setValue("numberOfTeamMembers", 1);
    }
  }, [selectedEvent, form]);

  useEffect(() => {
    if (selectedEvent === "General Engineering Games") {
      form.setValue("selectedGames", selectedGames as any);
    } else if (selectedGames.length > 0) {
      // Avoid leaking games selection into other event submissions
      setSelectedGames([]);
      form.setValue("selectedGames", undefined as any);
    }
  }, [selectedEvent, selectedGames, form]);

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
    <div className="w-full max-w-4xl mx-auto">
      <Button
        variant="outline"
        className="rounded-xl group"
        onClick={() => router.push("/events")}
      >
        <ArrowLeft className="-mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Events
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="w-full max-w-4xl mx-auto p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-1 md:col-span-2">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">
              {formTitle}
            </h2>
            <p className="text-sm text-muted-foreground">
              Fill the details below to complete your registration.
            </p>
          </div>

          <FormField
            control={form.control}
            name="collegeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your college name"
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
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Department</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value === "OTHER") {
                      setOtherDepartment(""); // Reset other department input
                    }
                  }}
                  value={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AIML">AIML</SelectItem>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="MECHANICAL">MECHANICAL</SelectItem>
                    <SelectItem value="CIVIL">CIVIL</SelectItem>
                    <SelectItem value="ENTC">ENTC</SelectItem>
                    <SelectItem value="OTHER">OTHER</SelectItem>
                  </SelectContent>
                </Select>
                {field.value === "OTHER" && (
                  <Input
                    placeholder="Enter your department"
                    value={otherDepartment}
                    onChange={(e) => setOtherDepartment(e.target.value)}
                    disabled={isPending}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Class</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="first year">First Year</SelectItem>
                    <SelectItem value="second year">Second Year</SelectItem>
                    <SelectItem value="third year">Third Year</SelectItem>
                    <SelectItem value="final year">Final Year</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {!initialEvent && (
            <FormField
              control={form.control}
              name="events"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Event</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  >
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
                      <SelectItem value="Python Frontiers">
                        Python Frontiers
                      </SelectItem>
                      <SelectItem value="BGMI">BGMI</SelectItem>
                      <SelectItem value="FreeFire">FreeFire</SelectItem>
                      <SelectItem value="AI Tales">AI Tales</SelectItem>
                      <SelectItem value="ENTC Project Expo">
                        ENTC Project Expo (ENTC)
                      </SelectItem>
                      <SelectItem value="Digital Dangal">
                        Digital Dangal (ENTC)
                      </SelectItem>
                      <SelectItem value="Snap & Shine">
                        Snap &amp; Shine (ENTC)
                      </SelectItem>
                      <SelectItem value="Techno Science Quiz">
                        Techno Science Quiz (GE)
                      </SelectItem>
                      <SelectItem value="Poster Competition">
                        Poster Competition (GE)
                      </SelectItem>
                      <SelectItem value="SciTech Model Expo 2K26">
                        SciTech Model Expo 2K26 (GE)
                      </SelectItem>
                      <SelectItem value="General Engineering Games">
                        General Engineering Games (3 or 5)
                      </SelectItem>
                      <SelectItem value="Model Making">
                        Model Making (Civil)
                      </SelectItem>
                      <SelectItem value="CAD Master">
                        CAD Master (Civil)
                      </SelectItem>
                      <SelectItem value="Videography">
                        Videography (Civil)
                      </SelectItem>
                      <SelectItem value="CODEFUSION">
                        CODEFUSION (CSE)
                      </SelectItem>
                      <SelectItem value="Project Expo">
                        Project Expo (CSE)
                      </SelectItem>
                      <SelectItem value="Treasure Hunt">
                        Treasure Hunt (CSE)
                      </SelectItem>
                      <SelectItem value="Mech Project Expo">
                        Mech Project Expo (Mechanical)
                      </SelectItem>
                      <SelectItem value="Mech Junk Yard">
                        Mech Junk Yard (Mechanical)
                      </SelectItem>
                      <SelectItem value="Mech IPL Auction">
                        Mech IPL Auction (Mechanical)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(selectedEvent === "Face To Face" ||
            selectedEvent === "Python Frontiers" ||
            selectedEvent === "AI Tales" ||
            selectedEvent === "ENTC Project Expo" ||
            selectedEvent === "Digital Dangal" ||
            selectedEvent === "Snap & Shine" ||
            selectedEvent === "Techno Science Quiz" ||
            selectedEvent === "Poster Competition" ||
            selectedEvent === "SciTech Model Expo 2K26" ||
            selectedEvent === "Model Making" ||
            selectedEvent === "CAD Master" ||
            selectedEvent === "Videography" ||
            selectedEvent === "CODEFUSION" ||
            selectedEvent === "Project Expo" ||
            selectedEvent === "Treasure Hunt" ||
            selectedEvent === "Mech Project Expo" ||
            selectedEvent === "Mech Junk Yard" ||
            selectedEvent === "Mech IPL Auction") && (
            <>
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
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
            </>
          )}

          {selectedEvent === "General Engineering Games" && (
            <>
              <div className="space-y-2 md:col-span-2">
                <FormLabel>Select Games (choose exactly 3 or 5)</FormLabel>
                <p className="text-sm text-muted-foreground">
                  3 games → ₹100, 5 games → ₹150 (per participant/groups)
                </p>
                <div className="space-y-2">
                  {[
                    "Free Fire Challenge",
                    "Coin Drop Challenge",
                    "Funny Walk Race",
                    "Pass the Balloon",
                    "Emoji Expression Game",
                  ].map((game) => {
                    const checked = selectedGames.includes(game);
                    return (
                      <label
                        key={game}
                        className="flex items-center gap-3 rounded-md border p-3 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4"
                          checked={checked}
                          onChange={() => {
                            setSelectedGames((prev) =>
                              prev.includes(game)
                                ? prev.filter((g) => g !== game)
                                : [...prev, game]
                            );
                          }}
                          disabled={isPending}
                        />
                        <span className="text-sm">{game}</span>
                      </label>
                    );
                  })}
                </div>
                {/* show schema error for selectedGames */}
                <FormField
                  control={form.control}
                  name="selectedGames"
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Name (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter group name (if any)"
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
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
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
            </>
          )}

          {selectedEvent === "BGMI" && (
            <>
              <FormField
                control={form.control}
                name="squadName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Squad Name</FormLabel>
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
              <div className="space-y-6 md:col-span-2">
                <h3 className="font-semibold">Squad Players</h3>
                <FormDescription>All 4 players are required</FormDescription>
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
                          <FormLabel>Name</FormLabel>
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
                          <FormLabel>BGMI ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter BGMI ID"
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

          {selectedEvent === "FreeFire" && (
            <>
              <FormField
                control={form.control}
                name="squadName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Squad Name</FormLabel>
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
              <div className="space-y-6 md:col-span-2">
                <h3 className="font-semibold">Squad Players</h3>
                <FormDescription>All 4 players are required</FormDescription>
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
                          <FormLabel>Name</FormLabel>
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
                          <FormLabel>BGMI ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter BGMI ID"
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isPending}
                    >
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
                      Minimum 1 (Team Leader) and maximum of 5 team members
                      allowed
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
                              <Input
                                placeholder="Enter name"
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
                    setPaymentMode(value as "ONLINE" | "OFFLINE");
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

          <div className="mt-4 p-4 bg-primary/10 rounded-xl flex items-start gap-2 justify-between md:col-span-2">
            <div>
              <p className="text-lg font-semibold">
                Total Registration Fee: ₹{totalFee}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedEvent === "Startup Sphere"
                  ? "Includes team leader and additional members"
                  : selectedEvent === "General Engineering Games"
                    ? "Bundle fee based on number of selected games"
                    : "Per participant fee"}
              </p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-md text-white flex-1">
                Payment QR
                {selectedEvent &&
                  (() => {
                    const dept =
                      EVENT_TO_ORGANIZING_DEPARTMENT[selectedEvent];
                    return dept ? ` (${dept})` : "";
                  })()}
              </h3>
              <Image
                alt={
                  selectedEvent &&
                  EVENT_TO_ORGANIZING_DEPARTMENT[selectedEvent]
                    ? `Payment QR - ${EVENT_TO_ORGANIZING_DEPARTMENT[selectedEvent]}`
                    : "Payment QR"
                }
                src={
                  selectedEvent
                    ? PAYMENT_QR_BY_DEPARTMENT[
                        EVENT_TO_ORGANIZING_DEPARTMENT[selectedEvent] as keyof typeof PAYMENT_QR_BY_DEPARTMENT
                      ] ?? "/qr.jpeg"
                    : "/qr.jpeg"
                }
                width={100}
                height={100}
                unoptimized
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full md:col-span-2 rounded-xl dark:text-white"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      />
    </div>
  );
};

export default RegistrationForm;
