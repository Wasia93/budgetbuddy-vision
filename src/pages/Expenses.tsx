import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Utensils, Car, Home, ShoppingCart, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const Expenses = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("month");

  const expenses = [
    { id: 1, name: "Grocery Store", amount: 65.50, category: "food", date: "2025-01-15", time: "10:30 AM" },
    { id: 2, name: "Uber Ride", amount: 12.30, category: "transport", date: "2025-01-14", time: "08:15 PM" },
    { id: 3, name: "Electric Bill", amount: 89, category: "bills", date: "2025-01-13", time: "02:00 PM" },
    { id: 4, name: "Shopping Mall", amount: 156.20, category: "shopping", date: "2025-01-12", time: "04:45 PM" },
    { id: 5, name: "Restaurant", amount: 45.80, category: "food", date: "2025-01-11", time: "07:30 PM" },
    { id: 6, name: "Gas Station", amount: 50, category: "transport", date: "2025-01-10", time: "09:00 AM" },
    { id: 7, name: "Coffee Shop", amount: 5.50, category: "food", date: "2025-01-10", time: "08:00 AM" },
  ];

  const getCategoryIcon = (category: string) => {
    const iconClass = "h-5 w-5";
    switch (category) {
      case "food":
        return <Utensils className={iconClass} />;
      case "transport":
        return <Car className={iconClass} />;
      case "bills":
        return <Home className={iconClass} />;
      case "shopping":
        return <ShoppingCart className={iconClass} />;
      default:
        return <MoreHorizontal className={iconClass} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "food":
        return "bg-orange-100 text-orange-600";
      case "transport":
        return "bg-blue-100 text-blue-600";
      case "bills":
        return "bg-purple-100 text-purple-600";
      case "shopping":
        return "bg-pink-100 text-pink-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Expenses</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-4">
        {/* Period Filter */}
        <Tabs value={period} onValueChange={setPeriod} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Total Card */}
        <Card className="card-soft bg-gradient-to-r from-destructive/10 to-destructive/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Spent This {period.charAt(0).toUpperCase() + period.slice(1)}</p>
            <h2 className="text-3xl font-bold">${total.toFixed(2)}</h2>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <div className="space-y-3">
          {expenses.map((expense) => (
            <Card key={expense.id} className="stat-card">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", getCategoryColor(expense.category))}>
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div>
                      <p className="font-medium">{expense.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(expense.date).toLocaleDateString()} • {expense.time}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold">
                    ${expense.amount.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Expenses;
