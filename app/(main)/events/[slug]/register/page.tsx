import RegistrationForm, {
  EventNameOption,
} from "@/app/(main)/register/form/RegistrationForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

// Map event detail slugs to the internal event names
// used by the registration schema/backend.
const slugToEventName: Record<string, string> = {
  "startup-sphere": "Startup Sphere",
  "face-to-face": "Face To Face",
  "python-warriors": "Python Worriors",
  freefire: "FreeFire Battleship",
  "ai-tales": "AI Tales",
};

export default async function EventRegisterPage({ params }: PageProps) {
  const { slug } = params;

  const eventName = slugToEventName[slug];

  if (!eventName) {
    notFound();
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="border p-6 max-w-4xl w-full rounded-lg flex justify-center">
        <RegistrationForm initialEvent={eventName as EventNameOption} />
      </div>
    </div>
  );
}
