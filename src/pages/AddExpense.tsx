import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Utensils, Car, Home, ShoppingCart, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const categories = [
  { id: "food", name: "Food", icon: Utensils, color: "bg-orange-100 text-orange-600" },
  { id: "transport", name: "Transport", icon: Car, color: "bg-blue-100 text-blue-600" },
  { id: "bills", name: "Bills", icon: Home, color: "bg-purple-100 text-purple-600" },
  { id: "shopping", name: "Shopping", icon: ShoppingCart, color: "bg-pink-100 text-pink-600" },
  { id: "other", name: "Other", icon: MoreHorizontal, color: "bg-gray-100 text-gray-600" },
];

const AddExpense = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("food");
  
  const userCountryData = localStorage.getItem("userCountry");
  const userCountry = userCountryData ? JSON.parse(userCountryData) : { symbol: "$", currency: "USD" };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Expense added!",
      description: `${userCountry.symbol}${amount} added to ${categories.find(c => c.id === selectedCategory)?.name}`,
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Add Expense</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Input */}
          <Card className="card-soft p-6">
            <Label htmlFor="amount" className="text-sm text-muted-foreground mb-2 block">
              Amount
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-muted-foreground">{userCountry.symbol}</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-4xl font-bold border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                required
                autoFocus
              />
            </div>
          </Card>

          {/* Category Selection */}
          <div className="space-y-3">
            <Label className="text-sm text-muted-foreground">Category</Label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    selectedCategory === category.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  )}
                >
                  <div className={cn("p-3 rounded-lg", category.color)}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="What did you buy?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Add Expense
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddExpense;
