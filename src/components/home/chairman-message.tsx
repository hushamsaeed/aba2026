import Image from "next/image";

export function ChairmanMessage() {
  return (
    <section className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto px-30 py-25 md:px-6 md:py-12 flex flex-col items-center gap-12">
        {/* Section header */}
        <span className="section-label">MESSAGE FROM THE CHAIRMAN</span>
        <h2 className="font-[family-name:var(--font-heading)] text-[48px] md:text-[32px] font-bold text-text text-center">
          A Warm Invitation
        </h2>
        <div className="w-[60px] h-[2px] bg-gold" />

        {/* Content — 2 columns: text left, photo right */}
        <div className="flex flex-col-reverse lg:flex-row gap-15 w-full">
          {/* Text column */}
          <div className="flex flex-col gap-6 flex-1">
            <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary leading-[1.8]">
              On behalf of the Asian Bankers Association, I extend my sincerest
              invitation to all ABA members, associates and friends to join me and
              other ABA Board members for the 42nd ABA General Meeting and
              Conference scheduled to take place on 1–3 September 2026 in
              Maldives.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary leading-[1.8]">
              Thanks to the kind offer of Bank of Maldives to organize this
              year&apos;s Conference, we will have the opportunity to learn how the
              country&apos;s economy has progressed, the prospects for continued growth
              of its banking and financial sector, and possible areas of business
              opportunities.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary leading-[1.8]">
              I am glad that this year&apos;s Conference will focus on the theme
              &ldquo;Banking in Asia: Investing to Build Resilience&rdquo;. The
              three-day event is designed to provide a valuable platform for ABA
              members to meet and network, as well as to exchange views with
              invited experts on current trends and developments in the regional
              and global markets.
            </p>

            {/* Signature — matches design: gap-1, Playfair 20px name, Inter 14px role */}
            <div className="flex flex-col gap-1 mt-4">
              <p className="font-[family-name:var(--font-heading)] text-[20px] font-bold text-text">
                Thinley Namgyel
              </p>
              <p className="font-[family-name:var(--font-body)] text-[14px] text-text-secondary">
                Chairman, Asian Bankers Association
              </p>
            </div>
          </div>

          {/* Chairman photo — 380x460, object-cover */}
          <div className="relative w-[380px] md:w-full h-[460px] md:h-[300px] shrink-0 overflow-hidden">
            <Image
              src="/images/speakers/thinley-namgyel.png"
              alt="Thinley Namgyel — Chairman, ABA"
              fill
              className="object-cover"
              sizes="380px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
