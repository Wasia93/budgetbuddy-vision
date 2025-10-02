import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroFinance from "@/assets/hero-finance.png";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6">
      <div className="animate-scale-in">
        <img 
          src={heroFinance} 
          alt="Budget Buddy" 
          className="w-64 h-64 object-contain mb-8 animate-bounce-subtle"
        />
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
          Budget Buddy
        </h1>
        <p className="text-lg text-muted-foreground text-center font-medium">
          Track, Save, and Achieve Your Goals
        </p>
      </div>
    </div>
  );
};

export default Splash;
