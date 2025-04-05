"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getExpenses, getIncome } from "@/actions/action";
import ChartDashboard from "@/components/chart-dashboard";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown'

export default function Page(){
  const [incomeData, setIncomeData] = useState<any[]>([])
  const [expenseData, setExpenseData] = useState<any[]>([])

  const [advice, setAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userQuestion, setUserQuestion ] = useState<string>("");

  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount ,0 );
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount ,0 );
  const netProfit = totalIncome - totalExpense;

  //grouping income/expenses by category
  const getCategoryData = (data: any[]) =>{
    const categories: Record<string, number> = {}
    data.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + item.amount;
    });
    return Object.entries(categories).map(([name, amount]) => ({ name, amount}))    
  };

    useEffect(() => {
        const loadData = async () => {
            try{
                const [incomeRecords, expenseRecords] = await Promise.all([
                    getIncome(),
                    getExpenses(),
                ]);

                setIncomeData(incomeRecords);
                setExpenseData(expenseRecords);
            }catch(error){
                console.log("Failed to load categories")
            }
        }
        loadData();
    }, []);

    function formatCurrency(amount: number){
        return new Intl.NumberFormat("id-ID",{
          style: "currency",
          currency: "idr",
          minimumFractionDigits: 0
        }).format(amount)
      }


      const getFinancialAdvice = async (prompt?: string) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/gemini",{
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt || "Provide general financial advice based on my data",
                    incomeData: {
                        totalIncome,
                        netProfit,
                        categories: getCategoryData(incomeData),
                    },
                    expenseData: {
                        totalExpense,
                        categories: getCategoryData(expenseData),
                    },
                })
            });

            const data = await response.json();
            setAdvice(data.advice)
        } catch (error) {
            console.error("Error fetching data", error);
            setAdvice("Failed to get financial advice, please try again");
        } finally {
            setIsLoading(false);
            if(chatContainerRef.current){
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
      }

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(userQuestion.trim()) {
            getFinancialAdvice(userQuestion);
            setUserQuestion("");
        }
      }

      //get initial advice ketika data load
    //   useEffect(() => {
    //         if (incomeData.length > 0 && expenseData.length> 0){
    //             getFinancialAdvice();
    //         }
    //     }, [incomeData, expenseData]);

    
    return<>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        
        {/* Smart AI */}
        <div className="min-h-[20vh] flex-xl rounded-xl p-8 border-b shadow-sm">
            <h1 className="text-lg font-bold">
                Financial Advisor AI
            </h1>
            <div
            ref={chatContainerRef}
            className="mb-4 p-4 bg-gray-50 rounded-lg max-h-60 overflow-y-auto"
            >
                {isLoading && !advice ? (
                  <p className="text-gray-500">Analyzing your finances...</p>   
                ):(
                    <div className="whitespace-pre-wrap"><ReactMarkdown>{advice}</ReactMarkdown></div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Ask Financial Advice..."
                className="flex-1 p-2 border rounded-lg"
                disabled={isLoading}
                />
                <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-blue-200"
                >
                    {isLoading ? "Sending..." : "Ask"}
                </button>
            </form>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">

            {/* Income */}
            <div className="rounded-xl h-36 flex items-center justify-between p-8 border-b shadow-sm">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalIncome)}</p>
                </div>
            </div>

            {/* Expenses */}
            <div className="rounded-xl h-36 flex items-center justify-between p-8 border-b shadow-sm">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(totalExpense)}</p>
                </div>
            </div>

            {/* Net */}
            <div className="rounded-xl h-36 flex items-center justify-between p-8 border-b shadow-sm">
                <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-700">Net Profit</h2>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(netProfit)}</p>
                </div>
            </div>
        </div>
        <ChartDashboard/>

    </div>
    </> 
}
