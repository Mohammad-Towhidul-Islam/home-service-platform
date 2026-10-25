
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { initialServices } from '@/lib/services';

function AreaSearch() {
  return (
    <form
      action="/booking"
      method="GET"
      className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <input
        type="text"
        name="area"
        placeholder="আপনার এলাকা লিখুন"
        aria-label="আপনার এলাকা লিখুন"
        autoComplete="address-level2"
        className="area-search-input h-14 w-full min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-5 text-base font-medium text-slate-900 placeholder:text-slate-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-emerald-300"
      />

      <button
        type="submit"
        className="h-14 shrink-0 rounded-xl border border-white/30 px-6 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
      >
        সার্ভিস দেখুন
      </button>
    </form>
  );
}

export default async function HomePage() {
  let services = initialServices;

  try {
    const rows = await prisma.service.findMany({
      where: { active: true },
      include: { category: true },
      orderBy: { nameEn: 'asc' },
      take: 8,
    });

    if (rows.length > 0) {
      services = rows;
    }
  } catch (error) {
    console.error('Homepage service loading error:', error);
  }

  const featured = [
    ['❄️', 'AC Servicing', 'এসি পরিষ্কার ও সার্ভিস'],
    ['🔧', 'Plumbing', 'পাইপ ও পানির লাইন'],
    ['⚡', 'Electrical', 'ইলেকট্রিক্যাল মেরামত'],
  ];

  return (
    <main className="min-h-screen bg-[#f8faf9]">
      {/* ========================================
          Navbar
      ======================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-2xl font-black text-emerald-800 transition-transform duration-300 hover:scale-105"
          >
            ShebaGhor<span className="text-orange-500">.</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-7 font-semibold md:flex">
            <a href="#services" className="nav-link">
              সার্ভিসসমূহ
            </a>

            <a href="#how" className="nav-link">
              যেভাবে কাজ করে
            </a>

            <a href="#contact" className="nav-link">
              যোগাযোগ
            </a>
          </nav>

          {/* Login and Booking */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/login"
              className="nav-link px-2 py-2 font-semibold text-emerald-800 sm:px-3"
            >
              লগইন
            </Link>

            <Link
              href="/booking"
              className="nav-booking-btn rounded-xl bg-emerald-700 px-3 py-3 text-sm font-bold text-white sm:px-5 sm:text-base"
            >
              বুকিং করুন
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================
          Hero Section
      ======================================== */}
      <section className="overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          {/* Hero Content */}
          <div>
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">
              চট্টগ্রামে নির্ভরযোগ্য হোম সার্ভিস
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              আপনার ঘরের যত্নে,
              <br />
              <span className="text-emerald-200">
                আমরা আছি পাশে।
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              AC servicing, plumbing, electrical repair এবং cleaning—
              প্রশিক্ষিত টেকনিশিয়ান বুক করুন সহজেই।
            </p>

            <Link
              href="/booking"
              className="mt-7 inline-block rounded-xl bg-white px-6 py-3 font-bold text-emerald-900 transition duration-300 hover:-translate-y-1 hover:bg-emerald-50 hover:shadow-lg"
            >
              এখনই বুক করুন →
            </Link>

            {/* Area Search */}
            <AreaSearch />

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/90">
              <span>✓ কোম্পানি-পরিচালিত টিম</span>
              <span>✓ পরিষ্কার মূল্যনীতি</span>
              <span>✓ সহজ বুকিং</span>
            </div>
          </div>

          {/* Featured Services Card */}
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-2xl transition duration-300 hover:shadow-emerald-950/30">
            <div className="rounded-2xl bg-white p-6 text-emerald-950">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">
                    আজকের জন্য
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold">
                    আপনার সার্ভিস বুক করুন
                  </h2>
                </div>

                <span className="text-4xl">🏡</span>
              </div>

              <div className="mt-6 space-y-3">
                {featured.map(([icon, title, subtitle]) => (
                  <Link
                    key={title}
                    href="/booking"
                    className="group flex items-center gap-4 rounded-xl border border-slate-100 p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-2xl transition duration-300 group-hover:scale-110">
                      {icon}
                    </span>

                    <span className="flex-1">
                      <span className="block font-bold transition-colors group-hover:text-emerald-700">
                        {title}
                      </span>

                      <span className="block text-sm text-slate-500">
                        {subtitle}
                      </span>
                    </span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-900">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/booking"
                className="mt-5 block rounded-xl bg-emerald-700 py-3 text-center font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg"
              >
                বুকিং শুরু করুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          Services Section
      ======================================== */}
      <section
        id="services"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20"
      >
        <p className="font-bold text-emerald-700">
          আমাদের সার্ভিস
        </p>

        <h2 className="mt-2 text-3xl font-black md:text-4xl">
          কোন সার্ভিসটি দরকার?
        </h2>

        <p className="mt-3 text-slate-500">
          আপনার প্রয়োজন অনুযায়ী সঠিক সার্ভিস বেছে নিন।
        </p>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id || service.nameEn}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >
              <div className="mb-5 h-44 w-full overflow-hidden rounded-xl bg-emerald-50">
                <img
                  src={
                    {
                      'AC Servicing': '/images/ac-technician.jpg',
                      'Carpentry': '/images/carpenter.jpg',
                      'Electrical Repair': '/images/electrician.jpg',
                      'Home Cleaning': '/images/cleaner.jpg',
                      'Plumbing Service': '/images/plumber.jpg',
                      'Refrigerator Repair': '/images/fridge-technician.jpg',
                    }[service.nameEn] || '/images/default-technician.jpg'
                  }
                  alt={`${service.nameEn} professional technician`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <h3 className="mt-5 text-xl font-extrabold">
                {service.nameBn || service.nameEn}
              </h3>

              <p className="mt-2 leading-6 text-slate-500">
                {service.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <p className="font-bold">
                  {service.pricePaisa != null
                    ? `৳ ${(service.pricePaisa / 100).toLocaleString('en-BD')}`
                    : 'পরিদর্শন সাপেক্ষে'}
                </p>

                <Link
                  href={`/booking?service=${encodeURIComponent(service.id || '')}`}
                  className="shrink-0 font-bold text-emerald-700 transition duration-300 hover:translate-x-1 hover:text-emerald-900"
                >
                  বুক করুন ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ========================================
          How It Works
      ======================================== */}
      <section
        id="how"
        className="scroll-mt-24 bg-emerald-50 py-16"
      >
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-center text-3xl font-black">
            যেভাবে কাজ করে
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                '01',
                'সার্ভিস বেছে নিন',
                'আপনার প্রয়োজনীয় সার্ভিস এবং সময় নির্বাচন করুন।',
              ],
              [
                '02',
                'বুকিং নিশ্চিত করুন',
                'ঠিকানা ও সমস্যার বিবরণ দিয়ে অনুরোধ পাঠান।',
              ],
              [
                '03',
                'সার্ভিস গ্রহণ করুন',
                'আমাদের টিম বুকিং নিশ্চিত করে টেকনিশিয়ান পাঠাবে।',
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-4xl font-black text-emerald-200">
                  {number}
                </span>

                <h3 className="mt-4 text-xl font-extrabold">
                  {title}
                </h3>

                <p className="mt-2 leading-7 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
          Footer
      ======================================== */}
      <footer
        id="contact"
        className="scroll-mt-24 bg-emerald-950 py-10 text-white"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 md:flex-row">
          <div>
            <Link
              href="/"
              className="inline-block text-2xl font-black transition-transform duration-300 hover:scale-105"
            >
              ShebaGhor<span className="text-orange-400">.</span>
            </Link>

            <p className="mt-2 text-sm text-white/80">
              চট্টগ্রাম, বাংলাদেশে হোম সার্ভিস বুকিং প্ল্যাটফর্ম।
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-white/80">
            <Link
              href="/my-bookings"
              className="transition-colors hover:text-emerald-300"
            >
              আমার বুকিং
            </Link>

            <Link
              href="/login"
              className="transition-colors hover:text-emerald-300"
            >
              লগইন
            </Link>

            <a
              href="mailto:support@example.com"
              className="transition-colors hover:text-emerald-300"
            >
              support@example.com
            </a>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/20 px-5 pt-5 text-xs text-white/60">
          © {new Date().getFullYear()} ShebaGhor. সব অধিকার সংরক্ষিত।
        </div>
      </footer>
    </main>
  );
}
