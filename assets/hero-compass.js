/* A imagem é o estado inicial. O vídeo só entra após um carregamento rápido. */
(() => {
  const host = document.getElementById('heroCompass');
  if (!host) return;
  const video = host.querySelector('video');
  const control = host.querySelector('button');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const reducedData = matchMedia('(prefers-reduced-data: reduce)');
  const connection = navigator.connection;
  const supported = Boolean(window.fetch && window.AbortController && URL.createObjectURL && video.canPlayType('video/mp4'));
  let inView = !('IntersectionObserver' in window);
  let pageActive = true, playAttempt = 0;
  let loading = false, failed = false, userPaused = false, playPending = false;
  let controller = null, objectURL = null;

  function allowed() {
    if (!supported || failed || motion.matches || reducedData.matches || navigator.onLine === false || connection?.saveData) return false;
    if (connection?.effectiveType && connection.effectiveType !== '4g') return false;
    return !(typeof connection?.downlink === 'number' && connection.downlink < 1.5);
  }
  function visible() {
    return pageActive && inView && !document.hidden && !document.body.classList.contains('modal-open');
  }
  function updateControl() {
    control.hidden = !objectURL || !allowed();
    host.classList.toggle('is-paused', userPaused);
    const label = userPaused ? 'Reproduzir animação da bússola' : 'Pausar animação da bússola';
    control.setAttribute('aria-label', label);
    control.title = label;
  }
  function stop() {
    playAttempt++;
    controller?.abort();
    video.pause();
    host.classList.remove('is-playing');
  }
  function fail() {
    failed = true;
    stop();
    updateControl();
  }
  async function loadVideo() {
    loading = true;
    const request = new AbortController();
    controller = request;
    let timedOut = false;
    const started = performance.now();
    const timer = setTimeout(() => { timedOut = true; request.abort(); }, 2500);
    try {
      // Também mede a entrega real nos navegadores sem informação da conexão.
      const response = await fetch(video.dataset.src, {signal: request.signal, cache: 'force-cache'});
      if (!response.ok) throw new Error('Media unavailable');
      const blob = await response.blob();
      if (timedOut || performance.now() - started > 2500) { failed = true; return; }
      if (request.signal.aborted || !allowed() || !visible()) return;
      objectURL = URL.createObjectURL(blob);
      video.src = objectURL;
      video.muted = true;
    } catch (_) {
      // Interromper ao sair da área não impede uma nova tentativa ao retornar.
      if (timedOut || !request.signal.aborted) failed = true;
    } finally {
      clearTimeout(timer);
      if (controller === request) controller = null;
      loading = false;
      sync();
    }
  }
  function sync() {
    updateControl();
    if (!allowed() || !visible() || userPaused) { stop(); return; }
    if (!objectURL) { if (!loading) void loadVideo(); return; }
    if (playPending || !video.paused) return;
    playPending = true;
    const attempt = ++playAttempt;
    video.muted = true;
    Promise.resolve(video.play()).catch(() => {
      if (attempt === playAttempt) fail();
    }).finally(() => {
      playPending = false;
      if (attempt !== playAttempt) sync();
    });
  }
  video.addEventListener('playing', () => {
    if (allowed() && visible() && !userPaused) host.classList.add('is-playing');
    else stop();
  });
  video.addEventListener('error', fail);
  control.addEventListener('click', () => { userPaused = !userPaused; sync(); });
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('online', sync);
  window.addEventListener('offline', sync);
  window.addEventListener('pagehide', () => { pageActive = false; stop(); });
  window.addEventListener('pageshow', () => { pageActive = true; sync(); });
  connection?.addEventListener?.('change', sync);
  for (const preference of [motion, reducedData]) preference.addEventListener?.('change', sync);
  new MutationObserver(sync).observe(document.body, {attributes: true, attributeFilter: ['class']});
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      sync();
    }, {threshold: 0}).observe(host);
  }
  sync();
})();
