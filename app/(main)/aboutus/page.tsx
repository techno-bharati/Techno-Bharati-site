"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [];

const studentCoordinators = [];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bharati Vidyapeeth&apos;s College of Engineering, Kolhapur
              presents <br />
              Techno Bharati 2025 - a celebration of technology and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="/bvcoek.png"
                alt="College Campus"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Institution</h2>
              <p className="text-muted-foreground mb-4">
                Bharati Vidyapeeth&apos;s College of Engineering, Kolhapur is a
                premier institution dedicated to excellence in technical
                education. With state-of-the-art facilities and experienced
                faculty, we strive to nurture the next generation of engineers
                and innovators.
              </p>
              <p className="text-muted-foreground">
                Our AI&ML department is at the forefront of technological
                advancement, preparing students for the challenges of tomorrow
                through cutting-edge curriculum and practical exposure.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Techno Bharati 2025
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To create a platform that fosters innovation, creativity, and
                  technical excellence among students while bridging the gap
                  between academia and industry.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To organize events that challenge students&apos; technical
                  abilities, promote teamwork, and provide exposure to
                  real-world problems and solutions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <p className="text-muted-foreground">
                  Innovation, Excellence, Collaboration, and Continuous Learning
                  form the cornerstone of our event philosophy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Team
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <Badge variant="secondary">{member.role}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">
            Student Coordinators
          </h3>
          <div className="grid md:grid-cols-5 gap-6">
            {studentCoordinators.map((coordinator, index) => (
              <motion.div
                key={coordinator.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image
                        src={coordinator.image}
                        alt={coordinator.name}
                        fill
                        className="rounded-full object-cover"
                      />
                  </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {coordinator.name}
                    </h3>
                    <Badge variant="outline">{coordinator.role}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
