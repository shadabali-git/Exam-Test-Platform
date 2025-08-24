"use client"


export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">

        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mt-2">
          We’re sorry, but something didn’t work as expected.  
          Try refreshing the page or going back.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}
