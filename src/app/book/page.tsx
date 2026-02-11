'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BookPage() {
  const [services, setServices] = useState<any[]>([])
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const SALON_ID = 'cff1e5c0-ddd4-4ecd-a1eb-914a2ef27afc'

  // ✅ EDIT THIS NUMBER ONLY (NO +, NO SPACES)
  const WHATSAPP_NUMBER = '27739042723'

  // 🔹 LOAD SERVICES
  useEffect(() => {
    const loadServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)

      setServices(data || [])
    }

    loadServices()
  }, [])

  // 🔹 SUBMIT BOOKING
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')

    if (!serviceId || !date || !time || !name || !phone) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)

    // Check double booking
    const { data: existing } = await supabase
      .from('bookings')
      .select('id')
      .eq('date', date)
      .eq('time', time)

    if (existing && existing.length > 0) {
      setLoading(false)
      setError('This time slot is already booked.')
      return
    }

    const { error } = await supabase.from('bookings').insert([
      {
        salon_id: SALON_ID,
        service_id: serviceId,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        date,
        time,
      },
    ])

    setLoading(false)

    if (error) {
      setError('Failed to create booking')
    } else {
      setSuccess(true)
      // 🔹 GET SERVICE NAME
const service = services.find(s => s.id === serviceId)

// 🔹 CLEAN MESSAGE (NO LINE BREAK BUGS)
const message =
  "Hello, I just made a booking.%0A%0A" +
  "Name: " + name + "%0A" +
  "Phone: " + phone + "%0A" +
  "Service: " + (service?.name || "N/A") + "%0A" +
  "Date: " + date + "%0A" +
  "Time: " + time + "%0A%0A" +
  "Please confirm my appointment."

// 🔹 WHATSAPP URL
const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

// 🔹 OPEN WHATSAPP
window.open(whatsappURL, '_blank')
     
    }
  }

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <section className="flex justify-center items-center py-32">
        <div className="w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl">
          <div className="text-5xl mb-4">🎉</div>

          <h1 className="text-3xl font-bold mb-3">
            Booking Confirmed
          </h1>

          <p className="text-gray-300">
            Your appointment has been successfully scheduled.
            WhatsApp confirmation has been opened.
          </p>
        </div>
      </section>
    )
  }

  // ✅ BOOKING PAGE
  return (
    <section className="flex justify-center items-center py-20">

      <div className="absolute w-[600px] h-[600px] bg-pink-600 opacity-20 blur-[160px] rounded-full -z-10" />

      <div className="w-full max-w-xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Book Your Appointment
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Secure your premium salon experience
          </p>
        </div>

        {error && (
          <p className="text-red-500 mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <select
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} — R{service.price}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Select time</option>
            <option>09:00</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>12:00</option>
            <option>13:00</option>
            <option>14:00</option>
            <option>15:00</option>
            <option>16:00</option>
          </select>

          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone number"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-black font-semibold py-3 rounded-full transition duration-300"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>

          <p className="text-xs text-gray-400 text-center">
            No double bookings. Your time is reserved.
          </p>

        </form>
      </div>
    </section>
  )
}