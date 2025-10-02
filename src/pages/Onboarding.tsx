import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import onboarding1 from "@/assets/onboarding-1.png";
import onboarding2 from "@/assets/onboarding-2.png";
import onboarding3 from "@/assets/onboarding-3.png";

const slides = [
  {
    image: onboarding1,
    title: "Track Every Expense",
    description: "Monitor your spending habits with easy categorization and detailed insights.",
  },
  {
    image: onboarding2,
    title: "Set Saving Goals",
    description: "Create personalized goals and watch your progress grow with visual trackers.",
  },
  {
    image: onboarding3,
    title: "Get Smart Insights",
    description: "Receive AI-powered suggestions to optimize your budget and save more.",
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/auth");
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6 pb-32">
        <div className="w-full max-w-md animate-fade-in">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-72 h-72 object-contain mx-auto mb-12"
          />
          <h2 className="text-3xl font-bold text-center mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-lg text-muted-foreground text-center px-6">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Dots indicator */}
        <div className="flex gap-2 mt-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-card border-t border-border">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          {currentSlide > 0 ? (
            <Button
              variant="ghost"
              size="lg"
              onClick={handleBack}
              className="gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="lg"
              onClick={handleSkip}
            >
              Skip
            </Button>
          )}

          <Button
            size="lg"
            onClick={handleNext}
            className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
