import { supabase } from '@/lib/supabase'

export default async function DashboardPage() {
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      id,
      date,
      time,
      status,
      customer_name,
      customer_phone,
      services ( name )
    `)
    .order('date', { ascending: true })

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>

      <table className="w-full border border-pink-2000 rounded">
        <thead className='bg-black-100'>
          <tr className="border-b">
            <th className="p-2 text-left">Customer</th>
            <th className="p-2 text-left">Service</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Phone</th>
            <th className="p-2 text-left">Status</th>

          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking: any) => (
            <tr key={booking.id} className="border-b hover:bg-red-50">
              <td className="p-2">{booking.customer_name}</td>
              <td className="p-2">{booking.services?.name}</td>
              <td className="p-2">{booking.date}</td>
              <td className="p-2">{booking.time}</td>
              <td className="p-2">{booking.customer_phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
