/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const maxDuration = 55;


export async function POST(req: Request) {
  try {
    const { prompt, incomeData, expenseData } = await req.json();
    
    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // Create a paragraph-formatted financial summary
    const financialSummary = `
      The user has a total income of ${incomeData.totalIncome}, with expenses totaling ${expenseData.totalExpense}, 
      resulting in a net profit of ${incomeData.netProfit}. 
      Income comes from ${incomeData.categories.length} categories including ${incomeData.categories.slice(0, 3).map((cat: { name: any; }) => cat.name).join(', ')}${incomeData.categories.length > 3 ? ', and others' : ''}. 
      Expenses are divided across ${expenseData.categories.length} categories such as ${expenseData.categories.slice(0, 3).map((cat: { name: any; }) => cat.name).join(', ')}${expenseData.categories.length > 3 ? ', among others' : ''}.
    `;

    const fullPrompt = `
      As a financial advisor, analyze this financial situation and provide specific recommendations:
      
      ${financialSummary}
      
      Focus on these aspects:
      1. Budget optimization
      2. Potential savings opportunities
      3. Expense reduction strategies
      4. Suitable investment options
      
      Keep your advice practical and tailored to these numbers.
      ${prompt ? `Specifically address this question: ${prompt}` : ''}
    `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ advice: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate financial advice" },
      { status: 500 }
    );
  }
}