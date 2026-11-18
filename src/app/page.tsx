
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { clearSession, readSession, type Session } from "@/lib/account";

const properties = [
  {
    id: 1,
    name: "The Modern Villa",
    location: "Maitama, Abuja",
    type: "For Sale",
    priceNaira: "₦450,000,000",
    priceDollar: "$300,000",
    beds: 5,
    baths: 4,
    area: "420 m²",
    city: "Abuja",
    category: "Residential",
    featured: true,
    priceValue: 450000000,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    video:
      "https://videos.pexels.com/video-files/3773488/3773488-hd_1920_1080_30fps.mp4",
  },
  {
    id: 2,
    name: "Luxury Residence",
    location: "Lekki Phase 1, Lagos",
    type: "For Sale",
    priceNaira: "₦280,000,000",
    priceDollar: "$186,000",
    beds: 3,
    baths: 3,
    area: "250 m²",
    city: "Lagos",
    category: "Apartment",
    featured: true,
    priceValue: 280000000,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000",
    video:
      "https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4",
  },
  {
    id: 3,
    name: "The Family Home",
    location: "Gwarinpa, Abuja",
    type: "For Sale",
    priceNaira: "₦180,000,000",
    priceDollar: "$120,000",
    beds: 4,
    baths: 3,
    area: "320 m²",
    city: "Abuja",
    category: "Residential",
    featured: true,
    priceValue: 180000000,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000",
    video:
      "https://videos.pexels.com/video-files/3141208/3141208-hd_1920_1080_25fps.mp4",
  },
  {
    id: 4,
    name: "Victoria Court",
    location: "Ikoyi, Lagos",
    type: "For Sale",
    priceNaira: "₦620,000,000",
    priceDollar: "$413,000",
    beds: 6,
    baths: 5,
    area: "510 m²",
    city: "Lagos",
    category: "Residential",
    featured: false,
    priceValue: 620000000,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000",
    video:
      "https://videos.pexels.com/video-files/3773488/3773488-hd_1920_1080_30fps.mp4",
  },
  {
    id: 5,
    name: "The Maitama Apartment",
    location: "Maitama, Abuja",
    type: "For Sale",
    priceNaira: "₦210,000,000",
    priceDollar: "$140,000",
    beds: 3,
    baths: 2,
    area: "180 m²",
    city: "Abuja",
    category: "Apartment",
    featured: false,
    priceValue: 210000000,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
    video:
      "https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4",
  },
  {
    id: 6,
    name: "The Harbour Suite",
    location: "Old GRA, Port Harcourt",
    type: "For Sale",
    priceNaira: "₦95,000,000",
    priceDollar: "$63,000",
    beds: 0,
    baths: 2,
    area: "480 m²",
    city: "Port Harcourt",
    category: "Commercial",
    featured: false,
    priceValue: 95000000,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000",
    video:
      "https://videos.pexels.com/video-files/7578541/7578541-hd_1920_1080_30fps.mp4",
  },
  {
    id: 7,
    name: "The Savannah Plot",
    location: "Nassarawa, Kano",
    type: "For Sale",
    priceNaira: "₦42,000,000",
    priceDollar: "$28,000",
    beds: 0,
    baths: 0,
    area: "1,200 m²",
    city: "Kano",
    category: "Land",
    featured: false,
    priceValue: 42000000,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    video:
      "https://videos.pexels.com/video-files/2098989/2098989-hd_1920_1080_30fps.mp4",
  },
];

const NAIRA_PER_DOLLAR = 1500;

function formatMoney(naira: number, currency: "NGN" | "USD") {
  if (currency === "USD") {
    return `$${Math.round(naira / NAIRA_PER_DOLLAR).toLocaleString("en-US")}`;
  }
  return `₦${naira.toLocaleString("en-NG")}`;
}

const priceOptions = [
  { value: "Any price", min: 0, max: Infinity },
  { value: "Below 5 Million", min: 0, max: 5_000_000 },
  { value: "Below 10 Million", min: 0, max: 10_000_000 },
  { value: "Below 20 Million", min: 0, max: 20_000_000 },
  { value: "Below 30 Million", min: 0, max: 30_000_000 },
  { value: "Below 50 Million", min: 0, max: 50_000_000 },
  { value: "50M - 100M", min: 50_000_000, max: 100_000_000 },
  { value: "100M - 300M", min: 100_000_000, max: 300_000_000 },
  { value: "300M+", min: 300_000_000, max: Infinity },
];

