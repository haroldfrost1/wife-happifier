import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlyHistoryChart } from "./components/MonthlyHistoryChart";
import { CategoryBreakdownChart } from "./components/CategoryBreakdownChart";
import { Loader2 } from "lucide-react";

const API_URL = "http://localhost:3000";

interface MonthlyReportItem {
  month: string;
  income: number;
  expense: number;
  netSavings: number;
}

interface CategoryBreakdownItem {
  category: string;
  amount: number;
}

export default function Dashboard() {
  const [history, setHistory] = useState<MonthlyReportItem[]>([]);
  const [breakdown, setBreakdown] = useState<CategoryBreakdownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      fetchBreakdown(selectedMonth);
    } else if (history.length > 0) {
      // Default to first month (latest)
      setSelectedMonth(history[0].month);
    }
  }, [history, selectedMonth]);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/transactions/monthly-report`);
      if (!res.ok) throw new Error("Failed to fetch monthly report");
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBreakdown = async (month: string) => {
    try {
      const res = await fetch(
        `${API_URL}/transactions/category-breakdown?month=${month}`
      );
      if (!res.ok) throw new Error("Failed to fetch breakdown category");
      const data = await res.json();
      setBreakdown(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate current month stats (from selected month or latest)
  const currentStat = history.find((h) => h.month === selectedMonth) ||
    history[0] || { income: 0, expense: 0, netSavings: 0 };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(val);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          {/* Simple month selector if needed, for now just using history chart interactions or dropdown */}
          <select
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={selectedMonth || ""}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {history.map((h) => (
              <option key={h.month} value={h.month}>
                {h.month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                currentStat.netSavings >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(currentStat.netSavings)}
            </div>
            <p className="text-xs text-muted-foreground">For {selectedMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(currentStat.income)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(currentStat.expense)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Income vs Expenses History</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="flex justify-center overflow-x-auto">
              <MonthlyHistoryChart data={history} />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Expense Breakdown ({selectedMonth})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <CategoryBreakdownChart data={breakdown} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
