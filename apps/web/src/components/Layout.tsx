import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Loader2,
  Menu,
  Upload,
  Wallet,
  Filter,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: Wallet,
  },
  {
    title: "Filter Rules",
    href: "/filter-rules",
    icon: Filter,
  },
];

import { API_URL } from "@/config";

export default function Layout() {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Upload State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [bankId, setBankId] = useState("stgeorge");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Refresh Trigger State
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) return;

    const file = fileInputRef.current.files[0];
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bankId", bankId);

    try {
      const res = await fetch(`${API_URL}/transactions/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      // Success
      setIsUploadOpen(false);
      setRefreshTrigger((prev) => prev + 1); // Trigger refresh
      toast.success("Upload successful");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload CSV");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-slate-950">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="mr-8 flex items-center gap-2 font-semibold">
            <Link
              to="/"
              className="text-xl tracking-tight text-slate-900 dark:text-slate-50"
            >
              流水
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive
                      ? "text-primary"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            {/* Upload Button */}
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload CSV</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleUpload}>
                  <DialogHeader>
                    <DialogTitle>Upload Transactions</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file to import transactions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="bank">Bank</Label>
                      <Select
                        value={bankId}
                        onValueChange={setBankId}
                        defaultValue="stgeorge"
                      >
                        <SelectTrigger id="bank">
                          <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stgeorge">St. George</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="csv">CSV File</Label>
                      <Input
                        id="csv"
                        type="file"
                        accept=".csv"
                        ref={fileInputRef}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={uploading}>
                      {uploading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Upload
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col space-y-4 py-4">
                  <div className="px-2">
                    <h2 className="text-lg font-semibold tracking-tight">
                      Navigation
                    </h2>
                  </div>
                  <nav className="flex flex-col space-y-1">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary ${
                            isActive
                              ? "bg-slate-100 text-primary dark:bg-slate-800"
                              : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content with Context */}
      <main className="container mx-auto p-4 md:p-8">
        <Outlet context={{ refreshTrigger }} />
      </main>
      <Toaster richColors />
    </div>
  );
}
