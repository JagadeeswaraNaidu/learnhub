"use client";

import { motion } from "framer-motion";
import { Flame, ArrowUpRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface HeroTileProps {
  name: string;
  streak: number;
}

export default function HeroTile({ name, streak }: HeroTileProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="col-span-full lg:col-span-2"
    >
      <Card glass className="p-8 relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#6366F1]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#06B6D4]/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <section className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl lg:text-4xl font-bold"
              >
                Welcome back,{" "}
                <span className="gradient-text">{name}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-[#A1A1AA] text-base max-w-md"
              >
                You&apos;re on a roll! Keep up the momentum and continue your
                learning journey today.
              </motion.p>
            </section>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="flex items-center gap-4"
            >
              <section className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111111] border border-[#262626]">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                >
                  <Flame size={22} className="text-[#F59E0B]" />
                </motion.div>
                <div>
                  <p className="text-xl font-bold text-white">{streak}</p>
                  <p className="text-[10px] text-[#52525B] font-medium uppercase tracking-wider">
                    Day Streak
                  </p>
                </div>
              </section>

              <Button icon={<ArrowUpRight size={16} />}>
                Continue
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}
