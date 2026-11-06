const intro = document.getElementById('introScreen');
document.getElementById('openSurprise').addEventListener('click', () => {
  intro.classList.add('dismissed');
  document.body.classList.add('opened');
  setTimeout(() => document.getElementById('home').scrollIntoView({behavior:'smooth'}), 250);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const cards = [...document.querySelectorAll('.gallery-card')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
let currentPhoto = 0;
function showPhoto(index){
  currentPhoto = (index + cards.length) % cards.length;
  const card = cards[currentPhoto];
  lightboxImage.src = card.dataset.photo;
  lightboxCaption.textContent = card.dataset.caption || '';
}
function openLightbox(index){showPhoto(index);lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}
cards.forEach((card,index)=>card.addEventListener('click',()=>openLightbox(index)));
document.getElementById('closeLightbox').addEventListener('click',closeLightbox);
document.getElementById('prevPhoto').addEventListener('click',()=>showPhoto(currentPhoto-1));
document.getElementById('nextPhoto').addEventListener('click',()=>showPhoto(currentPhoto+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowRight')showPhoto(currentPhoto+1);if(e.key==='ArrowLeft')showPhoto(currentPhoto-1);});

const wishButton = document.getElementById('wishButton');
const wishResult = document.getElementById('wishResult');
const toast = document.getElementById('toast');
let toastTimer;
wishButton.addEventListener('click',()=>{
  wishResult.classList.add('show');
  wishButton.innerHTML='Wish sent <span>♡</span>';
  for(let i=0;i<24;i++){
    const spark=document.createElement('span');spark.textContent=['✦','✧','♡','·'][i%4];spark.className='spark-float';
    Object.assign(spark.style,{position:'fixed',left:(15+Math.random()*70)+'vw',top:(35+Math.random()*35)+'vh',zIndex:80,color:['#bd8279','#b69a70','#d8aaa0'][i%3],fontSize:(12+Math.random()*20)+'px',pointerEvents:'none',transition:'transform 1.5s ease,opacity 1.5s ease'});
    document.body.appendChild(spark);requestAnimationFrame(()=>{spark.style.transform=`translate(${(Math.random()-.5)*100}px,${-80-Math.random()*130}px) rotate(${Math.random()*180}deg)`;spark.style.opacity='0';});setTimeout(()=>spark.remove(),1600);
  }
  toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400);
});

// Music control is intentionally a placeholder until you add a song you have permission to use.
document.getElementById('soundButton').addEventListener('click',()=>{
  toast.textContent='Add your favourite song as music.mp3 to enable music.';
  toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>{toast.classList.remove('show');toast.textContent='You are one of God’s most beautiful blessings in my life. ♡';},3000);
});
