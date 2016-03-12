/*global OpenSeadragon, $, parseUri */
'use strict';

function zarkToKey(zark) {
  var park = zark.split('/');
  return park[1] + '-' + park[2] + '-' + park[3] + '.jp2';
}

function zarkToFrame(zark) {
  var park = zark.split('/');
  var url = 'http://content.cdlib.org/ark:/' + park[1] + '/' + park[2];
  url = url + '/?order=' + park[3].slice(1) + ';layout=iframe';
  return url;
}

$(document).ready(function() {
  var zark = parseUri(window.location).queryKey.ark;
  if (typeof zark === 'undefined') {
    return;
  }
  var url = 'http://pottoloris-env.elasticbeanstalk.com/' + zarkToKey(zark);
  url = url + '/info.json';
  $.ajax(url).done(function(tiles) {
    var x = new OpenSeadragon({
      id: 'obj__osd',
      tileSources: tiles,
      zoomInButton: 'obj__osd-button-zoom-in',
      zoomOutButton: 'obj__osd-button-zoom-out',
      homeButton: 'obj__osd-button-home',
      fullPageButton: 'obj__osd-button-fullscreen',
      prefixUrl: '/imgzoom/images/'
    });
    void x; // jshint hack
    $('<iframe>', {
      src: zarkToFrame(zark),
      id: 'myFrame',
      height: '100%',
      width: '100%',
      frameborder: 0,
      style: 'overflow:hidden;height:100%;width:100%'
    }).appendTo('#metadata');
  })
  .fail(function() {
    console.log('error');
    // TODO -- display error to user
  })
  .always(function() {
    console.log('complete');
    // TODO -- log stuff to google analytics
  });
});
