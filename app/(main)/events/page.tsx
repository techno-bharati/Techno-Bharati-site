import React, { Suspense } from "react";
import EventsPageContent from "./_components/EventsPageContent";

const EventsPage = () => {
  return (
    <Suspense fallback={null}>
      <EventsPageContent />
    </Suspense>
  );
};

export default EventsPage;
