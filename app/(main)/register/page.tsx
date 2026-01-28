import { redirect } from "next/navigation";

export default function Page() {
  // Legacy /register route – send users to the events list
  // so they can pick a specific event and register there.
  redirect("/events");
}

