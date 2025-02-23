import Image from "next/image";

export function Sponsors() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Sponsors
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 max-w-3xl mx-auto">
          <Image
            src="/sponsers/sponser.jpeg"
            alt="sponsor 1 Logo"
            width={240}
            height={120}
            className="rounded-lg hover:opacity-90 transition-opacity"
            priority
          />
          <Image
            src="/sponsers/sponser2.jpeg"
            alt="sponsor 2 Logo"
            width={240}
            height={120}
            className="rounded-lg hover:opacity-90 transition-opacity"
            priority
          />
        </div>
      </div>
    </section>
  );
}
