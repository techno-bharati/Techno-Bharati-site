import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function Sponsors() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            TITLE SPONSOR
          </div>
          <h2 className="text-3xl font-bold">Our Sponsors</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-background/50 backdrop-blur-sm border-none">
            <CardContent className="p-8">
              <div className="relative h-32">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-01%20165324-yVVRVlEtHjJizBTOwGGFvM9nQ2eUHx.png"
                  alt="MarshMcLennan Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-background/50 backdrop-blur-sm border-none">
              <CardContent className="p-4">
                <div className="relative h-20">
                  <Image src="/placeholder.svg" alt={`Sponsor ${i + 1}`} fill className="object-contain opacity-50" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

