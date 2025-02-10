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

  const renderRules = (rules: string[], eventName: string) => {
    if (eventName === "Startup Sphere") {
      let currentCategory = "";
      return (
        <div className="text-gray-600 dark:text-gray-300 text-sm md:text-base space-y-2">
          {rules.map((rule, index) => {
            if (rule.startsWith("Category")) {
              currentCategory = rule;
              return (
                <div key={index} className="mt-8 mb-4">
                  <h4 className="text-lg font-semibold text-primary/80">
                    {rule}
                  </h4>
                </div>
              );
            }

            if (rule.trim() === "") {
              return <div key={index} className="my-2" />;
            }

            if (/^\d+\./.test(rule)) {
              return (
                <div key={index} className="ml-4 flex gap-2">
                  <span className="text-muted-foreground">
                    {rule.split(".")[0]}.
                  </span>
                  <span>{rule.split(".").slice(1).join(".").trim()}</span>
                </div>
              );
            }

            const getIndentationClass = () => {
              if (rule.startsWith("   •")) return "ml-8";
              if (rule.startsWith("     ○")) return "ml-12";
              if (rule.startsWith("   ")) return "ml-8";
              if (rule.startsWith("     ")) return "ml-12";
              if (rule.startsWith("•")) return "ml-4";
              if (rule.startsWith("○")) return "ml-8";
              return "ml-4";
            };

            const cleanRule = rule.replace(/^[\s•○]+/, "").trim();
            const indentClass = getIndentationClass();
            const bulletType = rule.includes("•")
              ? "•"
              : rule.includes("○")
              ? "○"
              : "";

            return (
              <div key={index} className={`${indentClass} flex gap-2`}>
                {bulletType && (
                  <span className="text-muted-foreground">{bulletType}</span>
                )}
                <span>{cleanRule}</span>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <ol className="list-decimal pl-6 text-gray-600 dark:text-gray-300 text-sm md:text-base">
        {rules.map((rule, index) => (
          <li key={index} className="mt-1">
            {rule}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-10 bg-background">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-10 text-foreground">
        Upcoming Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {events.map((event) => (
          <div key={event.id}>
            <Card className="min-h-full flex flex-col justify-between h-full p-4 shadow-lg border bg-card hover:bg-accent/50 rounded-lg transition-colors">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {event.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Coins className="h-5 w-5 text-muted-foreground" />
                  <p>Entry: &#8377; {`${event.entryFee}`}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <p>{event.date}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <p>{event.time}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <p>{event.venue}</p>
                </div>
                <Button
                  variant="default"
                  className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/70"
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
        <DialogContent className="max-w-[95vw] md:max-w-4xl mx-auto bg-card p-4 md:p-8 rounded-lg max-h-[90vh] overflow-y-auto border">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-foreground">
              {modalContent?.eventName}
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground mt-4 text-sm md:text-base">
            {modalContent?.description}
          </p>

          <h3 className="text-lg md:text-xl text-foreground mt-6">Rules:</h3>
          {modalContent &&
            renderRules(modalContent.rules, modalContent.eventName)}

          <h3 className="text-lg md:text-xl text-foreground mt-6">
            Registration Steps:
          </h3>
          <ul className="list-circle pl-6 text-muted-foreground text-sm md:text-base">
            {modalContent?.registration.map((step, index) => (
              <li key={index} className="mt-1">
                {step}
              </li>
            ))}
          </ul>

          <div className="flex flex-col md:flex-row md:gap-8 lg:gap-44 mt-6 mb-4 md:mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg md:text-xl text-foreground">Queries:</h3>
              <div className="text-muted-foreground text-sm md:text-base mt-2">
                {modalContent?.queries &&
                  Object.entries(modalContent.queries).map(([key, value]) => (
                    <p key={key} className="flex items-center gap-1 mt-1">
                      <PhoneCall className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{key} </span>
                      <span className="text-muted-foreground/60">{`(${value})`}</span>
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <h3 className="text-lg md:text-xl text-foreground mb-2">
                Payment QR:
              </h3>
              <div className="relative w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-muted rounded-lg p-2">
                <Image
                  src="/qr.jpeg"
                  fill
                  className="object-contain rounded-lg"
                  alt="Payment QR"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <Button
              variant="default"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/70"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>

            <Button
              variant="outline"
              className="w-full hover:bg-accent"
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
