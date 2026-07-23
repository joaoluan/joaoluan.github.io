(() => {
  const languageButton = document.getElementById("languageButton");
  const menuButton = document.getElementById("menuButton");
  const navPanel = document.getElementById("navPanel");
  const cvLinks = [
    document.getElementById("cvLink"),
    document.getElementById("contactCvLink")
  ].filter(Boolean);
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];

  const copy = {
    pt: {
      documentTitle: "João Moura | Full Stack, SaaS e Automação",
      description: "Desenvolvedor Full Stack com experiência prática em SaaS para restaurantes, Node.js, PostgreSQL, Docker, APIs, WhatsApp e operação em VPS.",
      languageLabel: "Mudar idioma para inglês",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      navLabel: "Navegação principal",
      brandLabel: "João Moura — início",
      ticketLabel: "Fluxo sanitizado do MyFoodLink",
      proofLabel: "Evidências profissionais",
      architectureLabel: "Arquitetura sanitizada do MyFoodLink",
      technologiesLabel: "Tecnologias",
      cv: "curriculo-joao-moura-pt.pdf"
    },
    en: {
      documentTitle: "João Moura | Full Stack, SaaS and Automation",
      description: "Full Stack Developer with hands-on experience in restaurant SaaS, Node.js, PostgreSQL, Docker, APIs, WhatsApp and VPS operations.",
      languageLabel: "Mudar idioma para português",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      navLabel: "Main navigation",
      brandLabel: "João Moura — home",
      ticketLabel: "Sanitized MyFoodLink flow",
      proofLabel: "Professional evidence",
      architectureLabel: "Sanitized MyFoodLink architecture",
      technologiesLabel: "Technologies",
      cv: "resume_en.pdf"
    }
  };

  let currentLanguage = "pt";

  function safeStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The language toggle still works when storage is unavailable.
    }
  }

  function setMenu(open) {
    navPanel.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? copy[currentLanguage].closeMenu : copy[currentLanguage].openMenu);
  }

  function setLanguage(language) {
    currentLanguage = language === "en" ? "en" : "pt";
    const selected = copy[currentLanguage];

    document.documentElement.lang = currentLanguage === "pt" ? "pt-BR" : "en";
    document.title = selected.documentTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", selected.description);
    document.querySelector(".nav")?.setAttribute("aria-label", selected.navLabel);
    document.querySelector(".brand")?.setAttribute("aria-label", selected.brandLabel);
    document.querySelector(".service-ticket")?.setAttribute("aria-label", selected.ticketLabel);
    document.querySelector(".proof-bar")?.setAttribute("aria-label", selected.proofLabel);
    document.querySelector(".architecture")?.setAttribute("aria-label", selected.architectureLabel);
    document.querySelector(".project-featured .project-stack")?.setAttribute("aria-label", selected.technologiesLabel);

    languageButton.textContent = currentLanguage === "pt" ? "EN" : "PT";
    languageButton.setAttribute("aria-label", selected.languageLabel);
    cvLinks.forEach((link) => {
      link.href = selected.cv;
    });

    const menuOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-label", menuOpen ? selected.closeMenu : selected.openMenu);
    safeStorageSet("portfolio-language", currentLanguage);
  }

  function setActiveSection() {
    const offset = window.scrollY + 150;
    let activeId = "";

    for (const section of sections) {
      if (section.offsetTop <= offset) activeId = section.id;
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  languageButton.addEventListener("click", () => {
    setLanguage(currentLanguage === "pt" ? "en" : "pt");
  });

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      menuButton.getAttribute("aria-expanded") === "true" &&
      !navPanel.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      setMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) setMenu(false);
  });

  window.addEventListener("scroll", setActiveSection, { passive: true });

  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const storedLanguage = safeStorageGet("portfolio-language");
  setLanguage(requestedLanguage === "en" || (requestedLanguage !== "pt" && storedLanguage === "en") ? "en" : "pt");
  setMenu(false);
  setActiveSection();
  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
