import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  const confirmedBookigs = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  const concluedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookigs.length >= 0 && (
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Confirmados
          </h2>
        )}
        {confirmedBookigs.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
        {concluedBookings.length >= 0 && (
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Finalizados
          </h2>
        )}
        {concluedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  )
}

export default Bookings
