"use client";

import { useState, useEffect } from "react";
import { UserPlus, Users, Calendar, Clock, CheckCircle } from "lucide-react";
import friendsData from "@/data/friends.json";
import { motion } from "motion/react";

export default function Home() {
  const [loading, setLoading] = useState(true);



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
          <button className="btn bg-[#2D4F3F] text-white hover:bg-[#1E352A] px-8 h-12 min-h-0 rounded-md gap-2 border-none">
            <UserPlus className="w-5 h-5" />
            Add a Friend
          </button>
        </motion.div>


      </section>

      
    </div>
  );
}
