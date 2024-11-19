
import { auth, currentUser } from '@clerk/nextjs/server'
import { getCustomer } from '@/db/fauna'
import UserDetails from '@/components/dashboard/client/UserDetails'
import BookingForm from '@/components/dashboard/client/BookingForm'
import Bookings from '@/components/dashboard/client/Bookings'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


const page = async () => {

    const { userId } = await auth()


    if (!userId) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const user = await getCustomer(userId); 

    const customer = user?.data

    console.log(customer)

    

    



    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>User Details</CardTitle>
              </CardHeader>
              <CardContent>
                <UserDetails customer={customer} />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>New Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingForm />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
              </CardHeader>
              
              <CardContent>
                <Bookings customer={customer} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
}

export default page