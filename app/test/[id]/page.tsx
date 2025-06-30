"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { supabase, type Test, type Question } from "@/lib/supabaseClient"
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import YourTestComponent from "./TextCode" 

export default function TestPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const testId = params.id as string
  const studentName = searchParams.get("student") || ""
  const [showResult, setShowResult] = useState(false)
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
    const { data: testData, error: testError } = await supabase.from("tests").select("*").eq("id", testId).single()
    if (testError) return toast("Test not found")

    const { data: questionsData, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("test_id", testId)
      .order("created_at", { ascending: true })

    if (questionsError) return toast("Failed to load questions")

    setTest(testData)
    setQuestions(questionsData || [])
    setLoading(false)
  }

  const handleAnswerChange = (questionId: string, answer: string) => {

    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const submitTest = async () => {
    if (!studentName) return toast("Student name is required")

    setSubmitting(true)
    const correctAnswers = questions.filter((q) => answers[q.id] === q.correct_answer).length
    setScore(correctAnswers)

    const { error } = await supabase.from("test_attempts").insert({
      test_id: testId,
      student_name: studentName,
      answers,
      score: correctAnswers,
      total_questions: questions.length,
    })

    if (error) {
      toast("Failed to submit test")
      setSubmitting(false)
      return
    }

    try {
      const audio = new Audio("/sounds/timer.mp3")
      await audio.play().catch(() => { })
    } catch (e) { }

    setIsSubmitted(true)
    setSubmitting(false)
    toast(`You scored ${correctAnswers} out of ${questions.length}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p>Loading test...</p>
      </div>
    )
  }

  if (!test || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Test Not Found</h2>
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
          <Card className="text-center max-w-2xl mx-auto">
            <CardHeader>
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${passed ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}>
                {passed ? <CheckCircle className="text-green-600 dark:text-green-400 w-8 h-8" /> : <XCircle className="text-red-600 dark:text-red-400 w-8 h-8" />}
              </div>
              <CardTitle className="text-2xl mb-2">{passed ? "Congratulations!" : "Test Completed"}</CardTitle>
              <CardDescription className="text-lg">{studentName}, you have completed "{test.name}"</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</div>
                  <div className="text-sm">Correct Answers</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{percentage}%</div>
                  <div className="text-sm">Score</div>
                </div>
              </div>
              <Badge variant={passed ? "default" : "destructive"} className="text-base px-4 py-2">
                {passed ? "Passed" : "Needs Improvement"}
              </Badge>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/student"><Button variant="outline">Take Another Test</Button></Link>
                <Link href="/"><Button>Back to Home</Button></Link>
              </div>
            </CardContent>
          </Card>
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{test.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">Student: {studentName}</p>
            </div>
            <Badge variant="outline"><Clock className="w-4 h-4 mr-1" /> {currentQuestionIndex + 1} / {questions.length}</Badge>
          </div>

          <Progress value={progress} className="h-2 mb-8" />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
              <YourTestComponent currentQuestion={currentQuestion} />
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-4"
              >
                {["A", "B", "C", "D"].map((key) => {
                  const optionText = currentQuestion[`option_${key.toLowerCase()}` as keyof Question]
                  const isSelected = answers[currentQuestion.id] === key
                  const isCorrectOption = currentQuestion.correct_answer === key

                  let optionClass = "hover:bg-gray-50 dark:hover:bg-gray-800"
                  if (showResult) {
                    if (isCorrectOption) optionClass = "bg-green-100 border-green-400 dark:bg-green-900/30"
                    else if (isSelected) optionClass = "bg-red-100 border-red-400 dark:bg-red-900/30"
                  } else if (isSelected) optionClass = "bg-blue-50 border-blue-200 dark:bg-blue-900/20"

                  return (
                    <div key={key} className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${optionClass}`}>
                      <RadioGroupItem
                        value={key}
                        id={`${currentQuestion.id}-${key}`}
                        disabled={showResult}
                        className="mt-1"
                      />
                      <Label htmlFor={`${currentQuestion.id}-${key}`} className="flex-1 cursor-pointer">
                        <span className="font-medium mr-2">{key}.</span>
                        {optionText}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
              <CardFooter className="mt-4">
                {showResult && (
                  <div className="text-sm text-black dark:text-gray-400">
                    {currentQuestion.correct_answer && (
                      <p className="mb-2">
                        Correct Answer: <span className="font-semibold">{currentQuestion.correct_answer}</span>
                      </p>
                    )}
                    {currentQuestion.explanation && (
                      <p className="italic">Explanation: {currentQuestion.explanation}</p>
                    )}
                  </div>
                )}
              </CardFooter>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              <Button onClick={prevQuestion} disabled={currentQuestionIndex === 0} variant="outline">
                <ArrowLeft className="w-4 h-4" /> Previous
              </Button>
              {showResult && currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={() => { nextQuestion(); setShowResult(false) }}>
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={submitTest}
                  disabled={submitting || answeredQuestions < questions.length}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" /> {submitting ? "Submitting..." : "Submit Test"}
                </Button>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {answeredQuestions} of {questions.length} questions answered
            </div>
          </div>

          {answeredQuestions < questions.length && currentQuestionIndex === questions.length - 1 && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 text-sm">Please answer all questions before submitting the test.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
