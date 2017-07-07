"use strict";
(function( dd, undefined ) {
  //micro-framework
  function $(id){return document.querySelector(id)}
  function remove(el){(el=$(el)).parentNode.removeChild(el)}
  function prepend(parentID,child){parent=$(parentID);parent.insertBefore(child,parent.childNodes[0]);}
  function hasClass(ele,cls){return ele.className && new RegExp("(^|\\s)" + cls + "(\\s|$)").test(ele.className);}
  function addClass(ele,cls){if(!hasClass(ele,cls)) ele.className += " "+cls}
  function removeClass(ele,cls){if(hasClass(ele,cls)){var reg=new RegExp('(\\s|^)'+cls+'(\\s|$)');ele.className=ele.className.replace(reg,' ')}}
  //Event delegation
  dd.getTarget=function(e){e=e||window.event; return e.target||e.srcElement;}
  //check if it's ios 6
  var ios6 = navigator.userAgent.match(/OS 6_[0-9_]+ like Mac OS X/i)!=null;
  //Check it it's android
  var ua = navigator.userAgent.toLowerCase();
  dd.isAndroid = ua.indexOf("android") > -1; //&amp;&amp; ua.indexOf("mobile");
  //Use touchstart for event listeners when on mobiles
  dd.clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');
  //Get url parameters USAGE: &vid=[tuneIn]&adId=[adId]
  dd.urlParams = (function(s) {
      var P = {};
      s.replace(/[?&]+([^=&]+)=([^&]*)/gi,
          function (str, key, value) {
              P[key] = value;
          });
      return P;
  })(window.location.search);

  
  var cdn="img/";


  //Public Globals
  dd.dev = true;
  dd.count = 0;
  dd.endTarget = '';
  dd.tracking = '';
  dd.images = [

 "desktop.jpg"
,"confetti.png"
,"cup.png"
,"close.png"
,"dal.png"
,"por.png"
,"dallas.png"
,"portland.png"
,"txt_game.png"
,"txt_glory.png"
,"txt_one.png"
,"tunein.png"
,"tunein_bg.jpg"
,"tv_button.png"
,"play.png"
  ];

  function start(){
    addClass($('#container'),'show fadein');
  }

//hide elements
var hiddenEl = [
 ".end"
,".shade"
,".logo_dallas"
,".logo_portland"
]

TweenLite.set( hiddenEl, {autoAlpha:0});

//Animation Timeline
dd.tl = new TimelineMax({delay:1.6});


dd.tl
.from('.cup', 1.4, {css:{bottom:"-800px"},ease: Back.easeOut.config(1)})
.from('.confetti', 3, {css:{bottom:"-2400px"},ease: Power4.easeOut},"-=1")
.to('.confetti', 2, {css:{bottom:"-400px"}})
.addLabel('closeup',"-=2")
.from('.l_por', 2, {css:{left:"-100%"},ease: Power4.easeInOut},'closeup')
.from('.r_dal', 2, {css:{right:"-100%"},ease: Power4.easeInOut},'closeup')
.from('.txt_1', .5, {css:{autoAlpha:0},ease: Power3.easeInOut})
.from('.txt_2', .5, {css:{autoAlpha:0},ease: Power3.easeInOut})
.from('.txt_3', .5, {css:{autoAlpha:0},ease: Power3.easeInOut})
.set( ['.cup','.confetti'], {autoAlpha:0})
.to('.logo_portland', 1, {css:{autoAlpha:"1",scale:".5", left:"-5%"},ease: Power3.easeInOut})
.to('.logo_dallas', 1, {css:{autoAlpha:"1",scale:".5", right:"-5%"},ease: Power3.easeInOut},"-=1")
.set( ['.end','.shade'], {autoAlpha:1})
.addLabel('openup')
.to(['.txt_1','.txt_2','.txt_3'], .5, {css:{autoAlpha:0},ease: Power3.easeIn},'openup')
.to('.l_por', 2, {css:{left:"-100%"},ease: Power4.easeIn},'openup')
.to('.r_dal', 2, {css:{right:"-100%"},ease: Power4.easeIn},'openup')
.to('.logo_portland', 2, {css:{left:"-100%"},ease: Power4.easeIn},'openup')
.to('.logo_dallas', 2, {css:{right:"-100%"},ease: Power4.easeIn},'openup')
.to('.shade', 2.5, {css:{autoAlpha:0},ease: Power3.easeIn},'openup')
.set( ['.l_por','.r_dal','.logo_portland','.logo_dallas','.shade'], {autoAlpha:0})
;

//Modal box, modified from github.com/ferspeak/modalzinha-js
dd.modal = (function() {

  var modalOpen = document.querySelector('.btn'),
      modalClose = document.querySelector('.close'),
      modalWrapper = document.querySelector('.modal_wrapper');

  return {
    init: function() {
      this.open();
      this.close();
    },

    open: function() {
      modalOpen.onclick = function(e) {
        e.preventDefault;
        modalWrapper.classList.add("modal_open");
      }
    },

    close: function() {
      modalClose.onclick = function(e) {
        e.preventDefault;
        modalWrapper.classList.remove("modal_open");
        //pause video in case it's playing
        mediaPlayer.pause();
        TweenLite.to( play, .5, {autoAlpha:1});
      }
    }
  }
}());

dd.modal.init();

// Simple video player
var play = $('.play'),
    playPause = $('.media-video'),
    mediaPlayer = $('.media-video');

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




function imgLoader(){
  //Array of paths to each image
  var countdown = 0;
  //current progress
  var currProgress = 0;
  //total progress amount
  var total = 0;
  //build the progress bar
  var docfrag = document.createDocumentFragment();
  var loader = document.createElement('div');
  loader.id = 'loader';
  var meter = document.createElement('div');
  meter.id = 'meter';
  var span = document.createElement('span');
  span.style.width="20%";

  meter.appendChild(span)
  loader.appendChild(meter)
  docfrag.appendChild(loader);
  //attaching it to the body to load before other elements
  $('body').appendChild(docfrag);

  if(dd.images.length===0){
    setTimeout( function(){
      remove('#loader');
      start();
    }, 500);
  } else {
    // Loop through array to start preloading images
    for(var i=0, il=dd.images.length; i<il; i++){
      //set the total of the progress
      total=il;

      var name = 'imageObj'+i;
      name = new Image();
      name.src =  cdn + dd.images[i];
      //Exectue after everything has downloaded
      name.onload = function() {
        countdown++;
        currProgress++;
        //update the progress bar
        span.style.width= Math.round((currProgress/total)*100)+"%";

        //console.log(countdown, il, currProgress);

        //Check to see if all images have finished loading, then remove loader and display start button
        if(countdown==il){
          setTimeout( function(){
              remove('#loader');
              start();
          }, 500);
        }
      }
    }
  }
}


  //Public init method
  // Handle what we need to do when ad hits the screen (vs cached in background)
  dd.init = function() {
    imgLoader();
    //listen to when animations end and play through
    document.addEventListener("webkitAnimationEnd", dd.animationlistener , false);
  };

}( window.dd = window.dd || {} ));


	document.addEventListener("DOMContentLoaded", function() {
	  setTimeout(dd.init, 100);
	}, false);
