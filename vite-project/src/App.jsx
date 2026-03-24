import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";

import Navbar from "./components/navbar.jsx";
import Hero from "./components/Hero.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className="h-dvh bg-black" />
    </main>
  );
};

export default App;
