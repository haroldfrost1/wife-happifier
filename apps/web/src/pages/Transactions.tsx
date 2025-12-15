import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PaginatedResult, Transaction } from "@wife-happifier/shared";

const API_URL = "http://localhost:3000";

export default function Transactions() {
  const [data, setData] = useState<PaginatedResult<Transaction> | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Context from Layout to trigger refresh
  const { refreshTrigger } = useOutletContext<{ refreshTrigger: number }>();

  const fetchTransactions = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/transactions?page=${pageNum}&limit=10`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      setData(result);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Could not load transactions. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [refreshTrigger, page]);

  const handlePrevious = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (data && page < data.meta.lastPage) setPage((p) => p + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Transactions</CardTitle>
            <Badge variant="secondary">
              {data ? data.meta.total : 0} records
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-gray-400" />
                    </TableCell>
                  </TableRow>
                ) : !data || data.data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.data.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {t.date}
                      </TableCell>
                      <TableCell
                        className="max-w-[300px] truncate"
                        title={t.description}
                      >
                        {t.description}
                      </TableCell>
                      <TableCell
                        className={`text-right font-medium ${
                          Number(t.amount) < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        ${Number(t.amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        ${Number(t.balance).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {t.category || "Uncategorized"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Page {page} of {data?.meta.lastPage || 1}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={page <= 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!data || page >= data.meta.lastPage || loading}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
