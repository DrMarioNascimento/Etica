(() => {
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('motion-in-view', entry.isIntersecting));
  }) : null;
  document.querySelectorAll('.animated-card-art').forEach(art => {
    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'art-motion-control';
    function label() {
      const text = art.classList.contains('motion-paused') ? art.dataset.playLabel : art.dataset.pauseLabel;
      control.setAttribute('aria-label', text);
      control.title = text;
    }
    control.addEventListener('click', () => { art.classList.toggle('motion-paused'); label(); });
    label();
    art.appendChild(control);
    if (observer) observer.observe(art);
    else art.classList.add('motion-in-view');
  });
})();
