document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('feat-carousel');
    const btnLeft = document.getElementById('feat-btn-left');
    const btnRight = document.getElementById('feat-btn-right');

    // --- Arrow Button Navigation ---
    // Scrolls the width of roughly one card (400px) when clicked
    if (btnLeft && btnRight && carousel) {
      btnLeft.addEventListener('click', () => {
        carousel.scrollBy({ left: -400, behavior: 'smooth' });
      });

      btnRight.addEventListener('click', () => {
        carousel.scrollBy({ left: 400, behavior: 'smooth' });
      });

      // --- Mouse Drag to Scroll ---
      let isDown = false;
      let startX;
      let scrollLeft;

      carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('dragging'); // Applies the grabbing cursor & removes snap
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });

      carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('dragging');
      });

      carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('dragging');
      });

      carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault(); // Prevents text selection while dragging
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5; // Multiply by 1.5 to make scrolling slightly faster
        carousel.scrollLeft = scrollLeft - walk;
      });
    }
  });