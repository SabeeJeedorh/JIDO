
const contactOptions = [
    {
      number: "01",
      title: "General Enquiries",
      description:
        "Have a question about JIDO? We'd be happy to hear from you.",
      action: "Send an enquiry",
    },
    {
      number: "02",
      title: "Property Enquiries",
      description:
        "Interested in a property or need help with your property search?",
      action: "Explore properties",
    },
    {
      number: "03",
      title: "Partnerships",
      description:
        "Interested in working with JIDO? Let's explore opportunities together.",
      action: "Get in touch",
    },
  ];
  
  export default function ContactPage() {
    return (
      <main className="min-h-screen bg-[#FAF9F6] text-[#353A3D]">
  
        {/* HERO */}
        <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-16">
          <div className="max-w-7xl mx-auto">
  
            <p className="text-[#A58D70] uppercase tracking-[0.3em] text-xs mb-6">
              Contact JIDO
            </p>
  
            <div className="grid lg:grid-cols-2 gap-12 items-center">
  
              <div className="max-w-xl">
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
                  Let's start a
                  <span className="block italic text-[#A58D70]">
                    conversation.
                  </span>
                </h1>
  
                <p className="mt-7 text-[#777774] leading-8 text-base md:text-lg max-w-lg">
                  Whether you're looking for your next property,
                  have a question about our platform or want to
                  explore a partnership, we're here to listen.
                </p>
  
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-[#A58D70]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-[#777774]">
                    We'd love to hear from you
                  </span>
                </div>
              </div>
  
              <div
                className="h-[350px] md:h-[460px] bg-cover bg-center relative"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1400)",
                }}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-7 left-7 text-white">
                  <p className="text-xs tracking-[0.25em] uppercase">
                    Your journey begins here.
                  </p>
                </div>
              </div>
  
            </div>
          </div>
        </section>
  
        {/* CONTACT OPTIONS */}
        <section className="bg-[#E7E6E2]/60 py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
  
            <div className="max-w-2xl mb-14">
              <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-5">
                How Can We Help?
              </p>
  
              <h2 className="font-serif text-4xl md:text-5xl">
                We're here for what matters.
              </h2>
            </div>
  
            <div className="grid md:grid-cols-3 gap-8">
              {contactOptions.map((option) => (
                <div
                  key={option.number}
                  className="bg-[#FAF9F6] p-8 md:p-10 group hover:-translate-y-2 transition-transform duration-500"
                >
                  <span className="text-xs text-[#A58D70] tracking-widest">
                    {option.number}
                  </span>
  
                  <h3 className="font-serif text-2xl mt-9 mb-4">
                    {option.title}
                  </h3>
  
                  <p className="text-sm text-[#858581] leading-7 min-h-[84px]">
                    {option.description}
                  </p>
  
                  <a
                    href="#contact-form"
                    className="inline-flex items-center gap-3 mt-8 text-sm border-b border-[#A58D70] pb-2 group-hover:text-[#A58D70] transition-colors"
                  >
                    {option.action}
                    <span>↗</span>
                  </a>
                </div>
              ))}
            </div>
  
          </div>
        </section>
  
        {/* CONTACT FORM */}
        <section
          id="contact-form"
          className="py-24 px-6 md:px-12 lg:px-20"
        >
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
  
            {/* LEFT INFORMATION */}
            <div className="max-w-lg">
              <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-5">
                Get In Touch
              </p>
  
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Tell us what you're looking for.
              </h2>
  
              <p className="text-[#858581] leading-8 mt-7">
                Have a question, feedback or a property enquiry?
                Complete the form and share a few details about
                how we can help.
              </p>
  
              <div className="mt-12 space-y-8">
  
                <div className="flex gap-5 items-start">
                  <div className="w-11 h-11 shrink-0 border border-[#A58D70]/40 flex items-center justify-center text-[#A58D70]">
                    ↗
                  </div>
                  <div>
                    <h3 className="font-serif text-xl">General Support</h3>
                    <p className="text-sm text-[#858581] mt-2 leading-6">
                      Questions about using the JIDO platform?
                      Send us an enquiry.
                    </p>
                  </div>
                </div>
  
                <div className="flex gap-5 items-start">
                  <div className="w-11 h-11 shrink-0 border border-[#A58D70]/40 flex items-center justify-center text-[#A58D70]">
                    ◇
                  </div>
                  <div>
                    <h3 className="font-serif text-xl">Property Assistance</h3>
                    <p className="text-sm text-[#858581] mt-2 leading-6">
                      Need help finding or enquiring about a property?
                      We're ready to help.
                    </p>
                  </div>
                </div>
  
                <div className="flex gap-5 items-start">
                  <div className="w-11 h-11 shrink-0 border border-[#A58D70]/40 flex items-center justify-center text-[#A58D70]">
                    +
                  </div>
                  <div>
                    <h3 className="font-serif text-xl">Partnership Opportunities</h3>
                    <p className="text-sm text-[#858581] mt-2 leading-6">
                      Let's discuss how we can work together.
                    </p>
                  </div>
                </div>
  
              </div>
            </div>
  
            {/* FORM */}
            <div className="bg-white p-7 md:p-12 shadow-sm">
              <h3 className="font-serif text-3xl mb-3">
                Send us a message
              </h3>
  
              <p className="text-sm text-[#858581] mb-9">
                Fill in the details below.
              </p>
  
              <form action="/api/contact" method="POST" className="space-y-7">
  
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-xs mb-3 tracking-wide">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder="Your first name"
                      className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-4 text-sm outline-none focus:border-[#A58D70] transition-colors"
                    />
                  </div>
  
                  <div>
                    <label htmlFor="lastName" className="block text-xs mb-3 tracking-wide">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Your last name"
                      className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-4 text-sm outline-none focus:border-[#A58D70] transition-colors"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="email" className="block text-xs mb-3 tracking-wide">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-4 text-sm outline-none focus:border-[#A58D70] transition-colors"
                  />
                </div>
  
                <div>
                  <label htmlFor="phone" className="block text-xs mb-3 tracking-wide">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+234"
                    className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-4 text-sm outline-none focus:border-[#A58D70] transition-colors"
                  />
                </div>
  
                <div>
                  <label htmlFor="subject" className="block text-xs mb-3 tracking-wide">
                    What is your enquiry about? *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-4 text-sm outline-none focus:border-[#A58D70] transition-colors"
                  >
                    <option value="" disabled>Select an enquiry type</option>
                    <option value="general">General Enquiry</option>
                    <option value="property">Property Enquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
  
                <div>
                  <label htmlFor="message" className="block text-xs mb-3 tracking-wide">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-4 text-sm outline-none focus:border-[#A58D70] transition-colors"
                  />
                </div>
  
                <button
                  type="submit"
                  className="w-full bg-[#353A3D] text-white py-5 text-sm tracking-wide hover:bg-[#A58D70] transition-colors duration-300 flex justify-center items-center gap-4"
                >
                  Send Message
                  <span>↗</span>
                </button>
  
                <p className="text-xs text-[#999] text-center">
                  Fields marked with * are required.
                </p>
  
              </form>
            </div>
  
          </div>
        </section>
  
        {/* LOCATION / BRAND SECTION */}
        <section className="bg-[#353A3D] text-[#FAF9F6] py-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
  
            <div>
              <p className="text-[#C0A98A] uppercase tracking-[0.25em] text-xs mb-6">
                Let's Connect
              </p>
  
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Good things begin with a conversation.
              </h2>
  
              <p className="text-white/55 leading-8 mt-7 max-w-lg">
                At JIDO, we believe every great property journey
                begins with the right connection. Reach out and
                let's take the next step together.
              </p>
  
              <a
                href="#contact-form"
                className="inline-flex items-center gap-4 mt-9 border border-[#C0A98A] text-[#C0A98A] px-8 py-4 text-sm hover:bg-[#C0A98A] hover:text-[#353A3D] transition-all duration-300"
              >
                Contact Our Team
                <span>↗</span>
              </a>
            </div>
  
            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200)",
                }}
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>
  
          </div>
        </section>
  
        {/* BOTTOM CTA */}
        <section className="py-20 px-6 text-center">
          <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-5">
            Explore With JIDO
          </p>
  
          <h2 className="font-serif text-4xl md:text-5xl max-w-2xl mx-auto leading-tight">
            Still looking for the right place?
          </h2>
  
          <p className="text-[#858581] mt-6 leading-7">
            Your next property opportunity could be closer than you think.
          </p>
  
          <a
            href="/properties"
            className="inline-flex mt-9 bg-[#353A3D] text-white px-9 py-4 text-sm hover:bg-[#A58D70] transition-colors"
          >
            Browse Properties <span className="ml-4">↗</span>
          </a>
        </section>
  
      </main>
    );
  }
  