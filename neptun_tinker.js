// ==UserScript==
// @name           Neptun Tinker
// @namespace      http://example.org
// @description    Neptun, de jobb!
// @version        0.0.3
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
            var max_num = 20; //annyi kell hogy legyen, mint amennyit beállítunk listázásra. Ez alapméretezetten 20
            for (i = 0; i < 20; i++) {
                if(document.getElementsByClassName("link")[i].innerHTML == "Kurzus órarendi változás"){
                    console.log("Kurzus!");
                    //DELETE MESSAGE HERE
                }
            }
            
            this.initKeepSession();

  
        },

        initKeepSession: function() {
            var cdt = $("#hfCountDownTime");
            var timeout = 120;
            if(cdt.size() > 0) {
              var cdto = parseInt(cdt.val());
              if(cdto > 60) {
                timeout = cdto;
              }
            }
            var keepAlive = function() {
              window.setTimeout(function() {
                $.ajax({
                  url: "main.aspx"
                });
                keepAlive();
              }, timeout * 1000 - 30000 - Math.floor(Math.random() * 30000));
            };
            keepAlive();

            window.setInterval(function() {
              nep.runEval(function() {
                ShowModal = function() { };
                clearTimeout(timerID);
                clearTimeout(timerID2);
                sessionEndDate = null;
              });
              if($("#npuStatus").size() == 0) {
                $("#upTraining_lblRemainingTime").html('<span id="npuStatus" style="font-weight: normal"><a href="https://github.com/solymosi/npu" target="_blank">Neptun PowerUp!</a> v' + GM.info.script.version + '</span>');
              }
            }, 1000);
          },
          
          runEval: function(source) {
            if ("function" == typeof source) {
              source = "(" + source + ")();"
            }
            var script = document.createElement('script');
            script.setAttribute("type", "application/javascript");
            script.textContent = source;
            document.body.appendChild(script);
            document.body.removeChild(script);
          },
    }
    nep.init();
  })();