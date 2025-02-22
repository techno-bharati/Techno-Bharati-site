import Image from "next/image";

export function Sponsors() {
  return (
    <section className="px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Sponsors</h2>
        </div>

        <div className="max-w-4xl mx-auto flex justify-center">
          <Image
            src="/sponsers/sponser.jpeg"
            alt="Marsh McLennan Logo"
            height={100}
            width={200}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
