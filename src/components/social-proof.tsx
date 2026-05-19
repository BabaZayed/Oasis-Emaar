"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Home, TrendingUp, MapPin, Clock, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NotificationMessage {
  text: string;
  icon: LucideIcon;
  location?: string;
}

const NOTIFICATION_MESSAGES: NotificationMessage[] = [
  { text: "12 people are viewing The Oasis right now", icon: Users },
  { text: "Someone from Dubai just inquired about Palmiera villas", icon: Home, location: "Dubai" },
  { text: "3 units sold this week in Mirage cluster", icon: TrendingUp },
  { text: "A buyer from London just reserved a Mareva mansion", icon: Star, location: "London" },
  { text: "24 people browsing Palmiera Collective listings", icon: Users },
  { text: "Someone from Abu Dhabi requested a viewing for Lavita", icon: Home, location: "Abu Dhabi" },
  { text: "5 offers made on Oasis properties today", icon: TrendingUp },
  { text: "A family from Mumbai just inquired about 6BR villas", icon: Home, location: "Mumbai" },
  { text: "18 people comparing floor plans right now", icon: Users },
  { text: "Someone from Riyadh booked a site visit for this weekend", icon: MapPin, location: "Riyadh" },
  { text: "2 units in Mareva sold in the last 48 hours", icon: TrendingUp },
  { text: "A buyer from Singapore asked about investment returns", icon: Star, location: "Singapore" },
  { text: "31 people viewing Address Villas Tierra this hour", icon: Users },
  { text: "Someone from Moscow just downloaded the brochure", icon: Home, location: "Moscow" },
  { text: "Golden Visa inquiries up 40% this month", icon: TrendingUp },
];

const STORAGE_KEY = "oasis-social-proof-last-seen";
const INITIAL_DELAY = 10000; // 10 seconds before first notification
const DISPLAY_DURATION = 5000; // 5 seconds visible
const MIN_INTERVAL = 15000; // 15 seconds between notifications
const MAX_INTERVAL = 25000; // 25 seconds between notifications

function getRandomInterval(): number {
  return Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
}

function getRandomNotification(lastIndex: number): number {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * NOTIFICATION_MESSAGES.length);
  } while (idx === lastIndex && NOTIFICATION_MESSAGES.length > 1);
  return idx;
}

export default function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [initialized, setInitialized] = useState(false);
  const lastIndexRef = useRef(-1);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    function showNotification() {
      const idx = getRandomNotification(lastIndexRef.current);
      lastIndexRef.current = idx;
      setMessageIndex(idx);
      setVisible(true);

      try {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      } catch {
        // localStorage unavailable
      }

      // Hide after display duration
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, DISPLAY_DURATION);
      timersRef.current.push(hideTimer);
    }

    function scheduleNext() {
      const delay = getRandomInterval();
      const showTimer = setTimeout(() => {
        showNotification();
        // Schedule the next one after this one finishes displaying
        const nextTimer = setTimeout(() => {
          scheduleNext();
        }, DISPLAY_DURATION + 500);
        timersRef.current.push(nextTimer);
      }, delay);
      timersRef.current.push(showTimer);
    }

    // Initial delay — only show after user has been on site for 10 seconds
    const initTimer = setTimeout(() => {
      setInitialized(true);
      showNotification();
      // Schedule subsequent notifications
      const nextTimer = setTimeout(() => {
        scheduleNext();
      }, DISPLAY_DURATION + 500);
      timersRef.current.push(nextTimer);
    }, INITIAL_DELAY);
    timersRef.current.push(initTimer);

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  if (!initialized || messageIndex < 0) return null;

  const notification = NOTIFICATION_MESSAGES[messageIndex];
  if (!notification) return null;

  const IconComponent = notification.icon;

  return (
    <div className="fixed bottom-24 left-4 z-40 sm:left-6 sm:bottom-28" aria-live="polite">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={`social-proof-${messageIndex}`}
            initial={{ opacity: 0, y: 30, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, x: -20, scale: 0.9 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="bg-[#1A2332] border border-[#C8A45C]/30 rounded-xl shadow-2xl px-4 py-3 max-w-[300px] sm:max-w-[340px] relative overflow-hidden"
          >
            {/* Gold accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />

            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-9 h-9 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-4 h-4 text-[#1A2332]" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm leading-snug font-body">
                  {notification.text}
                </p>
                {notification.location && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#C8A45C]" />
                    <span className="text-[#C8A45C] text-xs font-body">{notification.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 mt-1.5">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-400 text-[11px] font-body">Just now</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
