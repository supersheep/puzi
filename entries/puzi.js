var alphatab = require('alphatab');
var as = require('../public/js/alphaSynth');
var $ = require('jquery');


require('../public/js/jQueryAlphaTab');
require('../public/js/jQueryAlphaSynth');

// function renderResource(name) {
//   var canvas = document.getElementById('paper');
//   var settings = alphatab.Settings.fromJson({});
//   var renderer = new alphatab.rendering.ScoreRenderer(settings, canvas);

//   alphatab.importer.ScoreLoader.loadScoreAsync("fixtures/" + name, function(score) {
//     renderer.renderMultiple(score.tracks);
//   }, function(e) {
//     console.log(e);
//   });
// }
// renderResource("Effects.gp3");

if (as.AlphaSynth.init('alphaSynth')) {
  var synth = as.AlphaSynth.instance;
  // wait for api
  synth.on('ready', function() {
    synth.setLogLevel(3);
    $('#sfInfo').show();
    synth.loadSoundFontUrl('alphaSynth/default.sf2');
  });

  // init ui
  $('#playPause').click(function() {
    synth.playPause();
  });
  $('#stop').click(function() {
    synth.stop();
  });

  // ui activation
  synth.on('readyForPlay', function(e, ready) {
    if (ready) {
      $('#loadingInfo').hide()
      $('#controls button').removeAttr('disabled');
    } else {
      $('#loadingInfo').show()
      $('#controls button').attr('disabled', 'disabled');
    }
  });
  synth.on('soundFontLoad', function(e, loaded, full) {
    var percentage = ((loaded / full) * 100) | 0;
    $('#sfInfo .progress').text('(' + percentage + '%)');
  });
  synth.on('soundFontLoaded', function(e, loaded, full) {
    $('#sfInfo').hide();
  });
  synth.on('playerStateChanged', function(e, state) {
    switch (state) {
      case 0: // stopped
        $('#playPause').text('Play').removeClass('pause').addClass('play');
        break;
      case 1: // playing
        $('#playPause').text('Pause').removeClass('play').addClass('pause');
        break;
      case 2: // paused
        $('#playPause').text('Play').removeClass('pause').addClass('play');
        break;
    }
  });

  var at = $('#alphaTab');
  at.alphaTab(); // load alphaTab
  at.alphaTab('autoPlayer'); // autoplayer
  at.alphaTab('playerCursor'); // cursor
} else {
  alert('The player feature requires Flash 11.4 or above installed in your browser');
}