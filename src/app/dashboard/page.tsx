'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

interface Booking {
  id: string
  date: string
  time: string
  status: string
  customer_name: string
  customer_phone: string
  service: {
    name: string
  } | null
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        date,
        time,
        status,
        customer_name,
        customer_phone,
        service:services(name)
      `)
      .order('date', { ascending: true })

    if (!error) {
      const formattedData = (data || []).map(booking => ({
        ...booking,
        service: booking.service?.[0] || null
      }))
      setBookings(formattedData)
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id)

    await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id)

    setBookings(bookings.map(b =>
      b.id === id ? { ...b, status: newStatus } : b
    ))

    setUpdatingId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400'
      default:
        return 'bg-yellow-500/20 text-yellow-400'
    }
  }

  return (
    <section className="px-6 py-24">

      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Booking Dashboard</h1>
            <p className="text-gray-400 text-sm">
              Manage all salon appointments
            </p>
          </div>

          <div className="text-sm text-gray-400">
            Total: {bookings.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="bg-pink-600/20 border-b border-white/10 text-left">
                <th className="p-4">Customer</th>
                <th className="p-4">Service</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center p-10 text-gray-400">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4">{booking.customer_name}</td>

                  <td className="p-4 text-gray-300">
                    {booking.service?.name || 'Unknown'}
                  </td>

                  <td className="p-4 text-gray-300">{booking.date}</td>
                  <td className="p-4 text-gray-300">{booking.time}</td>
                  <td className="p-4 text-gray-300">
                    {booking.customer_phone}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        disabled={updatingId === booking.id}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-xs"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        disabled={updatingId === booking.id}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-xs"
                      >
                        Decline
                      </button>

                      <button
                        onClick={() => updateStatus(booking.id, 'completed')}
                        disabled={updatingId === booking.id}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-xs"
                      >
                        Complete
                      </button>

                    </div>
                  </td>

                </tr>

              ))}
            </tbody>

          </table>
        </div>
      </div>
    </section>
  )
}
