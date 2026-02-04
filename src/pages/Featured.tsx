import { Link } from "react-router-dom";
import { HiStar } from "react-icons/hi";

type MarketplacePrice = {
  store: "Amazon" | "AliExpress" | "eBay" | "Daraz";
  price: number;
};

type FeaturedProduct = {
  name: string;
  startingAt: number;
  rating: number; // 0-5 (can be decimals like 4.6)
  image: string;
  prices: MarketplacePrice[];
};

const products: FeaturedProduct[] = [
  {
    name: "iPhone 15 Pro",
    startingAt: 929,
    rating: 4.8,
    image:
      "https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pro_Max_Blue_Titanium_PDP_Image_Position-1__en-IN.jpg?v=1759734013&width=1445",
    prices: [
      { store: "Amazon", price: 999.0 },
      { store: "AliExpress", price: 835.75 },
      { store: "eBay", price: 956.99 },
    ],
  },
  {
    name: "AirPods Pro",
    startingAt: 179,
    rating: 4.7,
    image:
      "https://appleman.pk/cdn/shop/products/Airpods-Pro-1.jpg?v=1667316352",
    prices: [
      { store: "Daraz", price: 179.99 },
      { store: "Amazon", price: 134.99 },
      { store: "eBay", price: 165.95 },
    ],
  },
  {
    name: "Gaming Laptop",
    startingAt: 999,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    prices: [
      { store: "eBay", price: 999.0 },
      { store: "Amazon", price: 1015.99 },
      { store: "AliExpress", price: 1034.5 },
    ],
  },
  {
    name: "4K Action Camera",
    startingAt: 999,
    rating: 4.5,
    image:
      "https://cdn.mos.cms.futurecdn.net/GXHa4PWwDPx7tGQG9MDQvK.jpg",
    prices: [
      { store: "eBay", price: 999.0 },
      { store: "Amazon", price: 1015.99 },
      { store: "AliExpress", price: 1034.5 },
    ],
  },
];

function formatMoney(v: number) {
  return `$${v.toFixed(2)}`;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const total = 5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < full;
        const half = i === full && hasHalf;

        return (
          <span key={i} className="relative inline-flex h-4 w-4">
            <HiStar
              className={`h-4 w-4 ${filled ? "text-yellow-400" : "text-white/20"}`}
            />
            {half && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: "50%" }}
              >
                <HiStar className="h-4 w-4 text-yellow-400" />
              </span>
            )}
          </span>
        );
      })}
      <span className="ml-2 text-xs text-white/55">{rating.toFixed(1)}</span>
    </div>
  );
}

function storeColor(store: MarketplacePrice["store"]) {
  switch (store) {
    case "Amazon":
      return "text-orange-300";
    case "AliExpress":
      return "text-red-300";
    case "eBay":
      return "text-pink-300";
    case "Daraz":
      return "text-cyan-300";
    default:
      return "text-white/70";
  }
}

export default function Featured() {
  return (
    <section className="relative overflow-hidden">
      {/* background (same theme) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#070A1A] via-[#060818] to-[#050815]" />
      <div className="pointer-events-none absolute inset-0 z-10 opacity-70">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute left-[15%] top-[140px] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[12%] top-[120px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 text-center ">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Featured 
          </h2>
        {/* Top text */}
        <p className="text-center text-sm text-white/55">
          We compare prices from the world&apos;s top marketplaces
        </p>

        {/* Cards row */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-lg"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#070A1A]/40 aspect-[4/3]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Name + rating */}
              <div className="mt-4">
                <h3 className="text-base font-semibold text-white">{p.name}</h3>
                <div className="mt-2">
                  <Stars rating={p.rating} />
                </div>
              </div>

              {/* Starting at */}
              <p className="mt-3 text-xs text-white/55">
                Starting at{" "}
                <span className="text-white/85 font-semibold">
                  ${p.startingAt}
                </span>
              </p>

              {/* Price list */}
              <div className="mt-4 space-y-2">
                {p.prices.map((x) => (
                  <div
                    key={x.store}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-[#070A1A]/30 px-3 py-2"
                  >
                    <span
                      className={`text-xs font-semibold ${storeColor(x.store)}`}
                    >
                      {x.store}
                    </span>
                    <span className="text-xs text-white/80">
                      {formatMoney(x.price)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Link
                to="/compare"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold text-white
                           bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 transition"
              >
                Compare Prices →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
