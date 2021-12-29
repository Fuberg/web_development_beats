// $( document ).ready(function() {

// Код для работы плеера
let player;
const playerContainer = $(".player");
 
let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
 
   if (playerContainer.hasClass("paused")) {
    playerContainer.removeClass("paused");
    playerContainer.addClass("active");
    player.pauseVideo();
  } else {
    playerContainer.removeClass("active");
    playerContainer.addClass("paused");
    player.playVideo();
  }
 });

 $(".player__splash").click(e => {
    e.preventDefault();
    playerContainer.addClass("paused");
    player.playVideo();
  });

 $(".player__playback").click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPositionSec =
      (player.getDuration() / 100) * newButtonPositionPercent;
    
    $(".player__playback-button").css({
      left: `${newButtonPositionPercent}%`
    });

    $(".player__playback-progress").before().css("width", `${newButtonPositionPercent}%`);
    
    player.seekTo(newPlaybackPositionSec);
   });
}

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    
    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime % 60);
    
    function addZero(num) {
      return num < 10 ? `0${num}` : num;
    }
    
    return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();
    
    $(".player__duration-estimate").text(formatTime(durationSec));
    
    if (typeof interval !== "undefined") {
      clearInterval(interval);
    }
    
    interval = setInterval(() => {
      const completedSec = player.getCurrentTime();
      const completedPercent = (completedSec/durationSec) * 100;
      const videoProgress = `${completedPercent}%`

      $(".player__playback-button").css({
        left: videoProgress
      });

      $(".player__playback-progress").before().css("width", videoProgress);

      $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
};

let playerWidth = $('.player').outerWidth()
let playerHeight = $('.player').outerHeight()

// $( window ).resize(function() {
//     playerWidth = $('.player').outerWidth()
//     playerHeight = $('.player').outerHeight()

//     function onYouTubeIframeAPIReady() {
//         player = new YT.Player('yt-player', {
//             height: `${playerHeight}`,
//             width: `${playerWidth}`,
//             videoId: 'tNgiND7xb5Q',
//             events: {
//             'onReady': onPlayerReady,
//             // 'onStateChange': onPlayerStateChange
//             },
//             playerVars: {
//                 controls: 0,
//                 disablekb: 0,
//                 showinfo: 0,
//                 rel: 0,
//                 autoplay: 0,
//                 modestbranding: 0,
//             }
//         });
//     }
// });

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: `${playerHeight}`,
        width: `${playerWidth}`,
        videoId: 'tNgiND7xb5Q',
        events: {
        'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0,
        }
    });
}
    

eventsInit();
// });