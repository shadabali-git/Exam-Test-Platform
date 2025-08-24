'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Just mock toast for now — replace with Supabase logic
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      toast.error('Please fill all fields')
      return
    }
    try {

      if (isLogin) {

        const { data } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        localStorage.setItem('data', JSON.stringify(data));
        toast.success('Logged in successfully!')
        router.push('/')

      } else {

        const { data } = await supabase.auth.signUp(formData)
        if(data)
        toast.success('Account created successfully!')
        setIsLogin(true) // switch to login after signup

      }
    }
    catch (err) {
      console.log(err);
      toast.error('Error In Try After a While')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-white p-4">
      <Toaster />

      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Login to Your Account' : 'Create Account'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => toast('Forgot password? (not implemented)')}
                className="text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button type="submit" className="w-full cursor-pointer">
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
        </form>

        {/* Toggle login/signup */}
        <div className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
