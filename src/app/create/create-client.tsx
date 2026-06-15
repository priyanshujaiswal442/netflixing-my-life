"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { QUESTIONS } from "@/lib/constants";
import type { UserAnswers } from "@/types";

const initialAnswers: UserAnswers = {
  name: "",
  age: "",
  occupation: "",
  biggestAchievement: "",
  biggestChallenge: "",
  currentGoal: "",
  dreamDestination: "",
  hobbies: "",
  lifeChangingEvent: "",
  selfDescription: "",
};

export function CreatePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>(initialAnswers);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const question = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;
  const currentValue = answers[question.key];
  const canProceed = currentValue.trim().length > 0;

  const handleChange = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [question.key]: value }));
      setError(null);
    },
    [question.key]
  );

  const handleNext = useCallback(() => {
    if (!canProceed) return;
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [canProceed, currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    if (!canProceed) return;
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate series");
      }

      const data = await response.json();
      router.push(`/series/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsGenerating(false);
    }
  }, [answers, canProceed, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && question.type === "text" && canProceed) {
        e.preventDefault();
        if (currentStep < QUESTIONS.length - 1) {
          handleNext();
        } else {
          handleSubmit();
        }
      }
    },
    [canProceed, currentStep, handleNext, handleSubmit, question.type]
  );

  if (isGenerating) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
          </motion.div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Creating your series
          </h2>
          <p className="mt-3 text-muted">
            Our writers are crafting your Netflix Original...
          </p>
          <div className="mt-8 mx-auto max-w-xs">
            <Progress value={75} className="h-1" />
          </div>
          <p className="mt-4 text-sm text-muted">
            This usually takes 30–60 seconds
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pt-24 pb-16 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted">
          <span>
            Question {currentStep + 1} of {QUESTIONS.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="mt-2" aria-label="Progress" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {question.label}
          </h1>

          <div className="mt-8">
            {question.type === "textarea" ? (
              <Textarea
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={question.placeholder}
                aria-label={question.label}
                autoFocus
              />
            ) : (
              <Input
                type="text"
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={question.placeholder}
                aria-label={question.label}
                autoFocus
              />
            )}
          </div>

          {error && (
            <p className="mt-4 text-sm text-primary" role="alert">
              {error}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0}
          aria-label="Go to previous question"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {currentStep < QUESTIONS.length - 1 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            aria-label="Go to next question"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed}
            aria-label="Generate your series"
          >
            <Sparkles className="h-4 w-4" />
            Create My Series
          </Button>
        )}
      </div>
    </div>
  );
}
