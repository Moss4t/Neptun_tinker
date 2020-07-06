// ==UserScript==
// @name           Neptun Tinker
// @namespace      http://example.org
// @description    Neptun, de jobb!
// @version        0.0.2
// @downloadURL    https://raw.githubusercontent.com/Moss4t/Neptun_tinker/master/neptun_tinker.js
// @include        https://*neptun*/*hallgato*/*
// @include        https://*neptun*/*oktato*/*
// @include        https://*hallgato*.*neptun*/*
// @include        https://*oktato*.*neptun*/*
// @include        https://netw*.nnet.sze.hu/hallgato/*
// @include        https://nappw.dfad.duf.hu/hallgato/*
// @include        https://host.sdakft.hu/*
// @include        https://neptun.ejf.hu/ejfhw/*
// @grant          GM.xmlHttpRequest
// @grant          GM_xmlhttpRequest
// @grant          GM.getValue
// @grant          GM_getValue
// @grant          GM.setValue
// @grant          GM_setValue
// @grant          GM.info
// @grant          GM_info
// @require        https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js
// ==/UserScript==

(function() {
    "use strict";
  
    var nep = {
        init: async function() {

            var i;
            var max_num = document.getElementById("c_messages_gridMessages_ddlPageSize").value;
            for (i = 0; i < max_num; i++) {
                const something = document.getElementsByClassName("link")[i];
                if(something.innerHTML == "Kurzus órarendi változás"){
                    console.log("Kurzus!");
                    //DELETE MESSAGE HERE
                    const id = something.parentElement.parentElement.id;
                    document.getElementById(id).style.display = 'none';
                }
            }  
        }
    }
    nep.init();
  })();