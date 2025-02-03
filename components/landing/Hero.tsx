import { Button } from "../ui/button";
import Countdown from "./Countdown";

export function Hero() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/background image.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-4 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
          <span className="text-primary">Techno </span>Bharati
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">28th February, 2025</p>
        <Countdown />
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-mono text-primary animate-pulse">
            Events are Live Now!
          </h2>
        </div>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          EXPLORE
        </Button>
      </div>
    </div>
  );
}
