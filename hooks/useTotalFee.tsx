import { useEffect, useState } from "react";
import {
  calculateGeneralEngineeringGamesFee,
  GENERAL_ENGINEERING_TECHNICAL_FEE,
  getEventFeeByName,
} from "@/lib/constants";
import type { EventName } from "@/lib/types/registration";

export interface UseTotalFeeParams {
  selectedEvent: EventName | undefined;
  teamSize: number | undefined;
  selectedGamesCount: number;
  membersCount: number;
}

export function useTotalFee({
  selectedEvent,
  teamSize,
  selectedGamesCount,
  membersCount,
}: UseTotalFeeParams): number {
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    if (!selectedEvent) {
      setTotalFee(0);
      return;
    }

    if (selectedEvent === "General Engineering Games") {
      setTotalFee(calculateGeneralEngineeringGamesFee(selectedGamesCount));
      return;
    }

    if (selectedEvent === "Mech IPL Auction") {
      setTotalFee((teamSize ?? 3) * 100);
      return;
    }

    if (selectedEvent === "Techno Science Quiz") {
      setTotalFee(GENERAL_ENGINEERING_TECHNICAL_FEE);
      return;
    }

    if (selectedEvent === "Battle of Brains") {
      setTotalFee(getEventFeeByName(selectedEvent, 2) ?? 200);
      return;
    }

    const fee = getEventFeeByName(selectedEvent, membersCount);
    setTotalFee(fee ?? 0);
  }, [selectedEvent, teamSize, selectedGamesCount, membersCount]);

  return totalFee;
}
