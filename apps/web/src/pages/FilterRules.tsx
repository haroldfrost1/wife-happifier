import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

interface FilterRule {
  id: number;
  field: string;
  operator: string;
  value: string;
}

const API_URL = "http://localhost:3000";

export default function FilterRules() {
  const [rules, setRules] = useState<FilterRule[]>([]);
  const [newRule, setNewRule] = useState({
    field: "description",
    operator: "contains",
    value: "",
  });

  const fetchRules = async () => {
    const res = await fetch(`${API_URL}/filter-rules`);
    const data = await res.json();
    setRules(data);
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleAddRule = async () => {
    if (!newRule.value) return;

    await fetch(`${API_URL}/filter-rules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRule),
    });

    setNewRule({ field: "description", operator: "contains", value: "" });
    fetchRules();
  };

  const handleDeleteRule = async (id: number) => {
    await fetch(`${API_URL}/filter-rules/${id}`, {
      method: "DELETE",
    });
    fetchRules();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Filter Rules</h1>
      <p className="text-muted-foreground mb-6">
        Transactions matching any of these rules will be excluded from reports.
      </p>

      <div className="flex gap-4 mb-8 bg-card p-4 rounded-lg border shadow-sm items-end">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-sm font-medium">Field</label>
          <Select
            value={newRule.field}
            onValueChange={(val) => setNewRule({ ...newRule, field: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="description">Description</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-sm font-medium">Operator</label>
          <Select
            value={newRule.operator}
            onValueChange={(val) => setNewRule({ ...newRule, operator: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contains">Contains</SelectItem>
              <SelectItem value="equals">Equals</SelectItem>
              <SelectItem value="lt">Less Than</SelectItem>
              <SelectItem value="gt">Greater Than</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-sm font-medium">Value</label>
          <Input
            value={newRule.value}
            onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
            placeholder="Value to match"
          />
        </div>

        <Button onClick={handleAddRule} className="gap-2">
          <Plus className="h-4 w-4" /> Add Rule
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium capitalize">
                  {rule.field}
                </TableCell>
                <TableCell className="capitalize">{rule.operator}</TableCell>
                <TableCell>{rule.value}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteRule(rule.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {rules.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center h-24 text-muted-foreground"
                >
                  No filter rules found. All transactions are included in
                  reports.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
