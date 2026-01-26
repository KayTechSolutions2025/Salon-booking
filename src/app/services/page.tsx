import { supabase } from '@/lib/supabase'

export default async function ServicesPage() {
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)

  if (error) {
    return <p>Error loading services</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services?.map(service => (
          <div key={service.id} className="border rounded p-4">
            <h2 className="font-semibold text-lg">{service.name}</h2>
            <p className="text-sm text-gray-600">{service.description}</p>
            <p className="mt-2 font-bold">R{service.price}</p>
            <a
              href="/book"
              className="inline-block mt-4 underline"
            >
              Book Now
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
