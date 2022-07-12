$(document).ready(function(){

  $(window).scroll(function(){
    if($(window).scrollTop() >= 200){
      $('.header-area').addClass('active');
      $('.header-logo').addClass('active');
      $('.nym-logo').addClass('active');
      $('.menu-btn').css({width:30,height:20});
      $('.menu-btn span').css({'background-color':'#000'});
    }else{
      $('.header-area').removeClass('active');
      $('.header-logo').removeClass('active');
      $('.nym-logo').removeClass('active');
      $('.menu-btn').css({width:40,height:25});
      $('.menu-btn span').css({'background-color':'#f98011'});
    }
  });



  var swiper = new Swiper(".mySwiper", {
      effect: "fade",
      loop:true,
      autoplay:{
          delay: 2500
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });


    $('.menu-btn').click(function(){
      $('.menu-btn').toggleClass('active');
      $('.menu-btn span:nth-child(1)').toggleClass('active');
      $('.menu-btn span:nth-child(2)').toggleClass('active');


      if($('.menu-btn').hasClass('active')){
        $('.menu-bar-box').addClass('active');
      }else{
        $('.menu-bar-box').removeClass('active');
      }

    });

    console.clear();

  gsap.registerPlugin(ScrollTrigger);

    const additionalY = { val: 0 };
    let additionalYAnim;
    let offset = 0;
    const cols = gsap.utils.toArray(".col");

  cols.forEach((col, i) => {
  const images = col.childNodes;

  images.forEach((image) => {
    var clone = image.cloneNode(true);
    col.appendChild(clone);
  });

  images.forEach((item) => {
    let columnHeight = item.parentElement.clientHeight;
    let direction = i % 2 !== 0 ? "+=" : "-=";

    gsap.to(item, {
      y: direction + Number(columnHeight / 2),
      duration: 20,
      repeat: -1,
      ease: "none",
      modifiers: {
        y: gsap.utils.unitize((y) => {
          if (direction == "+=") {
            offset += additionalY.val;
            y = (parseFloat(y) - offset) % (columnHeight * 0.5);
          } else {
            offset += additionalY.val;
            y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5);
          }

          return y;
        })
      }
    });
  });
  });

  const imagesScrollerTrigger = ScrollTrigger.create({
  trigger: ".sec-5",
  start: "top 50%",
  end: "bottom 50%",
  onUpdate: function (self) {
    const velocity = self.getVelocity();
    if (velocity > 0) {
      if (additionalYAnim) additionalYAnim.kill();
      additionalY.val = -velocity / 2000;
      additionalYAnim = gsap.to(additionalY, { val: 0 });
    }
    if (velocity < 0) {
      if (additionalYAnim) additionalYAnim.kill();
      additionalY.val = -velocity / 3000;
      additionalYAnim = gsap.to(additionalY, { val: 0 });
    }
  }
  });

});//end