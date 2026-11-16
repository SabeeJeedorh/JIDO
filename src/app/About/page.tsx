
const values = [
    {
      number: "01",
      title: "Trust & Transparency",
      description:
        "We believe property decisions should be made with clarity, confidence and access to meaningful information.",
    },
    {
      number: "02",
      title: "Simplicity",
      description:
        "Finding the right property should feel straightforward. We make discovering and exploring properties easier.",
    },
    {
      number: "03",
      title: "Opportunity",
      description:
        "Every property represents a possibility. We help people discover opportunities that align with their goals.",
    },
    {
      number: "04",
      title: "Innovation",
      description:
        "We embrace technology to create a more convenient and connected property discovery experience.",
    },
  ];
  
  const features = [
    {
      number: "01",
      title: "Discover Properties",
      description:
        "Explore residential homes, commercial spaces and land in one place.",
    },
    {
      number: "02",
      title: "Compare Your Options",
      description:
        "Evaluate different properties side by side and make informed decisions.",
    },
    {
      number: "03",
      title: "Save Your Favourites",
      description:
        "Create an account to save properties you love and revisit them anytime.",
    },
    {
      number: "04",
      title: "Connect With Confidence",
      description:
        "Registered users can submit enquiries and request property inspections.",
    },
  ];
  
  export default function AboutPage() {
    return (
      <main className="min-h-screen bg-[#FAF9F6] text-[#353A3D]">
  
        {/* HERO */}
        <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
  
            <p className="text-[#A58D70] uppercase tracking-[0.3em] text-xs mb-6">
              About JIDO
            </p>
  
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
                  More than just
                  <span className="block italic text-[#A58D70]">
                    real estate.
                  </span>
                </h1>
  
                <p className="mt-7 text-[#777774] leading-8 text-base md:text-lg max-w-lg">
                  Every property tells a story. Every location holds an
                  opportunity. At JIDO, we make it easier to discover
                  spaces where possibilities become reality.
                </p>
  
                <a
                  href="/properties"
                  className="inline-flex mt-9 items-center gap-4 bg-[#353A3D] text-white px-8 py-4 text-sm tracking-wide hover:bg-[#A58D70] transition-colors duration-300"
                >
                  Explore Properties
                  <span>↗</span>
                </a>
              </div>
  
              <div
                className="h-[390px] md:h-[500px] relative overflow-hidden group"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs tracking-[0.25em] uppercase">
                    Spaces. Places. Possibilities.
                  </p>
                </div>
              </div>
            </div>
  
          </div>
        </section>
  
        {/* OUR STORY */}
        <section className="bg-[#E7E6E2]/60 py-20 md:py-28 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
  
            <div
              className="h-[350px] md:h-[470px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200)",
              }}
            />
  
            <div className="max-w-xl">
              <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-5">
                Our Story
              </p>
  
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                A better way to find your place in the world.
              </h2>
  
              <div className="w-14 h-[2px] bg-[#A58D70] my-8" />
  
              <p className="text-[#777774] leading-8 mb-5">
                JIDO is a property discovery platform built around the
                idea that finding the right space should be a better
                experience.
              </p>
  
              <p className="text-[#777774] leading-8">
                Whether you are searching for a home, considering an
                investment, looking for commercial space or exploring
                land opportunities, JIDO brings property options
                together in one accessible experience.
              </p>
            </div>
  
          </div>
        </section>
  
        {/* OUR PURPOSE */}
        <section className="py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-6">
              Our Purpose
            </p>
  
            <h2 className="font-serif text-4xl md:text-6xl leading-tight">
              Helping you find more than a property.
              <span className="block italic text-[#A58D70] mt-2">
                Helping you find possibility.
              </span>
            </h2>
  
            <p className="max-w-2xl mx-auto text-[#777774] leading-8 mt-8">
              Our purpose is to simplify property discovery by bringing
              useful tools, property information and opportunities
              together, so people can explore their options with greater
              confidence.
            </p>
          </div>
        </section>
  
        {/* WHAT MAKES JIDO DIFFERENT */}
        <section className="bg-[#353A3D] text-[#FAF9F6] py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
  
            <div className="max-w-2xl mb-16">
              <p className="text-[#C0A98A] uppercase tracking-[0.25em] text-xs mb-5">
                The JIDO Difference
              </p>
  
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Property discovery,
                <span className="italic text-[#C0A98A]"> reimagined.</span>
              </h2>
  
              <p className="text-white/60 leading-7 mt-6">
                More than browsing listings, JIDO gives you practical
                ways to explore, organise and evaluate your property
                choices.
              </p>
            </div>
  
            <div className="grid md:grid-cols-2 gap-x-16">
              {features.map((feature) => (
                <div
                  key={feature.number}
                  className="border-t border-white/20 py-9 group"
                >
                  <p className="text-[#C0A98A] text-xs tracking-widest mb-5">
                    {feature.number}
                  </p>
  
                  <h3 className="font-serif text-2xl md:text-3xl mb-4 group-hover:text-[#C0A98A] transition-colors duration-300">
                    {feature.title}
                  </h3>
  
                  <p className="text-white/55 leading-7 max-w-md">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
  
          </div>
        </section>
  
        {/* OUR VALUES */}
        <section className="py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
  
            <div className="mb-14">
              <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-5">
                What We Believe
              </p>
  
              <h2 className="font-serif text-4xl md:text-5xl">
                The values behind JIDO.
              </h2>
            </div>
  
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div
                  key={value.number}
                  className="border-t border-[#A58D70]/50 pt-7 hover:-translate-y-2 transition-transform duration-500"
                >
                  <span className="text-[#A58D70] text-sm">
                    {value.number}
                  </span>
  
                  <h3 className="font-serif text-2xl mt-7 mb-4">
                    {value.title}
                  </h3>
  
                  <p className="text-[#858581] text-sm leading-7">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
  
          </div>
        </section>
  
        {/* CURRENCY FEATURE */}
        <section className="bg-[#E7E6E2]/60 py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
  
            <div>
              <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-5">
                Designed Around You
              </p>
  
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Your property search.
                <span className="block italic text-[#A58D70]">
                  Your perspective.
                </span>
              </h2>
  
              <p className="text-[#777774] leading-8 mt-7 max-w-lg">
                Property decisions involve details that matter. JIDO
                lets you switch between Nigerian Naira and US Dollars
                when viewing property prices, giving you flexibility
                in how you explore listings.
              </p>
            </div>
  
            <div className="bg-[#FAF9F6] p-8 md:p-12 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-[#A58D70] mb-8">
                A flexible experience
              </p>
  
              <div className="flex justify-between items-center border-b border-[#E7E6E2] pb-6">
                <span className="text-sm text-[#777774]">Currency</span>
                <span className="text-sm font-medium">NGN / USD</span>
              </div>
  
              <div className="flex justify-between items-center py-6">
                <span className="text-sm text-[#777774]">Property categories</span>
                <span className="text-sm font-medium">Explore all</span>
              </div>
  
              <div className="flex justify-between items-center border-t border-[#E7E6E2] pt-6">
                <span className="text-sm text-[#777774]">Your saved properties</span>
                <span className="text-sm font-medium">Your collection</span>
              </div>
            </div>
  
          </div>
        </section>
  
        {/* FINAL CTA */}
        <section className="py-28 px-6 text-center">
          <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-6">
            Your Next Chapter Starts Here
          </p>
  
          <h2 className="font-serif text-4xl md:text-6xl max-w-3xl mx-auto leading-tight">
            Somewhere out there,
            <span className="italic text-[#A58D70]"> is your place.</span>
          </h2>
  
          <p className="text-[#858581] mt-7 max-w-xl mx-auto leading-7">
            Discover properties, explore opportunities and take
            the next step with JIDO.
          </p>
  
          <a
            href="/properties"
            className="inline-flex mt-9 px-9 py-4 bg-[#353A3D] text-white text-sm hover:bg-[#A58D70] transition-colors duration-300"
          >
            Find Your Property <span className="ml-4">↗</span>
          </a>
        </section>
  
      </main>
    );
  }
  