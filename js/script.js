// Interactions légères : menu mobile, apparition au défilement et emplacement vidéo.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(opened));
      toggle.setAttribute("aria-label", opened ? "Fermer le menu" : "Ouvrir le menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll(".current-year").forEach(el => el.textContent = new Date().getFullYear());

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Pour intégrer une vidéo : renseignez l'URL d'intégration dans data-video-url
  // sur .video-frame dans index.html, par exemple https://www.youtube.com/embed/IDENTIFIANT
  const videoFrame = document.querySelector(".video-frame");
  const playButton = document.querySelector(".video-play");
  if (videoFrame && playButton) {
    const videoUrl = videoFrame.dataset.videoUrl.trim();
    if (videoUrl) {
      playButton.addEventListener("click", () => {
        const iframe = document.createElement("iframe");
        iframe.src = videoUrl + (videoUrl.includes("?") ? "&" : "?") + "autoplay=1";
        iframe.title = "Vidéo de présentation de Clippy Coach";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:20px";
        videoFrame.querySelector(".video-placeholder").replaceWith(iframe);
        videoFrame.querySelector(".video-caption")?.remove();
      });
    } else {
      playButton.addEventListener("click", () => {
        videoFrame.classList.add("is-playing");
        videoFrame.querySelector(".video-label").textContent = "Votre vidéo prendra place ici";
        videoFrame.querySelector(".video-placeholder small").textContent = "Ajoutez son lien dans index.html pour activer la lecture.";
      });
    }
  }
});
