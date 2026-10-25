
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const MIN_BOOKING_MINUTES = 30;

function getLocalDateTimeMin() {
  const date = new Date(
    Date.now() + MIN_BOOKING_MINUTES * 60 * 1000
  );

  // Convert to local time for datetime-local input.
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  return date.toISOString().slice(0, 16);
}

function getMinimumBookingTimestamp() {
  return Date.now() + MIN_BOOKING_MINUTES * 60 * 1000;
}

export default function BookingPage() {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [form, setForm] = useState({
    serviceId: '',
    customerName: '',
    customerPhone: '',
    area: '',
    addressText: '',
    problemDescription: '',
    scheduledAt: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(false);
  const [minBookingTime, setMinBookingTime] = useState('');

  useEffect(() => {
    setMinBookingTime(getLocalDateTimeMin());

    const timer = setInterval(() => {
      setMinBookingTime(getLocalDateTimeMin());
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Load services from API
  useEffect(() => {
    let cancelled = false;

    async function loadServices() {
      setServicesLoading(true);

      try {
        const response = await fetch('/api/services', {
          cache: 'no-store',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || 'সার্ভিস লোড করা যায়নি।'
          );
        }

        if (cancelled) return;

        const list = Array.isArray(data.services)
          ? data.services
          : [];

        setServices(list);

        const requestedId = new URLSearchParams(
          window.location.search
        ).get('service');

        const selectedId = list.some(
          (service) => service.id === requestedId
        )
          ? requestedId
          : list[0]?.id || '';

        setForm((previous) => ({
          ...previous,
          serviceId: selectedId,
        }));

        if (list.length === 0) {
          setMessage('কোনো সার্ভিস পাওয়া যায়নি।');
          setMessageType('error');
        }
      } catch (error) {
        if (!cancelled) {
          setServices([]);
          setMessage(
            error.message || 'সার্ভিস লোড করতে সমস্যা হয়েছে।'
          );
          setMessageType('error');
        }
      } finally {
        if (!cancelled) {
          setServicesLoading(false);
        }
      }
    }

    loadServices();

    return () => {
      cancelled = true;
    };
  }, []);

  function change(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (message) {
      setMessage('');
    }
  }

  async function submit(event) {
    event.preventDefault();

    if (loading) return;

    setMessage('');

    if (!form.serviceId) {
      setMessage('অনুগ্রহ করে একটি সার্ভিস নির্বাচন করুন।');
      setMessageType('error');
      return;
    }

    if (!form.scheduledAt) {
      setMessage('অনুগ্রহ করে বুকিংয়ের তারিখ ও সময় নির্বাচন করুন।');
      setMessageType('error');
      return;
    }

    const selectedDate = new Date(form.scheduledAt);
    const selectedTimestamp = selectedDate.getTime();

    if (Number.isNaN(selectedTimestamp)) {
      setMessage('সঠিক তারিখ ও সময় নির্বাচন করুন।');
      setMessageType('error');
      return;
    }

    if (selectedTimestamp < getMinimumBookingTimestamp()) {
      setMinBookingTime(getLocalDateTimeMin());
      setMessage(
        'বুকিংয়ের সময় বর্তমান সময় থেকে কমপক্ষে ৩০ মিনিট পর নির্বাচন করুন।'
      );
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          scheduledAt: selectedDate.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'বুকিং করা যায়নি।'
        );
      }

      setMessage(
        `বুকিং অনুরোধ গ্রহণ করা হয়েছে। রেফারেন্স: ${data.booking.reference}`
      );
      setMessageType('success');
    } catch (error) {
      setMessage(
        error.message || 'বুকিং পাঠাতে সমস্যা হয়েছে।'
      );
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-bold text-brand-700">
          ← হোমপেজ
        </Link>

        <div className="mt-5 rounded-3xl bg-white p-6 shadow-soft md:p-10">
          <p className="font-bold text-brand-600">
            সার্ভিস বুকিং
          </p>

          <h1 className="mt-2 text-3xl font-black">
            আপনার বুকিংয়ের তথ্য দিন
          </h1>

          <p className="mt-2 text-slate-500">
            বুকিং পাঠানোর পর আমাদের টিম যোগাযোগ করবে।
          </p>

          {message && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-5 rounded-xl p-4 font-semibold ${
                messageType === 'error'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-emerald-50 text-brand-800'
              }`}
            >
              {message}
            </div>
          )}

          <form
            onSubmit={submit}
            className="mt-7 grid gap-5 md:grid-cols-2"
          >
            <label className="grid gap-2 text-sm font-bold">
              সার্ভিস নির্বাচন

              <select
                required
                name="serviceId"
                value={form.serviceId}
                onChange={change}
                disabled={servicesLoading || !services.length || loading}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                {services.length > 0 ? (
                  services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nameBn} ({service.nameEn})
                    </option>
                  ))
                ) : (
                  <option value="">
                    {servicesLoading
                      ? 'সার্ভিস লোড হচ্ছে...'
                      : 'কোনো সার্ভিস পাওয়া যায়নি'}
                  </option>
                )}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold">
              আপনার নাম

              <input
                required
                name="customerName"
                value={form.customerName}
                onChange={change}
                disabled={loading}
                className="rounded-xl border border-slate-200 px-4 py-3"
                placeholder="পূর্ণ নাম"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              মোবাইল নম্বর

              <input
                required
                type="tel"
                name="customerPhone"
                value={form.customerPhone}
                onChange={change}
                disabled={loading}
                pattern="(?:\+?88)?01[3-9]\d{8}"
                title="সঠিক বাংলাদেশি মোবাইল নম্বর দিন।"
                className="rounded-xl border border-slate-200 px-4 py-3"
                placeholder="01XXXXXXXXX"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              এলাকা

              <input
                required
                name="area"
                value={form.area}
                onChange={change}
                disabled={loading}
                className="rounded-xl border border-slate-200 px-4 py-3"
                placeholder="যেমন: GEC, Panchlaish"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold md:col-span-2">
              সম্পূর্ণ ঠিকানা

              <textarea
                required
                name="addressText"
                value={form.addressText}
                onChange={change}
                disabled={loading}
                className="min-h-20 rounded-xl border border-slate-200 px-4 py-3"
                placeholder="বাসা, রোড, ভবন ও কাছের ল্যান্ডমার্ক"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              পছন্দের তারিখ ও সময়

              <input
                required
                type="datetime-local"
                name="scheduledAt"
                value={form.scheduledAt}
                onChange={change}
                min={minBookingTime}
                disabled={loading}
                className="rounded-xl border border-slate-200 px-4 py-3"
              />

              <span className="text-xs font-normal text-slate-500">
                বর্তমান সময় থেকে কমপক্ষে ৩০ মিনিট পরের সময় নির্বাচন করুন।
              </span>
            </label>

            <label className="grid gap-2 text-sm font-bold">
              সমস্যার বিবরণ

              <textarea
                required
                name="problemDescription"
                value={form.problemDescription}
                onChange={change}
                disabled={loading}
                className="min-h-20 rounded-xl border border-slate-200 px-4 py-3"
                placeholder="কী ধরনের সমস্যা হচ্ছে?"
              />
            </label>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={
                  loading ||
                  servicesLoading ||
                  !services.length
                }
                className="w-full rounded-xl bg-brand-600 px-5 py-4 font-extrabold text-white hover:bg-brand-700 disabled:opacity-50"
              >
                {loading
                  ? 'পাঠানো হচ্ছে...'
                  : 'বুকিং অনুরোধ পাঠান'}
              </button>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                চূড়ান্ত মূল্য কাজের ধরন ও পরিদর্শনের ওপর নির্ভর করতে পারে।
                অতিরিক্ত কাজের আগে আপনার অনুমতি নেওয়া হবে।
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
