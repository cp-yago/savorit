import Logo from "@/components/Logo";
import Header from "./components/header";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center  bg-red-100 p-4 min-h-dvh">
      <Header />
      <Logo className="my-12" />
      <Hero />
    </div>
  );
}
