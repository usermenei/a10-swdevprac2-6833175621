"use client";

import { useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { removeBooking, BookingItem } from "@/redux/features/bookSlice";

export default function BookingList() {
  const venueItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-full max-w-2xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {venueItems.length == 0
        ? "No Venue Booking"
        : venueItems.map((bookingItem: BookingItem) => (
            <div
              key={`${bookingItem.venue}-${bookingItem.bookDate}`}
              className="bg-white rounded-lg shadow-md p-5 mb-4 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-lg">{bookingItem.nameLastname}</p>
                <p className="text-gray-600">Tel: {bookingItem.tel}</p>
                <p className="text-gray-600">Venue: {bookingItem.venue}</p>
                <p className="text-gray-600">Date: {bookingItem.bookDate}</p>
              </div>
              <button
                onClick={() => dispatch(removeBooking(bookingItem))}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Cancel
              </button>
            </div>
          ))}
    </div>
  );
}