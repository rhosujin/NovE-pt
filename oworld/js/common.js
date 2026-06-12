$(document).ready(function () {



  /* =========================
     1. 헤더 스크롤
  ========================= */
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }


  /* =========================
     2. 모바일 메뉴
  ========================= */
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const dim = document.querySelector(".dim");

  // 메뉴 열기/닫기
 hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    dim?.classList.toggle("active");
  });

  dim?.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    dim.classList.remove("active");
  });


  /* =========================
     3. 모바일 서브메뉴 (아코디언)
  ========================= */
  document.querySelectorAll(".mobile-menu .has-sub > a")
    .forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        item.parentElement.classList.toggle("active");
      });
    });


  /* =========================
     4. 반응형 리셋 (PC 복귀)
  ========================= */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      hamburger?.classList.remove("active");
      mobileMenu?.classList.remove("active");
      dim?.classList.remove("active");

      // 서브메뉴 초기화
      document.querySelectorAll(".mobile-menu li.active")
        .forEach(li => li.classList.remove("active"));
    }
  });



// 마우스따라 움직이기
const hero = document.querySelector(".main-visual");
const light = document.querySelector(".cursor-light");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();

  // 🔥 glow 위치
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;

  // 🔥 배경 패럴랙스
  const moveX = (e.clientX / window.innerWidth - 0.5) * 10;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 10;

  hero.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});

// 부드러운 애니메이션
function animate() {
  currentX += (mouseX - currentX) * 0.08;
  currentY += (mouseY - currentY) * 0.08;

  const speed = Math.abs(mouseX - currentX) + Math.abs(mouseY - currentY);

  // 🔥 속도에 따라 크기 변화
  const scale = Math.min(1.5, 1 + speed * 0.01);

  light.style.left = currentX + "px";
  light.style.top = currentY + "px";
  light.style.transform = `translate(-50%, -50%) scale(${scale})`;

  requestAnimationFrame(animate);
}

animate();


window.addEventListener("scroll", () => {
  const hero = document.querySelector(".main-visual");
  const text = document.querySelector(".visual-text");

  let scrollY = window.scrollY;

  if (hero) {
    hero.style.backgroundPosition = `center ${50 + scrollY * 0.05}%`;
  }

  if (text) {
    text.style.transform = `translateY(${scrollY * 0.2}px)`;
    text.style.opacity = Math.max(1 - scrollY / 250, 0);
  }
});






/* =========================
   Wallet 스택 애니메이션
========================= */
const wallet = document.querySelector(".wallet");

if (wallet) {

  // 1. 스크롤 등장
  const walletObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          wallet.classList.add("show");
          observer.unobserve(wallet);
        }
      });
    },
    { threshold: 0.3 }
  );

  walletObserver.observe(wallet);

  // 2. 카드 클릭 → 펼치기 (추천 방식)
