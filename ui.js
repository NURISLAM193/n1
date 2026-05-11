document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector("#mobile-menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      mobileMenu.classList.toggle("hidden", isExpanded);
    });
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = "https://nurislam193.github.io/n3/";
    });
  });

  setupHeroCarousel();
  setupProductCarousel();
  setupTestimonials();
  setupFaqAccordions();
});

function setupHeroCarousel() {
  const slides = [
    {
      badge: "Best Seller",
      image: "./images/c4510a7f30bfac968bd533c80e6258f53e496b9b.png",
      alt: "Yellow Casual Jacket",
      tags: ["Hoodie", "Casual Jacket", "Full Sleeve"],
    },
    {
      badge: "New Arrival",
      image: "./images/bd7b653987791f165cce045ab34f37a37b0b3a8d.png",
      alt: "Green Hoodie Jacket",
      tags: ["Hoodie", "Urban Jacket", "Soft Lining"],
    },
    {
      badge: "Popular",
      image: "./images/30c9f2bd350702f764639aee18834154a078af82.png",
      alt: "Classic Polo Shirt",
      tags: ["Polo", "Casual Shirt", "Short Sleeve"],
    },
  ];

  const prev = document.querySelector("#hero-prev");
  const next = document.querySelector("#hero-next");
  const badge = document.querySelector("#hero-badge");
  const image = document.querySelector("#hero-image");
  const tags = [
    document.querySelector("#hero-tag-1"),
    document.querySelector("#hero-tag-2"),
    document.querySelector("#hero-tag-3"),
  ];
  if (!prev || !next || !badge || !image || tags.some((tag) => !tag)) return;

  let index = 0;
  const render = () => {
    const slide = slides[index];
    badge.textContent = slide.badge;
    image.src = slide.image;
    image.alt = slide.alt;
    tags[0].textContent = slide.tags[0];
    tags[1].textContent = slide.tags[1];
    tags[2].lastChild.textContent = ` ${slide.tags[2]}`;
  };
  const move = (direction) => {
    index = (index + direction + slides.length) % slides.length;
    render();
  };

  prev.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  render();
}

function setupProductCarousel() {
  const grid = document.querySelector("#product-grid");
  const prev = document.querySelector("#page-prev");
  const next = document.querySelector("#page-next");
  const progress = document.querySelector("#page-progress");
  if (!grid || !prev || !next) return;

  let step = 0;
  const updateProgress = () => {
    const total = grid.children.length || 1;
    step = (step + total) % total;
    if (progress) progress.style.width = `${((step + 1) / total) * 100}%`;
  };
  const rotate = (direction) => {
    const cards = [...grid.children];
    if (cards.length <= 1) return;
    if (direction === "next") {
      grid.appendChild(cards[0]);
      step += 1;
    } else {
      grid.prepend(cards[cards.length - 1]);
      step -= 1;
    }
    updateProgress();
  };

  prev.addEventListener("click", () => rotate("prev"));
  next.addEventListener("click", () => rotate("next"));
  updateProgress();
}

function setupTestimonials() {
  const prevButton = document.querySelector("#testimonial-prev");
  const nextButton = document.querySelector("#testimonial-next");
  const grid = document.querySelector("#testimonials .grid");
  if (!prevButton || !nextButton || !grid) return;

  const rotate = (direction) => {
    const cards = [...grid.children];
    if (cards.length <= 1) return;
    if (direction === "next") {
      grid.appendChild(cards[0]);
    } else {
      grid.prepend(cards[cards.length - 1]);
    }
  };

  prevButton.addEventListener("click", () => rotate("prev"));
  nextButton.addEventListener("click", () => rotate("next"));
}

function setupFaqAccordions() {
  const sections = document.querySelectorAll('[data-purpose="faq-section"]');
  if (!sections.length) return;

  const answers = {
    "Can I modify my order after placing it?": "Yes. You can modify your order within one hour after checkout by contacting support with your order number.",
    "How do I initiate a return?": "Open your order details, choose the item you want to return, and follow the return instructions. Our team will guide the next steps.",
    "How can I unsubscribe from the newsletter?": "Use the unsubscribe link at the bottom of any Klothink email, or update your email preferences in your account.",
    "Do you offer exchanges for products?": "Yes, exchanges are available within 30 days for items that are unworn and in original condition.",
    "How can I place an order on Klothink?": "Browse products, add your size and color to the cart, then complete checkout with your shipping and payment details.",
    "What payment methods do you accept?": "We accept major cards, PayPal, Apple Pay, and Google Pay.",
    "How can I track my order?": "After dispatch, you will receive a tracking link by email. You can also track it from your account orders.",
    "What is your shipping policy?": "Standard shipping usually takes 3-5 business days, with express options available at checkout.",
    "Are there any additional fees for returns?": "Returns are free within the return window unless the item is outside the policy conditions.",
    "How do I create an account on Klothink?": "Select sign up, enter your email and password, then confirm your account from your inbox.",
    "Can I change my account information?": "Yes. You can update your name, address, email, and password from account settings.",
    "Are my personal details secure on Klothink?": "Yes. Klothink uses secure checkout and protects personal information with standard encryption."
  };

  sections.forEach((section) => {
    section.querySelectorAll(".rounded-xl").forEach((item) => {
      const title = item.querySelector("span")?.textContent?.trim();
      const icon = item.querySelector("i");
      if (!title || !icon) return;

      if (!item.querySelector(".faq-header")) {
        const titleEl = item.querySelector("span");
        const header = document.createElement("div");
        header.className = "faq-header flex w-full items-start justify-between gap-4";
        titleEl.classList.add("pr-4");
        icon.classList.add("shrink-0", "mt-0.5");
        header.append(titleEl, icon);
        item.prepend(header);
      }

      item.classList.remove("items-center");
      item.classList.add("flex", "flex-col", "items-stretch");

      item.addEventListener("click", () => {
        const isOpen = item.classList.contains("faq-open");
        section.querySelectorAll(".faq-open").forEach((openItem) => closeFaq(openItem));
        if (!isOpen) openFaq(item, answers[title] || "Please contact our support team for more details.");
      });
    });
  });
}

function openFaq(item, answer) {
  item.classList.add("faq-open");
  const icon = item.querySelector("i");
  if (icon) {
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-xmark");
  }
  if (!item.querySelector(".faq-answer")) {
    const paragraph = document.createElement("p");
    paragraph.className = "faq-answer mt-4 text-sm text-gray-500 leading-relaxed font-normal";
    paragraph.textContent = answer;
    item.appendChild(paragraph);
  }
}

function closeFaq(item) {
  item.classList.remove("faq-open");
  item.querySelector(".faq-answer")?.remove();
  const icon = item.querySelector("i");
  if (icon) {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-plus");
  }
}
