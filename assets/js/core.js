/*////////////////////////////////////////////////////////////////////////////////////////////////////*/

/* INTRO FADE */

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/
document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded'); // Debug check
  
    // Get the #intro container
    const intro = document.querySelector('#intro');
  
    // Add class to #intro after a short delay to trigger animation
    if (intro) {
      setTimeout(function () {
        intro.classList.add('show');
        console.log('Intro animation triggered');
      }, 200); // Optional delay for smooth effect
    } else {
      console.error('#intro not found');
    }
  });
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/

/* INTRO SCROLL FADE */

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/
document.addEventListener('DOMContentLoaded', function () {
    // Define scroll position to trigger change
    const scrollTrigger = 100; // Adjust this value if needed
  
    // Get elements using #intro
    const heading = document.querySelector('#intro h2');
    const description = document.querySelector('#intro p');
    const button = document.querySelector('#intro .button');
  
    // Check if elements exist before applying logic
    if (heading && description && button) {
      // Set initial opacity for description and button
      description.style.opacity = '60%';
      button.style.opacity = '60%';

      // Add scroll event listener
      window.addEventListener('scroll', function () {
        if (window.scrollY > scrollTrigger) {
          heading.style.opacity = '60%'; // H1 to 24%
          description.style.opacity = '100%'; // Paragraph to 100%
          button.style.opacity = '100%'; // Button to 100%
        } else {
          heading.style.opacity = '100%'; // Reset to full opacity
          description.style.opacity = '60%'; // Hide when not scrolled enough
          button.style.opacity = '60%'; // Hide button initially
        }
      });
    }
  });
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/

/* CASESTUDY BODY BG */

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/
  document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded');
  
    // Get all .casestudy sections
    const caseStudies = document.querySelectorAll('.fade');
  
    // Function to change body class
    function updateBodyClass(id) {
      // Remove any existing body classes starting with 'bg-'
      document.body.className = document.body.className
        .split(' ')
        .filter(c => !c.startsWith('bg-'))
        .join(' ');
  
      // Add new class based on casestudy ID
      document.body.classList.add(`bg-${id}`);
    }
  
    // Create an IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id; // Get the ID of the casestudy
            updateBodyClass(id);
          }
        });
      },
      {
        threshold: 0.75, // Trigger when 50% of section is visible
        rootMargin: '-10px 0px 0px 0px', // Trigger slightly before hitting the top
      }
    );
  
    // Observe each .casestudy section
    caseStudies.forEach((section) => {
      observer.observe(section);
    });
  });
