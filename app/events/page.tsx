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

interface ModalData {
  eventName: string;
  description: string;
  rules: string[];
  registration: string[];
  queries: { string: string };
}

export default function Page() {
  const [openDialog, setOpenDialog] = useState(false);
  const [modalContent, setModalContent] = useState<ModalData | null>(null);

  const handleLearnMoreClick = (modalData: ModalData) => {
    setModalContent(modalData);
    setOpenDialog(true);
  };

  return (
    <div className="min-h-screen p-10 bg-black">
      <h1 className="text-5xl font-bold text-center mb-10 text-white">
        Upcoming Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div>
            <Card className="min-h-full flex flex-col justify-between h-full p-4 shadow-lg border bg-zinc-950 rounded-lg text-white hover:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {event.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-gray-300">
                  <Coins className="h-5 w-5 text-gray-400" />
                  <p>Entry: {`${event.entryFee}`} &#8377;</p>
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
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger />
        <DialogContent className="max-w-4xl mx-auto bg-zinc-900 p-8 rounded-lg max-h-[80vh] overflow-y-auto ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {modalContent?.eventName}
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-300 mt-4">{modalContent?.description}</p>

          <h3 className="text-xl text-white mt-6">Rules:</h3>
          {modalContent?.eventName === "Startup Sphere" ? (
            <div className="text-gray-300">
              {modalContent.rules.map((rule, index) => (
                <p key={index}>{rule}</p>
              ))}
            </div>
          ) : (
            <ol className="list-decimal pl-6 text-gray-300">
              {modalContent?.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ol>
          )}

          <h3 className="text-xl text-white mt-6">Registration Steps:</h3>
          <ul className="list-circle pl-6 text-gray-300">
            {modalContent?.registration.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <h3 className="text-xl text-white mt-6">Queries:</h3>
          <div className="text-gray-300">
            {modalContent?.queries &&
              Object.entries(modalContent.queries).map(([key, value]) => (
                <p key={key} className="flex items-center gap-1">
                  <PhoneCall className="h-4 w-4 text-gray-400" />
                  <span className="capitalize">{key} </span>
                  <span className="text-gray-500">{`(${value})`}</span>
                </p>
              ))}
          </div>

          <Button
            variant="default"
            className="mt-6 w-full bg-primary text-muted hover:bg-primary/70 "
            onClick={() => setOpenDialog(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
