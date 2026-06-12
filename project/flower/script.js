window.addEventListener("DOMContentLoaded", () => {

const header = document.querySelector(".header");

if(header){

  window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  });

}


/* MOBILE MENU */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if(menuToggle && mobileMenu){

  menuToggle.addEventListener("click",()=>{

    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

    if(mobileMenu.classList.contains("active")){

      gsap.to(".mobile-menu a",{
        y:0,
        opacity:1,
        stagger:.08,
        duration:1,
        ease:"expo.out"
      });

    } else {

      gsap.set(".mobile-menu a",{
        y:40,
        opacity:0
      });

    }

  });
}



// 화면사이즈가 900이상일때 햄버거메뉴 눌렀을때나오는 mobil-menu가 자동으로 사라짐
window.addEventListener("resize", () => {

  if(window.innerWidth > 900){

    mobileMenu.classList.remove("active");
    menuToggle.classList.remove("active");

    document.body.classList.remove("menu-open");

    gsap.set(".mobile-menu a",{
      y:40,
      opacity:0
    });

  }

});




/* 모바일 fullscreen pin 제거 */
  if(window.innerWidth < 768){

    ScrollTrigger.getAll().forEach(trigger => {

      if(
        trigger.trigger?.classList?.contains("fullscreen")
      ){
        trigger.kill();
      }

    });

  }

});



/* LENIS */
if(typeof Lenis !== "undefined"){

  const lenis = new Lenis({
    duration:1.2,
    smoothWheel:true
  });

  lenis.on("scroll", ScrollTrigger.update);

  function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

}

/* =========================
   GSAP
========================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");

if(cursor){

  // cursor move
window.addEventListener("mousemove",(e)=>{

  gsap.to(cursor,{
    x:e.clientX,
    y:e.clientY,
    duration:.45,
    ease:"power3.out"
  });

});

  // hover effect
  const links = document.querySelectorAll("a");

  links.forEach((link)=>{

    link.addEventListener("mouseenter",()=>{

      gsap.to(cursor,{
        scale:1.3,
        rotate:25,
        duration:.5,
        ease:"power3.out"
      });

    });

    link.addEventListener("mouseleave",()=>{

      gsap.to(cursor,{
        scale:1,
        rotate:0,
        duration:.5,
        ease:"power3.out"
      });

    });

  });

}





/* =========================
   SPLIT TEXT
========================= */

if(document.querySelector(".hero_title")){

  const heroTitle = new SplitType(".hero_title", {
    types:"lines"
  });

  heroTitle.lines.forEach(line => {
    line.classList.add("line");
  });

  gsap.from(".hero_title .line",{
    yPercent:100,
    opacity:0,
    stagger:.12,
    duration:1.2,
    ease:"power4.out",
    delay:.2
  });

}

/* =========================
   TEXT REVEAL
========================= */

document.querySelectorAll(".reveal").forEach((text)=>{

  const split = new SplitType(text,{
    types:"lines"
  });

  split.lines.forEach(line => {
    line.classList.add("line");
  });

  gsap.from(split.lines,{
    yPercent:100,
    opacity:0,
    stagger:.08,
    duration:1.2,
    ease:"power4.out",

    scrollTrigger:{
      trigger:text,
      start:"top 85%"
    }
  });

});

gsap.utils.toArray(".scene").forEach((scene)=>{

  const media = scene.querySelector(".scene_media");
  const img = scene.querySelector("img");
  const text = scene.querySelector(".scene_text");

  const tl = gsap.timeline({
    scrollTrigger:{
      trigger:scene.parentElement,
      start:"top top",
      end:"bottom bottom",
      scrub:1.2
    }
  });

  tl.to(media,{
    clipPath:"inset(0% 0% 0% 0%)",
    y:0,
    duration:1
  });

  tl.to(img,{
    scale:1,
    duration:1
  },0);

  tl.fromTo(text,
    {
      y:100,
      opacity:0
    },
    {
      y:0,
      opacity:1,
      duration:0.8
    },
    0.2
  );

});

