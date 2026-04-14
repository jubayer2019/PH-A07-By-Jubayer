"use client";

import { useState, useEffect } from "react";
import { Phone, MessageSquare, Video, Clock, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Timeline() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedTimeline = JSON.parse(localStorage.getItem("friend_timeline") || "[]");
    setEntries(savedTimeline);
  }, []);

  const filteredEntries = entries
    .filter(entry => filter === "All" || entry.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getIcon = (type) => {
    switch (type) {
      case "Call": return <Phone className="w-6 h-6 text-gray-600" />;
      case "Text": return <MessageSquare className="w-6 h-6 text-gray-600" />;
      case "Video": return <Video className="w-6 h-6 text-gray-600" />;
      default: return <Users className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-black tracking-tight mb-8 text-[#1A1A1A]">Timeline</h1>
      
      {/* Filters */}
      <div className="mb-8">
        <select 
          className="select select-bordered w-full max-w-xs bg-white border-gray-200 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <motion.div 
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6"
              >
                <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                  {getIcon(entry.type)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-bold text-lg text-[#1A1A1A]">{entry.type}</span>
                    <span className="text-gray-500">with {entry.friendName}</span>
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <Clock className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p className="text-xl font-bold opacity-30">No interactions found.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
