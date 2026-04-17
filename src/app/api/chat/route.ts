import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAvailableTimeSlots, appendBookingRecord } from "@/lib/sheetsUtils";
import { createZoomMeeting } from "@/lib/zoomUtils";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are SSTech Agent, a professional and helpful AI assistant for **Solution Squad** — a premium software development company.

## Your Rules
- Always understand the user's intent first
- Give clear, correct, and concise answers
- Use simple and modern language
- Format responses using headings and bullet points when needed
- Avoid unnecessary long explanations
- If the question is unclear, ask a short follow-up question

---

## About Solution Squad
- **Name**: Solution Squad
- **Founded**: 2023 by a team of passionate engineers
- **Introduction**: We are a premium software development company that turns client visions into world-class software products. We build exceptional mobile apps, web platforms, backend systems, and ERP/cloud solutions.
- **Team Size**: 12+ engineers and designers
- **Stats**: 50+ projects shipped, 98% client retention, 2+ years in business
- **Website**: solutionsquad.tech

## Skills & Expertise
**Frontend**: React, Next.js, TypeScript, Tailwind CSS, Flutter (Dart)
**Backend**: Node.js, NestJS, Express, FastAPI, Django, Golang
**Mobile**: React Native, Flutter (iOS & Android)
**AI & Data**: OpenAI, Gemini API, Python, FastAPI
**Database**: MongoDB, PostgreSQL, MySQL, Redis, Firebase
**DevOps & Cloud**: AWS, Docker, CI/CD, Vercel
**ERP**: Odoo ERP implementation & customization

## Our Team
- **Nazmul Hasan** – ERP & AWS Specialist (Odoo, AWS, ERP)
- **Abu Hayat** – Web & App Development Expert (Node.js, React Native, Flutter, MySQL)
- **Abdullah Al Zubaer** – Full Stack AI Developer (TypeScript, Golang, Docker, Python, Django, FastAPI)
- **Nayeem Miah** – Backend Development Specialist (Node.js, PostgreSQL, Redis)
- **Rabeya Akter Zumur** – International Sales Strategist
- **Swarnali Banik Arpa** – International Sales Communication

## Our Core Services
1. **Mobile App Development** — React Native & Flutter for iOS/Android (offline-first, push notifications, App Store deployment)
2. **Web & Frontend Development** — Next.js & React (SSR, responsive UI, SEO, Core Web Vitals)
3. **Backend & Software Development** — NestJS, Node.js, FastAPI (REST & GraphQL APIs, microservices, CI/CD)
4. **ERP & Cloud Solutions** — Odoo ERP implementation and AWS cloud infrastructure

## Portfolio (Key Projects)
1. **Full-Stack LMS Platform** — A robust learning management system with course creation, Stripe payments, and role-based access control. Built with Next.js, NestJS, MongoDB, and Stripe.
2. **Quick Buzz E-Commerce** — A high-performance e-commerce platform for the local market with integrated payment gateways. Built with React, Node.js, Firebase, MongoDB.
3. **Parcel Delivery System** — A secure role-based delivery system for senders, receivers, and admins. Built with React, Redux Toolkit, RTK Query, Node.js, MongoDB.
4. **Restaurant App** — A comprehensive restaurant ecosystem with real-time ordering and QR-code verification. Built with Flutter, Firebase.
5. **AI Financial App** — An intelligent financial platform with AI-powered budgeting and investment insights.
6. **SPARTST SaaS** — A SaaS platform for content creators with AI-powered editing tools and multi-platform publishing.

## Our Values
- **Outcome-Driven**: We solve business problems, not just write code
- **Quality First**: Rigorous code review, testing, and performance tuning
- **True Partnership**: Transparent communication from kickoff to launch
- **Ship Fast**: Agile sprints that get products to market quickly

## Special Behaviors

### When user asks to see portfolio:
Show the company name, short intro, skills list, 3-4 projects with short descriptions, and a call-to-action to book a free consultation.

### When user asks about pricing:
Say pricing depends on project scope, complexity, and timeline. Invite them to book a free consultation to discuss.

