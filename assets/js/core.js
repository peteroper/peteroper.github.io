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
/*////////////////////////////////////////////////////////////////////////////////////////////////////*/

/* CAROUSEL */

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const carousel   = wrap.querySelector('.carousel');
    const slides     = Array.from(wrap.querySelectorAll('.slide'));
    const indicators = wrap.querySelector('.indicators');

    // clear any old dots
    indicators.innerHTML = '';

    // only show indicators if more than one slide
    if (slides.length > 1) {
      slides.forEach((slide, idx) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.addEventListener('click', () => {
          slide.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        });
        indicators.appendChild(dot);
      });

      const dots = Array.from(indicators.children);
      if (dots[0]) dots[0].classList.add('active');

      // on scroll, update active dot
      carousel.addEventListener('scroll', () => {
        const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
      });
    } else {
      indicators.style.display = 'none'; // hide indicators if only one slide
    }
  });
});

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/

/* BEFORE AFTER GALLERY */

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/
window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.ba-container');
  const afterImg  = container.querySelector('.img-ba.after');
  const divider   = container.querySelector('.divider');
  let dragging    = false;
  const spacing   = 8;

  // 1) inject labels
  ['before','after'].forEach(type => {
    const lbl = document.createElement('div');
    lbl.className   = `ba-label ${type}`;
    lbl.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    container.appendChild(lbl);
  });
  const beforeLabel = container.querySelector('.ba-label.before');
  const afterLabel  = container.querySelector('.ba-label.after');

  // 2) position & hide logic
  function updateLabels(offsetX) {
    const cw = container.clientWidth;
    const bw = beforeLabel.offsetWidth;
    const aw = afterLabel.offsetWidth;
    const rawBefore = offsetX - bw - spacing;
    const rawAfter  = offsetX + spacing;

    // place them
    beforeLabel.style.left = rawAfter + 'px';
    afterLabel.style.left  = rawBefore  + 'px';

    // hide if moving out of view
    beforeLabel.style.display = (rawBefore < 0)                      ? 'none' : 'block';
    afterLabel.style.display  = (rawAfter + aw > cw)                ? 'none' : 'block';
  }

  // initial center position
  updateLabels(container.clientWidth / 2);

  // 3) dragging handlers
  const startDrag = e => {
    e.preventDefault();
    dragging = true;
    document.body.style.cursor = 'ew-resize';
  };
  const onDrag = e => {
    if (!dragging) return;
    const rect    = container.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches[0].clientX;
    let offsetX   = clientX - rect.left;
    offsetX       = Math.max(0, Math.min(offsetX, rect.width));
    const pct     = (offsetX / rect.width) * 100;

    // move after-image & divider
    afterImg.style.width = pct + '%';
    divider.style.left   = pct + '%';

    // reposition labels
    updateLabels(offsetX);
  };
  const endDrag = () => {
    dragging = false;
    document.body.style.cursor = '';
  };

  // wire up events
  divider.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup',   endDrag);

  divider.addEventListener('touchstart', startDrag);
  window.addEventListener('touchmove',  onDrag);
  window.addEventListener('touchend',   endDrag);
});

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/

/* VIDEO */

/*////////////////////////////////////////////////////////////////////////////////////////////////////*/
document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.lazy-video');

  // swap in the src when it's about to be shown
  const loadAndPlay = () => {
    if (video.dataset.src) {
      video.src = video.dataset.src;
      video.removeAttribute('data-src');
    }
    video.play().catch(() => {/* play may fail if not muted/autoplay-policies */});
  };

  // only observe if IntersectionObserver is available
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadAndPlay();
          obs.unobserve(video);
        }
      });
    }, { threshold: 0.5 });
    io.observe(video);
  } else {
    // fallback: load immediately
    loadAndPlay();
  }
});
