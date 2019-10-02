let audio;

$('#pauseBtn').hide();

let list = $('#playlist li:first-child')

initAudio = (element) => {
  let song = element.attr('song');
  let artist = element.attr('artist');
  let title = element.text()
  
  audio = new Audio('./media/' + song);
  
  if(!audio.currentTime){
    $('#duration').html('0.00');
    }
    
    $('#artist').text(artist);
    $('#title').text(title);
    
    $('#playlist li').removeClass('active');
    element.addClass('active');

    $(audio).on('ended', () => {
      audio.pause();
      let next = $('#playlist li.active').next();
      if(next.length == 0){
        next = $('#playlist li:first-child');
      }
      initAudio(next);
        audio.play();
        showDuration();
  
    });
  }
  
  initAudio(list);
  
  


  $('#playBtn').click(()=> {
  audio.play();
  $('#playBtn').hide();
  $('#pauseBtn').show();
  $('#duration').fadeIn(400);
  showDuration();
});

$('#pauseBtn').click(()=> {
  audio.pause();
  $('#playBtn').show();
  $('#pauseBtn').hide();
});

$('#stopBtn').click(()=> {
  audio.pause();
  audio.currentTime = 0;
  $('#pauseBtn').hide();
  $('#playBtn').show();
  $('#duration');

});

$('#prevBtn').click(()=> {
  audio.pause();
  let prev = $('#playlist li.active').prev();
  if(prev.length == 0){
    prev = $('#playlist li:last-child');
  }
  initAudio(prev);
    audio.play();
    showDuration();
});

$('#nextBtn').click(()=> {
  audio.pause();
  let next = $('#playlist li.active').next();
  if(next.length == 0) {
    next = $('#playlist li:first-child');
  }
  if($('#playBtn').is(':visible')){
    $('#playBtn').hide();
    $('#pauseBtn').show();
  }
  initAudio(next);
    audio.play();
    showDuration();
});



$('#playlist li').click( function() {
  audio.pause();
  initAudio($(this));
    $('#playBtn').hide();
    $('#pauseBtn').show();
    $('#duration').fadeIn(400);
    audio.play();
    showDuration();
})


  
$('#volume').change( function() {
    audio.volume = parseFloat(this.value / 10);
  });

showDuration = () => {
  $(audio).bind('timeupdate', () => {
    let s = parseInt(audio.currentTime % 60);
    let m = parseInt((audio.currentTime / 60) % 60);
    if ( s < 10) {
      s = '0' + s;
    }
    $('#duration').html(m + '.' + s);
    let value = 0;
    if (audio.currentTime > 0){
      value = Math.floor((100 / audio.duration) * audio.currentTime);
    }
    $('#progress').css('width', value+'%');
  });
};
