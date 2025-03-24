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

  
  
export default function Page(){
    return<>
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Dialog>
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
                            <Input id="name" className="col-span-3" placeholder="Enter Category Name"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                            Category
                            </Label>
                            <Select>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Income</SelectItem>
                                    <SelectItem value="dark">Expenses</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                        </div>
                        <DialogFooter>
                        <Button>Save changes</Button>
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