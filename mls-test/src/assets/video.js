dd.video = (function() {

var progress = document.querySelector('.progress'),
    play = document.querySelector('.play'),
    playPause = document.querySelector('.playPause'),
    replay = document.querySelector('.replay'),
    stop = document.querySelector('.stop'),
    mute = document.querySelector('.mute'),
    // volumePlus = document.querySelector('.volumePlus'),
    // volumeMinus = document.querySelector('.volumeMinus'),
    mediaPlayer = document.querySelector('.media-video');

    // Add a listener for the timeupdate event so we can update the progress bar
    mediaPlayer.addEventListener('timeupdate', progress, false);

    return {
      init: function() {
        this.progress();
        this.playPause();
        this.play();
        this.replay();
        this.stop();
        // this.volumePlus();
        // this.volumeMinus();
        this.mute();
      },

      progress: function() {
        // Work out how much of the media has played via the duration and currentTime parameters
        var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
        // Update the progress bar's value
        progress.value = percentage;
        // Update the progress bar's text (for browsers that don't support the progress element)
        progress.innerHTML = percentage + '% played';
      },
      playPause: function() {
        playPause.onclick = function(e) {
          e.preventDefault; 
        
          // If the mediaPlayer is currently paused or has ended
          if (mediaPlayer.paused || mediaPlayer.ended) {
            // Change the button to be a pause button
            // changeButtonType(playPauseBtn, 'pause');
            // Play the media
            mediaPlayer.play();
            console.log('playing')
          }
          // Otherwise it must currently be playing
          else {
            // Change the button to be a play button
            // changeButtonType(playPauseBtn, 'play');
            // Pause the media
            mediaPlayer.pause();
            console.log('paused')
          }
        }
      },
      play: function() {
      	play.onclick = function(e) {
      		e.preventDefault; 
			console.log('this play has')
			mediaPlayer.play();
      	}
      },
      replay: function() {
        replay.onclick = function(e) {
          e.preventDefault; 
          // Reset the progress bar to 0
          progressBar.value = 0;
          // Move the media back to the start
          mediaPlayer.currentTime = 0;
          // Ensure that the play pause button is set as 'play'
          // changeButtonType(playPauseBtn, 'play');
          mediaPlayer.play();
        }
      },
      stop: function() {
        stop.onclick = function(e) {
          e.preventDefault; 
          mediaPlayer.pause();
          mediaPlayer.currentTime = 0;
        }
      },
      // volumePlus: function() {
        
      // },
      // volumeMinus: function() {
        
      // },
      mute: function() {
        mute.onclick = function(e) {
          e.preventDefault; 
          if (mediaPlayer.muted) {
            // Change the cutton to be a mute button
            // changeButtonType(muteBtn, 'mute');
            // Unmute the media player
            mediaPlayer.muted = false;
          }
          else {
            // Change the button to be an unmute button
            // changeButtonType(muteBtn, 'unmute');
            // Mute the media player
            mediaPlayer.muted = true;
          }
        }
      }
    }
}());