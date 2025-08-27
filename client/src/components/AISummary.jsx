import { useState } from "react"
import { useTasks } from "../context/TaskContext"
import { getSummary } from "../lib/gemini"

export default function AISummary() {
  const { tasks } = useTasks()
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSummarize() {
    setLoading(true)
    const result = await getSummary(tasks)
    setSummary(result)
    setLoading(false)
  }

  // Function to format the AI summary with proper structure
  const formatSummary = (summaryText) => {
    if (!summaryText) return null

    // Split the summary into lines
    const lines = summaryText.split("\n").filter((line) => line.trim())

    return lines.map((line, index) => {
      const trimmedLine = line.trim()

      // Check if it's a category header (no dash, not empty, not "Daily Plan")
      if (
        trimmedLine &&
        !trimmedLine.startsWith("-") &&
        trimmedLine !== "Daily Plan"
      ) {
        // If it looks like a category name (no parentheses, not a task)
        if (!trimmedLine.includes("(") && !trimmedLine.includes("due:")) {
          return (
            <h4
              key={index}
              className="font-semibold text-lg text-slate-800 mt-4 mb-2"
            >
              {trimmedLine}
            </h4>
          )
        }
      }

      // Check if it's a task (starts with dash)
      if (trimmedLine.startsWith("-")) {
        return (
          <li key={index} className="ml-4 text-slate-700 mb-1">
            {trimmedLine.substring(1).trim()}
          </li>
        )
      }

      // Check if it's the "Daily Plan" header
      if (trimmedLine === "Daily Plan") {
        return (
          <h3 key={index} className="font-bold text-xl text-slate-900 mb-4">
            {trimmedLine}
          </h3>
        )
      }

      // For any other lines, render as regular text
      return (
        <p key={index} className="text-slate-600 mb-2">
          {trimmedLine}
        </p>
      )
    })
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        AI Task Summary
      </h3>

      <button
        onClick={handleSummarize}
        disabled={tasks.length === 0 || loading}
        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl mb-4"
      >
        {loading ? "🤖 Analyzing..." : "✨ Summarize My Tasks"}
      </button>

      {summary && (
        <div className="bg-white/50 rounded-xl p-4 border border-white/30">
          <div className="space-y-2">{formatSummary(summary)}</div>
        </div>
      )}

      {tasks.length === 0 && (
        <p className="text-slate-400 text-sm text-center italic">
          Add some tasks to get AI insights
        </p>
      )}
    </div>
  )
}