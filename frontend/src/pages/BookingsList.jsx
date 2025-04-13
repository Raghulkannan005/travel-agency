import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookings } from '../utils/api';
import { format } from 'date-fns';

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const data = await getBookings();
        setBookings(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load bookings');
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (err) {
      return dateString;
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">Your Bookings</h1>

      {isLoading ? (
        <div className="text-center p-8">
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">
          <p>{error}</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow">
          <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
          <Link to="/packages" className="btn btn-primary">
            Browse Packages
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="md:flex">
                {booking.selectedPackage?.imageUrl && (
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={booking.selectedPackage.imageUrl} 
                      alt={booking.selectedPackage.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6 md:w-2/3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">
                        {booking.selectedPackage?.title || 'Package Unavailable'}
                      </h2>
                      <p className="text-gray-600">
                        <span className="font-medium">Destination:</span> {booking.selectedPackage?.destination || 'N/A'}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="inline-block bg-travel-teal text-white py-1 px-3 rounded-full text-sm">
                        Confirmed
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Traveler</p>
                      <p className="font-medium">{booking.name}</p>
                      <p className="text-gray-600 text-sm">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Travel Date</p>
                      <p className="font-medium">{formatDate(booking.date)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Booking Details</p>
                      <p className="font-medium">{booking.guests} Guests</p>
                      <p className="text-travel-blue font-bold">${booking.totalPrice}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Link 
                      to={`/packages/${booking.selectedPackage?._id}`}
                      className="btn btn-primary"
                    >
                      View Package
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingsList;