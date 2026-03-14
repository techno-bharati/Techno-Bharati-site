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
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  CreditCard,
  Banknote,
  Users,
  User,
  Building2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
import { PaymentQR } from "@/components/PaymentQr";

function Section({
  step,
  title,
  icon,
  children,
}: {
  step: number;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="md:col-span-2 space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {step}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{icon}</span>
          <h3 className="font-semibold text-sm tracking-tight">{title}</h3>
        </div>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-10">
        {children}
      </div>
    </div>
  );
}

function PaymentModeCard({
  selected,
  onSelect,
  icon,
  title,
  description,
  disabled,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "relative flex flex-col gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200",
        "hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-background",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {selected && (
        <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-primary" />
      )}
      <span
        className={cn(
          "transition-colors",
          selected ? "text-primary" : "text-muted-foreground"
        )}
      >
        {icon}
      </span>
      <span className="font-semibold text-sm">{title}</span>
      <span className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </span>
    </button>
  );
}

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
  const membersCount = getMembersCount();

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
  const hasParticipantSection =
    isSoloEvent ||
    isSquadEvent ||
    isDuoEvent ||
    isVariableTeamEvent ||
    isFixedTeamEvent ||
    isMechJunkYard;

  const participantSectionTitle = isSquadEvent
    ? "Squad Details"
    : isVariableTeamEvent || isFixedTeamEvent || isMechJunkYard
      ? "Team Details"
      : "Participant Details";

  const getEventDescription = () =>
    selectedEvent === "Project Expo"
      ? "Minimum 2 and maximum 5 team members. Each participant is ₹100."
      : "Minimum 2 and maximum 5 team members. Each participant is ₹100.";

  const paymentStep = hasParticipantSection ? 3 : 2;

  return (
    <div className="w-full max-w-7xl mx-auto pb-16">
      <Button
        variant="outline"
        className="mb-8 group rounded-xl"
        onClick={() => router.back()}
      >
        <ArrowLeft className="-mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Events
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{formTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete all sections below. Fields marked{" "}
          <span className="text-destructive font-medium">*</span> are required.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit, onError)}
          className="grid grid-cols-1 md:grid-cols-2 gap-9"
        >
          <Section
            step={1}
            title="Your Details"
            icon={<Building2 className="h-4 w-4" />}
          >
            <FormField
              control={form.control}
              name="collegeName"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>
                    College Name <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Bharati Vidyapeeth's College of Engineering"
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
                    Your Department <RequiredAsterisk />
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
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AIML">AIML</SelectItem>
                      <SelectItem value="CSE">CSE</SelectItem>
                      <SelectItem value="MECHANICAL">Mechanical</SelectItem>
                      <SelectItem value="CIVIL">Civil</SelectItem>
                      <SelectItem value="ENTC">ENTC</SelectItem>
                      <SelectItem value="GENERAL ENGINEERING">
                        General Engineering
                      </SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.value === "OTHER" && (
                    <Input
                      className="mt-2"
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
                    Year <RequiredAsterisk />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your year" />
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
          </Section>

          {hasParticipantSection && (
            <Section
              step={2}
              title={participantSectionTitle}
              icon={
                isSquadEvent ||
                isVariableTeamEvent ||
                isFixedTeamEvent ||
                isMechJunkYard ? (
                  <Users className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )
              }
            >
              <div className="md:col-span-2">
                {isSoloEvent && (
                  <SoloEventFields form={form} isPending={isPending} />
                )}

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
                    codefusionHasSecondParticipant={
                      codefusionHasSecondParticipant
                    }
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
                    maxMembers={selectedEvent === "Project Expo" ? 5 : 5}
                    description={getEventDescription()}
                  />
                )}

                {isFixedTeamEvent && (
                  <FixedTeamEventFields
                    form={form}
                    isPending={isPending}
                    hasFourthMember={
                      selectedEvent === "Mech IPL Auction" &&
                      mechIplHasFourthMember
                    }
                    onToggleFourthMember={(checked) => {
                      if (selectedEvent === "Mech IPL Auction")
                        setMechIplHasFourthMember(checked);
                      form.setValue(
                        "numberOfTeamMembers",
                        (checked ? 4 : 3) as unknown as never,
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        }
                      );
                      if (!checked)
                        form.setValue(
                          "participant4",
                          undefined as unknown as {
                            studentName: string;
                            contactNumber: string;
                            email?: string;
                          },
                          { shouldValidate: true, shouldDirty: true }
                        );
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
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        }
                      );
                      if (!checked)
                        form.setValue(
                          "participant3",
                          undefined as unknown as {
                            studentName: string;
                            contactNumber: string;
                            email?: string;
                          },
                          { shouldValidate: true, shouldDirty: true }
                        );
                    }}
                  />
                )}
              </div>
            </Section>
          )}

          {selectedEvent && (
            <div className="md:col-span-2 overflow-hidden rounded-2xl border">
              <div className="flex items-center justify-between border-b bg-muted/40 px-5 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-0.5">
                    Registration Fee
                  </p>
                  <p className="text-3xl font-bold tabular-nums">₹{totalFee}</p>
                </div>
                <div className="text-right text-xs text-muted-foreground space-y-0.5">
                  <p className="font-medium text-foreground text-sm">
                    {selectedEvent}
                  </p>
                  {!isSquadEvent && membersCount > 1 && (
                    <p>
                      ₹{totalFee / membersCount} × {membersCount} participants
                    </p>
                  )}
                  {isSquadEvent && <p>per squad</p>}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-5 p-5">
                <div className="shrink-0">
                  <PaymentQR
                    event={selectedEvent}
                    participants={membersCount}
                  />
                </div>
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-sm">
                    Scan & pay before submitting
                  </p>
                  <ol className="space-y-1.5 list-decimal list-inside text-xs text-muted-foreground leading-relaxed">
                    <li>Open any UPI app — GPay, PhonePe, Paytm, etc.</li>
                    <li>
                      Scan the QR code and pay{" "}
                      <span className="font-semibold text-foreground">
                        ₹{totalFee}
                      </span>
                    </li>
                    <li>
                      Take a screenshot of the{" "}
                      <span className="font-semibold text-foreground">
                        Payment Successful
                      </span>{" "}
                      screen
                    </li>
                    <li>
                      Note the{" "}
                      <span className="font-semibold text-foreground">
                        12-digit UPI Transaction ID
                      </span>
                    </li>
                    <li>
                      Fill in the payment section below and upload the
                      screenshot
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          <Section
            step={paymentStep}
            title="Payment Details"
            icon={<CreditCard className="h-4 w-4" />}
          >
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <PaymentModeCard
                selected={paymentModeWatch === "ONLINE"}
                onSelect={() => {
                  form.setValue("paymentMode", "ONLINE", {
                    shouldValidate: true,
                  });
                  setPaymentMode("ONLINE");
                  form.setValue(
                    "receiptNumber",
                    undefined as unknown as string,
                    { shouldValidate: true }
                  );
                }}
                icon={<CreditCard className="h-5 w-5" />}
                title="Online (UPI)"
                description="Paid via GPay, PhonePe, Paytm or any UPI app. Upload your payment screenshot below."
                disabled={isPending}
              />
              <PaymentModeCard
                selected={paymentModeWatch === "OFFLINE"}
                onSelect={() => {
                  form.setValue("paymentMode", "OFFLINE", {
                    shouldValidate: true,
                  });
                  setPaymentMode("OFFLINE");
                  form.setValue(
                    "transactionId",
                    undefined as unknown as number,
                    { shouldValidate: true }
                  );
                }}
                icon={<Banknote className="h-5 w-5" />}
                title="Offline (Cash)"
                description="Paid cash to the volunters. You'll need your receipt number."
                disabled={isPending}
              />
            </div>

            {paymentModeWatch === "ONLINE" && (
              <FormField
                control={form.control}
                name="transactionId"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
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
                    <FormDescription>
                      The 12-digit reference number shown on your UPI success
                      screen.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {paymentModeWatch === "OFFLINE" && (
              <>
                <div className="md:col-span-2 rounded-xl border border-amber-400/40 bg-amber-50/50 dark:bg-amber-950/20 p-3 text-xs space-y-0.5">
                  <p className="font-semibold text-amber-800 dark:text-amber-300">
                    Before you continue
                  </p>
                  <p className="text-amber-700 dark:text-amber-400">
                    Pay <span className="font-bold">₹{totalFee}</span> in cash
                    to the volunteer, collect a receipt, and enter the receipt
                    number below.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="receiptNumber"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>
                        Receipt Number <RequiredAsterisk />
                      </FormLabel>
                      <FormControl>
                        <Input
                          maxLength={10}
                          placeholder="Receipt number from college office"
                          autoComplete="off"
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

            {paymentModeWatch && (
              <FormField
                control={form.control}
                name="payss"
                render={({ field: { onChange, value: _value, ...field } }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>
                      {paymentMode === "ONLINE"
                        ? "Payment Screenshot"
                        : "Receipt Photo"}
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
                      <span className="block">
                        Max file size: 250 KB. JPG or PNG preferred.
                      </span>
                      {paymentMode === "ONLINE" && (
                        <span className="block mt-1 text-yellow-600 dark:text-yellow-400">
                          ⚠ The UPI Transaction ID must be clearly visible in
                          the screenshot.
                        </span>
                      )}
                    </FormDescription>
                    <FormMessage />

                    {payssValue && (
                      <div
                        className={cn(
                          "mt-2 flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs transition-colors",
                          uploadedImageUrl && !isUploading
                            ? "border-green-500/30 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400"
                            : uploadError && !isUploading
                              ? "border-destructive/30 bg-destructive/5 text-destructive"
                              : "border-border bg-muted/30 text-muted-foreground"
                        )}
                      >
                        {isUploading ? (
                          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
                        ) : uploadedImageUrl ? (
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        ) : null}
                        <span className="truncate">
                          {isUploading
                            ? "Uploading image..."
                            : uploadedImageUrl
                              ? `Uploaded: ${(payssValue as File).name}`
                              : uploadError
                                ? uploadError
                                : (payssValue as File).name}
                        </span>
                      </div>
                    )}
                  </FormItem>
                )}
              />
            )}
          </Section>

          <div className="md:col-span-2 space-y-3 pt-2">
            {!isValid && (
              <p className="text-xs text-muted-foreground">
                <span className="text-destructive mr-1">*</span>
                Please complete all required fields above before submitting.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl dark:text-white font-semibold tracking-wide"
              disabled={
                isPending ||
                !isValid ||
                (!!payssValue && (!uploadedImageUrl || isUploading))
              }
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Registration...
                </span>
              ) : (
                "Submit Registration"
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By submitting you confirm that all details provided are accurate.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
