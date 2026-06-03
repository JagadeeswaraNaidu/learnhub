"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Check,
  Save,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alex Chen",
    email: "alex@learnhub.dev",
    bio: "Full-stack developer passionate about learning.",
    website: "https://alexchen.dev",
    notifications: {
      email: true,
      push: false,
      weekly: true,
      marketing: false,
    },
    privacy: {
      publicProfile: true,
      showProgress: true,
      showStreak: false,
    },
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 lg:p-8 space-y-6 max-w-4xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-[#A1A1AA] mt-0.5">
            Manage your account and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          icon={saved ? <Check size={16} /> : <Save size={16} />}
          variant={saved ? "success" : "primary"}
        >
          {saved ? "Saved" : "Save Changes"}
        </Button>
      </div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
              <User size={20} className="text-[#6366F1]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Profile</h3>
              <p className="text-sm text-[#A1A1AA]">
                Update your personal information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              icon={<User size={16} />}
            />
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              icon={<Mail size={16} />}
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                rows={3}
                className="input-modern resize-none"
              />
            </div>
            <Input
              label="Website"
              value={formData.website}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, website: e.target.value }))
              }
              icon={<Globe size={16} />}
            />
          </div>
        </Card>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
              {theme === "dark" ? (
                <Moon size={20} className="text-[#8B5CF6]" />
              ) : (
                <Sun size={20} className="text-[#8B5CF6]" />
              )}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Appearance</h3>
              <p className="text-sm text-[#A1A1AA]">
                Customize your visual experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => theme === "light" && toggleTheme()}
              className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all ${
                theme === "dark"
                  ? "border-[#6366F1] bg-[#6366F1]/5"
                  : "border-[#262626] hover:border-[#404040]"
              }`}
            >
              <Moon size={20} className={theme === "dark" ? "text-[#6366F1]" : "text-[#A1A1AA]"} />
              <div className="text-left">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-[#A1A1AA]"}`}>
                  Dark Mode
                </p>
                <p className="text-xs text-[#52525B]">Easier on the eyes</p>
              </div>
              {theme === "dark" && (
                <div className="ml-auto w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => theme === "dark" && toggleTheme()}
              className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all ${
                theme === "light"
                  ? "border-[#6366F1] bg-[#6366F1]/5"
                  : "border-[#262626] hover:border-[#404040]"
              }`}
            >
              <Sun size={20} className={theme === "light" ? "text-[#6366F1]" : "text-[#A1A1AA]"} />
              <div className="text-left">
                <p className={`text-sm font-medium ${theme === "light" ? "text-white" : "text-[#A1A1AA]"}`}>
                  Light Mode
                </p>
                <p className="text-xs text-[#52525B]">Clean and bright</p>
              </div>
              {theme === "light" && (
                <div className="ml-auto w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
            </button>
          </div>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 flex items-center justify-center">
              <Bell size={20} className="text-[#06B6D4]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                Notifications
              </h3>
              <p className="text-sm text-[#A1A1AA]">
                Choose what you want to be notified about
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                key: "email",
                label: "Email Notifications",
                description: "Receive updates via email",
              },
              {
                key: "push",
                label: "Push Notifications",
                description: "Receive push notifications in browser",
              },
              {
                key: "weekly",
                label: "Weekly Digest",
                description: "Get a summary of your weekly progress",
              },
              {
                key: "marketing",
                label: "Marketing Emails",
                description: "Receive news about new courses and features",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-[#262626]"
              >
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-[#52525B]">{item.description}</p>
                </div>
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [item.key]:
                          !prev.notifications[
                            item.key as keyof typeof prev.notifications
                          ],
                      },
                    }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.notifications[
                      item.key as keyof typeof formData.notifications
                    ]
                      ? "bg-[#6366F1]"
                      : "bg-[#262626]"
                  }`}
                >
                  <motion.div
                    animate={{
                      x: formData.notifications[
                        item.key as keyof typeof formData.notifications
                      ]
                        ? 22
                        : 2,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
              <Shield size={20} className="text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Privacy</h3>
              <p className="text-sm text-[#A1A1AA]">
                Control your profile visibility
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                key: "publicProfile",
                label: "Public Profile",
                description: "Allow others to view your profile",
              },
              {
                key: "showProgress",
                label: "Show Progress",
                description: "Display your course progress publicly",
              },
              {
                key: "showStreak",
                label: "Show Streak",
                description: "Display your learning streak publicly",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-[#262626]"
              >
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-[#52525B]">{item.description}</p>
                </div>
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      privacy: {
                        ...prev.privacy,
                        [item.key]:
                          !prev.privacy[
                            item.key as keyof typeof prev.privacy
                          ],
                      },
                    }))
                  }
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    formData.privacy[
                      item.key as keyof typeof formData.privacy
                    ]
                      ? "bg-[#6366F1]"
                      : "bg-[#262626]"
                  }`}
                >
                  <motion.div
                    animate={{
                      x: formData.privacy[
                        item.key as keyof typeof formData.privacy
                      ]
                        ? 22
                        : 2,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Account */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
              <Shield size={20} className="text-[#EF4444]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Account</h3>
              <p className="text-sm text-[#A1A1AA]">
                Manage your account security
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-[#262626]">
              <div>
                <p className="text-sm font-medium text-white">Password</p>
                <p className="text-xs text-[#52525B]">
                  Last changed 3 months ago
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Change
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-[#262626]">
              <div>
                <p className="text-sm font-medium text-white">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-[#52525B]">
                  Add an extra layer of security
                </p>
              </div>
              <Badge variant="warning" size="sm">
                Not Enabled
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#111111] border border-[#262626]">
              <div>
                <p className="text-sm font-medium text-white">
                  Active Sessions
                </p>
                <p className="text-xs text-[#52525B]">
                  2 devices currently logged in
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.section>
  );
}
