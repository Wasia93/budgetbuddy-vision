import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Target, TrendingUp, DollarSign, Calendar } from "lucide-react";

const Budget = () => {
  const navigate = useNavigate();

  const monthlyBudget = 3000;
  const spent = 1845.30;
  const remaining = monthlyBudget - spent;
  const spentPercentage = (spent / monthlyBudget) * 100;

  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6234.50,
      deadline: "Dec 2025",
      icon: Target,
      color: "text-primary",
    },
    {
      id: 2,
      name: "Vacation to Europe",
      target: 5000,
      current: 2150,
      deadline: "Jun 2025",
      icon: TrendingUp,
      color: "text-secondary",
    },
    {
      id: 3,
      name: "New Laptop",
      target: 2000,
      current: 850,
      deadline: "Mar 2025",
      icon: DollarSign,
      color: "text-accent",
    },
  ];

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
          <h1 className="text-xl font-bold">Budget & Goals</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Monthly Budget */}
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="text-2xl font-bold">${monthlyBudget.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-2xl font-bold text-destructive">${spent.toFixed(2)}</p>
              </div>
            </div>
            
            <Progress value={spentPercentage} className="h-3" />
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{spentPercentage.toFixed(0)}% used</span>
              <span className="font-medium text-success">${remaining.toFixed(2)} remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* Savings Goals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Savings Goals</h2>
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Add Goal
            </Button>
          </div>

          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <Card key={goal.id} className="stat-card">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 bg-muted rounded-xl ${goal.color}`}>
                      <goal.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{goal.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{goal.deadline}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${goal.current.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">of ${goal.target}</p>
                        </div>
                      </div>
                      
                      <Progress value={progress} className="h-2" />
                      
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">{progress.toFixed(0)}% complete</span>
                        <span className="font-medium">${(goal.target - goal.current).toFixed(2)} to go</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Budget;
