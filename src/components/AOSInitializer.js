"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      once: false,        
      duration: 700,
      offset: 120,
      easing: "ease-out-cubic",
      mirror: false       
    });
    AOS.refresh();
  }, []);

  return null;
}