function priceOptionLabel(value: string, currency: "NGN" | "USD") {
  const option = priceOptions.find((item) => item.value === value);
  if (!option || option.value === "Any price" || currency === "NGN") return value;
  if (option.max === Infinity) return `${formatMoney(option.min, "USD")}+`;
  if (option.min === 0) return `Below ${formatMoney(option.max, "USD")}`;
  return `${formatMoney(option.min, "USD")} – ${formatMoney(option.max, "USD")}`;
}

type SearchFilters = {
  query: string;
  propertyType: string;
  price: string;
};

function matchesFilters(
  property: (typeof properties)[number],
  filters: SearchFilters,
) {
  const text = filters.query.trim().toLowerCase();
  const textMatches =
    !text ||
    [property.name, property.location, property.city, property.category]
      .join(" ")
      .toLowerCase()
      .includes(text);
  const typeMatches =
    filters.propertyType === "Any type" ||
    property.category === filters.propertyType;
  const band = priceOptions.find((item) => item.value === filters.price);
  const priceMatches =
    !band ||
    band.value === "Any price" ||
    (property.priceValue >= band.min &&
      (band.max === Infinity
        ? property.priceValue > band.min
        : property.priceValue < band.max ||
          (band.min > 0 && property.priceValue <= band.max)));

  return textMatches && typeMatches && priceMatches;
}

function PropertyCard({
  property,
  currency,
}: {
  property: (typeof properties)[number];
  currency: "NGN" | "USD";
}) {
  return (
    <article className="property-card group overflow-hidden rounded-[24px] border border-[#E7D3B0]/70 bg-white shadow-[0_14px_40px_rgba(23,28,26,0.06)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(23,28,26,0.12)]">
      <div className="relative h-[260px] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute left-5 top-5 rounded-full bg-[#FAF9F6] px-4 py-2 text-[10px] font-semibold">
          {property.category}
        </span>
      </div>
      <div className="p-6">
        <p className="text-[11px] tracking-wide text-[#A58D70]">{property.location}</p>
        <h3 className="mt-2 font-serif text-2xl">{property.name}</h3>
        <div className="mt-5 flex flex-wrap gap-4 border-b border-[#353A3D]/10 pb-5 text-[11px] text-[#77736E]">
          {property.beds > 0 && <span>{property.beds} Beds</span>}
          {property.baths > 0 && <span>{property.baths} Baths</span>}
          <span>{property.area}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm font-semibold">
            {formatMoney(property.priceValue, currency)}
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#A58D70]">
            {property.type}
          </p>
        </div>
      </div>
    </article>
  );
}

const categories = [
  {
    name: "Residential",
    description: "Find a place to call home.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900",
    href: "/properties?type=residential",
  },
  {
    name: "Apartments",
    description: "Modern living, thoughtfully designed.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
    href: "/properties?type=apartment",
  },
  {
    name: "Commercial",
    description: "Spaces for your next big move.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900",
    href: "/properties?type=commercial",
  },
  {
    name: "Land",
    description: "Invest in possibilities.",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900",
    href: "/properties?type=land",
  },
];

