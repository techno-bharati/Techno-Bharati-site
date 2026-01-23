import EventDetailsPageContent from "./_components/EventDetailsPageContent";

interface PageProps {
  params: { slug: string };
}


export default async function EventDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  
  return <EventDetailsPageContent slug={slug} />
}
