let audio;

$('#pauseBtn').hide();
$('#unmute').hide();

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

  $(audio).on('ended', () => {
    audio.pause();
    let next = $('#playlist li.active').next();
    if (next.length == 0) {
      next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.play();
    showDuration();
  });
  
}

initAudio(list);

$('#playBtn').click(() => {
  audio.play();
  $('#playBtn').hide();
  $('#pauseBtn').show();
  $('#duration').fadeIn(400);
  showDuration();
});

$('#pauseBtn').click(() => {
  audio.pause();
  $('#playBtn').show();
  $('#pauseBtn').hide();
});

$('#stopBtn').click(() => {
  audio.pause();
  audio.currentTime = 0;
  $('#pauseBtn').hide();
  $('#playBtn').show();
  $('#duration');
});

$('#prevBtn').click(() => {
  audio.pause();
  let prev = $('#playlist li.active').prev();

  if (prev.length == 0) {
    prev = $('#playlist li:last-child');
  }

  playPauseReveal();
  muteButton();
  initAudio(prev);
  audio.play();
  showDuration();
});

$('#nextBtn').click(() => {
  audio.pause();
  let next = $('#playlist li.active').next();

  if (next.length == 0) {
    next = $('#playlist li:first-child');
  }

  playPauseReveal();
  muteButton();
  initAudio(next);
  audio.play();
  showDuration();
});

$('#volume').change(function () {
  let vol = volume.value
  $('#volume').attr('value', 'vol')
  audio.volume = parseFloat(vol / 10);
});

$('#mute').click(() => {
  audio.volume = 0;
  $('#mute').hide();
  $('#unmute').show();
});

$('#unmute').click(() => {
  $('#mute').show();
  $('#unmute').hide();
  audio.volume = parseFloat(volume.value / 10);
  
});

muteButton = () => {
  let visible = $('#unmute').is(':visible');
  let show = $('#mute').show();
  let hide = $('#unmute').hide();
  
  (visible) ? show : hide;
};

playPauseReveal = () => {
  let visible = $('#playBtn').is(':visible');
  let show = $('#pauseBtn').show();
  let hide = $('#playBtn').hide();
  
  (visible) ?  hide : show;
  
}

$('#playlist li').click(function () {
  audio.pause();
  initAudio($(this));
  $('#playBtn').hide();
  $('#pauseBtn').show();
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
