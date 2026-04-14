import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata = {
  title: "KeenKeeper",
  description: "Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-[70vh]">
          {children}
        </main>
      </body>
    </html>
  );
}
