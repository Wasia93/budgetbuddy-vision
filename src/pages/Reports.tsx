import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, TrendingUp, Lightbulb } from "lucide-react";

const Reports = () => {
  const navigate = useNavigate();

  const categoryData = [
    { name: "Food", amount: 456.20, percentage: 40, color: "bg-orange-500" },
    { name: "Transport", amount: 234.50, percentage: 20, color: "bg-blue-500" },
    { name: "Bills", amount: 567.80, percentage: 25, color: "bg-purple-500" },
    { name: "Shopping", amount: 586.80, percentage: 15, color: "bg-pink-500" },
  ];

  const insights = [
    {
      id: 1,
      type: "warning",
      title: "High Food Spending",
      description: "You spent 40% on Food this month. Try reducing it to 30% to save more.",
      icon: TrendingDown,
    },
    {
      id: 2,
      type: "success",
      title: "Great Progress!",
      description: "Your transportation costs are 15% lower than last month. Keep it up!",
      icon: TrendingUp,
    },
    {
      id: 3,
      type: "tip",
      title: "Smart Savings Tip",
      description: "Consider meal prepping to reduce food expenses. This could save you $150/month.",
      icon: Lightbulb,
    },
  ];

  const total = categoryData.reduce((sum, cat) => sum + cat.amount, 0);

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
          <h1 className="text-xl font-bold">Reports & Insights</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Spending Breakdown */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg">Spending Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">This month's expenses</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative pt-4">
              {/* Simple Bar Chart */}
              <div className="space-y-3">
                {categoryData.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">
                        ${category.amount.toFixed(2)} ({category.percentage}%)
                      </span>
                    </div>
                    <div className="h-8 bg-muted rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${category.color} transition-all duration-500`}
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between">
                <span className="font-semibold">Total Spent</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Smart Insights</h2>
          
          {insights.map((insight) => (
            <Card key={insight.id} className="stat-card">
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <div className={`
                    p-3 rounded-xl h-fit
                    ${insight.type === 'warning' ? 'bg-warning-light text-warning' : ''}
                    ${insight.type === 'success' ? 'bg-success-light text-success' : ''}
                    ${insight.type === 'tip' ? 'bg-info-light text-info' : ''}
                  `}>
                    <insight.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reports;
