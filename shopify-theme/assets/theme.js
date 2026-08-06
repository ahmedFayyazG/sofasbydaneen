(() => {
  const menuButton = document.querySelector(".mobile-menu");
  const nav = document.querySelector("#primary-navigation");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      menuButton.textContent = isOpen ? "CLOSE" : "MENU";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        menuButton.textContent = "MENU";
      });
    });
  }

  const videos = document.querySelectorAll("video[data-src]");
  if (!videos.length) return;

  const loadVideo = (video) => {
    if (video.dataset.loaded === "true") return;
    video.src = video.dataset.src;
    video.preload = "auto";
    video.dataset.loaded = "true";
    video.load();
    video.play().catch(() => undefined);
  };

  if (!("IntersectionObserver" in window)) {
    videos.forEach(loadVideo);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadVideo(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "500px 0px" },
  );

  videos.forEach((video) => observer.observe(video));
})();
