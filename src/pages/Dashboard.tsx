import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Wallet,
  TrendingUp,
  Target,
  Plus,
  ShoppingCart,
  Home,
  Utensils,
  Car,
  MoreHorizontal,
  Menu,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // Get user country from localStorage
  const userCountryData = localStorage.getItem("userCountry");
  const userCountry = userCountryData ? JSON.parse(userCountryData) : { symbol: "$", currency: "USD" };

  // Mock data - starting from 0
  const balance = 0;
  const monthlyBudget = 3000;
  const spent = 0;
  const saved = 0;
  const savingsGoal = 10000;
  const currentSavings = 0;

  const recentTransactions: Array<{id: number; name: string; amount: number; category: string; date: string}> = [];

  const categories = [
    { name: "Food", icon: Utensils, amount: 0, color: "text-orange-500", bgColor: "bg-orange-100" },
    { name: "Transport", icon: Car, amount: 0, color: "text-blue-500", bgColor: "bg-blue-100" },
    { name: "Bills", icon: Home, amount: 0, color: "text-purple-500", bgColor: "bg-purple-100" },
    { name: "Shopping", icon: ShoppingCart, amount: 0, color: "text-pink-500", bgColor: "bg-pink-100" },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <Utensils className="h-4 w-4" />;
      case "transport":
        return <Car className="h-4 w-4" />;
      case "bills":
        return <Home className="h-4 w-4" />;
      case "shopping":
        return <ShoppingCart className="h-4 w-4" />;
      default:
        return <MoreHorizontal className="h-4 w-4" />;
    }
  };

  const spentPercentage = (spent / monthlyBudget) * 100;
  const savingsPercentage = (currentSavings / savingsGoal) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Budget Buddy</h1>
              <p className="text-sm text-muted-foreground">Welcome back!</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Balance Card */}
        <Card className="card-soft bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm opacity-90">Total Balance</p>
              <Wallet className="h-5 w-5 opacity-90" />
            </div>
            <h2 className="text-4xl font-bold mb-1">{userCountry.symbol}{balance.toFixed(2)}</h2>
            <p className="text-sm opacity-75">{saved > 0 ? `+${userCountry.symbol}${saved.toFixed(2)} this month` : 'Start tracking your expenses'}</p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="stat-card">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-destructive" />
                </div>
                <p className="text-sm text-muted-foreground">Spent</p>
              </div>
              <p className="text-2xl font-bold">{userCountry.symbol}{spent.toFixed(2)}</p>
              <Progress value={spentPercentage} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {spentPercentage.toFixed(0)}% of {userCountry.symbol}{monthlyBudget}
              </p>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Target className="h-4 w-4 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">Goal</p>
              </div>
              <p className="text-2xl font-bold">{userCountry.symbol}{currentSavings.toFixed(0)}</p>
              <Progress value={savingsPercentage} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {savingsPercentage.toFixed(0)}% of {userCountry.symbol}{savingsGoal}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", category.bgColor)}>
                    <category.icon className={cn("h-5 w-5", category.color)} />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className="font-semibold">{userCountry.symbol}{category.amount.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-2">No transactions yet</p>
                <p className="text-sm text-muted-foreground">
                  Tap the + button to add your first expense
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        transaction.amount > 0 ? "bg-success-light" : "bg-muted"
                      )}>
                        {getCategoryIcon(transaction.category)}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={cn(
                      "font-semibold",
                      transaction.amount > 0 ? "text-success" : "text-foreground"
                    )}>
                      {transaction.amount > 0 ? "+" : ""}{userCountry.symbol}{Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Floating Add Button */}
      <Button
        className="floating-button bg-gradient-to-r from-primary to-secondary text-primary-foreground"
        onClick={() => navigate("/add-expense")}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Simple Menu Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="absolute top-20 left-4 bg-card rounded-2xl shadow-lg p-4 space-y-2 w-48 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => {
                setShowMenu(false);
                navigate("/expenses");
              }}
            >
              <Wallet className="h-4 w-4" />
              Expenses
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => {
                setShowMenu(false);
                navigate("/budget");
              }}
            >
              <Target className="h-4 w-4" />
              Budget & Goals
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => {
                setShowMenu(false);
                navigate("/reports");
              }}
            >
              <TrendingUp className="h-4 w-4" />
              Reports
            </Button>
            <div className="h-px bg-border my-2" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive"
              onClick={() => navigate("/auth")}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
