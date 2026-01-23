import { Navigation2 } from "@/components/landing/Navigation2";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col">
        <Navigation2 />
     <div>
     {children}
     </div>
    </div>
  );
}