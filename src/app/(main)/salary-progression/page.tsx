"use client";

import { DollarSign } from "lucide-react";

export default function SalaryProgressionPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Salary Progression Estimates
          </h1>
          <p className="text-muted-foreground mt-2">
            Estimate your future earnings based on your career path.
          </p>
        </div>
        <div className="text-center text-muted-foreground py-16 flex flex-col items-center justify-center h-full min-h-96 rounded-lg border border-dashed">
            <DollarSign className="w-16 h-16 mb-4 text-muted-foreground/50"/>
            <p>This feature is coming soon!</p>
        </div>
      </div>
    </div>
  );
}
