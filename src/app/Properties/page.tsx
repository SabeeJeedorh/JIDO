
"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";

type Currency = "NGN" | "USD";
type PropertyType = "House" | "Apartment" | "Land" | "Commercial";
type PropertyStatus = "For Sale" | "For Rent";

type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  type: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  priceNGN: number;
  priceUSD: number;
  image: string;
  featured: boolean;
};

type SavedFavorite = {
  id: string;
  addedAt: number;
};

const properties: Property[] = [
  {
    id: "jido-001",
    title: "Contemporary Luxury Residence",
    location: "Maitama, Abuja",
    city: "Abuja",
    type: "House",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 6,
    area: 450,
    priceNGN: 450000000,
    priceUSD: 300000,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000",
    featured: true,
  },
  {
    id: "jido-002",
    title: "Modern City Apartment",
    location: "Victoria Island, Lagos",
    city: "Lagos",
    type: "Apartment",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    priceNGN: 180000000,
    priceUSD: 120000,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000",
    featured: true,
  },
  {
    id: "jido-003",
    title: "Premium Residential Land",
    location: "Gwarinpa, Abuja",
    city: "Abuja",
    type: "Land",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    priceNGN: 35000000,
    priceUSD: 23333,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    featured: false,
  },
  {
    id: "jido-004",
    title: "Elegant Family Home",
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    type: "House",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    priceNGN: 280000000,
    priceUSD: 186667,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000",
    featured: true,
  },
  {
    id: "jido-005",
    title: "Serviced City Apartment",
    location: "Asokoro, Abuja",
    city: "Abuja",
    type: "Apartment",
    status: "For Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    priceNGN: 8500000,
    priceUSD: 5667,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    featured: false,
  },
  {
    id: "jido-006",
    title: "Commercial Investment Space",
    location: "Ikeja, Lagos",
    city: "Lagos",
    type: "Commercial",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 2,
    area: 500,
    priceNGN: 220000000,
    priceUSD: 146667,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000",
    featured: false,
  },
];

const categories = [
  "All Properties",
  "House",
  "Apartment",
  "Land",
  "Commercial",
];

