"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Phone, MessageSquare, Video, Clock, Target, Calendar, 
  Archive, Trash2
} from "lucide-react";
import friendsData from "@/data/friends.json";
import { motion } from "motion/react";
import toast, { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function FriendDetail() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundFriend = friendsData.find(f => f.id === Number(id));
    if (foundFriend) {
      setFriend(foundFriend);
    }
    setLoading(false);
  }, [id]);

  const handleCheckIn = (type) => {
    if (!friend) return;

    const newEntry = {
      id: Date.now().toString(),
      friendId: friend.id,
      friendName: friend.name,
      type,
      date: new Date().toISOString(),
      title: `${type} with ${friend.name}`
    };

    // Save to localStorage
    const existingTimeline = JSON.parse(localStorage.getItem("friend_timeline") || "[]");
    localStorage.setItem("friend_timeline", JSON.stringify([newEntry, ...existingTimeline]));

    toast.success(`${type} logged successfully!`, {
      icon: type === "Call" ? "📞" : type === "Text" ? "💬" : "🎥",
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!friend) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">Friend Not Found</h2>
      <button onClick={() => router.push("/")} className="btn btn-primary">Back to Home</button>
    </div>
  );

  const statusColors = {
    "overdue": "badge-overdue",
    "almost due": "badge-almost-due",
    "on-track": "badge-on-track",
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Friend Info Card */}
        <div className="lg:col-span-4 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card bg-white shadow-sm border border-gray-100 overflow-hidden rounded-xl"
          >
            <div className="card-body p-8 items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-gray-50">
                <img 
                  src={friend.picture} 
                  alt={friend.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">{friend.name}</h2>
              
              <div className={cn("px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4", statusColors[friend.status])}>
                {friend.status}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {friend.tags.map(tag => (
                  <div key={tag} className="px-2 py-0.5 bg-[#E8F5E9] text-primary text-[10px] font-bold rounded uppercase tracking-wider">
                    {tag}
                  </div>
                ))}
              </div>

              <p className="text-gray-500 italic mb-4">"{friend.bio}"</p>
              <p className="text-xs text-gray-400">Preferred: email</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-3">
            <button className="btn bg-white border-gray-200 text-[#1A1A1A] hover:bg-gray-50 h-14 min-h-0 rounded-xl gap-3 font-bold shadow-sm">
              <Clock className="w-5 h-5" /> Snooze 2 Weeks
            </button>
            <button className="btn bg-white border-gray-200 text-[#1A1A1A] hover:bg-gray-50 h-14 min-h-0 rounded-xl gap-3 font-bold shadow-sm">
              <Archive className="w-5 h-5" /> Archive
            </button>
            <button className="btn bg-white border-gray-200 text-red-500 hover:bg-red-50 h-14 min-h-0 rounded-xl gap-3 font-bold shadow-sm">
              <Trash2 className="w-5 h-5" /> Delete
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Days Since Contact", value: friend.days_since_contact, icon: Clock, color: "text-gray-400" },
              { label: "Goal (Days)", value: friend.goal, icon: Target, color: "text-gray-400" },
              { label: "Next Due", value: "Feb 27, 2026", icon: Calendar, color: "text-gray-400" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="text-2xl font-black mb-2 text-[#244D3F]">{stat.value}</div>
                <div className="text-base opacity-50 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Relationship Goal Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card bg-white shadow-sm border border-gray-100 rounded-xl"
          >
            <div className="card-body p-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-[#244D3F]">Relationship Goal</h2>
                <button className="btn btn-sm bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 px-4 rounded-md">
                  Edit
                </button>
              </div>
              <p className="text-lg text-gray-600">Connect every <span className="font-black text-[#1A1A1A]">{friend.goal} days</span></p>
            </div>
          </motion.div>

          {/* Quick Check-In Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card bg-white shadow-sm border border-gray-100 rounded-xl"
          >
            <div className="card-body p-10">
              <h2 className="text-2xl font-black text-[#244D3F] mb-8">Quick Check-In</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <button 
                  onClick={() => handleCheckIn("Call")}
                  className="btn bg-gray-50 border-gray-100 text-[#1A1A1A] hover:bg-gray-100 h-24 flex flex-col gap-2 rounded-xl shadow-sm border-none"
                >
                  <Phone className="w-6 h-6" /> Call
                </button>
                <button 
                  onClick={() => handleCheckIn("Text")}
                  className="btn bg-gray-50 border-gray-100 text-[#1A1A1A] hover:bg-gray-100 h-24 flex flex-col gap-2 rounded-xl shadow-sm border-none"
                >
                  <MessageSquare className="w-6 h-6" /> Text
                </button>
                <button 
                  onClick={() => handleCheckIn("Video")}
                  className="btn bg-gray-50 border-gray-100 text-[#1A1A1A] hover:bg-gray-100 h-24 flex flex-col gap-2 rounded-xl shadow-sm border-none"
                >
                  <Video className="w-6 h-6" /> Video
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
