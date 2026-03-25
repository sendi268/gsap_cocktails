import { useGSAP } from "@gsap/react";
import { gsap } from "gsap"; // Tambahkan import ini
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import Plugin
import { useRef, useEffect } from "react";
gsap.registerPlugin(ScrollTrigger); // 2. Registrasi Plugin
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const videoRef = useRef();

  useGSAP(() => {
    // Perbaikan cara inisialisasi SplitType
    const heroSplit = new SplitType(".title", {
      types: "words,chars",
    });

    const paragraphSplit = new SplitType(".subtitle", {
      types: "lines",
    });

    const descSplit = new SplitType(".view-cocktails", { types: "lines" });

    // Menambahkan class ke setiap karakter
    if (heroSplit.chars) {
      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
    }

    // Animasi GSAP
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 3,
      ease: "expo.out",
      stagger: 0.08,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 2,
      ease: "expo.out",
      stagger: 0.08,
      delay: 1.5,
    });

    gsap.from(descSplit.lines, {
      opacity: 0,
      yPercent: 50, // Tidak perlu terlalu jauh naik kebawah agar elegan
      duration: 2,
      ease: "expo.out",
      stagger: 0.1,
      delay: 1.5, // Muncul terakhir
    });

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onLoadedMetadata = () => {
        gsap.to(video, {
          currentTime: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      };
      video.addEventListener("loadedmetadata", onLoadedMetadata);
      // If already loaded
      if (video.readyState >= 1) {
        onLoadedMetadata();
      }
      return () =>
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
    }
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Clasic</p>
              <p className="subtitle text xl">
                Sip The Spirit <br /> Of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p>
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails"> View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0 ">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
