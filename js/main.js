//scrub through duration
//build spectrum analyzer
//figure out a server solution, putting files in by hand is a pain and not very dynamic
//one day draw some custom buttons so this doesn't look so flat
//maybe put the files into an array then map through it
//maybe build a shuffle function
let audio;

$('#pauseBtn').hide();
$('#unmute').hide();
$('#maximize').hide();
let list = $('#playlist li:first-child');

initAudio = (element) => {
  let song = element.attr('song');
  let artist = element.attr('artist');
  let title = element.text()

  audio = new Audio('./media/' + song);

  if (!audio.currentTime) {
    $('#duration').html('0.00');
  }

  $('#artist').text(artist);
  $('#title').text(title);

  $('#playlist li').removeClass('active');
  element.addClass('active');

  audio.volume = parseFloat(volume.value / 10);
  if(audio.volume == 0){
   unmuteBtnShow();
  }
  $(audio).on('ended', () => {
    nextItem();
  });
}

initAudio(list);

$('#playBtn').click(() => {
  audio.play();
  pauseBtnShow();
  $('#duration').fadeIn(400);
  showDuration();
});

$('#pauseBtn').click(() => {
  audio.pause();
  playBtnShow();
});

$('#stopBtn').click(() => {
  audio.pause();
  audio.currentTime = 0;
  playBtnShow();
  $('#duration');
});

$('#prevBtn').click(() => {
  prevItem();
});

$('#nextBtn').click(() => {
  nextItem();
});

$('#progressBar').click(() => {
  console.log('clicked');
})

$('#minimize').click(() => {
  toggleMin();
})

$('#maximize').click(() => {
  toggleMax();
  
})


toggleMax = () => {
  $('#minimize').show()
  $('#maximize').hide()

  let body = $('body')
  $('#playlist').css('display', '');
  body.css('background', '#000000');
  body.css('box-shadow', '');
  $('header').css('height', '');
  $('#volCtl').css('padding-bottom', '');
}

toggleMin = () => {
  $('#minimize').hide()
  $('#maximize').show()

  let body = $('body')
  $('#playlist').css('display', 'none');
  body.css('background', '#504d4d');
  body.css('box-shadow', 'none');
  $('header').css('height', '180px');
  // $('header').css('box-shadow', '15px 15px 25px 0px black');
  $('#volCtl').css('padding-bottom', '10px');
}


prevItem = () => {
  audio.pause();
  let prev = $('#playlist li.active').prev();

  if (prev.length == 0) {
    prev = $('#playlist li:last-child');
  }

  pauseBtnShow();
  muteBtnShow();
  initAudio(prev);
  audio.play();
  showDuration();
}

nextItem = () => {
  audio.pause();
  let next = $('#playlist li.active').next();

  if (next.length == 0) {
    next = $('#playlist li:first-child');
  }

  pauseBtnShow();
  muteBtnShow();
  initAudio(next);
  audio.play();
  showDuration();
}

volChange = () => {
  let vol = volume.value
  $('#volume').attr('value', 'vol')
  audio.volume = parseFloat(vol / 10);
  if(!audio.volume == 0){
    muteBtnShow();
  } else if (audio.volume == 0){
    unmuteBtnShow();
  }
};

$('#mute').click(() => {
  muteVol();
});

$('#unmute').click(() => {
  muteBtnShow();
  audio.volume = parseFloat(volume.value / 10);

});

muteVol = () => {
  audio.volume = 0;
  unmuteBtnShow();
}

muteBtnShow = () => {
  let visible = $('#unmute').is(':visible');
  let show = $('#mute').show();
  let hide = $('#unmute').hide();
  (visible) ? show : hide;
};

unmuteBtnShow = () => {
  let visible = $('#mute').is(':visible');
  let show = $('#mute').hide();
  let hide = $('#unmute').show();
  (visible) ? hide : show;
}

pauseBtnShow = () => {
  let visible = $('#playBtn').is(':visible');
  let show = $('#pauseBtn').show();
  let hide = $('#playBtn').hide();
  (visible) ? show : hide;
}

playBtnShow = () => {
  let visible = $('#pause').is(':visible');
  let show = $('#playBtn').show();
  let hide = $('#pauseBtn').hide();
  (visible) ? show : hide;
}
//plays the song that is clicked 
$('#playlist li').click(function () {
  audio.pause();
  initAudio($(this));
  pauseBtnShow();
  $('#duration').fadeIn(400);
  audio.play();
  showDuration();
})

showDuration = () => {
  $(audio).bind('timeupdate', () => {
    let s = parseInt(audio.currentTime % 60);
    let m = parseInt((audio.currentTime / 60) % 60);
    if (s < 10) {
      s = '0' + s;
    }
    $('#duration').html(m + '.' + s);
    let value = 0;
    if (audio.currentTime > 0) {
      value = Math.floor((100 / audio.duration) * audio.currentTime);
    }
    $('#progress').css('width', value + '%');
  });
};
//can use the arrow button key press to select next or previous song
window.addEventListener('keydown', (e) => {
  let code = e.keyCode;
  if (code == 40) {
    nextItem();
  } else if (code == 38) {
    prevItem();
  }
});




