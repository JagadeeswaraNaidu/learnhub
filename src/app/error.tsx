"use client";

import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#EF4444]/10 mb-5"
          >
            <AlertCircle className="text-[#EF4444]" size={32} />
          </motion.div>

          <h2 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-[#A1A1AA] mb-6">
            {error.message || "Failed to load dashboard data"}
          </p>

          <Button
            onClick={reset}
            icon={<RefreshCw size={16} />}
          >
            Try Again
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
