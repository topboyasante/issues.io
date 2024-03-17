import Navbar from "@/components/navigation/navbar";

interface LandingPageProps {
  children: React.ReactNode;
}

export default function LandingPage({ children }: LandingPageProps) {
  return (
    <div>
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  );
}
