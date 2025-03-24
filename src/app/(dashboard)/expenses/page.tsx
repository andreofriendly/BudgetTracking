"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addExpense, getExpenses, getExpenseCategories } from "@/actions/action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useEffect, useState } from "react"

export default function Page(){
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [expenseData, setExpenseData] = useState<any[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getExpenseCategories();
      setCategories(data);
    };
    fetchCategories();
  },[]); 

  //masukin data ke expenseData
  useEffect(() => {
    const fetchExpense = async () => {
      const data = await getExpenses();
      setExpenseData(data)
    }
    fetchExpense();
  }, []);
  
  const handleSubmit = async () => {
    if (!amount || !selectedCategory) {
      console.log("please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await addExpense(parseFloat(amount), selectedCategory);
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.log("cant add the data")
      setLoading(false);
      setOpen(false);
    }


    setAmount("");
    setSelectedCategory(null);
  }

  function formatCurrency(amount: number){
    return new Intl.NumberFormat("id-ID",{
      style: "currency",
      currency: "idr",
      minimumFractionDigits: 0
    }).format(amount)
  }

  function calculateTotal(){
    return expenseData.reduce((total, item) => total + item.amount, 0)
  }

    return(
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="dialog">
                <Dialog  open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add Expense</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Add Expense</DialogTitle>
                        <DialogDescription>
                            Enter the expense amount and choose the category
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                            Amount
                            </Label>
                            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="col-span-3" placeholder="Enter Amount"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                            Category
                            </Label>
                            <Select
                            onValueChange={(value) => setSelectedCategory(Number(value))}
                            > 
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((categories) => (
                                    <SelectItem key={categories.id} value={categories.id.toString()}>{categories.name}</SelectItem>
                                  ))}
                                </SelectContent>
                            </Select>

                        </div>
                        </div>
                        <DialogFooter>
                        <Button onClick={handleSubmit}>{loading ? "Adding..." : "Add Expense" }</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="table">
                <Table>
                    <TableCaption>A list of your expense</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenseData.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell className="font-medium">{expense.id}</TableCell>
                            <TableCell>{expense.category}</TableCell>
                            <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-right">{formatCurrency(calculateTotal())}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    )
}
