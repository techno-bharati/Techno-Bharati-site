import { getEventContent } from "@/lib/getEventContent";
import EventDetailsPageContent from "./_components/EventDetailsPageContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const content = getEventContent(slug);

  return <EventDetailsPageContent slug={slug} content={content} />;
}
