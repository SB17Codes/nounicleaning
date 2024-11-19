import { getCleaningSchedules, getCustomer, getProperty } from "@/db/fauna"
import { TimeStub } from "fauna";
import { CalendarIcon, HomeIcon, MapPinIcon, ClipboardIcon } from 'lucide-react'
import { formatDate } from "@/lib/utils"

interface Booking {
  scheduleId: string;
  scheduledTime: string;
  status: string;
  propertyType: string;
  address: string;
  notes: string;
}

const EmptyState = () => (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Bookings Found</h2>
        <p className="text-gray-600 mb-6">You haven't made any cleaning bookings yet.</p>
        <a href="/book" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Book Your First Cleaning
        </a>
      </div>
    </div>
  );
  

const Bookings = async ({customer}) => {

console.log(customer)
  const properties = await getProperty(customer.customerId)
  const cleanings = await getCleaningSchedules(properties[0].id)
  const data: Booking[] = cleanings.data.data


  if (!data || data.length === 0) {
    return <EmptyState />;
  }







  return (
    <div className="container mx-auto p-4 space-y-6">
      {data.map((booking) => (
        <div key={booking.scheduleId} className="mb-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
              <h2 className="text-2xl font-bold">Cleaning Booking</h2>
              <p className="text-sm opacity-90">{formatDate(booking.scheduledTime.isoString)}</p>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  booking.status === "Confirmé" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {booking.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <HomeIcon className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{booking.property.propertyType}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPinIcon className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{booking.property.address}</span>
                </div>
                <div className="flex items-start text-gray-700">
                  <ClipboardIcon className="w-5 h-5 mr-3 text-blue-500 mt-1" />
                  <span>{booking.notes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Bookings