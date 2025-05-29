import { forwardRef } from "react";
import { motion } from "framer-motion";
import PinkonomicsChart from "~/components/PinkonomicsChart";
import ParachainPointsTable from "~/components/ParachainPointsTable";

const sections = [
  { id: "wtf-is-pink", title: "WTF is PINK?" },
  { id: "pinkonomics", title: "$PINKonomics" },
  { id: "airdrop-tranches", title: "Airdrop Tranches" },
  { id: "future-tranches", title: "Future Tranches" },
  { id: "pools", title: "Pools & Treasury" },
  { id: "future", title: "The Future is $PINK" },
  { id: "pinkdrop-wont-stop", title: "$PINKdrop Won't Stop" },
  { id: "final-thoughts", title: "Final Thoughts" },
];

/* 📄 Reusable Paper Section Component */
const PaperSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <motion.div
    id={id}
    className="mb-12"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <h2 className="text-3xl font-bold text-pink-400">{title}</h2>
    <div className="mt-4 text-gray-300 space-y-3">{children}</div>
  </motion.div>
);


const PinkPaper = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section id="pink-paper" ref={ref} className="relative min-h-screen flex flex-col items-center text-white py-24 bg-black">

      {/* 🌟 Background Styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-pink-900 opacity-60 -z-10"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] bg-pink-600 rounded-full blur-[160px] opacity-20 -z-10"></div>

      {/* 📄 Hero Section */}
      <motion.div className="text-center max-w-4xl mx-auto space-y-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}>
        <h1 className="text-7xl font-extrabold tracking-wide uppercase bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
          The Pink Paper
        </h1>
        <p className="text-lg text-gray-300">
          A community-driven document outlining the vision, tokenomics, and future of $PINK.
        </p>
      </motion.div>

      {/* 📜 Sidebar Navigation */}
      <motion.aside className="fixed top-32 left-8 bg-white/10 backdrop-blur-lg shadow-lg p-6 rounded-xl hidden lg:block border border-pink-500/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}>
        <h3 className="text-lg font-semibold text-pink-400">Table of Contents</h3>
        <ul className="mt-3 space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-gray-300 hover:text-pink-300 transition-all"
                aria-label={`Jump to ${section.title} section`}
                title={`Jump to ${section.title} section`}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.aside>

      {/* 📄 Content Wrapper */}
      <div className="relative max-w-3xl px-6 py-12 mt-16 bg-black bg-opacity-50 backdrop-blur-lg rounded-3xl shadow-xl border border-pink-500/30">

        {/* ✅ WTF is PINK? */}
        <PaperSection id="wtf-is-pink" title="WTF is PINK?">
          <p>
            PINK is a meme community for the Polkadot ecosystem with the goal of gaining net new eyeballs on Polkadot,
            and introducing the PINK gaming universe.
          </p>
          <p>
            PINK captures new mindshare by reinforcing the image that Polkadot is Pink, a color of positivity and
            laughter. Once we capture mindshare around a simple ecosystem narrative, it becomes easier to discuss
            Polkadot's compelling tech narratives.
          </p>
          <p>
            Polkadot - and crypto more generally - needs simpler, more engaging narratives. Our space also
            needs simple tech to allow for experimentation and fun to increase adoption.
          </p>
        </PaperSection>

        {/* ✅ $PINKonomics (React Pie Chart Component) */}
        <PaperSection id="pinkonomics" title="$PINKonomics">
          <PinkonomicsChart /> {/* React Pie Chart */}
          <p>
            The Pinkonomics of $PINK have been carefully thought through with the objective to fulfill the
            primary mission of PINK, which is to bring more users to Polkadot in the most frictionless and
            fun way possible.
          </p>
          <p>
            $PINK has been minted on the Polkadot Asset Hub, a relatively unknown but powerful chain in the
            ecosystem. The reason for this is for the PINK community to be at the heart of Polkadot and
            proliferate out from there, touching every Parachain that will have it, flowing through every
            cross-chain bridge it can find, growing in a myriad of ecosystems with the roots always coming
            back to Polkadot where the main action and utility will be. Through this, we believe $PINK can
            maximise exposure, participation, and overall pinkness to the Polkadot ecosystem.
          </p>
          <p>
            Please note that $PINK is for entertainment purposes only. There is no formal team or roadmap,
            only an open community of volunteers spreading PINK vibes. Community volunteers should not join
            the PINK community with the expectation of profit, only pinkness.
          </p>
          <p>
            There are five clearly defined buckets for the token supply which will have no inflation and a
            total supply of 2,300,001,221.
          </p>
        </PaperSection>

        {/* ✅ Airdrop Tranches */}
        <PaperSection id="airdrop-tranches" title="Airdrop Tranches">
          <h3 className="text-2xl font-semibold text-pink-400">50% Airdrops</h3>
          <p>
            This is by far the largest category and supports PINK's core mission of sharing $PINK to as many
            participants as possible across ecosystems. Airdrops will be rolled out over time, which enables
            the early supporters and community to help shape future airdrops in order to maximize value and
            exposure to the community.
          </p>
          <h4 className="text-lg font-semibold text-pink-400">Tranche 1: 15% Total Supply - PINKdrop [The Game]</h4>
          <p>
            The first airdrop campaign was focused on the popular game PINKdrop and is aimed to bootstrap pinkness.
            All that was required was to connect an EVM wallet and record a high score; the airdrop is then
            calculated based on the user's highest score.
          </p>
          <p>
            What easier way to spread $PINK across ecosystems than with a fun addictive game? The stats have spoken for
            themselves with over 14,140 players and 226k games in the first month, this will lead to a wide distribution
            of $PINK.
          </p>
          <p>
            But ser? How are you going to give the airdrop if you have collected EVM addresses and minted the token on
            Asset hub which is a Substrate chain. Good Question anon!
          </p>
          <p>
            $PINK has been registered on Moonbeam, an EVM parachain on Polkadot, enabling the PINK Community to send it
            to all eligible EVM wallets on their chain, so users will be able to get the token directly in their EVM
            wallets by adding the Moonbeam network <a href="https://moonbeam.network/tutorial/how-to-connect-metamask-to-moonbeam/">here</a>. This
            brings a new wave of users to the ecosystem from Day 1.
          </p>
          <h4 className="text-lg font-semibold text-pink-400">Tranche 2: 12.5% Total Supply - Parachain teams</h4>
          <div className="flex justify-center mt-4">
            <ParachainPointsTable />
          </div>
          <p>
            Every team with a parachain on Polkadot is and always will be eligible to claim a % of supply from this
            tranche. Memecoins are about the culture, and the native memecoin of Polkadot should be available to all
            teams and allow them to decide how to distribute their portion of supply to their respective communities.
          </p>
          <p>
            This tranche was designed to allocate a total of 12.5% of the supply to parachain teams in totality. For
            a team to be eligible, they must start the process by proposing to register PINK on their parachain; once
            the asset is registered, they will have qualified for an allocation and the tokens will be sent to their
            native parachain via XCM from the Asset Hub.
          </p>
          <p>
            The allocation per team decreases by 10% each time a slot is filled with the first team eligible to claim 10%
            of the total pot (starting with 1.25% of supply). This means this tranche will never run out and any future
            teams will be able to register PINK and claim a % of the tranche, which gets smaller and smaller with each
            claim. But this also creates the mechanism for PINK to last forever and for every team building on Polkadot to
            be involved in perpetuity.
          </p>
        </PaperSection>

        <PaperSection id="future-tranches" title="Future Tranches">
          <p>
            These are still being finalized and will be guided by the PINK community once $PINK is live. The
            main aim will be to target non-native communities to Polkadot in order to draw them into the
            ecosystem as well as share more pinkness with the most loyal PINK community members.
          </p>
          <p>
            These rolling airdrops have been delivered with great success in other notable meme projects as they create
            sustainability and the ability to have ongoing engagement and excitement for the project rather than giving
            it all out on Day 1.
          </p>
        </PaperSection>

        {/* ✅ Pools & Treasury */}
        <PaperSection id="pools" title="Pools & Treasury">
          <h3 className="text-2xl font-semibold text-pink-400">30% Pools</h3>
          <p>
            Enabling opportunities for anyone to join the $PINK community in a totally open, decentralized manner
            is critical. Pools keep the world hydrated and are key onboarding mechanisms for new community members,
            as pools make it easier for new people to engage with PINK in an above-board manner. Though, to be clear,
            there is no need to access pools to enjoy Pink community vibes.
          </p>
          <p>
            However, by committing 30% of $PINK for multiple pools across ecosystems, $PINK will have the best chance
            of maximizing participation in the PINK community.
          </p>
          <h3 className="text-2xl font-semibold text-pink-400">10% Treasury</h3>
          <p>
            Every great project needs reserves from a community-led Treasury to better the project as the holders see
            fit and $PINK is no different in that respect. 10% of the supply is dedicated to this and it will be up to
            the community and holders how this is shared as the project develops.
          </p>
          <h3 className="text-2xl font-semibold text-pink-400">5% C. Pools</h3>
          <p>
            What may be viewed as a bit of a joke, this has been set aide with all seriousness. The day may come when
            a Centralised Pool is appropriate. For this to be feasible, $PINK will need to be available to enable
            onboarding to the right audience in an above board way.
          </p>
          <p>
            This will be a nice community decision to face at the time, as this $PINK will not be used for anything else,
            so can be considered non-existent until the time comes.
          </p>
          <h3 className="text-2xl font-semibold text-pink-400">5% Pink Vibes</h3>
          <p>
            5% is for approximately 45 volunteers from a wide range of existing Polkadot communities that have embraced
            pinkness from the start by spreading pinkness. They vibe with PINK community values and, ultimately, they are
            dedicated to the success of the Polkadot ecosystem.
          </p>
        </PaperSection>

        {/* ✅ The Future is PINK */}
        <PaperSection id="future" title="The Future is $PINK">
          <p>
            While all of the above sounds great and has the designs of a potentially successful memecoin, $PINK plans to be
            much more than that. $PINK aims to develop a sustainable community model, so community participants feel a part
            of something bigger than themselves. It is imagined that our community of volunteers will experiment, learn and
            grow over time.
          </p>
        </PaperSection>

        {/* ✅ $PINKdrop Won't Stop */}
        <PaperSection id="pinkdrop-wont-stop" title="$PINKdrop Won't Stop">
          <p>
            The success and enjoyment of PINKdrop has been electric and there is an opportunity to promote even more pinkness
            and positivity throughout the broader crypto ecosystem.
          </p>
          <p>
            After the initial airdrop, PINKdrop will evolve to enable more sustainability for the PINK community. The aim of
            this is to accomplish two things:
          </p>
          <p>
            First, to create a new reason for people to join the PINK community. Within the first month of the game there
            were more than 14k players with very little marketing and push outside of the Polkadot eco.
          </p>
          <p>
            Second, by creating new ways to engage the PINK community with PINKdrop, it will offer existing community members
            ongoing reasons to continue to benefit from and spread PINK vibes. This gives scope to create a variety of game
            formats where players will pay to compete to earn prizes.
          </p>
          <p>
            The future development of simple to play games could also allow more ways to grow the PINK community.
          </p>
        </PaperSection>

        {/* ✅ Final Thoughts */}
        <PaperSection id="final-thoughts" title="Final Thoughts">
          <p>
            What started as a way to try and bring some $PINKness back to Polkadot has fast become a thriving community
            full of enthusiasts, dreamers, and builders.
          </p>
          <p>
            As a community, we all have the chance to try and deliver a healthy dose of meme culture to Polkadot, which
            we think we can admit takes itself too seriously sometimes (sorry GAV!)
          </p>
          <p>
            We look forward to you joining us on this journey! Who knows where it will end, but if we shoot for the moon
            hopefully we will land on a star!
          </p>
        </PaperSection>
      </div>
    </section>
  );
});

export default PinkPaper;

export function meta() {
  return [
    { title: "The Pink Paper | Pinkonomic" },
    { name: "description", content: "Read the Pink Paper: the community-driven document outlining the vision, tokenomics, airdrops, and future of $PINK in the Polkadot ecosystem." }
  ];
}
