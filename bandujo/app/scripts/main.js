document.addEventListener("DOMContentLoaded", function() {
  

  //Lightslider carousel
  var carousel = $("#content-slider").lightSlider({
  		item:4,
      loop:true,
      keyPress:true,
      auto:true,
      pauseOnHover:true,
      slideMargin:0,
      pager:false,
      enableDrag:false
  });


  //Navigation Toggle
  document.querySelector( ".nav-toggle" ).addEventListener( "click", function() {
    this.classList.toggle( "active" );
    document.querySelector( ".navbar" ).classList.toggle( "active" );
  });


  // Scroll magic controller
  var controller = new ScrollMagic.Controller();

  var headlineSlideIn = new TimelineMax();
  headlineSlideIn.from(".callout", .5, {right:800, ease:Power2.easeOut})
  .from(".headline-body", .5, {right:800, delay:.35, ease:Power2.easeOut})
  .from(".twitter", .5, {bottom:-300, delay:.35, ease:Power2.easeOut});


  var headline = new ScrollMagic.Scene({triggerElement: ".callout"})
  .setTween(headlineSlideIn)
  .addTo(controller);


  var productTitle = new TimelineMax();
  productTitle.from(".product .col-lg-7", .5, {top: -100,autoAlpha:0, ease:Power2.easeOut});

  var mobileScene = new ScrollMagic.Scene({triggerElement:".twitter", duration: 250})
  .setTween(productTitle)
  .addTo(controller);

  var mobileParallax = new TimelineMax();
  mobileParallax.fromTo(".phone", 1, {bottom: -100}, {bottom: 200, ease: Linear.easeNone});

  var mobileScene = new ScrollMagic.Scene({triggerElement:".product", duration: $(window).height()})
  .setTween(mobileParallax)
  .addTo(controller);


  var summaryTitle = new TimelineMax();
  summaryTitle.from(".summary .col-lg-12", .5, {top: -100,autoAlpha:0, ease:Power2.easeOut});

  var summaryScene = new ScrollMagic.Scene({triggerElement:".summary", duration: 250})
  .setTween(summaryTitle)
  .addTo(controller);


  var summary = new TimelineMax();
  summary
  .from(".smartphone img", .5, {bottom: -200,autoAlpha:0, ease:Power2.easeOut})
  .from(".smartphone h3", .5, {bottom: -100,autoAlpha:0, ease:Power2.easeOut})
  .from(".smartphone p", .5, {bottom: -100,autoAlpha:0, ease:Power2.easeOut})
  .from(".bulb img", .5, {bottom: -200,autoAlpha:0, ease:Power2.easeOut})
  .from(".bulb h3", .5, {bottom: -100,autoAlpha:0, ease:Power2.easeOut})
  .from(".bulb p", .5, {bottom: -100,autoAlpha:0, ease:Power2.easeOut})
  .from(".watch img", .5, {bottom: -200,autoAlpha:0, ease:Power2.easeOut})
  .from(".watch h3", .5, {bottom: -100,autoAlpha:0, ease:Power2.easeOut})
  .from(".watch p", .5, {bottom: -100,autoAlpha:0, ease:Power2.easeOut});

  var summaryScene = new ScrollMagic.Scene({triggerElement:".summary", duration: 400})
  .setTween(summary)
  .addTo(controller);

  var videos = new TimelineMax();
  videos
  .from(".vid-1", .5, {left: -600, autoAlpha:0, ease:Power2.easeOut})
  .from(".odd .vid-summary", .5, {autoAlpha:0, ease:Power2.easeOut})
  .from(".vid-2", .5, {right: -600, autoAlpha:0, ease:Power2.easeOut})
  .from(".even .vid-summary", .5, {autoAlpha:0, ease:Power2.easeOut});

  var vidScene = new ScrollMagic.Scene({triggerElement:".videos", duration: 350})
  .setTween(videos)
  .addTo(controller);


  var faqTitle = new TimelineMax();
  faqTitle.from(".faq .col-lg-12", .5, {top: -100,autoAlpha:0, ease:Power2.easeOut});

  var mobileScene = new ScrollMagic.Scene({triggerElement:".faq", duration: 100})
  .setTween(faqTitle)
  .addTo(controller);


  var formTitle = new TimelineMax();
  formTitle.from(".step-form .col-lg-12", .5, {top: -100,autoAlpha:0, ease:Power2.easeOut});

  var mobileScene = new ScrollMagic.Scene({triggerElement:".step-form", duration: 250})
  .setTween(formTitle)
  .addTo(controller);




  //Form Animation
  var clickOne = false,
  		clickTwo = false,
  		formnum2 = new TimelineMax(),
  		formnum3 = new TimelineMax();

  document.querySelector(".btn-next").addEventListener("click", function (e) {
  	e.preventDefault();

  	if(!clickOne) {
  		formnum2.to(".step-2", .5, {autoAlpha:0,className:"-=off"})
  						.to(".step-2", .5, {autoAlpha:1, ease:Power2.easeOut});
  		clickOne = true;
  	} 
  	else if (!clickTwo) {
  		formnum3.to(".step-3", .5, {autoAlpha:0,className:"-=off"})
  						.to(".step-3", .5, {autoAlpha:1, ease:Power2.easeOut});
  		clickTwo = true;
  		this.textContent= "Submit";
  	}
  }, false);



  // Simple video player
  var play = document.querySelector('.play'),
      playPause = document.querySelector('.media-video'),
      mediaPlayer = document.querySelector('.media-video');

  playPause.onclick = function(e) {
    e.preventDefault; 

    // If paused or ended
    if (mediaPlayer.paused || mediaPlayer.ended) {

      TweenLite.to( play, .5, {autoAlpha:0});
      mediaPlayer.play();
      console.log('playing')
    }
    // If playing
    else {
      TweenLite.to( play, .5, {autoAlpha:1});
      mediaPlayer.pause();
      console.log('paused')
    }
  }

}, false);


