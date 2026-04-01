const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  observer.observe(item);
});

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
  
  const closeBtn = document.querySelector('.close-menu-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      nav.classList.remove('is-open');
    });
  }

  // Close menu on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
    });
  });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  body.classList.add('dark-theme');
  if (themeToggle) themeToggle.innerHTML = sunIcon;
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    
    // Update icon
    themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}
