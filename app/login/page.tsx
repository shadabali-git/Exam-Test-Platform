import { login, signup } from './action'
import {Toaster,toast } from "sonner"
export default function LoginPage() {



   
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
           
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full outline-none border-none text-gray-800 placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
              
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full outline-none border-none text-gray-800 placeholder-gray-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              formAction={login}
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
