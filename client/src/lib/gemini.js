import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export async function getSummary(tasks) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `You are an AI assistant that organizes to-do lists into a clear, prioritized daily plan. Take the raw notes or scattered tasks I provide and:

Identify urgent or due-today tasks.
Group tasks into logical categories based on their nature (e.g., Admin, Development, Marketing, Personal, etc.).
Rewrite tasks in concise, actionable language.

Format the output exactly like this structure (no emojis, no icons, no extra text):

Daily Plan

[Category Name 1]
- [task description]

[Category Name 2]
- [task description]

[Category Name 3]
- [task description]

Here are the tasks to organize:
${tasks
  .map((t) => `- ${t.text} (due: ${t.dueDate || "no due date"})`)
  .join("\n")}`

  const result = await model.generateContent(prompt)
  return result.response.text() || "No summary available."
}
