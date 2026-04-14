"use client";

import { useState, useEffect } from "react";
import { UserPlus, Users, Calendar, Clock, CheckCircle } from "lucide-react";
import friendsData from "@/data/friends.json";
import FriendCard from "@/components/FriendCard";
import { motion } from "motion/react";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Total Friends", value: friends.length, icon: Users, color: "text-gray-400" },
    { label: "On Track", value: friends.filter(f => f.status === "on-track").length, icon: CheckCircle, color: "text-green-500" },
    { label: "Need Attention", value: friends.filter(f => f.status === "overdue" || f.status === "almost due").length, icon: Clock, color: "text-orange-500" },
    { label: "Interactions This Month", value: 12, icon: Calendar, color: "text-blue-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Banner Section */}
      <section className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-black mb-6 tracking-tighter text-[#1A1A1A]">
            Friends to keep close in your life
          </h1>
          <p className="text-xl opacity-60 max-w-2xl mx-auto mb-10 font-medium">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <button className="btn bg-[#244D3F] text-white hover:bg-[#1E352A] px-8 h-12 min-h-0 rounded-md gap-2 border-none">
            <UserPlus className="w-5 h-5" />
            Add a Friend
          </button>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white py-12 px-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="text-5xl font-black mb-3 text-[#1A1A1A]">{stat.value}</div>
              <div className="text-base opacity-40 font-bold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Your Friends Section */}
      <section>
        <div className="mb-12">
          <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A]">Your Friends</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="loading loading-spinner loading-lg text-[#244D3F]"></span>
            <p className="text-lg font-medium opacity-40">Fetching your friends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {friends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FriendCard friend={friend} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
