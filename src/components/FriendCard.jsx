import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FriendCard({ friend }) {
  const statusColors = {
    "overdue": "badge-overdue",
    "almost due": "badge-almost-due",
    "on-track": "badge-on-track",
  };

  return (
    <Link 
      href={`/friend/${friend.id}`}
      className="card bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden group rounded-xl"
    >
      <div className="card-body p-8 items-center text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-50">
          <img 
            src={friend.picture} 
            alt={friend.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <h2 className="text-xl font-black text-[#1A1A1A] mb-1">{friend.name}</h2>
        <p className="text-xs font-medium text-gray-400 mb-4">{friend.days_since_contact}d ago</p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {friend.tags.map((tag) => (
            <div key={tag} className="px-2 py-0.5 bg-[#E8F5E9] text-[#2D4F3F] text-[10px] font-bold rounded uppercase tracking-wider">
              {tag}
            </div>
          ))}
        </div>

        <div className={cn(
          "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
          statusColors[friend.status]
        )}>
          {friend.status}
        </div>
      </div>
    </Link>
  );
}
