/*global OpenSeadragon, $, parseUri, populateMetadata */
'use strict';
// create a fake YUI
var YAHOO = {}; YAHOO.util = {}; YAHOO.util.Dom = document;
YAHOO.util.Dom.get = document.getElementById;

// refactor the zark (z-indexed ARK) functions to mimimize .split?
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

function injectScript(zark) {
  var park = zark.split('/');
  var url = 'http://content.cdlib.org/ark:/' + park[1] + '/' + park[2] + '/?mode=jsod';
  var script = document.createElement('script');
  script.onload = function(){  // http://stackoverflow.com/a/8578723/1763984
    script.onload = null;
    populateMetadata();
  };
  $(script).appendTo('#metadata');
  script.src = url;
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
    $('#metadata').load(zarkToFrame(zark) + " .metadata-text");
  })
  .fail(function() {
    console.log('error');
    // TODO -- display error to user
  })
  .always(function() {
    console.log('complete');
    // TODO -- log stuff to google analytics
  });
  injectScript(zark);
});
