/*global OpenSeadragon, $, parseUri */
'use strict';

function zarkToKey(zark) {
  var park = zark.split('/');
  return park[1] + '-' + park[2] + '-' + park[3] + '.jp2';
}

$(document).ready(function() {
  var zark = parseUri(window.location).queryKey.ark;
  var url = 'http://pottoloris-env.elasticbeanstalk.com/' + zarkToKey(zark);
  url = url + '/info.json';
  $.ajax(url).done(function(tiles) {
    var viewer = new OpenSeadragon({
      id: 'obj__osd',
      tileSources: tiles,
      zoomInButton: 'obj__osd-button-zoom-in',
      zoomOutButton: 'obj__osd-button-zoom-out',
      homeButton: 'obj__osd-button-home',
      fullPageButton: 'obj__osd-button-fullscreen'
    });
    console.log(viewer);
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
