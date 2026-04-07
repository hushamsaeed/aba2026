import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages | 42nd ABA Conference",
  description:
    "Welcome messages from the ABA Chairman and the Host Country for the 42nd ABA Conference in Maldives.",
};

export default function MessagePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">Welcome</p>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-white">
            Messages
          </h1>
          <p className="mt-4 text-white/50 max-w-2xl text-sm leading-relaxed">
            Words from the leadership of the Asian Bankers Association
            and our gracious host, Bank of Maldives.
          </p>
        </div>
      </section>

      {/* Messages */}
      <section className="relative bg-dark-surface py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Chairman's Message */}
            <article className="relative bg-dark-card border border-white/10 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-aba-gold" />
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-aba-gold/10 flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-aba-gold">DW</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">Daniel Wu</h3>
                    <p className="text-editorial text-white/40 text-[10px]">Chairman, ABA</p>
                    <p className="text-editorial text-white/30 text-[10px]">Vice Chairman, CTBC Financial Holding</p>
                  </div>
                </div>

                <h2 className="text-display text-2xl md:text-3xl text-white mb-6">
                  Chairman&rsquo;s Message
                </h2>

                <div className="space-y-4 text-white/50 text-sm leading-relaxed">
                  <p>Dear Colleagues and Distinguished Guests,</p>
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
                    financial inclusion remain at the forefront of our industry.
                  </p>
                  <p>
                    The theme &ldquo;Banking in Asia: Investing to Build Resilience&rdquo;
                    reflects our collective commitment to shaping the future of banking
                    in the region. I am confident that the discussions and networking
                    opportunities will yield meaningful insights and lasting partnerships.
                  </p>
                  <p>
                    I extend my sincere gratitude to Bank of Maldives for their
                    generous hospitality and meticulous preparations.
                  </p>
                  <p className="text-aba-gold mt-6">
                    Warm regards,
                    <br />
                    Daniel Wu
                  </p>
                </div>
              </div>
            </article>

            {/* Host Country Welcome */}
            <article className="relative bg-dark-card border border-white/10 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-bml-red" />
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-bml-red/10 flex items-center justify-center">
                    <span className="font-heading text-lg font-bold text-bml-red">BML</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">Bank of Maldives</h3>
                    <p className="text-editorial text-white/40 text-[10px]">Host Institution</p>
                    <p className="text-editorial text-white/30 text-[10px]">Republic of Maldives</p>
                  </div>
                </div>

                <h2 className="text-display text-2xl md:text-3xl text-white mb-6">
                  Host Country Welcome
                </h2>

                <div className="space-y-4 text-white/50 text-sm leading-relaxed">
                  <p>
                    On behalf of Bank of Maldives and the people of the Republic
                    of Maldives, it is our privilege and honour to welcome
                    delegates from across Asia to our island nation.
                  </p>
                  <p>
                    The Maldives, renowned for its pristine natural beauty and
                    warm hospitality, is proud to serve as the venue for this
                    prestigious gathering. As the largest financial institution in the
                    Maldives, Bank of Maldives is deeply committed to advancing
                    the financial sector across the broader Asian banking community.
                  </p>
                  <p>
                    Our nation may be small in size, but our aspirations for
                    financial innovation and inclusion are boundless. This conference
                    presents a remarkable opportunity to share experiences, forge
                    partnerships, and explore collaborative solutions.
                  </p>
                  <p>
                    We have prepared a programme that balances substantive
                    professional discourse with the opportunity to experience the
                    unique culture and natural splendour of the Maldives.
                  </p>
                  <p className="text-bml-red mt-6">
                    Ahlan wa sahlan &mdash; Welcome to the Maldives.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative bg-black py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[800px] mx-auto text-center">
          <blockquote className="font-heading text-xl md:text-2xl text-white/80 italic leading-relaxed">
            &ldquo;The 42nd ABA Conference brings together the brightest minds in
            Asian banking to chart the future of our industry in a setting of
            unparalleled beauty.&rdquo;
          </blockquote>
          <div className="mt-8 h-px w-16 gradient-gold mx-auto" />
        </div>
      </section>
    </>
  );
}
