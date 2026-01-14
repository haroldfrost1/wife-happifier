import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { API_URL } from "../config";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { toast } from "sonner";
import { RecurringPayment, PaymentFrequency, PaymentType } from "@wife-happifier/shared";

export default function Budget() {
    const [payments, setPayments] = useState<RecurringPayment[]>([]);
    const [summary, setSummary] = useState({ mtdSpending: 0, ytdSpending: 0 });
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        frequency: PaymentFrequency.MONTHLY,
        type: PaymentType.EXPENSE,
        startDate: new Date().toISOString().split("T")[0],
    });

    const fetchPayments = async () => {
        try {
            const [paymentsRes, summaryRes] = await Promise.all([
                fetch(`${API_URL}/budget/recurring`),
                fetch(`${API_URL}/budget/summary`)
            ]);

            if (!paymentsRes.ok || !summaryRes.ok) throw new Error("Failed to fetch data");

            const paymentsData = await paymentsRes.json();
            const summaryData = await summaryRes.json();

            setPayments(paymentsData);
            setSummary(summaryData);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load recurring payments");
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/budget/recurring`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create payment");

            toast.success("Recurring payment added");
            setIsOpen(false);
            setFormData({
                name: "",
                amount: "",
                frequency: PaymentFrequency.MONTHLY,
                type: PaymentType.EXPENSE,
                startDate: new Date().toISOString().split("T")[0],
            });
            fetchPayments();
        } catch (error) {
            console.error(error);
            toast.error("Failed to add payment");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/budget/recurring/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete payment");
            toast.success("Payment removed");
            fetchPayments();
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove payment");
        }
    };

    const calculateMonthlyAmount = (payment: RecurringPayment) => {
        let monthlyAmount = parseFloat(payment.amount);
        if (payment.frequency === PaymentFrequency.WEEKLY) monthlyAmount *= 4.33;
        if (payment.frequency === PaymentFrequency.DAILY) monthlyAmount *= 30;
        if (payment.frequency === PaymentFrequency.QUARTERLY) monthlyAmount /= 3;
        if (payment.frequency === PaymentFrequency.YEARLY) monthlyAmount /= 12;
        if (payment.frequency === PaymentFrequency.ONCE_OFF) {
            const now = new Date();
            const start = new Date(payment.startDate);
            const monthsRemaining = (start.getFullYear() - now.getFullYear()) * 12 + (start.getMonth() - now.getMonth());
            monthlyAmount = monthlyAmount / Math.max(1, monthsRemaining);
        }
        return monthlyAmount;
    };

    const totalIncome = payments
        .filter(p => p.type === PaymentType.INCOME)
        .reduce((acc, curr) => acc + calculateMonthlyAmount(curr), 0);

    const totalExpense = payments
        .filter(p => p.type !== PaymentType.INCOME) // Default to EXPENSE if undefined or null (backwards compat)
        .reduce((acc, curr) => acc + calculateMonthlyAmount(curr), 0);

    const netBudget = totalIncome - totalExpense;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Budget Planner</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Recurring Payment
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Recurring Payment</DialogTitle>
                            <DialogDescription>
                                Add a fixed or recurring expense to your budget.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="amount" className="text-right">
                                        Amount
                                    </Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={formData.amount}
                                        onChange={(e) =>
                                            setFormData({ ...formData, amount: e.target.value })
                                        }
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="frequency" className="text-right">
                                        Frequency
                                    </Label>
                                    <Select
                                        value={formData.frequency}
                                        onValueChange={(val: PaymentFrequency) =>
                                            setFormData({ ...formData, frequency: val })
                                        }
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={PaymentFrequency.DAILY}>Daily</SelectItem>
                                            <SelectItem value={PaymentFrequency.WEEKLY}>Weekly</SelectItem>
                                            <SelectItem value={PaymentFrequency.MONTHLY}>Monthly</SelectItem>
                                            <SelectItem value={PaymentFrequency.QUARTERLY}>Quarterly</SelectItem>
                                            <SelectItem value={PaymentFrequency.YEARLY}>Yearly</SelectItem>
                                            <SelectItem value={PaymentFrequency.ONCE_OFF}>Once Off</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">
                                        Type
                                    </Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(val: PaymentType) =>
                                            setFormData({ ...formData, type: val })
                                        }
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={PaymentType.EXPENSE}>Expense</SelectItem>
                                            <SelectItem value={PaymentType.INCOME}>Income</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="startDate" className="text-right">
                                        Start Date
                                    </Label>
                                    <Input
                                        id="startDate"
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) =>
                                            setFormData({ ...formData, startDate: e.target.value })
                                        }
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Monthly Income
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Monthly Expenses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">
                            ${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Net Budget
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${netBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${netBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-semibold tracking-tight">Spending Overview</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            MTD Spending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">
                            -${summary.mtdSpending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            YTD Spending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">
                            -${summary.ytdSpending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recurring Payments</CardTitle>
                    <CardDescription>
                        Manage your recurring expenses and income.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Frequency</TableHead>
                                <TableHead>Start Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell className="font-medium">{payment.name}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${payment.type === PaymentType.INCOME ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {payment.type || PaymentType.EXPENSE}
                                        </span>
                                    </TableCell>
                                    <TableCell>${parseFloat(payment.amount).toFixed(2)}</TableCell>
                                    <TableCell>{payment.frequency}</TableCell>
                                    <TableCell>{payment.startDate}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(payment.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {payments.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        No recurring payments found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
