// Smooth Scrolling and Active Link Highlighting

document.addEventListener('DOMContentLoaded', function() {
  // Get all nav links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section, [class*="section-"]');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  // Handle navbar link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default for anchor links
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        // Get the target section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          // Remove active class from all links
          navLinks.forEach(navLink => {
            navLink.classList.remove('active');
          });
          
          // Add active class to current link
          this.classList.add('active');
          
          // Scroll to section smoothly
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Close mobile navbar if open
          if (navbarCollapse.classList.contains('show')) {
            const toggleBtn = document.querySelector('.navbar-toggler');
            toggleBtn.click();
          }
        }
      }
    });
  });

  // Update active link on scroll (for when user scrolls manually)
  window.addEventListener('scroll', function() {
    let currentSection = '';
    
    const allSections = document.querySelectorAll('[id]');
    allSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 100) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Handle logo click to go home
  const logoLink = document.querySelector('.navbar-brand');
  if (logoLink) {
    logoLink.addEventListener('click', function(e) {
      e.preventDefault();
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update active link
        navLinks.forEach(link => link.classList.remove('active'));
        const firstLink = navLinks[0];
        if (firstLink) firstLink.classList.add('active');
      }
    });
  }
});
