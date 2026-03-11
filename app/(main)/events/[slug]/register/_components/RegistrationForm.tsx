"use client";

import { useCallback } from "react";
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
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  EVENT_TO_ORGANIZING_DEPARTMENT,
  PAYMENT_QR_BY_DEPARTMENT,
} from "@/lib/constants";
import RequiredAsterisk from "@/components/RequiredAstrick";

import type { RegistrationFormProps } from "@/lib/types/registration";
import { useRegistrationForm, SOLO_EVENTS } from "@/hooks/useRegistrationForm";
import { usePaymentUpload } from "@/hooks/usePaymentUpload";
import { useTotalFee } from "@/hooks/useTotalFee";

import { SoloEventFields } from "./sections/SoloEventFields";
import { SquadEventFields } from "./sections/SquadEventFields";
import { DuoEventFields } from "./sections/DuoEventFields";
import { VariableTeamEventFields } from "./sections/VariableTeamEventFields";
import { FixedTeamEventFields } from "./sections/FixedTeamEventFields";
import { MechJunkYardFields } from "./sections/MechJunkYardFields";

export default function RegistrationForm({
  initialEvent,
  initialSelectedGames,
}: RegistrationFormProps) {
  const router = useRouter();

  const {
    form,
    isPending,
    selectedEvent,
    teamSize,
    payssValue,
    isCodefusionStyleEvent,
    getMembersCount,
    paymentMode,
    setPaymentMode,
    otherDepartment,
    setOtherDepartment,
    selectedGames,
    codefusionHasSecondParticipant,
    setCodefusionHasSecondParticipant,
    entcDigitalDangalSecondParticipant,
    setEntcDigitalDangalSecondParticipant,
    mechIplHasFourthMember,
    setMechIplHasFourthMember,
    mechJunkYardHasThirdMember,
    setMechJunkYardHasThirdMember,
    onSubmit,
    onError,
  } = useRegistrationForm({ initialEvent, initialSelectedGames });

  const { uploadedImageUrl, uploadError, isUploading } =
    usePaymentUpload(payssValue);

  const totalFee = useTotalFee({
    selectedEvent,
    teamSize,
    selectedGamesCount: selectedGames.length,
    membersCount: getMembersCount(),
  });

  const { isValid } = form.formState;
  const paymentModeWatch = form.watch("paymentMode");

  const formTitle = selectedEvent
    ? `${selectedEvent} Registration`
    : "Event Registration";

  const handleSubmit = useCallback(
    (data: Parameters<typeof onSubmit>[0]) =>
      onSubmit(data, uploadedImageUrl, isUploading, uploadError),
    [onSubmit, uploadedImageUrl, isUploading, uploadError]
  );

  const isSoloEvent = selectedEvent
    ? SOLO_EVENTS.includes(selectedEvent)
    : false;

  const isSquadEvent = selectedEvent === "BGMI" || selectedEvent === "FreeFire";

  const isDuoEvent =
    isCodefusionStyleEvent ||
    selectedEvent === "Digital Dangal" ||
    selectedEvent === "Battle of Brains";

  const isVariableTeamEvent =
    selectedEvent === "Project Expo" ||
    selectedEvent === "Treasure Hunt" ||
    selectedEvent === "Mech Project Expo" ||
    selectedEvent === "ENTC Project Expo";

  const isFixedTeamEvent = selectedEvent === "Mech IPL Auction";

  const isMechJunkYard = selectedEvent === "Mech Junk Yard";

  const qrSrc = selectedEvent
    ? (PAYMENT_QR_BY_DEPARTMENT[
        EVENT_TO_ORGANIZING_DEPARTMENT[
          selectedEvent
        ] as keyof typeof PAYMENT_QR_BY_DEPARTMENT
      ] ?? "/qr.jpeg")
    : "/qr.jpeg";

  const qrLabel = selectedEvent
    ? `Payment QR${
        EVENT_TO_ORGANIZING_DEPARTMENT[selectedEvent]
          ? ` (${EVENT_TO_ORGANIZING_DEPARTMENT[selectedEvent]})`
          : ""
      }`
    : "Payment QR";

  const getEventDescription = () => {
    switch (selectedEvent) {
      case "Project Expo":
        return "Minimum 2 and maximum 5 team members. Each participant is ₹100.";
      case "ENTC Project Expo":
        return "Minimum 2 and maximum 5 team members. Each participant is ₹100.";
      case "Mech Project Expo":
        return "Minimum 2 and maximum 5 team members. Each participant is ₹100.";
      case "Treasure Hunt":
        return "Minimum 2 and maximum 5 team members. Each participant is ₹100.";
      default:
        return "Minimum 2 and maximum 5 team members. Each participant is ₹100.";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-lg md:text-xl">
      <Button
        variant="outline"
        className="rounded-xl group mb-8"
        onClick={() => router.back()}
      >
        <ArrowLeft className="-mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Events
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, onError)}
          className="w-full max-w-7xl mx-auto rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-1 md:col-span-2">
            <h2 className="text-xl md:text-2xl font-semibold">{formTitle}</h2>
            <p className="text-muted-foreground">
              Fill the details below to complete your registration.
            </p>
          </div>

          <FormField
            control={form.control}
            name="collegeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  College Name <RequiredAsterisk />
                </FormLabel>
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
                <FormLabel>
                  Department <RequiredAsterisk />
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    if (value === "OTHER") setOtherDepartment("");
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
                    <SelectItem value="GENERAL ENGINEERING">
                      {" "}
                      GENERAL ENGINEERING
                    </SelectItem>
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
                <FormLabel>
                  Class <RequiredAsterisk />
                </FormLabel>
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

          {isSoloEvent && <SoloEventFields form={form} isPending={isPending} />}

          {isSquadEvent && (
            <SquadEventFields
              form={form}
              isPending={isPending}
              selectedEvent={selectedEvent ?? undefined}
            />
          )}

          {isDuoEvent && selectedEvent && (
            <DuoEventFields
              form={form}
              isPending={isPending}
              selectedEvent={selectedEvent}
              codefusionHasSecondParticipant={codefusionHasSecondParticipant}
              onToggleCodefusionSecond={(checked) => {
                setCodefusionHasSecondParticipant(checked);
                if (checked) {
                  const current = form.getValues("participant2");
                  if (!current)
                    form.setValue(
                      "participant2",
                      { studentName: "", contactNumber: "", email: "" },
                      { shouldValidate: true, shouldDirty: true }
                    );
                  else form.trigger("participant2");
                } else {
                  form.setValue(
                    "participant2",
                    undefined as unknown as {
                      studentName: string;
                      contactNumber: string;
                      email?: string;
                    },
                    { shouldValidate: true, shouldDirty: true }
                  );
                }
              }}
              entcDigitalDangalSecondParticipant={
                entcDigitalDangalSecondParticipant
              }
              onToggleEntcDigitalDangalSecond={(checked) => {
                setEntcDigitalDangalSecondParticipant(checked);
                if (checked) {
                  const current = form.getValues("participant2");
                  if (!current)
                    form.setValue(
                      "participant2",
                      { studentName: "", contactNumber: "", email: "" },
                      { shouldValidate: true, shouldDirty: true }
                    );
                } else {
                  form.setValue(
                    "participant2",
                    undefined as unknown as {
                      studentName: string;
                      contactNumber: string;
                      email?: string;
                    },
                    { shouldValidate: true, shouldDirty: true }
                  );
                }
              }}
            />
          )}

          {isVariableTeamEvent && selectedEvent && (
            <VariableTeamEventFields
              form={form}
              isPending={isPending}
              minMembers={2}
              maxMembers={5}
              description={getEventDescription()}
            />
          )}

          {isFixedTeamEvent && (
            <FixedTeamEventFields
              form={form}
              isPending={isPending}
              hasFourthMember={
                selectedEvent === "Mech IPL Auction" && mechIplHasFourthMember
              }
              onToggleFourthMember={(checked) => {
                if (selectedEvent === "Mech IPL Auction") {
                  setMechIplHasFourthMember(checked);
                }
                form.setValue(
                  "numberOfTeamMembers",
                  (checked ? 4 : 3) as unknown as never,
                  { shouldValidate: true, shouldDirty: true }
                );
                if (!checked) {
                  form.setValue(
                    "participant4",
                    undefined as unknown as {
                      studentName: string;
                      contactNumber: string;
                      email?: string;
                    },
                    { shouldValidate: true, shouldDirty: true }
                  );
                }
              }}
            />
          )}

          {isMechJunkYard && (
            <MechJunkYardFields
              form={form}
              isPending={isPending}
              hasThirdMember={mechJunkYardHasThirdMember}
              onToggleThirdMember={(checked) => {
                setMechJunkYardHasThirdMember(checked);
                form.setValue(
                  "numberOfTeamMembers",
                  (checked ? 3 : 2) as unknown as never,
                  { shouldValidate: true, shouldDirty: true }
                );
                if (!checked) {
                  form.setValue(
                    "participant3",
                    undefined as unknown as {
                      studentName: string;
                      contactNumber: string;
                      email?: string;
                    },
                    { shouldValidate: true, shouldDirty: true }
                  );
                }
              }}
            />
          )}

          <FormField
            control={form.control}
            name="paymentMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Payment Mode <RequiredAsterisk />
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setPaymentMode(value as "ONLINE" | "OFFLINE");
                    if (value === "OFFLINE") {
                      form.setValue(
                        "transactionId",
                        undefined as unknown as number,
                        { shouldValidate: true, shouldDirty: true }
                      );
                    } else {
                      form.setValue(
                        "receiptNumber",
                        undefined as unknown as string,
                        { shouldValidate: true, shouldDirty: true }
                      );
                    }
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

          {paymentModeWatch === "ONLINE" && (
            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    UPI Transaction ID <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter 12-digit UPI Transaction ID"
                      maxLength={12}
                      inputMode="numeric"
                      autoComplete="off"
                      value={
                        field.value !== undefined && field.value !== null
                          ? String(field.value)
                          : ""
                      }
                      onChange={(e) => {
                        const raw = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 12);
                        field.onChange(raw === "" ? undefined : Number(raw));
                      }}
                      onBlur={field.onBlur}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {paymentModeWatch === "OFFLINE" && (
            <FormField
              control={form.control}
              name="receiptNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Receipt Number <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input
                      maxLength={5}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter receipt number from college office"
                      autoComplete="off"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 5);
                        field.onChange(value);
                      }}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="payss"
            render={({ field: { onChange, value: _value, ...field } }) => (
              <FormItem>
                <FormLabel>
                  {paymentMode === "ONLINE"
                    ? "Upload Payment Screenshot"
                    : "Upload Receipt Photo"}
                  <RequiredAsterisk />
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onChange(file);
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
                {payssValue && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {(payssValue as File).name}
                    </span>
                    {isUploading && (
                      <Loader2
                        className="h-4 w-4 animate-spin text-muted-foreground"
                        aria-hidden
                      />
                    )}
                    {uploadedImageUrl && !isUploading && (
                      <CheckCircle2
                        className="h-4 w-4 text-green-600"
                        aria-label="Upload complete"
                      />
                    )}
                    {uploadError && !isUploading && (
                      <span className="text-destructive text-xs">
                        {uploadError}
                      </span>
                    )}
                  </div>
                )}
              </FormItem>
            )}
          />

          <div className="mt-4 p-4 bg-primary/10 rounded-xl flex items-start gap-2 justify-between md:col-span-2">
            <div>
              <p className="text-lg font-semibold">
                Total Registration Fee: ₹{totalFee}
              </p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-md flex-1">{qrLabel}</h3>
              <Image
                alt={qrLabel}
                src={qrSrc}
                width={180}
                height={180}
                unoptimized
                className="rounded-xl"
              />
            </div>
          </div>

          {!isValid && (
            <p className="text-base text-red-500">
              * Fill all the input fields to submit the form
            </p>
          )}

          <Button
            type="submit"
            className="w-full md:col-span-2 rounded-xl dark:text-white"
            disabled={
              isPending ||
              !isValid ||
              (!!payssValue && (!uploadedImageUrl || isUploading))
            }
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
