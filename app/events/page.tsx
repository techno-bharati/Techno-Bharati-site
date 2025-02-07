"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Coins, PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { events } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ModalData {
  eventName: string;
  description: string;
  rules: string[];
  registration: string[];
  queries: {
    [key: string]: string | undefined;
  };
}

export default function Page() {
  const [openDialog, setOpenDialog] = useState(false);
  const [modalContent, setModalContent] = useState<ModalData | null>(null);
  const router = useRouter();

  const handleLearnMoreClick = (modalData: ModalData) => {
    setModalContent(modalData);
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen p-4 md:p-10 bg-black">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-10 text-white">
        Upcoming Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {events.map((event) => (
          <div key={event.id}>
            <Card className="min-h-full flex flex-col justify-between h-full p-4 shadow-lg border bg-zinc-950 rounded-lg text-white hover:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {event.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-gray-300">
                  <Coins className="h-5 w-5 text-gray-400" />
                  <p>Entry: &#8377; {`${event.entryFee}`}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <p>{event.date}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mt-1">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <p>{event.time}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mt-1">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <p>{event.venue}</p>
                </div>
                <Button
                  variant="default"
                  className="mt-4 w-full bg-primary text-muted hover:bg-primary/70"
                  onClick={() => {
                    if (event.modalData) {
                      handleLearnMoreClick(event.modalData);
                    }
                  }}
                >
                  Know More
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger />
        <DialogContent className="max-w-[95vw] md:max-w-4xl mx-auto bg-zinc-900 p-4 md:p-8 rounded-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-white">
              {modalContent?.eventName}
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-300 mt-4 text-sm md:text-base">
            {modalContent?.description}
          </p>

          <h3 className="text-lg md:text-xl text-white mt-6">Rules:</h3>
          {modalContent?.eventName === "Startup Sphere" ? (
            <div className="text-gray-300 text-sm md:text-base">
              {modalContent.rules.map((rule, index) => (
                <p key={index} className="mt-1">
                  {rule}
                </p>
              ))}
            </div>
          ) : (
            <ol className="list-decimal pl-6 text-gray-300 text-sm md:text-base">
              {modalContent?.rules.map((rule, index) => (
                <li key={index} className="mt-1">
                  {rule}
                </li>
              ))}
            </ol>
          )}

          <h3 className="text-lg md:text-xl text-white mt-6">
            Registration Steps:
          </h3>
          <ul className="list-circle pl-6 text-gray-300 text-sm md:text-base">
            {modalContent?.registration.map((step, index) => (
              <li key={index} className="mt-1">
                {step}
              </li>
            ))}
          </ul>

          <div className="flex flex-col md:flex-row md:gap-8 lg:gap-44 mt-6 mb-4 md:mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg md:text-xl text-white">Queries:</h3>
              <div className="text-gray-300 text-sm md:text-base mt-2">
                {modalContent?.queries &&
                  Object.entries(modalContent.queries).map(([key, value]) => (
                    <p key={key} className="flex items-center gap-1 mt-1">
                      <PhoneCall className="h-4 w-4 text-gray-400" />
                      <span className="capitalize">{key} </span>
                      <span className="text-gray-500">{`(${value})`}</span>
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <h3 className="text-lg md:text-xl text-white mb-2">
                Payment QR:
              </h3>
              <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px]">
                <Image
                  src="/qr.jpeg"
                  fill
                  className="object-contain"
                  alt="Payment QR"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button
              variant="default"
              className="w-full bg-primary text-muted hover:bg-primary/70"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>

            <Button
              variant="outline"
              className="w-full hover:bg-zinc-800"
              onClick={() => setOpenDialog(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
