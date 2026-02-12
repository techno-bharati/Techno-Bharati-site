import RegistrationForm, {
  EventNameOption,
} from "@/app/(main)/register/form/RegistrationForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Map event detail slugs to the internal event names
// used by the registration schema/backend.
const slugToEventName: Record<string, EventNameOption> = {
  "startup-sphere": "Startup Sphere",
  "face-to-face": "Face To Face",
  "python-warriors": "Python Worriors",
  freefire: "FreeFire Battleship",
  "ai-tales": "AI Tales",
  // ge (technical)
  "techno-science-quiz": "Techno Science Quiz",
  "poster-competition": "Poster Competition",
  "scitech-model-expo": "SciTech Model Expo 2K26",
  // General engineering (games) -> send to bundle form
  "free-fire-challenge": "General Engineering Games",
  "coin-drop-challenge": "General Engineering Games",
  "funny-walk-race": "General Engineering Games",
  "pass-the-balloon": "General Engineering Games",
  "emoji-expression-game": "General Engineering Games",
  //civil engineering
  "model-making": "Model Making",
  "cad-master": "CAD Master",
  videography: "Videography",
  // CSE department
  codefusion: "CODEFUSION",
  "project-expo": "Project Expo",
  "counter-strike": "Counter Strike",
};

export default async function EventRegisterPage({ params }: PageProps) {
  const { slug } = await params;

  const eventName = slugToEventName[slug];

  if (!eventName) {
    notFound();
  }

  const initialSelectedGames =
    eventName === "General Engineering Games"
      ? (() => {
          const slugToGameLabel: Record<string, string> = {
            "free-fire-challenge": "Free Fire Challenge",
            "coin-drop-challenge": "Coin Drop Challenge",
            "funny-walk-race": "Funny Walk Race",
            "pass-the-balloon": "Pass the Balloon",
            "emoji-expression-game": "Emoji Expression Game",
          };
          const game = slugToGameLabel[slug];
          return game ? [game] : [];
        })()
      : undefined;

  return (
    <div className="w-full p-6">
      <RegistrationForm
        initialEvent={eventName}
        initialSelectedGames={initialSelectedGames}
      />
    </div>
  );
}
