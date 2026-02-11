import Link from "next/link";

export default function HomePage() {
  return (
    <div>

      {/* HERO */}
      <section className="flex items-center justify-center px-6 py-32">

        <div className="max-w-3xl text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">

          {/* LOGO */}
          <div className="flex flex-col items-center gap-6">

            <img
              src="/salon/logo.jpeg"
              alt="Salon logo"
              className="h-20 w-20 object-cover rounded-full border border-pink-500/40"
            />

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Tanjent
            </h1>

          </div>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Book your appointment instantly. Trusted by clients who value
            quality, precision, and time.
          </p>

          <Link
            href="/book"
            className="inline-block mt-10 bg-pink-500 hover:bg-pink-600 text-black font-semibold px-12 py-4 rounded-full transition shadow-lg shadow-pink-500/30"
          >
            BOOK NOW
          </Link>

        </div>

      </section>

      {/* IMAGE STRIP */}
      <section className="px-6 pb-28">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          <img
            src="/salon/lashes.jpg"
            alt="Lashes"
            className="h-80 w-full object-cover rounded-2xl border border-white/10 hover:scale-105 transition"
          />

          <img
            src="/salon/nails.jpg"
            alt="Nails"
            className="h-80 w-full object-cover rounded-2xl border border-white/10 hover:scale-105 transition"
          />

          <img
            src="/salon/hair.jpg"
            alt="Hair"
            className="h-80 w-full object-cover rounded-2xl border border-white/10 hover:scale-105 transition"
          />

        </div>

      </section>

      {/* ABOUT */}
      <section className="px-6 py-28">

        <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">

          <h2 className="text-3xl font-semibold mb-6">
            About the Salon
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            We believe your time matters. Our salon delivers precise,
            high-quality beauty services in a calm, professional
            environment — no waiting, no confusion, just results.
          </p>

        </div>

      </section>

      {/* CONTACT */}
      <section className="px-6 pb-32">

        <div className="max-w-3xl mx-auto text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">

          <h2 className="text-3xl font-semibold mb-8">
            Contact
          </h2>

          <p className="text-gray-300">
            123 Main Street, Johannesburg
          </p>

          <p className="text-gray-300 mt-2">
            WhatsApp: 071 234 5678
          </p>

          <div className="flex justify-center gap-8 mt-8 text-pink-500 font-medium">

            <a href="#" className="hover:text-pink-400 transition">
              Instagram
            </a>

            <a href="#" className="hover:text-pink-400 transition">
              Facebook
            </a>

            <a href="#" className="hover:text-pink-400 transition">
              TikTok
            </a>

          </div>

        </div>

      </section>

    </div>
  );
}
