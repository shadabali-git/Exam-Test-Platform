"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { supabase, type Test, type Question } from "../../../lib/supabase"
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function TestPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const testId = params.id as string
  const studentName = searchParams.get("student") || ""

  const [test, setTest] = useState<Test | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchTestData()
  }, [testId])

  const fetchTestData = async () => {
    setLoading(true)

    // Fetch test details
    const { data: testData, error: testError } = await supabase.from("tests").select("*").eq("id", testId).single()

    if (testError) {
      toast("Test not found")
      return
    }

    // Fetch questions
    const { data: questionsData, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("test_id", testId)
      .order("created_at", { ascending: true })

    if (questionsError) {
      toast("Failed to load questions")
      return
    }

    setTest(testData)
    setQuestions(questionsData || [])
    setLoading(false)
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const submitTest = async () => {
    if (!studentName) {
      toast("Student name is required")
      return
    }

    setSubmitting(true)

    // Calculate score
    let correctAnswers = 0
    questions.forEach((question) => {
      if (answers[question.id] === question.correct_answer) {
        correctAnswers++
      }
    })

    const finalScore = correctAnswers
    setScore(finalScore)

    // Save test attempt
    const { error } = await supabase.from("test_attempts").insert({
      test_id: testId,
      student_name: studentName,
      answers: answers,
      score: finalScore,
      total_questions: questions.length,
    })

    if (error) {
      toast("Failed to submit test")
      setSubmitting(false)
      return
    }

    // Play completion sound
    try {
      const audio = new Audio("/sounds/timer.mp3")
      audio.play().catch(() => {
        // Ignore audio play errors
      })
    } catch (error) {
      // Ignore audio errors
      console.log("Audio play error:", error)
    }

    setIsSubmitted(true)
    setSubmitting(false)

    toast(`You scored ${finalScore} out of ${questions.length}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading test...</p>
        </div>
      </div>
    )
  }

  if (!test || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Test Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The test you're looking for doesn't exist or has no questions.
            </p>
            <Link href="/student">
              <Button>Back to Tests</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 60

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div
                  className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    passed ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  {passed ? (
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <CardTitle className="text-2xl mb-2">{passed ? "Congratulations!" : "Test Completed"}</CardTitle>
                <CardDescription className="text-lg">
                  {studentName}, you have completed "{test.name}"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Correct Answers</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{percentage}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {score} / {questions.length}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>

                <Badge variant={passed ? "default" : "destructive"} className="text-base px-4 py-2">
                  {passed ? "Passed" : "Needs Improvement"}
                </Badge>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/student">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Take Another Test
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="w-full sm:w-auto">Back to Home</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredQuestions = Object.keys(answers).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{test.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">Student: {studentName}</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {currentQuestionIndex + 1} of {questions.length}
            </Badge>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
              <CardDescription className="text-base leading-relaxed">{currentQuestion.question_text}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-4"
              >
                {[
                  { key: "A", text: currentQuestion.option_a },
                  { key: "B", text: currentQuestion.option_b },
                  { key: "C", text: currentQuestion.option_c },
                  { key: "D", text: currentQuestion.option_d },
                ].map((option) => (
                  <div
                    key={option.key}
                    className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${
                      answers[currentQuestion.id] === option.key
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <RadioGroupItem value={option.key} id={`${currentQuestion.id}-${option.key}`} className="mt-1" />
                    <Label
                      htmlFor={`${currentQuestion.id}-${option.key}`}
                      className="flex-1 cursor-pointer text-base leading-relaxed"
                    >
                      <span className="font-medium mr-2">{option.key}.</span>
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={nextQuestion} className="flex items-center gap-2">
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={submitTest}
                  disabled={submitting || answeredQuestions < questions.length}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                  {submitting ? "Submitting..." : "Submit Test"}
                </Button>
              )}
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              {answeredQuestions} of {questions.length} questions answered
            </div>
          </div>

          {answeredQuestions < questions.length && currentQuestionIndex === questions.length - 1 && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                Please answer all questions before submitting the test.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