gsap.utils.toArray(".scene_media").forEach((media)=>{

  const mask = media.querySelector(".reveal-mask");

  gsap.to(mask,{
    scaleY:0,
    transformOrigin:"top",
    duration:1.4,
    ease:"power4.inOut",

    scrollTrigger:{
      trigger:media,
      start:"top 80%"
    }
  });

});

// statement 작은 이미지

/* =========================
   CINEMATIC PREVIEW TRANSITION
========================= */

/* =========================
   CINEMATIC PREVIEW TRANSITION
========================= */
const preview = document.querySelector(".floating-preview");
const targetMedia = document.querySelector(".scene--01 .scene_media");

if(preview && targetMedia){

  ScrollTrigger.create({

    trigger:".scene--01",
    start:"top 90%",
    end:"top 20%",
    scrub:1.2,

    onUpdate:(self)=>{

      const progress = self.progress;

      const previewRect = preview.getBoundingClientRect();
      const targetRect = targetMedia.getBoundingClientRect();

      const moveX =
        targetRect.left - previewRect.left;

      const moveY =
        targetRect.top - previewRect.top;

      // preview 이동
      gsap.set(preview,{

        x:moveX * progress,
        y:moveY * progress,

        width:
          160 + ((targetRect.width - 160) * progress),

        height:
          210 + ((targetRect.height - 210) * progress),

        borderRadius:
          22 - (22 * progress),

        opacity:1 - (progress * 1.4)

      });

      // 실제 scene 등장
      gsap.set(targetMedia,{

        opacity:progress * 1.8,

        scale:
          0.96 + (0.04 * progress),

        filter:
          `blur(${8 - (8 * progress)}px)`

      });

    }

  });

}


/* =========================
   MAGNETIC MENU
========================= */

document.querySelectorAll(".header_menu a").forEach((link)=>{

  link.addEventListener("mousemove",(e)=>{

    const rect = link.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(link,{
      x:x * 0.25,
      y:y * 0.25,
      duration:.4,
      ease:"power3.out"
    });

  });

  link.addEventListener("mouseleave",()=>{

    gsap.to(link,{
      x:0,
      y:0,
      duration:.5,
      ease:"elastic.out(1,0.4)"
    });

  });

});


/* =========================
   PIN SECTION
========================= */

ScrollTrigger.create({
  trigger:".fullscreen",
  start:"top top",
  end:"+=100%",
  pin:true,
  pinSpacing:true
});


/* =========================
   FLOATING IMAGE
========================= */


gsap.utils.toArray(".scene_text").forEach((text)=>{

  gsap.to(text,{
    y:60,

    scrollTrigger:{
      trigger:text,
      start:"top bottom",
      end:"bottom top",
      scrub:true
    }
  });

});


gsap.to(".fullscreen img",{

  scale:1.08,

  scrollTrigger:{
    trigger:".fullscreen",
    start:"top bottom",
    end:"bottom top",
    scrub:true
  }

});


// journal-card 이미지 parallax
gsap.utils.toArray('.journal-card').forEach(card => {

  const img = card.querySelector('img');

  gsap.fromTo(
    img,

    {
      y:120
    },

    {
      y:-120,
      ease:'none',

      scrollTrigger:{
        trigger:card,
        start:'top bottom',
        end:'bottom top',
        scrub:true
      }
    }

  );

});


document.querySelectorAll(".scene_media").forEach((media)=>{

  const img = media.querySelector("img");

  media.addEventListener("mousemove",(e)=>{

    const rect = media.getBoundingClientRect();

    const x = (e.clientX - rect.left - rect.width/2) * 0.02;
    const y = (e.clientY - rect.top - rect.height/2) * 0.02;

    gsap.to(img,{
      x:x,
      y:y,
      duration:1.2,
      ease:"power3.out"
    });

  });

  media.addEventListener("mouseleave",()=>{

    gsap.to(img,{
      x:0,
      y:0,
      duration:1.4,
      ease:"power3.out"
    });

  });

}); // ← forEach 종료


