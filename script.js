(() => {
  'use strict';
  const nav = document.getElementById('site-nav');
  const menu = document.querySelector('.menu-toggle');
  const navLinks = document.getElementById('nav-links');
  function updateNav() { if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 38); }
  updateNav(); window.addEventListener('scroll', updateNav, {passive:true});
  if (menu && navLinks) {
    const closeMenu = () => { navLinks.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation menu'); };
    menu.addEventListener('click', () => {const expanded = menu.getAttribute('aria-expanded')==='true'; navLinks.classList.toggle('open',!expanded); menu.setAttribute('aria-expanded', String(!expanded)); menu.setAttribute('aria-label',expanded?'Open navigation menu':'Close navigation menu'); });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {if(e.key==='Escape')closeMenu();});
    document.addEventListener('click', e => {if(!nav.contains(e.target))closeMenu();});
  }
  if (document.getElementById('focus') && 'IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries => { entries.forEach(entry=>{if(entry.isIntersecting){ document.querySelectorAll('.nav-links a[data-section]').forEach(a=>a.classList.toggle('active',a.dataset.section===entry.target.id));}}) }, {rootMargin:'-23% 0px -58% 0px',threshold:0});
    ['focus','projects','data','experience','about','contact'].forEach(id=>{const s=document.getElementById(id);if(s)observer.observe(s)});
  }
  document.querySelectorAll('[data-flip]').forEach(card=>{
    const flip=()=>{const active=card.classList.toggle('is-flipped');card.setAttribute('aria-pressed',String(active))};
    card.addEventListener('click',flip);
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip()}});
    card.addEventListener('pointerleave',()=>{if (window.matchMedia('(hover: hover)').matches){card.classList.remove('is-flipped');card.setAttribute('aria-pressed','false')}})
  });
  const toast=document.getElementById('site-toast'); let toastTimeout;
  document.querySelectorAll('.resource-placeholder').forEach(button=>button.addEventListener('click',()=>{
    if(!toast)return;
    const label=button.dataset.file||'File';
    toast.textContent=label+' will be connected once the final file is added.';
    toast.classList.add('show');
    clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('show'),3800);
  }));
  // Replace third-party AOS dependency with lightweight native scroll reveals.
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('reveals-enabled');
    const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('revealed'); observer.unobserve(e.target)}})},{rootMargin:'0px 0px -35px 0px',threshold:.05});
    document.querySelectorAll('[data-aos]').forEach(el=>{el.classList.add('reveal-item');revealObserver.observe(el)});
  }
  const dialog=document.getElementById('figure-dialog');
  if(dialog){const dialogImg=document.getElementById('dialog-image'), caption=document.getElementById('dialog-caption');
    document.querySelectorAll('.figure-open').forEach(btn=>btn.addEventListener('click',()=>{dialogImg.src=btn.dataset.image;dialogImg.alt=btn.querySelector('img')?.alt||'Research figure';caption.textContent=btn.dataset.caption||'';dialog.showModal()}));
    dialog.querySelector('.figure-close')?.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  }

  // Full-screen, keyboard-accessible personal letter (Escape and backdrop to close).
  const storyDialog=document.getElementById('story-dialog');
  const storyTrigger=document.getElementById('open-story');
  if(storyDialog && storyTrigger){
    const closeStory=()=>storyDialog.close();
    storyTrigger.addEventListener('click',()=>{
      storyDialog.showModal();
      document.body.classList.add('story-modal-open');
      storyDialog.querySelector('.story-close')?.focus({preventScroll:true});
    });
    storyDialog.querySelector('.story-close')?.addEventListener('click',closeStory);
    storyDialog.addEventListener('click',e=>{if(e.target===storyDialog)closeStory()});
    storyDialog.addEventListener('close',()=>{
      document.body.classList.remove('story-modal-open');
      storyTrigger.focus({preventScroll:true});
    });
  }

})();
