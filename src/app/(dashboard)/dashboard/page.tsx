"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getExpenses, getIncome } from "@/actions/action";
import ChartDashboard from "@/components/chart-dashboard";
import { useEffect, useState } from "react";

export default function Page(){
  const [incomeData, setIncomeData] = useState<any[]>([])
  const [expenseData, setExpenseData] = useState<any[]>([])

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount ,0 );
  const totalExpense = expenseData.reduce((sum, item) => sum + item.amount ,0 );
  const netProfit = totalIncome - totalExpense;

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
    
    return<>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        
        {/* Smart AI */}
        <div className="min-h-[20vh] flex-xl rounded-xl p-8 border-b shadow-sm">
            <h1 className="text-lg font-bold">
                Smart AI
            </h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec viverra leo, id semper odio. Aliquam erat volutpat. Vivamus hendrerit purus vestibulum, venenatis arcu vel, aliquam felis. Vivamus consequat elit dui, vitae ultricies sapien sollicitudin nec. Nam elementum purus vitae blandit rutrum. Suspendisse potenti. Praesent blandit quam et sagittis aliquet. Proin nec consequat nibh, sit amet vehicula dui. Etiam id ipsum id urna rhoncus vehicula at sed diam. Maecenas eu augue accumsan, condimentum lacus quis, tincidunt nunc. Pellentesque quis turpis sed nibh tincidunt congue at id nibh. Vivamus consectetur accumsan ultricies. Suspendisse non mollis quam, a molestie mi. Integer vel lectus ut nibh vulputate imperdiet. Morbi laoreet massa tempus efficitur iaculis. Nam efficitur mauris massa, condimentum tincidunt mauris finibus ut.            
            </p>
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
