$(document).ready(function() {

  /* make sure screen scrolls to the bottom */
  var scrollup = function () {
    $('.chat_box').scrollTop($('.chat_box')[0].scrollHeight+100);
  }  
  //scroll on resize
  window.addEventListener('resize', scrollup);

  $( ".sherlock .typing" ).fadeToggle( "slow", function() {
    $( ".sherlock div" ).append( '<p>What can I do for you?</p>' );
  });

  const chat = $(".chat_box");
  const textarea = $(".input_box textarea");
  const button = $("button.send");
  const form = $(".input_box form");
  let question1 = false;
  let question2 = true;

  //Prevent forms submission
  form.submit(function( e ) {
    e.preventDefault();
  });

  //First question
  setTimeout(function () {
    textarea.val("What is our view on US treasuries?");

    $('<section class="user question1"><div><p class="typing"><span></span><span></span><span></span></p></div></section>')
    .appendTo(chat)
    .hide().fadeIn(1000);

    button.addClass( "pulse" );
  }, 1000);


  button.bind( "click", function(e) {
    e.preventDefault();

    if (!question1) {
      //clear textarea
      textarea.val("");
      
      //insert message
      $( ".user .typing" ).fadeToggle( "fast", function() {
        $( ".user div" ).append( '<p>What is our view on US treasuries?</p>' );
      });

      button.removeClass( "pulse" );

      $('<section class="sherlock answer1"><div><p class="typing"><span></span><span></span><span></span></p></div></section>')
      .appendTo(chat)
      .hide().delay(500).fadeIn(1000);


      $( ".answer1 .typing" ).delay(1500).fadeToggle( "slow", function() {
        $( ".answer1 div" ).append( '<p>We have recommended shorter-duration (maturities) since March 2013 given the extremely low yields and potential capital losses associated with rising interest rates from such low-levels. We have subsequently reduced the size of our overweight in short duration, with short-term interest rates.</p><p class="research"><b>View Associated Research</b></p><ol class="research_list"><li><a href="javascript:void">US treasuries information</a></li><li><a href="javascript:void">March 2013 low yields and potential capital losses</a></li></ol>' );
        
        scrollup();
        
        //add research expansion
        $(".answer1 .research").click(function (e){
          e.preventDefault();
          //Toggle Label
          var text = $(".answer1 .research").text();
          $(".answer1 .research b").text(
            text == "View Associated Research" ? "Hide Associated Research" : "View Associated Research");
          
          $(".research_list").slideToggle("fast", function() {
              scrollup();
          });
        });

        //Leave a Thank you message
        textarea.val("Thank you!");

        $('<section class="user quest2"><div><p class="typing"><span></span><span></span><span></span></p></div></section>')
        .appendTo(chat)
        .hide().fadeIn(1000,function(){scrollup();});

        button.addClass( "pulse" );

        question1 = true;  
        question2 = false;  
      });

    }

    if (!question2) {
      //clear textarea
      textarea.val("");
      
      scrollup();

      //insert question
      $( ".quest2 .typing" ).fadeToggle( "fast", function() {
        $( ".user div" ).append( '<p>Thank you!</p>' );
        scrollup();
      });

      button.removeClass( "pulse" );

      $('<section class="sherlock answer2"><div><p class="typing"><span></span><span></span><span></span></p></div></section>')
      .appendTo(chat)
      .hide().fadeIn(1000,function(){scrollup();});

      $( ".answer2 .typing" ).delay(1000).fadeToggle( "fast", function() {
        $( ".answer2 div" ).append( "<p>You're welcome</p>" );

        scrollup();

        $('<div><p>And you should hire Carlos</p></div>')
        .appendTo($( ".answer2" ))
        .hide().delay(1000).fadeIn(500,function(){scrollup();});
        
        scrollup();
      });

      question2 = true;  
    }
  })

});