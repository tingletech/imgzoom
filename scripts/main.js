"use strict";function zarkToKey(o){var t=o.split("/");return t[1]+"-"+t[2]+"-"+t[3]+".jp2"}function zarkToFrame(o){var t=o.split("/"),e="http://content.cdlib.org/ark:/"+t[1]+"/"+t[2];return e=e+"/?order="+t[3].slice(1)+";layout=iframe"}function injectScript(o){var t=o.split("/"),e="http://content.cdlib.org/ark:/"+t[1]+"/"+t[2]+"/?mode=jsod",n=document.createElement("script");n.onload=function(){n.onload=null,populateMetadata()},$(n).appendTo("#metadata"),n.src=e}var YAHOO={};YAHOO.util={},YAHOO.util.Dom=document,YAHOO.util.Dom.get=document.getElementById,$(document).ready(function(){var o=parseUri(window.location).queryKey.ark;if("undefined"!=typeof o){var t="http://pottoloris-env.elasticbeanstalk.com/"+zarkToKey(o);t+="/info.json",$.ajax(t).done(function(t){new OpenSeadragon({id:"obj__osd",tileSources:t,zoomInButton:"obj__osd-button-zoom-in",zoomOutButton:"obj__osd-button-zoom-out",homeButton:"obj__osd-button-home",fullPageButton:"obj__osd-button-fullscreen",prefixUrl:"/imgzoom/images/"});$("#metadata").load(zarkToFrame(o)+" .metadata-text")}).fail(function(){console.log("error")}).always(function(){console.log("complete")}),injectScript(o)}});