(() => {
  const phone = document.querySelector('img[src="assets/icons/smartphone.png"]')?.parentElement;
  if (phone) {
    phone.classList.add('animated-card-art', 'phone-art');
    phone.removeAttribute('aria-hidden');
    phone.dataset.pauseLabel = 'Pausar brilho da tela';
    phone.dataset.playLabel = 'Retomar brilho da tela';
    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    glow.setAttribute('viewBox', '0 0 512 512');
    glow.setAttribute('class', 'phone-screen-glow');
    glow.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M207 90H229Q229 103 242 103H274Q288 103 288 90H308Q338 90 338 119V358Q338 388 308 388H208Q178 388 178 358V119Q178 90 207 90Z');
    glow.appendChild(path);
    phone.appendChild(glow);
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle('motion-in-view', entry.isIntersecting));
  }) : null;
  document.querySelectorAll('.animated-card-art').forEach(art => {
    const control = document.createElement('button');
    control.type = 'button';
    control.className = 'art-motion-control';
    function label() {
      const paused = art.classList.contains('motion-paused');
      const text = paused ? art.dataset.playLabel : art.dataset.pauseLabel;
      control.setAttribute('aria-label', text);
      control.setAttribute('aria-pressed', String(paused));
      control.title = text;
    }
    control.addEventListener('click', () => { art.classList.toggle('motion-paused'); label(); });
    label();
    art.appendChild(control);
    if (observer) observer.observe(art);
    else art.classList.add('motion-in-view');
  });
  const trolley = document.querySelector('.trolley-art');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  // Disjoint windows with fully dark gaps. Visibility/pause only masks the
  // current level: it never shifts an individual light's phase.
  function envelope(t, start, end) {
    if (t <= start || t >= end) return 0;
    const edge = Math.min(1, (t - start) / 650, (end - t) / 650);
    return edge * edge * (3 - 2 * edge);
  }
  function updateLights(now) {
    const phase = now % 10000;
    const blocked = document.hidden || document.body.classList.contains('modal-open') || reduced.matches;
    [[trolley, envelope(phase, 500, 3700)], [phone, envelope(phase, 5200, 8500)]].forEach(([art, level]) => {
      if (!art) return;
      const enabled = !blocked && art.classList.contains('motion-in-view') && !art.classList.contains('motion-paused');
      art.style.setProperty('--light-level', String(enabled ? level : 0));
    });
    requestAnimationFrame(updateLights);
  }
  requestAnimationFrame(updateLights);
})();
