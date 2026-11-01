(function () {
  var root = document.getElementById('amDemo');
  if (!root || typeof gsap === 'undefined') return;
  gsap.registerPlugin(TextPlugin);
  root.classList.add('gsap');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var CMD = 'push procurement two weeks';
  var CMD2 = '25 Jan is contractual. get it back without touching actuals';
  var SHIFT = 40;                    /* two weeks on this timescale */
  var SLIP = 16;                     /* four days reach the finish  */
  var msgs = root.querySelector('.msgs');
  /* the transcript outgrows the card at the second exchange, so the timeline
     scrolls it the way a real one would rather than letting the hero stretch.
     A function value, so GSAP reads the height when the tween starts rather
     than when the timeline is built and the later bubbles are still hidden. */
  var toBottom = function () { return msgs.scrollHeight; };

  gsap.utils.toArray(root.querySelectorAll('.clink')).forEach(function (p) {
    var len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = len;
  });

  var tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

  /* act 1 - the schedule builds */
  tl.set('#typed', { text: '' }, 0)
    .set(['#barProcR', '#barFab', '#barDeliv', '#barInst', '#barComm', '#linkPF', '#linkFV', '#linkVI', '#linkIC', '#linkIM', '#diamond'], { x: 0 }, 0)
    .set('#barProcR', { attr: { fill: 'none', width: 90 }, strokeWidth: 1.5 }, 0)
    .set('#linkIM', { scaleX: 1, opacity: 1 }, 0)
    .set(['#linkVI', '#linkIC'], { opacity: 1 }, 0)
    .set(['#linkVIss', '#linkVIff', '#linkIMb'], { opacity: 0 }, 0)
    .set('#diamond', { scale: 1 }, 0)
    .set('#slipTag', { text: '+4d', attr: { x: 560, class: 'rv' } }, 0)
    .set(msgs, { scrollTop: 0 }, 0)
    .fromTo(['#plotCard', '#chatCard'], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 0.15)
    .fromTo('#ddLine', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.55)
    .fromTo(['#barDesign', '#barAppr', '#barProcA', '#barProcR', '#barFab', '#barDeliv', '#barInst', '#barComm'],
      { opacity: 1, scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.4, ease: 'power4.out', stagger: 0.12 }, 0.65)
    .fromTo(['#linkDA', '#linkAP'], { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.15)
    .to(root.querySelectorAll('.clink'), { strokeDashoffset: 0, opacity: 1, duration: 0.35, stagger: 0.14, ease: 'power1.inOut' }, 1.2)
    .fromTo('#floatTail', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.65)
    .fromTo('#diamond', { opacity: 0, y: -84, rotation: 155, transformOrigin: '50% 50%' },
      { opacity: 1, y: 0, rotation: 0, duration: 0.55, ease: 'back.out(1.9)' }, 1.75)

  /* act 2 - the user asks */
    .fromTo('#msgHello', { opacity: 0, y: 8, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 2.3)
    .to('#typed', { text: CMD, duration: 1.5, ease: 'none' }, 2.9)
    .set('#typed', { text: '' }, 4.65)
    .fromTo('#msgUser', { opacity: 0, y: 8, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.35 }, 4.65)
    .fromTo('#dots', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 5.0)
    .to('#dots i', { opacity: 0.25, duration: 0.3, stagger: { each: 0.12, yoyo: true, repeat: 3 } }, 5.1)
    .to('#dots', { opacity: 0, duration: 0.2 }, 6.1)
    .fromTo('#msgReply', { opacity: 0, y: 8, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 6.2)

  /* act 3 - the bars obey. Remaining work stays anchored at the data date and
     EXTENDS (P6 style); actuals never move. */
    .to('#barProcR', { attr: { width: 90 + SHIFT }, duration: 0.7, ease: 'power2.inOut' }, 6.7)
    .set('#barProcR', { attr: { fill: '#E5604A' }, strokeWidth: 0 }, 7.0)
    .to(['#barFab', '#barDeliv', '#barInst', '#barComm'], { x: SHIFT, duration: 0.7, ease: 'power2.inOut', stagger: 0.08 }, 6.8)
    .to(['#linkPF', '#linkFV', '#linkVI', '#linkIC'], { x: SHIFT, duration: 0.7, ease: 'power2.inOut' }, 6.8)
    .to('#linkIM', { x: SLIP, scaleX: 0.294, transformOrigin: 'right center', duration: 0.7, ease: 'power2.inOut' }, 6.85)
    .to('#floatTail', { opacity: 0, duration: 0.3 }, 6.9)
    .to('#diamond', { x: SLIP, duration: 0.6, ease: 'power2.inOut' }, 7.0)
    .to('#diamond', { scale: 1.3, duration: 0.14, yoyo: true, repeat: 1, transformOrigin: '50% 50%', ease: 'power2.inOut' }, 7.65)
    .fromTo('#slipTag', { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35 }, 7.7)

  /* act 4 - the planner pushes back. The first ask moved a bar; this one asks
     the engine to find time inside the logic, which is the job. */
    .to(msgs, { scrollTop: toBottom, duration: 0.4, ease: 'power2.inOut' }, 8.3)
    .to('#typed', { text: CMD2, duration: 1.9, ease: 'none' }, 8.7)
    .set('#typed', { text: '' }, 10.7)
    .fromTo('#msgUser2', { opacity: 0, y: 8, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.35 }, 10.7)
    .to(msgs, { scrollTop: toBottom, duration: 0.35, ease: 'power2.out' }, 10.75)
    .fromTo('#dots2', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 11.05)
    .to('#dots2 i', { opacity: 0.25, duration: 0.3, stagger: { each: 0.12, yoyo: true, repeat: 3 } }, 11.15)
    .to('#dots2', { opacity: 0, duration: 0.2 }, 12.15)
    .fromTo('#msgReply2', { opacity: 0, y: 8, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 12.25)
    .to(msgs, { scrollTop: toBottom, duration: 0.5, ease: 'power2.out' }, 12.3)

  /* act 5 - the overlap lands in the chart. Fabrication does not move and no
     duration shrinks: only the relationship changes, and the finish follows.
     The milestone stays RED throughout. Colour here means criticality, the way
     it does in P6 - green is the data date line - and recovering the date does
     not take the terminal milestone off the longest path. Only the variance
     tag changes, to neutral: zero variance is nothing to flag, not good news. */
    .to('#linkVI', { opacity: 0, duration: 0.25 }, 12.8)
    .to('#linkIM', { opacity: 0, duration: 0.25 }, 12.8)
    .to(['#barInst', '#barComm', '#linkIC'], { x: SHIFT - SLIP, duration: 0.75, ease: 'power2.inOut' }, 12.85)
    .to('#diamond', { x: 0, duration: 0.75, ease: 'power2.inOut' }, 12.9)
    .fromTo('#linkVIss', { opacity: 0 }, { opacity: 1, duration: 0.45 }, 13.0)
    .fromTo('#linkVIff', { opacity: 0 }, { opacity: 1, duration: 0.45 }, 13.2)
    .fromTo('#linkIMb', { opacity: 0 }, { opacity: 1, duration: 0.45 }, 13.25)
    .to('#slipTag', { opacity: 0, duration: 0.2 }, 12.85)
    .set('#slipTag', { text: 'on time', attr: { x: 566, class: 'rv ontime' } }, 13.15)
    .to('#slipTag', { opacity: 1, duration: 0.3 }, 13.3)
    .to('#diamond', { scale: 1.35, duration: 0.16, yoyo: true, repeat: 1, transformOrigin: '50% 50%', ease: 'power2.inOut' }, 13.6);


  var replay = document.getElementById('revealReplay');
  replay.hidden = false;
  replay.addEventListener('click', function () { tl.restart(); });
  /* the panel can sit in a hidden tab: start when it first becomes visible */
  new IntersectionObserver(function (entries, io) {
    if (entries[0].isIntersecting) { tl.play(); io.disconnect(); }
  }, { threshold: 0.35 }).observe(root);
})();
