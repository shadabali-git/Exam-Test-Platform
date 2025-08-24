import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, PlusCircle, Play } from "lucide-react"

import { createClient } from "@/lib/supabase/server"
import { logout } from "../app/login/action"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Top-right auth controls */}
        <div className="flex justify-end mb-4">
          {session ? (
            <form action={logout}>
              <Button type="submit" variant="destructive">
                Logout
              </Button>
            </form>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            MCQ Test Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create engaging multiple choice tests and track student performance with our intuitive platform
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tutor Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl">For Tutors</CardTitle>
              <CardDescription className="text-base">
                Create and manage MCQ tests for your students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <PlusCircle className="w-4 h-4" />
                  Create unlimited tests
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  Track student performance
                </div>
              </div>
              <Link href="/tutor" className="block">
                <Button className="w-full" size="lg">
                  Start Creating Tests
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Student Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">For Students</CardTitle>
              <CardDescription className="text-base">
                Take tests and see your results instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Play className="w-4 h-4" />
                  Take tests anytime
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <BookOpen className="w-4 h-4" />
                  Instant results
                </div>
              </div>
              <Link href="/student" className="block">
                <Button className="w-full" variant="outline" size="lg">
                  Take a Test
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
