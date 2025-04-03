import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Ride Booking</h1>
      <p className="text-gray-700 mt-4">Book your ride in just a few steps!</p>
      <a href="/first-step" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md">
        Start Booking
      </a>
    </main>
  );
}
