"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-16 md:py-24 bg-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-deep-blue mb-4">
            Join Asia&apos;s Banking Leaders
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Network with 500+ delegates from 30+ countries, hear from 40+
            speakers, and shape the future of banking in Asia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-bml-red hover:bg-bml-red-dark text-white font-semibold px-8 py-6 rounded-full text-lg group"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button
                size="lg"
                variant="outline"
                className="border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white px-8 py-6 rounded-full text-lg"
              >
                Become a Sponsor
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
