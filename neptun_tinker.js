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

            var table = document.getElementById("c_messages_gridMessages_bodytable");
            var cell = table.getElementsByClassName("scrollablebody");
            for (var j = 1, row; row = table.rows[j]; j++) {
                let date = row.cells[7].textContent;
                let str = date.split('.');
                let str2 = str[3].split(':');
                let newDate = new Date(str[0], str[1] - 1, str[2], str2[0], str2[1], str2[2])
                let now = Date.now()
                let newText;
                if (Math.floor((now - newDate) / (1000*60*60)) < 1) {
                  newText = Math.floor(Math.floor(now - newDate) / (1000*60)) + " perce küldve"
                }
                else if (Math.floor((now - newDate) / (1000*60*60*24)) < 1){
                  newText = Math.floor(Math.floor(now - newDate) / (1000*60*60)) + " órája küldve"
                }
                else if (Math.floor((now - newDate) / (1000*60*60*24)) < 365) {
                  newText = Math.floor(Math.floor(now - newDate) / (1000*60*60*24)) + " napja küldve"
                } else {
                  newText = Math.floor(Math.floor(now - newDate) / (1000*60*60*24*365)) + " éve küldve" 
                }
                if (newText != null) {
                  row.cells[7].textContent = newText;
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
                $("#upTraining_lblRemainingTime").html('<span id="npuStatus" style="font-weight: normal">Neptun Tinker </span>');
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