gsap.utils.toArray(".scene_media").forEach((wrap)=>{

  gsap.to(wrap,{
    ease:"none",

    scrollTrigger:{
      trigger:wrap,
      start:"top bottom",
      end:"bottom top",
      scrub:true
    }
  });

});




gsap.utils.toArray(".scene_media").forEach((media)=>{

  const img = media.querySelector("img");

  const tl = gsap.timeline({
  scrollTrigger:{
    trigger:media,
    start:"top 82%",
    end:"bottom top",

    toggleActions:"play reverse play reverse"
  }
});
tl.fromTo(media,

  {
  y:80,
  clipPath:"inset(14% 14% 14% 14%)",
  opacity:0
},

  {
    y:0,
    clipPath:"inset(0% 0% 0% 0%)",
    opacity:1,
    duration:1.8,
    ease:"expo.out"
  }

);

  tl.fromTo(img,

    {
      scale:1.4
    },

    {
      scale:1,
      duration:2.2,
      ease:"power3.out"
    },

    0
  );

});





/* =========================
   HERO DEPTH
========================= */

const hero = document.querySelector(".hero");
const heroBg = document.querySelector(".hero_background img");

if(hero && heroBg){

  hero.addEventListener("mousemove",(e)=>{

    const x = (window.innerWidth / 2 - e.clientX) * 0.015;
    const y = (window.innerHeight / 2 - e.clientY) * 0.015;

    gsap.to(heroBg,{
      x,
      y,
      overwrite:true,
      duration:.8,
      ease:"power2.out"
    });

  });

}

/* =========================
   HERO CAPTION
========================= */

gsap.from(".hero_caption",{
  y:40,
  opacity:0,
  duration:1.4,
  delay:.8,
  ease:"power3.out"
});


/* =========================
   PARALLAX IMAGE
========================= */





gsap.utils.toArray(".scene_media img").forEach((img)=>{


  
  gsap.fromTo(img,

    {
      scale:1.25,
      y:140,
      opacity:0
    },

    {
      scale:1,
      y:0,
      opacity:1,

      duration:1.8,
      ease:"power4.out",

      scrollTrigger:{
        trigger:img,
        start:"top 85%",
      }
    }

  );

});


/* =========================
   FADE UP SECTIONS
========================= */

gsap.utils.toArray(".scene_headline").forEach((title)=>{

  gsap.fromTo(title,

    {
      y:120,
      opacity:0,
      rotateX:20
    },

    {
      y:0,
      opacity:1,
      rotateX:0,
      duration:1.6,
      ease:"expo.out",

      scrollTrigger:{
        trigger:title,
        start:"top 85%"
      }
    }

  );

});


/* =========================
   FULLSCREEN TITLE
========================= */

gsap.from(".fullscreen_title",{
  y:120,
  opacity:0,
  duration:1.5,
  ease:"power4.out",

  scrollTrigger:{
    trigger:".fullscreen",
    start:"top 60%"
  }
});


/* 모바일 fullscreen pin 제거 */
/* 모바일 fullscreen pin 제거 */
if(window.innerWidth < 768){

  ScrollTrigger.getAll().forEach(trigger => {

    if(
      trigger.trigger?.classList?.contains("fullscreen")
    ){
      trigger.kill();
    }

  });

}



let resizeTimer;
let lastWidth = window.innerWidth;

window.addEventListener("resize", () => {

  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {

    const currentWidth = window.innerWidth;

    const crossedBreakpoint =
      (lastWidth > 900 && currentWidth <= 900) ||
      (lastWidth <= 900 && currentWidth > 900) ||
      (lastWidth > 768 && currentWidth <= 768) ||
      (lastWidth <= 768 && currentWidth > 768);

    if(crossedBreakpoint){
      location.reload();
    }

    lastWidth = currentWidth;

  }, 500);

});