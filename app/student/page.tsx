"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { supabase, type Test } from "../../lib/supabase"
import { Play, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function StudentPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [studentName, setStudentName] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("tests").select("*").order("created_at", { ascending: false })

    if (error) {
      toast("Failed to fetch tests")
    } else {
      setTests(data || [])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Available Tests</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Choose a test to begin your assessment</p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Student Information
              </CardTitle>
              <CardDescription>Enter your name to track your test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <Label htmlFor="studentName">Your Name</Label>
                <Input
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tests.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tests available</h3>
                <p className="text-gray-500">Check back later for new tests</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {tests.map((test) => (
                <Card
                  key={test.id}
                  className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{test.name}</CardTitle>
                        {test.description && (
                          <CardDescription className="text-base">{test.description}</CardDescription>
                        )}
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(test.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Click to start the test</div>
                      <Link
                        href={`/test/${test.id}${studentName ? `?student=${encodeURIComponent(studentName)}` : ""}`}
                      >
                        <Button className="flex items-center gap-2 w-full sm:w-auto" disabled={!studentName.trim()}>
                          <Play className="w-4 h-4" />
                          Start Test
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                    {!studentName.trim() && (
                      <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                        Please enter your name above to start the test
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2 mx-auto">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
