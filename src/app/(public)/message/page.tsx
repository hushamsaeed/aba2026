import type { Metadata } from "next";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WavesDivider } from "@/components/shared/WavesDivider";

export const metadata: Metadata = {
  title: "Messages | 42nd ABA Conference",
  description:
    "Welcome messages from the ABA Chairman and the Host Country for the 42nd ABA Conference in Maldives.",
};

export default function MessagePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep-blue py-24 md:py-32 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.06} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Messages
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Welcome words from the leadership of the Asian Bankers Association
            and our gracious host
          </p>
          <div className="mt-6 h-1 w-20 rounded-full bg-aba-gold mx-auto" />
        </div>
        <WavesDivider color="#f8f4f0" />
      </section>

      {/* Messages */}
      <section className="bg-coral-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Chairman's Message */}
            <article className="relative bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-aba-gold" />
              <div className="relative p-8 md:p-10">
                <IslamicPattern color="#bf9436" opacity={0.03} />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-deep-blue/10 flex items-center justify-center">
                      <span className="font-heading text-xl font-bold text-deep-blue">
                        DW
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-deep-blue">
                        Daniel Wu
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Chairman, Asian Bankers Association
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Vice Chairman, CTBC Financial Holding
                      </p>
                    </div>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue mb-6">
                    Chairman&rsquo;s Message
                  </h2>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Dear Colleagues and Distinguished Guests,
                    </p>
                    <p>
                      It is my great pleasure to welcome you to the 42nd ABA
                      General Meeting and Conference, hosted in the breathtaking
                      Republic of Maldives by Bank of Maldives. This year&rsquo;s
                      gathering holds special significance as we convene in one of
                      the most unique island nations in the world.
                    </p>
                    <p>
                      As the banking landscape across Asia continues to evolve at an
                      unprecedented pace, the importance of collaboration and
                      knowledge-sharing among our member institutions has never been
                      greater. Digital transformation, sustainable finance, and
                      financial inclusion remain at the forefront of our industry,
                      and this conference provides an invaluable platform to explore
                      these critical themes.
                    </p>
                    <p>
                      The theme of this year&rsquo;s conference reflects our
                      collective commitment to shaping the future of banking in the
                      region. I am confident that the discussions, presentations,
                      and networking opportunities over the coming days will yield
                      meaningful insights and lasting partnerships.
                    </p>
                    <p>
                      I extend my sincere gratitude to Bank of Maldives for their
                      generous hospitality and meticulous preparations in making
                      this event possible. I look forward to a productive and
                      inspiring conference.
                    </p>
                    <p className="font-medium text-deep-blue mt-6">
                      Warm regards,
                      <br />
                      Daniel Wu
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Host Country Welcome */}
            <article className="relative bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-bml-red" />
              <div className="relative p-8 md:p-10">
                <IslamicPattern color="#E31837" opacity={0.03} />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-bml-red/10 flex items-center justify-center">
                      <span className="font-heading text-xl font-bold text-bml-red">
                        BML
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-deep-blue">
                        Bank of Maldives
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Host Institution
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Republic of Maldives
                      </p>
                    </div>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue mb-6">
                    Host Country Welcome
                  </h2>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      On behalf of Bank of Maldives and the people of the Republic
                      of Maldives, it is our privilege and honour to welcome
                      delegates from across Asia to our island nation for the 42nd
                      ABA General Meeting and Conference.
                    </p>
                    <p>
                      The Maldives, renowned for its pristine natural beauty and
                      warm hospitality, is proud to serve as the venue for this
                      prestigious gathering of the region&rsquo;s banking leaders.
                      As the largest and leading financial institution in the
                      Maldives, Bank of Maldives is deeply committed to advancing
                      the financial sector not only domestically but across the
                      broader Asian banking community.
                    </p>
                    <p>
                      Our nation may be small in size, but our aspirations for
                      financial innovation and inclusion are boundless. We believe
                      this conference presents a remarkable opportunity to share
                      experiences, forge new partnerships, and explore collaborative
                      solutions to the challenges and opportunities facing our
                      industry.
                    </p>
                    <p>
                      We have prepared a programme that balances substantive
                      professional discourse with the opportunity to experience the
                      unique culture and natural splendour of the Maldives. We
                      trust that your time here will be both productive and
                      memorable.
                    </p>
                    <p className="font-medium text-deep-blue mt-6">
                      Ahlan wa sahlan &mdash; Welcome to the Maldives.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <WavesDivider color="#1e3a5f" flip />

      {/* Quote Section */}
      <section className="relative bg-deep-blue py-16 md:py-20 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.05} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-xl md:text-2xl text-white/90 italic leading-relaxed">
            &ldquo;The 42nd ABA Conference brings together the brightest minds in
            Asian banking to chart the future of our industry in a setting of
            unparalleled beauty.&rdquo;
          </blockquote>
          <div className="mt-6 h-1 w-12 rounded-full bg-aba-gold mx-auto" />
        </div>
      </section>

      <WavesDivider color="#f8f4f0" />
    </>
  );
}