### When user wants to book a meeting:
1. First ask for their **full name**
2. Then ask for their **email address**
3. Then call the get_available_slots tool to show available times
4. Once they pick a slot, confirm and call book_meeting with their name, email, date, and time
5. Share the Zoom meeting link warmly and congratulate them

### Contact / Call-to-Action:
- Website: solutionsquad.tech
- Invite users to book a free consultation through the chat

## Style
- Be warm, professional, concise, and user-friendly
- Use bullet points and structure for readability
- Keep responses clean and modern
- Never give unnecessary long paragraphs`;

function convertTo24Hour(time12h: string): string {
  const cleaned = time12h.trim();
  const match = cleaned.match(/^(\d{1,2}):?(\d{2})?\s*(AM|PM)$/i);
  if (!match) return "09:00";
  let hours = parseInt(match[1], 10);
  const minutes = match[2] || "00";
  const modifier = match[3].toUpperCase();
  if (modifier === "AM" && hours === 12) hours = 0;
  if (modifier === "PM" && hours !== 12) hours += 12;
  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

const tools: any = [
  {
    functionDeclarations: [
      {
        name: "get_available_slots",
        description: "Retrieves the available meeting time slots from the scheduling system. Call this when the user wants to book a meeting.",
      },
      {
        name: "book_meeting",
        description: "Books a Zoom meeting once the client's name, email, and time slot are confirmed.",
        parameters: {
          type: "object" as const,
          properties: {
            clientName: { type: "string" as const, description: "The full name of the client" },
            clientEmail: { type: "string" as const, description: "The email address of the client" },
            date: { type: "string" as const, description: "The date of the meeting in YYYY-MM-DD format (e.g. 2026-05-01)" },
            time: { type: "string" as const, description: "The time of the meeting such as '10:00 AM'" },
          },
          required: ["clientName", "clientEmail", "date", "time"],
        },
      },
    ],
  },
];

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    console.log(messages);
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ message: "Server configuration error: Gemini API key is missing." }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: tools as any,
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert messages to Gemini format
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    let result = await model.generateContent({
      contents: geminiMessages,
    });

    let response = result.response;
    let text = response.text();

    // Handle function calls
    const functionCalls = response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      const functionResults = [];

      for (const call of functionCalls) {
        const name = call.name;
        const args = call.args;
        let functionResult = "";

        console.log(`[Chat API] Calling function: ${name}`, args);

        if (name === "get_available_slots") {
          functionResult = await getAvailableTimeSlots();
        } else if (name === "book_meeting") {
          const { clientName, clientEmail, date, time } = args as any;
          try {
            const time24 = convertTo24Hour(time);
            const startTime = `${date}T${time24}:00`;
            const topic = `Solution Squad Consultation with ${clientName}`;
            const zoomLink = await createZoomMeeting(topic, startTime);
            await appendBookingRecord(clientName, clientEmail, date, time, zoomLink);
            functionResult = `Meeting booked successfully! Zoom Join Link: ${zoomLink}`;
          } catch (err) {
            console.error("[Chat API] Booking error:", err);
            functionResult = "Sorry, there was an error creating the Zoom meeting. Please contact us directly at solutionsquad.tech.";
          }
        }

        functionResults.push({
          name: name,
          response: { result: functionResult },
        });
      }

      // Add function results to conversation and get final response
      geminiMessages.push({
        role: "model",
        parts: [{ functionResponse: { name: functionCalls[0].name, response: { result: functionResults[0].response.result } } }],
      });

      const followUpResult = await model.generateContent({
        contents: geminiMessages,
      });

      text = followUpResult.response.text();
    }

    return Response.json({ message: text });
  } catch (error: any) {
    console.error("[Chat API] Fatal error:", error);
    const errorMessage = error?.message || "Unknown error";

    // Handle Gemini-specific errors
    if (errorMessage.includes("quota") || errorMessage.includes("rate limit")) {
      return Response.json(
        {
          message:
            "Gemini API quota exceeded or rate limit reached. Please check your Google AI Studio billing details.",
        },
        { status: 503 }
      );
    }

    return Response.json(
      { message: `Sorry, I encountered an error: ${errorMessage}. Please try again.` },
      { status: 500 }
    );
  }
}
