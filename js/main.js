   // HEADER SCROLL

    const header = document.querySelector('.header');

    window.addEventListener('scroll',()=>{
      header.classList.toggle('scrolled',window.scrollY > 30);
    });


    // SIMPLE REVEAL

    const items = document.querySelectorAll('.project-item,.process-card,.about-box');

    const observer = new IntersectionObserver((entries)=>{

      entries.forEach(entry=>{

        if(entry.isIntersecting){
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0px)';
        }

      })

    },{
      threshold:0.2
    })


    items.forEach(item=>{

      item.style.opacity = '0';
      item.style.transform = 'translateY(80px)';
      item.style.transition = '1s';

      observer.observe(item);

    })