import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { userRegistrationFormSchema } from "@/schema/userRegistrationForm";
import { createRegistration } from "@/app/(main)/actions/registration";
import type {
  EventName,
  ParticipantFields,
  RegistrationFormProps,
} from "@/lib/types/registration";

export type FormValues = z.infer<typeof userRegistrationFormSchema>;

export const CODEFUSION_STYLE_EVENTS: EventName[] = [
  "CODEFUSION",
  "Snap & Shine",
  "Poster Competition",
  "SciTech Model Expo 2K26",
  "CAD Master",
  "Videography",
  "Model Making",
];

export const SOLO_EVENTS: EventName[] = [
  "Face To Face",
  "Python Frontiers",
  "AI Tales",
  "Techno Science Quiz",
];

export const FIXED_PAIR_EVENTS: EventName[] = ["Battle of Brains"];

export function useRegistrationForm({
  initialEvent,
  initialSelectedGames,
}: RegistrationFormProps) {
  const router = useRouter();

  const [codefusionHasSecondParticipant, setCodefusionHasSecondParticipant] =
    useState(false);
  const [
    entcDigitalDangalSecondParticipant,
    setEntcDigitalDangalSecondParticipant,
  ] = useState(false);
  const [mechIplHasFourthMember, setMechIplHasFourthMember] = useState(false);
  const [mechJunkYardHasThirdMember, setMechJunkYardHasThirdMember] =
    useState(false);
  const [entcProjectExpoFourthMember, setEntcProjectExpoFourthMember] =
    useState(false);
  const [paymentMode, setPaymentMode] = useState<"ONLINE" | "OFFLINE">(
    "ONLINE"
  );
  const [otherDepartment, setOtherDepartment] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>(
    initialSelectedGames ?? []
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(userRegistrationFormSchema),
    mode: "onTouched",
    defaultValues: {
      collegeName: "",
      events: initialEvent,
      selectedGames: initialSelectedGames,
      groupName: "",
      payss: undefined,
      paymentMode: undefined,
      department: undefined,
      class: undefined,
      primaryContactVerified: false,
    },
  });

  const selectedEvent = form.watch("events") as EventName | undefined;
  const teamSize = form.watch("numberOfTeamMembers");
  const payssValue = form.watch("payss") as File | undefined;

  const isCodefusionStyleEvent = selectedEvent
    ? CODEFUSION_STYLE_EVENTS.includes(selectedEvent)
    : false;

  const getMembersCount = useCallback((): number => {
    if (!selectedEvent) return 1;

    if (isCodefusionStyleEvent) {
      return codefusionHasSecondParticipant ? 2 : 1;
    }
    if (selectedEvent === "Digital Dangal") {
      return entcDigitalDangalSecondParticipant ? 2 : 1;
    }
    if (FIXED_PAIR_EVENTS.includes(selectedEvent)) {
      return 2;
    }
    return teamSize ?? 1;
  }, [
    selectedEvent,
    isCodefusionStyleEvent,
    codefusionHasSecondParticipant,
    entcDigitalDangalSecondParticipant,
    teamSize,
  ]);

  useEffect(() => {
    if (
      selectedEvent !== "Treasure Hunt" &&
      selectedEvent !== "Mech Project Expo"
    )
      return;

    const maxMembers = teamSize ?? 1;
    const participantKeys = [
      "participant2",
      "participant3",
      "participant4",
      "participant5",
    ] as const;

    participantKeys.forEach((key, index) => {
      const memberNumber = index + 2;
      if (memberNumber > maxMembers) {
        form.setValue(key, undefined as unknown as ParticipantFields, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    });
  }, [selectedEvent, teamSize, form]);

  useEffect(() => {
    if (selectedEvent !== "Project Expo") return;
    const total = teamSize ?? 2;
    if (total < 4)
      form.setValue("participant4", undefined as unknown as ParticipantFields, {
        shouldValidate: true,
        shouldDirty: true,
      });
    if (total < 3)
      form.setValue("participant3", undefined as unknown as ParticipantFields, {
        shouldValidate: true,
        shouldDirty: true,
      });
  }, [selectedEvent, teamSize, form]);

  useEffect(() => {
    const isBattleOrVideo = FIXED_PAIR_EVENTS.includes(
      selectedEvent ?? ("" as EventName)
    );
    const isDigitalDangal = selectedEvent === "Digital Dangal";

    if (!isCodefusionStyleEvent) setCodefusionHasSecondParticipant(false);
    if (!isDigitalDangal) setEntcDigitalDangalSecondParticipant(false);

    if (isBattleOrVideo) {
      const current = form.getValues("participant2");
      if (!current) {
        form.setValue(
          "participant2",
          { studentName: "", contactNumber: "", email: "" },
          { shouldValidate: true, shouldDirty: true }
        );
      }
      return;
    }

    if (!isCodefusionStyleEvent && !isDigitalDangal) {
      form.setValue("participant2", undefined as unknown as ParticipantFields);
      return;
    }

    const shouldShow =
      (isCodefusionStyleEvent && codefusionHasSecondParticipant) ||
      (isDigitalDangal && entcDigitalDangalSecondParticipant);

    if (!shouldShow) {
      form.setValue("participant2", undefined as unknown as ParticipantFields, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [
    selectedEvent,
    isCodefusionStyleEvent,
    codefusionHasSecondParticipant,
    entcDigitalDangalSecondParticipant,
    form,
  ]);

  useEffect(() => {
    if (selectedEvent !== "Mech IPL Auction") {
      setMechIplHasFourthMember(false);
      form.setValue("participant4", undefined as unknown as ParticipantFields);
      return;
    }
    if (!mechIplHasFourthMember) {
      form.setValue("participant4", undefined as unknown as ParticipantFields, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedEvent, mechIplHasFourthMember, form]);

  useEffect(() => {
    if (selectedEvent !== "ENTC Project Expo") {
      setEntcProjectExpoFourthMember(false);
      form.setValue("participant4", undefined as unknown as ParticipantFields);
      return;
    }
    if (!entcProjectExpoFourthMember) {
      form.setValue("participant4", undefined as unknown as ParticipantFields, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedEvent, entcProjectExpoFourthMember, form]);

  useEffect(() => {
    if (selectedEvent !== "Mech Junk Yard") {
      setMechJunkYardHasThirdMember(false);
      form.setValue("participant3", undefined as unknown as ParticipantFields);
      return;
    }
    if (!mechJunkYardHasThirdMember) {
      form.setValue("participant3", undefined as unknown as ParticipantFields, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedEvent, mechJunkYardHasThirdMember, form]);

  useEffect(() => {
    if (!selectedEvent) return;

    const setDefault = (value: number) =>
      form.setValue("numberOfTeamMembers", value as unknown as never, {
        shouldValidate: true,
        shouldDirty: true,
      });

    switch (selectedEvent) {
      case "Project Expo":
        setDefault(2);
        break;
      case "Mech Project Expo": {
        const cur = form.getValues("numberOfTeamMembers");
        if (!cur || cur < 2 || cur > 5) setDefault(2);
        break;
      }
      case "Treasure Hunt": {
        const cur = form.getValues("numberOfTeamMembers");
        if (!cur || cur < 2 || cur > 5) setDefault(2);
        break;
      }
      case "Mech Junk Yard": {
        const cur = form.getValues("numberOfTeamMembers");
        if (!cur || cur < 2 || cur > 3) setDefault(2);
        break;
      }
      case "Mech IPL Auction": {
        const cur = form.getValues("numberOfTeamMembers");
        if (!cur || cur < 3 || cur > 4) setDefault(3);
        break;
      }
      case "ENTC Project Expo": {
        const cur = form.getValues("numberOfTeamMembers");
        if (!cur || cur < 3 || cur > 4) setDefault(3);
        break;
      }
    }
  }, [selectedEvent, form]);

  useEffect(() => {
    if (selectedEvent === "General Engineering Games") {
      form.setValue("selectedGames", selectedGames as unknown as never);
    } else if (selectedGames.length > 0) {
      setSelectedGames([]);
      form.setValue("selectedGames", undefined as unknown as never);
    }
  }, [selectedEvent, selectedGames, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: createRegistration,
    onSuccess: (data) => {
      if (data.success) {
        const eventForRedirect = selectedEvent ?? "";
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("registrationSuccess", "true");
        }
        toast.success("Registration successful!", { id: "form-submit" });
        router.push(
          `/events/success?event=${encodeURIComponent(eventForRedirect)}&from=registration`
        );
        form.reset({
          collegeName: "",
          events: undefined,
          payss: undefined,
          paymentMode: "ONLINE",
          department: undefined,
          class: undefined,
          primaryContactVerified: false,
        });
      } else {
        toast.error("Something went wrong, please try again later.", {
          id: "form-submit",
        });
      }
    },
    onError: (error: Error) => {
      toast.error("Failed to submit registration", { id: "form-submit" });
      console.error(error);
    },
  });

  const onSubmit = useCallback(
    (
      data: FormValues,
      uploadedImageUrl: string | null,
      isUploading: boolean,
      uploadError: string | null
    ) => {
      if (!data.payss) {
        toast.error("Please upload a payment screenshot", {
          id: "form-submit",
        });
        return;
      }
      if (!uploadedImageUrl) {
        const msg = uploadError
          ? "Please select the image again to retry upload"
          : isUploading
            ? "Please wait for the image to finish uploading"
            : "Please wait for the image to finish uploading";
        toast.error(msg, { id: "form-submit" });
        return;
      }
      toast.loading("Submitting registration..", { id: "form-submit" });
      const { payss: _payss, ...rest } = data;
      mutate({ ...rest, paymentScreenshotUrl: uploadedImageUrl });
    },
    [mutate]
  );

  const onError = (errors: unknown) => {
    console.log("Form Errors:", errors);
  };

  return {
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
    setSelectedGames,
    codefusionHasSecondParticipant,
    setCodefusionHasSecondParticipant,
    entcDigitalDangalSecondParticipant,
    setEntcDigitalDangalSecondParticipant,
    mechIplHasFourthMember,
    setMechIplHasFourthMember,
    mechJunkYardHasThirdMember,
    setMechJunkYardHasThirdMember,
    entcProjectExpoFourthMember,
    setEntcProjectExpoFourthMember,
    onSubmit,
    onError,
  };
}
