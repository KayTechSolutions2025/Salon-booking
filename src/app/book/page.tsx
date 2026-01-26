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

  const SALON_ID = 'cff1e5c0-ddd4-4ecd-a1eb-914a2ef27afc' // Replace with your actual salon ID

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

const handleSubmit = async (e: any) => {
  e.preventDefault()
  setError('')

  if (!serviceId || !date || !time || !name || !phone) {
    setError('Please fill in all required fields')
    return
  }

  setLoading(true)

  // 🔒 Check for existing booking
  const { data: existing } = await supabase
    .from('bookings')
    .select('id')
    .eq('date', date)
    .eq('time', time)

  if (existing && existing.length > 0) {
    setLoading(false)
    setError('This time slot is already booked. Please choose another.')
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
  }
}

  if (success) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold">Booking Confirmed 🎉</h1>
        <p className="mt-4">
          We’ve received your booking. The salon will contact you shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book Appointment</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border p-2"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Select a service</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} – R{service.price}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full border p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="w-full border p-2"
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
          className="w-full border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email address"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone number"
          className="w-full border p-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3"
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  )
}
