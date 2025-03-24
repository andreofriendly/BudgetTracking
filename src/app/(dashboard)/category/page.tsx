"use client"
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
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { useState } from "react"
import { addExpenseCategory, addIncomeCategory } from "@/actions/action"

  
  
export default function Page(){
    const [name, setName] = useState("");
    const [type, setType] = useState<"income" | "expense">("income");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (type === "income"){
                await addIncomeCategory(name);
                setLoading(false);
                setOpen(false);
            }else {
                await addExpenseCategory(name);
                setLoading(false);
                setOpen(false);
            }

            //reset form after submit
            setName("");
            setType("income");
        } catch(error){
            console.log("Failed to add category")
            setLoading(false);
        }
    };

    return<>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="rounded-xl h-36 flex items-center justify-center border-2 border-dashed bg-muted/50 cursor-pointer">
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-semibold text-gray-700">+</div>
                        <div className="text-3xl font-normal text-black">Create New Category</div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogDescription>
                            Enter a category name and select type
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" 
                            className="col-span-3" 
                            placeholder="Enter Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                            Category
                            </Label>
                            <Select
                            value={type}
                            onValueChange={(value: "income" | "expense") => setType(value)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="income">Income</SelectItem>
                                    <SelectItem value="expense">Expenses</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        </div>
                        <DialogFooter>
                        <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        >{loading ? "Adding..." : "Add Category" }</Button>
                        </DialogFooter>
                    </DialogContent>
        </Dialog>

        {/* Tabs */}

        <Tabs defaultValue="income" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="income">Income Category</TabsTrigger>
                <TabsTrigger value="expenses">Expenses Category</TabsTrigger>
            </TabsList>

            {/* Income Category */}
            <TabsContent value="income">
                <div className="rounded-xl h-36 flex items-center justify-between p-8 border-b shadow-sm">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-700">Category Name</h2>
                        <p className="text-3xl font-bold text-blue-600">Rp. 2.000.000</p>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="expenses">
                <div className="rounded-xl h-36 flex items-center justify-between p-8 border-b shadow-sm">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-700">Category Expenses</h2>
                        <p className="text-3xl font-bold text-blue-600">Rp. 2.000.000</p>
                    </div>
                </div>
            </TabsContent>
            </Tabs>
    </div>
    </>
}