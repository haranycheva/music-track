"use client"

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function MyToaster() {
  useEffect(() => {
    const container = document.querySelector(".your-toast-class");
    if (container) {
      container.setAttribute("data-testid", "toast-container");
    }
  }, []);

  return <Toaster containerClassName="your-toast-class" />;
}