export default function PropertiesPage() {
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Properties");
  const [status, setStatus] = useState("All");
  const [city, setCity] = useState("All Locations");
  const [sort, setSort] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [favorites, setFavorites] = useState<SavedFavorite[]>([]);
  const [favoritesReady, setFavoritesReady] = useState(false);
  const [comparison, setComparison] = useState<string[]>([]);

  const formatPrice = (property: Property) => {
    const amount =
      currency === "NGN" ? property.priceNGN : property.priceUSD;

    return new Intl.NumberFormat(
      currency === "NGN" ? "en-NG" : "en-US",
      {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }
    ).format(amount);
  };

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query)
      );
    }

    if (category !== "All Properties") {
      result = result.filter(
        (property) => property.type === category
      );
    }

    if (status !== "All") {
      result = result.filter(
        (property) => property.status === status
      );
    }

    if (city !== "All Locations") {
      result = result.filter(
        (property) => property.city === city
      );
    }

    if (minPrice) {
      result = result.filter(
        (property) =>
          (currency === "NGN"
            ? property.priceNGN
            : property.priceUSD) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      result = result.filter(
        (property) =>
          (currency === "NGN"
            ? property.priceNGN
            : property.priceUSD) <= Number(maxPrice)
      );
    }

    if (sort === "low") {
      result.sort(
        (a, b) =>
          (currency === "NGN" ? a.priceNGN : a.priceUSD) -
          (currency === "NGN" ? b.priceNGN : b.priceUSD)
      );
    }

    if (sort === "high") {
      result.sort(
        (a, b) =>
          (currency === "NGN" ? b.priceNGN : b.priceUSD) -
          (currency === "NGN" ? a.priceNGN : a.priceUSD)
      );
    }

    if (sort === "featured") {
      result.sort(
        (a, b) => Number(b.featured) - Number(a.featured)
      );
    }

    return result;
  }, [search, category, status, city, minPrice, maxPrice, currency, sort]);

  const recentFavorites = useMemo(() => {
    return [...favorites]
      .sort((a, b) => b.addedAt - a.addedAt)
      .map((favorite) =>
        properties.find((property) => property.id === favorite.id)
      )
      .filter((property): property is Property => Boolean(property));
  }, [favorites]);

  const favoriteIds = useMemo(
    () => new Set(favorites.map((favorite) => favorite.id)),
    [favorites]
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("jido-favorites");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const restored = parsed.flatMap((item) => {
            if (typeof item === "string") {
              return [{ id: item, addedAt: 0 }];
            }
            if (
              item &&
              typeof item === "object" &&
              typeof item.id === "string"
            ) {
              return [
                {
                  id: item.id,
                  addedAt: typeof item.addedAt === "number" ? item.addedAt : 0,
                },
              ];
            }
            return [];
          });
          setFavorites(restored);
        }
      }
    } catch {
      // Keep an empty list when saved favorites cannot be read.
    }
    setFavoritesReady(true);
  }, []);

  useEffect(() => {
    if (!favoritesReady) return;
    localStorage.setItem("jido-favorites", JSON.stringify(favorites));
  }, [favorites, favoritesReady]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.some((favorite) => favorite.id === id)
        ? current.filter((favorite) => favorite.id !== id)
        : [{ id, addedAt: Date.now() }, ...current]
    );
  };

  const runSearch = (event: FormEvent) => {
    event.preventDefault();
    setSearch(searchInput.trim());
    document.getElementById("property-results")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const toggleComparison = (id: string) => {
    setComparison((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 3) {
        alert("You can compare up to 3 properties at a time.");
        return current;
      }

      return [...current, id];
    });
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("All Properties");
    setStatus("All");
    setCity("All Locations");
    setMinPrice("");
    setMaxPrice("");
    setSort("featured");
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#353A3D]">

      {/* PAGE HERO */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-12">
        <div className="max-w-7xl mx-auto">

          <p className="text-[#A58D70] text-xs uppercase tracking-[0.3em] mb-6">
            The JIDO Collection
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div className="max-w-2xl">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
                Find a place
                <span className="block italic text-[#A58D70]">
                  to call yours.
                </span>
              </h1>

              <p className="mt-7 text-[#858581] leading-8 max-w-xl">
                Explore thoughtfully selected properties, discover
                new opportunities and find a space that feels right
                for you.
              </p>
            </div>

            <a
              href="#recent-favorites"
              className="inline-flex items-center gap-3 border border-[#A58D70] bg-white px-5 py-3 text-sm text-[#353A3D]"
            >
              <span className="text-lg leading-none text-[#A58D70]">♥</span>
              {recentFavorites.length === 0
                ? "No favorites yet"
                : `${recentFavorites.length} favorite${
                    recentFavorites.length === 1 ? "" : "s"
                  } saved`}
            </a>

          </div>
        </div>
      </section>

      <section id="recent-favorites" className="scroll-mt-8 px-6 pb-14 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl border border-[#E7D3B0] bg-white p-5 md:p-7">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#A58D70]">
                Your favorites
              </p>
              <h2 className="font-serif text-3xl md:text-4xl">
                Recently added favorites
              </h2>
            </div>
            <p className="text-sm text-[#858581]">
              {recentFavorites.length === 0
                ? "Save a property and it appears here."
                : "Newest saves are shown first."}
            </p>
          </div>

          {recentFavorites.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentFavorites.map((property, index) => (
                <article
                  key={property.id}
                  className="flex gap-4 border border-[#A58D70]/40 bg-[#FAF9F6] p-3"
                >
                  <img
                    src={property.image}
                    alt=""
                    className="h-24 w-24 shrink-0 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#A58D70]">
                      {index === 0 ? "Just added" : "Favorite"} · {property.type}
                    </p>
                    <h3 className="mt-2 truncate font-serif text-lg">
                      {property.title}
                    </h3>
                    <p className="mt-1 truncate text-xs text-[#858581]">
                      {property.location}
                    </p>
                    <p className="mt-3 font-serif text-base">
                      {formatPrice(property)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[#E7D3B0] px-6 py-10 text-center">
              <p className="font-serif text-2xl">Your list is empty.</p>
              <p className="mt-3 text-sm text-[#858581]">
                Use the Favorite button on any property below.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEARCH AREA */}
      <section className="px-6 md:px-12 lg:px-20 pb-14">
        <div className="max-w-7xl mx-auto bg-white border border-[#E7E6E2] p-5 md:p-7">

          <label
            htmlFor="property-search"
            className="block text-xs uppercase tracking-[0.2em] text-[#858581] mb-4"
          >
            Where would you like to live?
          </label>

          <form onSubmit={runSearch} className="flex flex-col md:flex-row gap-4">

            <div className="flex-1 flex items-center gap-3 bg-[#FAF9F6] px-4">
              <span className="text-[#A58D70]">⌕</span>

              <input
                id="property-search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by property name or location..."
                className="w-full bg-transparent py-4 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#353A3D] text-white px-10 py-4 text-sm hover:bg-[#A58D70] transition-colors"
            >
              Search Properties
            </button>

          </form>
        </div>
      </section>

      {/* PROPERTY COLLECTION */}
      <section id="property-results" className="scroll-mt-8 px-6 md:px-12 lg:px-20 pb-28">
        <div className="max-w-7xl mx-auto">

          {/* SECTION HEADING */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">

            <div>
              <p className="text-[#A58D70] uppercase tracking-[0.25em] text-xs mb-4">
                Explore Properties
              </p>

              <h2 className="font-serif text-3xl md:text-4xl">
                Find your next opportunity.
              </h2>

              <p className="text-sm text-[#858581] mt-3">
                {filteredProperties.length} properties found
              </p>
            </div>

            {/* CURRENCY SWITCH */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#858581] uppercase tracking-wider">
                Currency
              </span>

              <div className="flex bg-white border border-[#E7E6E2] p-1">
                {(["NGN", "USD"] as Currency[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setCurrency(item);
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className={`px-5 py-2 text-xs transition-colors ${
                      currency === item
                        ? "bg-[#353A3D] text-white"
                        : "text-[#858581] hover:text-[#353A3D]"
                    }`}
                  >
                    {item === "NGN" ? "₦ NGN" : "$ USD"}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* FILTERS */}
          <div className="bg-white border border-[#E7E6E2] p-5 md:p-6 mb-9">

            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl">Refine your search</h3>

              <button
                onClick={clearFilters}
                className="text-xs text-[#A58D70] underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div>
                <label className="block text-xs text-[#858581] mb-3">
                  Property Type
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-3 text-sm outline-none"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#858581] mb-3">
                  Location
                </label>

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-3 text-sm outline-none"
                >
                  <option>All Locations</option>
                  <option>Lagos</option>
                  <option>Abuja</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#858581] mb-3">
                  Listing Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-3 text-sm outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#858581] mb-3">
                  Sort By
                </label>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-3 text-sm outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>

            </div>

            <div className="grid sm:grid-cols-2 gap-5 mt-6">
              <div>
                <label className="block text-xs text-[#858581] mb-3">
                  Minimum Price ({currency})
                </label>

                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Enter minimum price"
                  className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-3 text-sm outline-none focus:border-[#A58D70]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#858581] mb-3">
                  Maximum Price ({currency})
                </label>

                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Enter maximum price"
                  className="w-full bg-[#FAF9F6] border border-[#E7E6E2] px-4 py-3 text-sm outline-none focus:border-[#A58D70]"
                />
              </div>
            </div>

          </div>

          {/* PROPERTY GRID */}
          {filteredProperties.length > 0 ? (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

              {filteredProperties.map((property) => (

                <article
                  key={property.id}
                  className={`group overflow-hidden bg-white ${
                    favoriteIds.has(property.id)
                      ? "border-2 border-[#A58D70]"
                      : "border border-[#E7E6E2]"
                  }`}
                >

                  {/* IMAGE */}
                  <div className="relative h-[250px] overflow-hidden">

                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute top-4 left-4 flex gap-2">
                      {property.featured && (
                        <span className="bg-[#FAF9F6] text-[#353A3D] px-3 py-2 text-[10px] uppercase tracking-wider">
                          Featured
                        </span>
                      )}

                      <span className="bg-[#353A3D] text-white px-3 py-2 text-[10px] uppercase tracking-wider">
                        {property.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(property.id)}
                      aria-label={
                        favoriteIds.has(property.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      aria-pressed={favoriteIds.has(property.id)}
                      className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.16em] shadow-lg transition-colors ${
                        favoriteIds.has(property.id)
                          ? "bg-[#A58D70] text-white"
                          : "bg-white text-[#353A3D] ring-1 ring-[#A58D70] hover:bg-[#A58D70] hover:text-white"
                      }`}
                    >
                      <span aria-hidden="true" className="text-base leading-none">
                        {favoriteIds.has(property.id) ? "♥" : "♡"}
                      </span>
                      {favoriteIds.has(property.id) ? "Favorited" : "Favorite"}
                    </button>

                  </div>

                  {/* DETAILS */}
                  <div className="p-6">

                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#A58D70] mb-3">
                      {property.type}
                    </p>

                    <h3 className="font-serif text-xl mb-2 group-hover:text-[#A58D70] transition-colors">
                      {property.title}
                    </h3>

                    <p className="text-xs text-[#858581] mb-6">
                      <span className="mr-2">⌖</span>
                      {property.location}
                    </p>

                    <div className="flex items-center gap-4 border-y border-[#E7E6E2] py-4 text-xs text-[#777774]">

                      {property.bedrooms > 0 && (
                        <span>{property.bedrooms} Beds</span>
                      )}

                      {property.bathrooms > 0 && (
                        <span>{property.bathrooms} Baths</span>
                      )}

                      <span>{property.area.toLocaleString()} m²</span>

                    </div>

                    <div className="flex justify-between items-end gap-3 mt-5">

                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#999] mb-2">
                          Asking Price
                        </p>

                        <p className="font-serif text-xl">
                          {formatPrice(property)}
                        </p>
                      </div>

                      <Link
                        href={`/properties/${property.id}`}
                        className="text-xs text-[#A58D70] border-b border-[#A58D70] pb-1 hover:text-[#353A3D]"
                      >
                        View Details ↗
                      </Link>

                    </div>

                    <button
                      onClick={() => toggleComparison(property.id)}
                      className={`w-full mt-6 border py-3 text-xs transition-colors ${
                        comparison.includes(property.id)
                          ? "bg-[#353A3D] text-white border-[#353A3D]"
                          : "border-[#E7E6E2] hover:border-[#A58D70]"
                      }`}
                    >
                      {comparison.includes(property.id)
                        ? "✓ Added to Compare"
                        : "+ Add to Compare"}
                    </button>

                  </div>
                </article>

              ))}

            </div>

          ) : (

            <div className="text-center py-24 bg-white border border-[#E7E6E2]">
              <p className="font-serif text-3xl mb-4">
                No properties found.
              </p>

              <p className="text-sm text-[#858581] mb-7">
                Try adjusting your search or filters.
              </p>

              <button
                onClick={clearFilters}
                className="bg-[#353A3D] text-white px-7 py-3 text-sm"
              >
                Clear Filters
              </button>
            </div>

          )}

        </div>
      </section>

      {/* COMPARISON BAR */}
      {comparison.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#353A3D] text-white p-5 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

            <div>
              <p className="font-serif text-xl">
                Compare Properties
              </p>
              <p className="text-xs text-white/60 mt-1">
                {comparison.length} of 3 properties selected
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setComparison([])}
                className="text-xs text-white/70 underline"
              >
                Clear
              </button>

              <Link
                href={`/compare?ids=${comparison.join(",")}`}
                className="bg-[#C0A98A] text-[#353A3D] px-7 py-3 text-sm hover:bg-white transition-colors"
              >
                Compare Now ↗
              </Link>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}
