import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2D4F3F] text-white py-16 mt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="text-6xl font-black tracking-tighter mb-6">
          KeenKeeper
        </div>
        <p className="max-w-2xl mx-auto opacity-80 text-lg mb-10">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        <div className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-6">Social Links</h3>
          <div className="flex justify-center gap-4">
            <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2D4F3F] hover:bg-gray-200 transition-colors cursor-pointer">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2D4F3F] hover:bg-gray-200 transition-colors cursor-pointer">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#2D4F3F] hover:bg-gray-200 transition-colors cursor-pointer">
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
            <a className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
            <a className="hover:text-white transition-colors cursor-pointer">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