function CurrencySwitch({
  currency,
  onChange,
}: {
  currency: "NGN" | "USD";
  onChange: (next: "NGN" | "USD") => void;
}) {
  return (
    <div className="flex rounded-full border border-[#E7D3B0] bg-white p-0.5">
      {(["NGN", "USD"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
            currency === item
              ? "bg-[#353A3D] text-white"
              : "text-[#858581] hover:text-[#353A3D]"
          }`}
        >
          {item === "NGN" ? "₦ NGN" : "$ USD"}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [account, setAccount] = useState<Session | null>(null);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [query, setQuery] = useState("");
  const [propertyType, setPropertyType] = useState("Any type");
  const [price, setPrice] = useState("Any price");
  const [searchQuery, setSearchQuery] = useState<SearchFilters | null>(null);
  const [tourOpen, setTourOpen] = useState(false);
  const [activeTourId, setActiveTourId] = useState<number | null>(null);
  const [tourPlaying, setTourPlaying] = useState(false);
  const tourVideoRef = useRef<HTMLVideoElement>(null);
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setAccount(readSession());
  }, []);

  function askSignOut() {
    setMenuOpen(false);
    setConfirmSignOut(true);
  }

  function signOut() {
    clearSession();
    setAccount(null);
    setMenuOpen(false);
    setConfirmSignOut(false);
  }

  const liveFilters = { query, propertyType, price };
  const tours = properties.filter((property) =>
    matchesFilters(property, liveFilters),
  );
  const searchResults = searchQuery
    ? properties.filter((property) => matchesFilters(property, searchQuery))
    : [];

  function runSearch(event: FormEvent) {
    event.preventDefault();
    const nextQuery = { query, propertyType, price };
    setSearchQuery(nextQuery);
    window.setTimeout(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : "smooth";
      resultsRef.current?.scrollIntoView({ behavior, block: "start" });
    }, 40);
  }

  function clearSearch() {
    setQuery("");
    setPropertyType("Any type");
    setPrice("Any price");
    setSearchQuery(null);
  }

  function showAllProperties() {
    setQuery("");
    setPropertyType("Any type");
    setPrice("Any price");
    setSearchQuery({
      query: "",
      propertyType: "Any type",
      price: "Any price",
    });
    window.setTimeout(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : "smooth";
      resultsRef.current?.scrollIntoView({ behavior, block: "start" });
    }, 40);
  }

  const firstName = account?.name.trim().split(/\s+/)[0];
  const activeTour =
    tours.find((property) => property.id === activeTourId) ?? tours[0];

  function openTour() {
    setActiveTourId(tours[0]?.id ?? null);
    setTourPlaying(false);
    setTourOpen(true);
  }

  function closeTour() {
    tourVideoRef.current?.pause();
    setTourPlaying(false);
    setTourOpen(false);
  }

  useEffect(() => {
    if (!tourOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeTour();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [tourOpen]);

  useEffect(() => {
    if (!confirmSignOut) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setConfirmSignOut(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [confirmSignOut]);

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#353A3D]">

      {/* NAVIGATION */}
      <header className="absolute top-0 left-0 z-50 w-full">
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-5 sm:h-20 sm:gap-6 sm:px-6 lg:px-12">

          <Link href="/" className="flex h-full min-w-0 items-center py-2.5">
            <img
              src="/images/jido-nav.png"
              alt="JIDO"
              className="h-auto max-h-full w-auto max-w-[calc(100vw-16.75rem)] object-contain object-left sm:h-full sm:max-w-[calc(100vw-22rem)] md:max-w-none"
            />
          </Link>

          <div className="hidden items-center gap-9 text-[18px] font-bolder text-[#353A3D] md:flex">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/Properties" className="nav-link">Properties</Link>
            <Link href="/About" className="nav-link">About</Link>
            <Link href="/Contact" className="nav-link">Contact</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative flex h-10 w-[6.25rem] shrink-0 items-center justify-center sm:h-12 sm:w-[7rem]">
              {firstName ? (
                <>
                  <button
                    type="button"
                    onClick={askSignOut}
                    className="w-full whitespace-nowrap rounded-full border border-[#A58D70] bg-white px-3.5 py-2.5 text-[11px] font-semibold text-[#353A3D] shadow-[0_8px_20px_rgba(23,28,26,0.12)] transition duration-300 hover:bg-[#A58D70] hover:text-white sm:px-5 sm:py-3 sm:text-xs md:hidden"
                  >
                    Sign out
                  </button>
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col items-end md:flex">
                    <p className="whitespace-nowrap font-serif text-xl font-bold leading-none text-white drop-shadow-[0_1px_2px_rgba(23,28,26,0.45)] lg:text-2xl">
                      Hey, {firstName}
                    </p>
                    <button
                      type="button"
                      onClick={askSignOut}
                      className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 underline-offset-4 transition hover:text-white hover:underline"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/Auth/login"
                  className="w-full whitespace-nowrap rounded-full border border-[#A58D70] bg-white px-3.5 py-2.5 text-center text-[11px] font-semibold text-[#353A3D] shadow-[0_8px_20px_rgba(23,28,26,0.12)] transition duration-300 hover:bg-[#A58D70] hover:text-white sm:px-5 sm:py-3 sm:text-xs"
                >
                  Sign in
                </Link>
              )}
            </div>

            <Link
              href="/Properties"
              className="shrink-0 whitespace-nowrap rounded-full bg-[#353A3D] px-3.5 py-2.5 text-[11px] font-medium text-white transition duration-300 hover:bg-[#A58D70] sm:px-5 sm:py-3 sm:text-xs"
            >
              <span className="sm:hidden">Explore ↗</span>
              <span className="hidden sm:inline">Explore Properties ↗</span>
            </Link>

            <button
              type="button"
              className={`menu-toggle flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white/90 md:hidden ${
                menuOpen
                  ? "border-[#A58D70] text-[#A58D70]"
                  : "border-[#353A3D]/20 text-[#353A3D]"
              }`}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {firstName && (
          <p className="truncate px-5 pb-1 text-right font-serif text-lg font-bold leading-none text-white drop-shadow-[0_1px_2px_rgba(23,28,26,0.45)] sm:px-6 md:hidden">
            Hey, {firstName}
          </p>
        )}

        {menuOpen && (
          <div className="mobile-nav flex flex-col items-start px-6 py-5 md:hidden">
            {[
              { href: "/", label: "Home" },
              { href: "/Properties", label: "Properties" },
              { href: "/About", label: "About" },
              { href: "/Contact", label: "Contact" },
              ...(account ? [] : [{ href: "/Auth/login", label: "Sign in" }]),
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="nav-link text-[18px]"
              >
                {item.label}
              </Link>
            ))}
            {account && (
              <button
                type="button"
                onClick={askSignOut}
                className="nav-link text-left text-[18px]"
              >
                Sign out
              </button>
            )}
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="hero-section relative z-20">
        <div className="relative flex min-h-[540px] items-center sm:min-h-[640px] lg:min-h-[790px]">

        <div className="hero-image absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2200"
            alt="Luxury modern architecture"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#171C1A]/75 via-[#171C1A]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171C1A]/30 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-28 sm:pt-36 lg:px-16 lg:pb-24">

          <div className="max-w-[720px] text-white">

            <h1 className="hero-content mt-6 font-serif text-4xl leading-[1.08] tracking-tight sm:mt-8 sm:text-6xl md:text-7xl lg:text-[88px]">
              Find Your Place.
              <br />
              <span className="italic text-[#D7C4A7]">
                Build Your Future.
              </span>
            </h1>

            <p className="hero-content mt-7 max-w-md text-sm leading-7 text-white/85 md:text-base">
              Discover exceptional properties, explore prime locations
              and find a space that feels like yours.
            </p>

            <div className="hero-content mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="mailto:sabbeajeedorh@gmail.com"
                className="rounded-full bg-white px-7 py-4 text-xs font-semibold text-[#353A3D] transition duration-300 hover:bg-[#C5A77D] hover:text-white"
              >
                Book a Viewing 
              </Link>

              <button
                type="button"
                onClick={openTour}
                className="group inline-flex items-center gap-3.5 rounded-full border border-white/30 bg-white/10 py-2 pl-2 pr-6 text-xs font-medium tracking-wide text-white backdrop-blur-md transition duration-300 hover:border-[#E7D3B0] hover:bg-white/20"
              >
                <span className="tour-play flex h-10 w-10 items-center justify-center rounded-full bg-[#E7D3B0] text-[#353A3D] transition duration-300 group-hover:bg-white">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true">
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.23-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
                  </svg>
                </span>
                Watch Tour
              </button>
            </div>
          </div>
        </div>
        </div>

        {/* SEARCH PANEL */}
        <div className="relative z-30 mx-auto -mt-8 w-full max-w-[1150px] px-4 sm:px-6 lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:w-[92%] lg:-translate-x-1/2 lg:translate-y-1/2 lg:px-0">
          <form
            onSubmit={runSearch}
            className="overflow-hidden rounded-[22px] border border-white bg-[#FBF8F3] shadow-[0_28px_70px_rgba(23,28,26,0.16)] lg:rounded-[28px]"
          >
            <div className="border-b border-[#E7D3B0]/80 px-4 py-3 sm:px-6 sm:py-5">
              <label htmlFor="search-query" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A58D70] sm:mb-2">
                Search
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="search-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a name, neighbourhood, or city"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent font-serif text-base text-[#353A3D] outline-none placeholder:text-[#353A3D]/35 sm:text-xl"
                />
                <button
                  type="submit"
                  aria-label="Search properties"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#353A3D] text-white transition duration-300 hover:bg-[#A58D70] sm:h-11 sm:w-11"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="M16 16.5 20 20.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 items-stretch">
              <div className="border-r border-[#E7D3B0]/80 px-4 py-3 sm:px-6 sm:py-5">
                <label htmlFor="search-type" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A58D70] sm:mb-2 sm:tracking-[0.22em]">
                  Property Type
                </label>
                <select
                  id="search-type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="search-select w-full bg-transparent font-serif text-sm text-[#353A3D] sm:text-xl"
                >
                  <option>Any type</option>
                  <option>Rent</option>
                  <option>Residential</option>
                  <option>Apartment</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
              </div>

              <div className="px-4 py-3 sm:px-6 sm:py-5">
                <label htmlFor="search-price" className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A58D70] sm:mb-2 sm:tracking-[0.22em]">
                  Price Range
                </label>
                <select
                  id="search-price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="search-select w-full bg-transparent font-serif text-sm text-[#353A3D] sm:text-xl"
                >
                  {priceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {priceOptionLabel(option.value, currency)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </section>

      {searchQuery && (
        <section
          id="search-results"
          ref={resultsRef}
          className="scroll-mt-6 bg-[#F0EFEB] px-6 pb-20 pt-12 sm:pt-16 lg:px-12 lg:pb-24 lg:pt-44"
        >
          <div className="mx-auto max-w-[1300px] border-t border-[#A58D70]/35 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#A58D70]">
                  Your Search
                </span>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                  {searchResults.length === 0
                    ? "No matches"
                    : `${searchResults.length} ${searchResults.length === 1 ? "property" : "properties"}`}
                  <span className="italic text-[#A58D70]"> found.</span>
                </h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    searchQuery.query.trim(),
                    searchQuery.propertyType,
                    priceOptionLabel(searchQuery.price, currency),
                  ]
                    .filter((label) => label.length > 0)
                    .map((label, index) => (
                    <span
                      key={`${label}-${index}`}
                      className="rounded-full border border-[#A58D70]/40 bg-white px-4 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#8C7355]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={clearSearch}
                className="border-b border-[#353A3D] pb-2 text-xs font-medium transition hover:border-[#A58D70] hover:text-[#A58D70]"
              >
                Clear search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    currency={currency}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-[28px] border border-[#E7D3B0]/80 bg-white px-8 py-16 text-center shadow-[0_14px_40px_rgba(23,28,26,0.05)]">
                <p className="font-serif text-3xl">Nothing in this collection yet.</p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#77736E]">
                  Try another city, a wider price range, or a different property type.
                </p>
                <button
                  type="button"
                  onClick={showAllProperties}
                  className="mt-8 rounded-full bg-[#353A3D] px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-[#A58D70]"
                >
                  View all properties →
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ABOUT SECTION */}
      <section className={`mx-auto grid max-w-[1300px] items-center gap-14 px-6 pb-24 md:grid-cols-2 lg:px-12 ${searchQuery ? "pt-16" : "pt-14 sm:pt-16 lg:pt-44"}`}>

        <div className="about-image relative">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"
            alt="Elegant modern home interior"
            className="h-[390px] w-full rounded-[35px] object-cover md:h-[470px]"
          />
          <div className="absolute -bottom-5 -right-4 hidden rounded-2xl bg-white p-6 shadow-xl md:block">
            <p className="font-serif text-3xl text-[#A58D70]">JIDO</p>
            <p className="mt-1 text-[10px] tracking-widest text-[#777]">
              PROPERTY & REAL ESTATE
            </p>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#A58D70]">
            GET TO KNOW US
          </span>

          <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
            More Than Just
            <br />
            <span className="italic text-[#A58D70]">Real Estate.</span>
          </h2>

          <p className="mt-7 text-sm leading-8 text-[#77736E]">
            At JIDO, we believe finding the right property is about more
            than just four walls. It is about discovering opportunities,
            creating possibilities and finding a place where your future
            can flourish.
          </p>

          <p className="mt-4 text-sm leading-8 text-[#77736E]">
            Whether you are looking for your dream home, an investment
            opportunity or the perfect commercial space, we make your
            property journey simpler.
          </p>

          <Link
            href="/About"
            className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#353A3D] px-7 py-4 text-xs text-white transition hover:bg-[#A58D70]"
          >
            More About JIDO →
          </Link>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="bg-[#F0EFEB] py-24">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-12">

          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#A58D70]">
                A SELECTION OF EXCEPTIONAL SPACES
              </span>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">
                Featured <span className="italic text-[#A58D70]">Properties.</span>
              </h2>
              <p className="mt-3 text-sm text-[#77736E]">
                Explore some of our handpicked property listings.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <CurrencySwitch currency={currency} onChange={setCurrency} />
              <button
                type="button"
                onClick={showAllProperties}
                className="border-b border-[#353A3D] pb-2 text-xs font-medium transition hover:border-[#A58D70] hover:text-[#A58D70]"
              >
                View All Properties ↗
              </button>
            </div>
          </div>

          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {properties
              .filter((property) => property.featured)
              .map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  currency={currency}
                />
              ))}

          </div>
        </div>
      </section>

      {/* PROPERTY CATEGORIES */}
      <section className="mx-auto max-w-[1300px] px-6 py-24 lg:px-12">

        <div className="mb-12 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[3px] text-[#A58D70]">
            EXPLORE YOUR OPTIONS
          </span>

          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Find Your Kind of <span className="italic text-[#A58D70]">Space.</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              href={category.href}
              key={category.name}
              className="category-card group relative h-[330px] overflow-hidden rounded-2xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-0 p-7 text-white">
                <h3 className="font-serif text-3xl">{category.name}</h3>
                <p className="mt-2 text-xs text-white/80">
                  {category.description}
                </p>
                <span className="mt-5 inline-block text-sm transition group-hover:translate-x-2">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY JIDO */}
      <section className="bg-[#353A3D] px-6 py-24 text-white lg:px-12">
        <div className="mx-auto max-w-[1200px]">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[10px] tracking-[3px] text-[#C5A77D]">
              THE JIDO DIFFERENCE
            </span>

            <h2 className="mt-5 font-serif text-4xl md:text-5xl">
              Your Property Journey,
              <br />
              <span className="italic text-[#C5A77D]">Our Commitment.</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-12 text-center md:grid-cols-3">
            {[
              {
                icon: "⌂",
                title: "Carefully Selected",
                desc: "Explore thoughtfully presented property opportunities.",
              },
              {
                icon: "◇",
                title: "Transparent Process",
                desc: "Make informed property decisions with confidence.",
              },
              {
                icon: "↗",
                title: "Dedicated Support",
                desc: "We're here to guide you through your property journey.",
              },
            ].map((item) => (
              <div key={item.title} className="group">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C5A77D]/50 font-serif text-3xl text-[#C5A77D] transition duration-500 group-hover:bg-[#C5A77D] group-hover:text-[#353A3D]">
                  {item.icon}
                </div>
                <h3 className="mt-7 font-serif text-2xl">{item.title}</h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-[1300px] px-6 py-24 lg:px-12">
        <div className="text-center">
          <span className="text-[10px] font-semibold tracking-[3px] text-[#A58D70]">
            CLIENT EXPERIENCES
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Trust Built on <span className="italic text-[#A58D70]">Experience.</span>
          </h2>
          <p className="mt-4 text-sm text-[#77736E]">
            Every property journey tells a story.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-[#353A3D]/10 bg-white p-9 text-center shadow-sm md:p-14">
          <span className="font-serif text-5xl text-[#A58D70]">“</span>
          <p className="font-serif text-2xl leading-relaxed">
            Your experience matters. Discover a better way to explore
            property with JIDO.
          </p>
          <p className="mt-7 text-[10px] tracking-widest text-[#A58D70]">
            THE JIDO EXPERIENCE
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#252D2A] px-6 pb-8 pt-16 text-white lg:px-12">

        <div className="mx-auto grid max-w-[1300px] gap-12 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <img
              src="/images/jido-nav.png"
              alt="JIDO"
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-xs text-xs leading-7 text-white/60">
              Helping you discover spaces, opportunities and places
              to call your own.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#C5A77D]">
              Explore
            </h4>
            <div className="flex flex-col gap-4 text-xs text-white/70">
              <Link href="/properties" className="footer-link">Properties</Link>
              <Link href="/buy" className="footer-link">Buy</Link>
              <Link href="/rent" className="footer-link">Rent</Link>
              <Link href="/land" className="footer-link">Land</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#C5A77D]">
              Company
            </h4>
            <div className="flex flex-col gap-4 text-xs text-white/70">
              <Link href="/About" className="footer-link">About JIDO</Link>
              <Link href="/Contact" className="footer-link">Contact</Link>
              <Link href="/properties" className="footer-link">Find a Property</Link>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#C5A77D]">
              Stay Connected
            </h4>
            <p className="text-xs leading-6 text-white/60">
              Get updates on new properties and opportunities.
            </p>
            <div className="mt-5 flex border-b border-white/30 pb-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent text-xs outline-none placeholder:text-white/40"
              />
              <button aria-label="Subscribe" className="text-[#C5A77D]">
                →
              </button>
            </div>
          </div>

        </div>

        <div className="mx-auto mt-16 flex max-w-[1300px] flex-wrap justify-between gap-4 border-t border-white/15 pt-7 text-[10px] text-white/50">
          <p>© 2026 JIDO. All rights reserved.</p>
          {/* <p>Designed with purpose./ Built for possibilities.</p> */}
        </div>
      </footer>

      {tourOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#171C1A]/80 p-4 backdrop-blur-sm"
          onClick={closeTour}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeTour ? `Tour of ${activeTour.name}` : "Property tours"}
            className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-[#1C221F] text-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 px-6 py-5 sm:px-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#E7D3B0]">
                  Property Tour
                </p>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl">
                  {activeTour ? activeTour.name : "No matching tours"}
                </h2>
                {activeTour && (
                  <p className="mt-1 text-xs text-white/60">
                    {activeTour.location}
                    {" · "}
                    {formatMoney(activeTour.priceValue, currency)}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeTour}
                aria-label="Close tour"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg transition hover:border-[#E7D3B0] hover:text-[#E7D3B0]"
              >
                ×
              </button>
            </div>

            {activeTour ? (
              <div className="relative mx-6 overflow-hidden rounded-2xl bg-black sm:mx-8">
                <video
                  key={activeTour.id}
                  ref={tourVideoRef}
                  className="aspect-video w-full bg-black object-cover"
                  poster={activeTour.image}
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => setTourPlaying(true)}
                  onPause={() => setTourPlaying(false)}
                >
                  <source src={activeTour.video} type="video/mp4" />
                </video>
                {!tourPlaying && (
                  <button
                    type="button"
                    onClick={() => tourVideoRef.current?.play()}
                    className="absolute inset-0 flex items-center justify-center bg-[#171C1A]/25"
                    aria-label={`Play tour of ${activeTour.name}`}
                  >
                    <span className="tour-play flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-[#E7D3B0]/95 text-[#353A3D] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current" aria-hidden="true">
                        <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.23-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
                      </svg>
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <p className="mx-6 mb-2 rounded-2xl border border-white/10 px-6 py-10 text-center text-sm text-white/70 sm:mx-8">
                No video tours match this search. Widen the location, type, or price to see available tours.
              </p>
            )}

            {tours.length > 1 && (
              <div className="flex gap-3 overflow-x-auto px-6 py-5 sm:px-8">
                {tours.map((property) => {
                  const selected = property.id === activeTour?.id;
                  return (
                    <button
                      key={property.id}
                      type="button"
                      onClick={() => {
                        setActiveTourId(property.id);
                        setTourPlaying(false);
                      }}
                      className={`flex min-w-[180px] items-center gap-3 rounded-2xl border px-3 py-2 text-left transition ${
                        selected
                          ? "border-[#E7D3B0] bg-white/10"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7D3B0] text-[#353A3D]">
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3 fill-current" aria-hidden="true">
                          <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.23-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
                        </svg>
                      </span>
                      <span>
                        <span className="block text-xs font-medium">{property.name}</span>
                        <span className="block text-[10px] text-white/55">{property.location}</span>
                      </span>
                    </button>
                  );
                })}
              </div>


            )}
            {tours.length <= 1 && <div className="h-6" />}
          </div>
        </div>
      )}

      {confirmSignOut && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#171C1A]/75 px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sign-out-title"
        >
          <div className="w-full max-w-md border border-[#E7D3B0] bg-[#FAF9F6] px-6 py-8 text-[#353A3D] shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:px-8 sm:py-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A58D70]">
              Account
            </p>
            <h2 id="sign-out-title" className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Do you want to sign out?
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#77736E]">
              You will leave {firstName ? `${firstName}'s` : "your"} JIDO account on this device.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={signOut}
                className="rounded-full bg-[#353A3D] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#A58D70]"
              >
                Sign out
              </button>
              <button
                type="button"
                onClick={() => setConfirmSignOut(false)}
                className="rounded-full border border-[#353A3D] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:border-[#A58D70] hover:text-[#A58D70]"
              >
                Stay signed in
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .hero-section {
          background: #353a3d;
        }

        .hero-image img {
          animation: heroZoom 15s ease-out both;
        }

        .hero-content {
          animation: fadeUp 1s ease both;
        }

        .hero-content:nth-child(2) {
          animation-delay: 0.15s;
        }

        .hero-content:nth-child(3) {
          animation-delay: 0.3s;
        }

        .search-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5 L6 6.5 L11 1.5' fill='none' stroke='%23A58D70' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.1rem center;
          background-size: 12px 8px;
          padding-right: 1.4rem;
          cursor: pointer;
        }

        .search-select:focus {
          outline: none;
        }

        .tour-play {
          box-shadow: 0 0 0 6px rgba(231, 211, 176, 0.22);
          animation: tourPulse 2.4s ease-out infinite;
        }

        .nav-link {
          position: relative;
          display: inline-block;
          padding-bottom: 7px;
          transition: color 0.35s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          border-radius: 999px;
          background: #f3e6d0;
          box-shadow: 0 0 10px rgba(243, 230, 208, 0.85);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-link:hover,
        .nav-link:focus-visible,
        .nav-link:active {
          color: #e7d3b0;
        }

        .nav-link:hover::after,
        .nav-link:focus-visible::after,
        .nav-link:active::after {
          transform: scaleX(1);
        }

        .menu-toggle {
          transition: color 0.35s ease, border-color 0.35s ease, background 0.35s ease, transform 0.35s ease;
        }

        .menu-toggle:hover,
        .menu-toggle:focus-visible {
          border-color: #a58d70;
          color: #a58d70;
          background: #fff;
        }

        .mobile-nav {
          border-top: 1px solid rgba(231, 211, 176, 0.28);
          background: #171c1a;
          box-shadow: 0 24px 50px rgba(23, 28, 26, 0.28);
          animation: menuReveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .mobile-nav .nav-link {
          margin: 0.2rem 0;
          padding-top: 0.65rem;
          padding-bottom: 0.7rem;
          color: rgba(247, 241, 230, 0.72);
          animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .mobile-nav .nav-link:hover,
        .mobile-nav .nav-link:focus-visible,
        .mobile-nav .nav-link:active {
          color: #e7d3b0;
        }

        .mobile-nav .nav-link:nth-child(2) {
          animation-delay: 0.06s;
        }

        .mobile-nav .nav-link:nth-child(3) {
          animation-delay: 0.12s;
        }

        .mobile-nav .nav-link:nth-child(4) {
          animation-delay: 0.18s;
        }

        .mobile-nav .nav-link::after {
          background: #e7d3b0;
          box-shadow: 0 0 12px rgba(231, 211, 176, 0.45);
        }

        .about-image {
          animation: fadeUp 1s ease both;
        }

        .property-card,
        .category-card {
          will-change: transform;
        }

        .footer-link {
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #c5a77d;
        }

        @keyframes heroZoom {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes tourPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(231, 211, 176, 0.45);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(231, 211, 176, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(231, 211, 176, 0);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes menuReveal {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

    </main>
  );
}
