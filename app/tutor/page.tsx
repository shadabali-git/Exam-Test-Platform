"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { type Test, supabase } from "@/lib/supabaseClient"
import { Plus, Save, Trash2, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

type Question = {
  id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: "A" | "B" | "C" | "D"
  explanation: string
}

const TutorPage=()=>{
  const [tests, setTests] = useState<Test[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [testName, setTestName] = useState("")
  const [testDescription, setTestDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    toast("Failed to fetch tests")
    console.error("Supabase fetch error:", error)
  } else if (Array.isArray(data)) {
    setTests(data)
  } else {
    console.warn("Unexpected response:", data)
    setTests([]) // fallback
  }
}


  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      question_text: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "A",
      explanation: "",
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, field: keyof Question, value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const saveTest = async () => {
    if (!testName.trim()) {
      toast.info("Please enter a test name")
      return
    }

    if (questions.length === 0) {
      toast.warning("Please add at least one question")
      return
    }

    // Validate all questions are complete
    const incompleteQuestions = questions.filter(
      (q) =>
        !q.question_text.trim() || !q.option_a.trim() || !q.option_b.trim() || !q.option_c.trim() || !q.option_d.trim(),
    )

    if (incompleteQuestions.length > 0) {
      toast.warning("Please complete all questions and options")
      return
    }

    setLoading(true)

    try {
      // Insert test
      const { data: testData, error: testError } = await supabase
        .from("tests")
        .insert({
          name: testName,
          description: testDescription,
        })
        .select()
        .single()

      if (testError) throw testError

      // Insert questions
      const questionsToInsert = questions.map((q) => ({
        test_id: testData.id,
        question_text: q.question_text,
        option_a: q.option_a,
        option_b: q.option_b,
        option_c: q.option_c,
        option_d: q.option_d,
        correct_answer: q.correct_answer,
        explanation: q.explanation // Handle optional explanation
      }))

      const { error: questionsError } = await supabase.from("questions").insert(questionsToInsert)

      if (questionsError) throw questionsError

      toast.success("Test created successfully!")

      // Reset form
      setTestName("")
      setTestDescription("")
      setQuestions([])
      setIsCreating(false)
      fetchTests()
    } catch (error) {
      console.log("Error saving test:", error)
      toast.error("Failed to save test")
    } finally {
      setLoading(false)
    }
  }

  if (isCreating) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => setIsCreating(false)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Create New Test</h1>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Test Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="testName">Test Name *</Label>
                  <Input
                    id="testName"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Enter test name"
                  />
                </div>
                <div>
                  <Label htmlFor="testDescription">Description (Optional)</Label>
                  <Textarea
                    id="testDescription"
                    value={testDescription}
                    onChange={(e) => setTestDescription(e.target.value)}
                    placeholder="Enter test description"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Questions ({questions.length})</h2>
              <Button onClick={addQuestion} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Question
              </Button>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <Card key={question.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Question Text *</Label>
                      <Textarea
                        value={question.question_text}
                        onChange={(e) => updateQuestion(question.id, "question_text", e.target.value)}
                        placeholder="Enter your question"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Option A *</Label>
                        <Input
                          value={question.option_a}
                          onChange={(e) => updateQuestion(question.id, "option_a", e.target.value)}
                          placeholder="Option A"
                        />
                      </div>
                      <div>
                        <Label>Option B *</Label>
                        <Input
                          value={question.option_b}
                          onChange={(e) => updateQuestion(question.id, "option_b", e.target.value)}
                          placeholder="Option B"
                        />
                      </div>
                      <div>
                        <Label>Option C *</Label>
                        <Input
                          value={question.option_c}
                          onChange={(e) => updateQuestion(question.id, "option_c", e.target.value)}
                          placeholder="Option C"
                        />
                      </div>
                      <div>
                        <Label>Option D *</Label>
                        <Input
                          value={question.option_d}
                          onChange={(e) => updateQuestion(question.id, "option_d", e.target.value)}
                          placeholder="Option D"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Correct Answer *</Label>
                      <RadioGroup
                        value={question.correct_answer}
                        onValueChange={(value) => updateQuestion(question.id, "correct_answer", value)}
                        className="flex flex-row gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="A" id={`${question.id}-A`} />
                          <Label htmlFor={`${question.id}-A`}>A</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="B" id={`${question.id}-B`} />
                          <Label htmlFor={`${question.id}-B`}>B</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="C" id={`${question.id}-C`} />
                          <Label htmlFor={`${question.id}-C`}>C</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="D" id={`${question.id}-D`} />
                          <Label htmlFor={`${question.id}-D`}>D</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label>Explanation (Optional)</Label>
                      <Textarea
                        value={question.explanation}
                        onChange={(e) => updateQuestion(question.id, "explanation", e.target.value)}
                        placeholder="Enter explanation for the correct answer"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {questions.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500 mb-4">No questions added yet</p>
                  <Button onClick={addQuestion} className="flex items-center gap-2 mx-auto">
                    <Plus className="w-4 h-4" />
                    Add Your First Question
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-4 sticky bottom-4">
              <Button onClick={saveTest} disabled={loading} className="flex items-center gap-2" size="lg">
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Test"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Tutor Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Create and manage your MCQ tests</p>
          </div>
          <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2" size="lg">
            <Plus className="w-4 h-4" />
            Create New Test
          </Button>
        </div>

        <div className="grid gap-6">
          {tests.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tests created yet</h3>
                <p className="text-gray-500 mb-4">Create your first MCQ test to get started</p>
                <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Test
                </Button>
              </CardContent>
            </Card>
          ) : (
            tests.map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{test.name}</CardTitle>
                      {test.description && <CardDescription className="mt-2">{test.description}</CardDescription>}
                    </div>
                    <Badge variant="secondary">{new Date(test.created_at).toLocaleDateString()}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link href={`/test/${test.id}`}>
                      <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                        <Eye className="w-4 h-4" />
                        Preview Test
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TutorPage