wallet.querySelectorAll(".wallet-card").forEach(card => {

  card.addEventListener("click", () => {

    if (!wallet.classList.contains("active")) {
      wallet.classList.add("active"); // 1번 클릭 → 펼치기
    } else {
      window.location.href = "#"; // 2번 클릭 → 이동
    }

  });

});
}


  /* =========================
     4. 스토리 슬라이더
  ========================= */



  const cards = document.querySelectorAll(".story-section .card");
  const next = document.querySelector(".story-section .next");
  const prev = document.querySelector(".story-section .prev");
  const snsIcons = {
    instagram: `<i class="ri-instagram-line"></i>`,
    youtube: `<i class="ri-youtube-line"></i>`,
    facebook: `<i class="ri-facebook-fill"></i>`
    };




  const data = [
    { img: "./images/main/sns_01.png",
      type: "instagram",
      title: "‘사막의 파수꾼’ 미어캣",
      desc: "일광욕을 즐기고 있는 귀염둥이 미어캣..."
    },
    { img: "./images/main/sns_02.png",
      type: "youtube",
      title: "‘사막의 파수꾼’ 미어캣",
      desc: "일광욕을 즐기고 있는 귀염둥이 미어캣..." 
    },
    { img: "./images/main/sns_03.png",
      type: "facebook",
      title: "‘사막의 파수꾼’ 미어캣",
      desc: "일광욕을 즐기고 있는 귀염둥이 미어캣..."
     },
    { img: "./images/main/sns_04.png",
      type: "instagram",
      title: "‘사막의 파수꾼’ 미어캣",
      desc: "일광욕을 즐기고 있는 귀염둥이 미어캣..."
     },
    { img: "./images/main/sns_05.png",
      type: "instagram",
      title: "‘사막의 파수꾼’ 미어캣",
      desc: "일광욕을 즐기고 있는 귀염둥이 미어캣..."
     },
  ];

  
  let start = 0;
  let isAnimating = false;
  let autoSlide;


  /* =========================
     렌더
  ========================= */
  function render() {
    cards.forEach((card, i) => {
      const index = (start + i) % data.length;

      const snsType = data[index].type;

      card.innerHTML = `
        <div class="inner">
          <img src="${data[index].img}">
          <div class="card-text">

        ${snsType ? `
           <div class="sns-icon ${data[index].type}">
             ${snsIcons[snsType] || ""}
           </div>
          ` : ""}

          <h4>${data[index].title}</h4>
            <p class="desc">${data[index].desc || ""}</p>

        </div>
      </div>
    `;
    });
  }


  /* =========================
     크기 설정 (핵심)
  ========================= */
  function updateSize() {
    cards.forEach((card, i) => {
      card.classList.remove("big", "small");

      if (i === 0) {
        card.classList.add("big");   // 🔥 왼쪽 첫 카드
      } else {
        card.classList.add("small");
      }
    });
  }


  /* =========================
     슬라이드 이동
  ========================= */
  function slide(dir) {
    if (isAnimating) return;
    isAnimating = true;

    if (dir === "next") {
      start = (start + 1) % data.length;
    } else {
      start = (start - 1 + data.length) % data.length;
    }

    render();
    updateSize();

    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }


  /* =========================
     자동 슬라이드
  ========================= */
  function startAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => slide("next"), 3000);
  }

  function resetAuto() {
    startAuto();
  }


  /* =========================
     버튼
  ========================= */
  if (next && prev) {
    next.addEventListener("click", () => {
      slide("next");
      resetAuto();
    });

    prev.addEventListener("click", () => {
      slide("prev");
      resetAuto();
    });
  }


  /* =========================
     초기 실행
  ========================= */
  render();
  updateSize();
  startAuto();




  let startX = 0;
let isDragging = false;


/* =========================
   터치 시작
========================= */
function startDrag(e) {
  isDragging = true;
  startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}


/* =========================
   이동 중
========================= */
function moveDrag(e) {
  if (!isDragging) return;
}


/* =========================
   끝 (핵심)
========================= */
function endDrag(e) {
  if (!isDragging) return;
  isDragging = false;

  let endX = e.type.includes("mouse") ? e.pageX : e.changedTouches[0].clientX;
  let diff = startX - endX;

  // 🔥 민감도 (50px 이상 움직이면 슬라이드)
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      slide("next");  // 왼쪽으로 드래그 → 다음
    } else {
      slide("prev");  // 오른쪽으로 드래그 → 이전
    }
  }
}



const slider = document.querySelector(".slider");

if (slider) {

  // 마우스
  slider.addEventListener("mousedown", startDrag);
  slider.addEventListener("mousemove", moveDrag);
  slider.addEventListener("mouseup", endDrag);
  slider.addEventListener("mouseleave", endDrag);

  // 터치 (모바일)
  slider.addEventListener("touchstart", startDrag);
  slider.addEventListener("touchend", endDrag);
}

});

