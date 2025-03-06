import Logo from "@/components/Logo";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center  bg-red-100 p-4 min-h-dvh">
      <Logo className="mb-6" />
      <Hero />
    </div>
  );
}
