// ==UserScript==
// @name           Neptun Tinker
// @namespace      http://example.org
// @description    Neptun, viszont a mi verziónk!
// @version        0.0.7
// @downloadURL    https://raw.githubusercontent.com/Moss4t/Neptun_tinker/master/neptun_tinker.user.js
// @updateURL      https://raw.githubusercontent.com/Moss4t/Neptun_tinker/master/neptun_tinker.user.js
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

      this.initKeepSession();
      this.newMenus();
      this.hideHeader();
      this.hideFilter();

      var i;
      var max_num = document.getElementById("c_messages_gridMessages_ddlPageSize").value;
      for (i = 0; i < max_num; i++) {

        const element = document.getElementsByClassName("link")[i];
        
          //NEM KÍVÁNATOS ÜZENETEK

        if(element.innerHTML == "Kurzus órarendi változás" || element.innerHTML.toUpperCase().includes("EMLÉKEZTETŐ") || element.innerHTML.toUpperCase().includes("ERASMUS")
        || element.innerHTML.toUpperCase().includes("SPORT") || element.innerHTML.toUpperCase().includes("ANGOL") || element.innerHTML.toUpperCase().includes("ÉRTESÍTÉS")){
                    const id = element.parentElement.parentElement.id;
                    document.getElementById(id).style.display = 'none';
                }

          //JEGYBEÍRÁS

                else if (element.innerHTML.includes("jegybeírás történt") || element.innerHTML.includes("vizsgajegy került beírásra")){
                    const id = element.parentElement.parentElement.id;
                    document.getElementById(id).classList.remove("Row1_Bold");
                    if(document.getElementById(id).children[5].children[0].alt == "Elolvasott üzenet"){
                        document.getElementById(id).style.backgroundColor = "#00FF00";
                    }else{
                        document.getElementById(id).style.backgroundColor = "#40D043";
                        document.getElementById(id).style.color = "white";
                        console.log(document.getElementById(id).children[6].children[0]);
                       // document.getElementById(id).children[6].children[0].classList.remove("link");
                    }


          //VIZSGAKIÍRÁS

                }
                else if (element.innerHTML.includes("Új vizsgakiírás")){
                    const id = element.parentElement.parentElement.id;
                     document.getElementById(id).classList.remove("Row1_Bold");
                     document.getElementById(id).style.color = "white";

                     document.getElementById(id).children[6].children[0].style.setProperty("color", "white", "important");

                    if(document.getElementById(id).children[5].children[0].alt == "Elolvasott üzenet"){
                        document.getElementById(id).style.backgroundColor = "#6F9EFF";
                    }else{
                        document.getElementById(id).style.backgroundColor = "#3160F9";

                        console.log(document.getElementById(id).children[6].children[0]);                       
                    }
                }
          //ÖSZTÖNDÍJ

                        console.log(document.getElementById(id).children[6].children[0]);
                       // document.getElementById(id).children[6].children[0].classList.remove("link");
                    }
                }

                else if (element.innerHTML.toUpperCase().includes("ÖSZTÖNDÍJ")){
                    const id = element.parentElement.parentElement.id;
                    document.getElementById(id).classList.remove("Row1_Bold");
                     if(document.getElementById(id).children[5].children[0].alt == "Elolvasott üzenet"){
                        document.getElementById(id).style.backgroundColor = "#FFED6B";
                    }else{

                        document.getElementById(id).style.backgroundColor = "#F9DD31";
                        console.log(document.getElementById(id).children[6].children[0]);
                       //document.getElementById(id).children[6].children[0].classList.remove("link");
                        document.getElementById(id).style.backgroundColor = "#3160F9";
                        console.log(document.getElementById(id).children[6].children[0]);
                       // document.getElementById(id).children[6].children[0].classList.remove("link");

                    }

                }
            }

            var table = document.getElementById("c_messages_gridMessages_bodytable");
            var cell = table.getElementsByClassName("scrollablebody");
            for (var j = 1, row; row = table.rows[j]; j++) {
                let date = row.cells[7].textContent;
                let str = date.split('.');
                let str2 = str[3].split(':');
                let newDate = new Date(str[0], str[1] - 1, str[2], str2[0], str2[1], str2[2]);
                let now = Date.now();
                let newText;
                if (Math.floor((now - newDate) / (1000*60*60)) < 1) {
                  newText = Math.floor(Math.floor(now - newDate) / (1000*60)) + " perce";
                }
                else if (Math.floor((now - newDate) / (1000*60*60*24)) < 1){
                  newText = Math.floor(Math.floor(now - newDate) / (1000*60*60)) + " órája";
                }
                else if (Math.floor((now - newDate) / (1000*60*60*24)) < 365) {
                  newText = Math.floor(Math.floor(now - newDate) / (1000*60*60*24)) + " napja";
                } else {
                  newText = Math.floor(Math.floor(now - newDate) / (1000*60*60*24*365)) + " éve";
                }
                if (newText != null) {
                  row.cells[7].textContent = newText;
                }
              }
          },

        isPage: function(ctrl) {
          return (window.location.href.indexOf("ctrl=" + ctrl) != -1);
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
                $("#upTraining_lblRemainingTime").html('<span id="npuStatus" style="font-weight: normal">Neptun Tinker</span>');
              }
            }, 1000);
          },

          hideHeader: function() {
            $("#panHeader, #panCloseHeader").hide();
            $("table.top_menu_wrapper").css("margin-top", "5px").css("margin-bottom", "8px");
            $("#form1 > fieldset").css("border", "0 none");
            $("#span_changeproject").parent().hide();
          },


          hideFilter: function() {
            $("#function_tableheader, #upFilter").hide();
            $("table.top_menu_wrapper").css("margin-top", "5px").css("margin-bottom", "8px");
            $("#form1 > fieldset").css("border", "0 none");
            $("#span_changeproject").parent().hide();
          },

          initParameters: function() {
            nep.user = nep.getUser();
            nep.domain = nep.getDomain();
            nep.training = nep.getTraining();
          },

          newMenus: function(){
            var orarend = $('<li aria-haspopup="false" tabindex="0" role="menuitem" class="menu-parent has-target" id="mb1_Orarend" targeturl="main.aspx?ctrl=0203&amp;ismenuclick=true">Órarend</li>');
            $("#mb1_Targyak").before(orarend);
            $("#mb1_Tanulmanyok_Órarend").remove();

            if(!$("#upChooser_chooser_kollab").hasClass("KollabChooserSelected")) {
              $('<li aria-haspopup="false" tabindex="0" role="menuitem" class="menu-parent has-target" id="mb1_MeetStreet" targeturl="javascript:__doPostBack(\'upChooser$btnKollab\',\'\')">Meet Street</li>').appendTo("#mb1");
            }
            if(!$("#upChooser_chooser_neptun").hasClass("NeptunChooserSelected")) {
              $('<li aria-haspopup="false" tabindex="0" role="menuitem" class="menu-parent has-target" id="mb1_TanulmanyiRendszer" targeturl="javascript:__doPostBack(\'upChooser$btnNeptun\',\'\')">Neptun</li>').appendTo("#mb1");
            }

            $("#mb1 li[targeturl]").css("position", "relative").each(function() {
              $(this).addClass("has-target");
              var a = $('<a href="' + $(this).attr("targeturl") + '" style="display: block; position: absolute; left: 0; top: 0; width: 100%; height: 100%"></a>');
              a.click(function(e) {
                $("ul.menu").css("visibility", "hidden");
                e.stopPropagation();
              });
              var hoverid = $(this).attr("hoverid");
              if(hoverid) {
                a.hover(function() { $(hoverid).addClass("menu-hover"); }, function() { $(hoverid).removeClass("menu-hover"); });
              }
              $(this).append(a);

            });
          },

         /*moreMessages: function() {
            window.setInterval(function() {
              var pageSelect = $(".grid_pagerpanel select");
              pageSelect.each(function() {
                var e = $(this);
                e.hide();
                $(".link_pagesize", e.closest("tr")).html("");
                if(e.attr("data-listing") != "1" && e.val() != "500") {
                  e.attr("data-listing", "1").val("500");
                  var onChange = this.getAttributeNode("onchange");
                  if(onChange) {
                    nep.runEval(onChange.value);
                  }
                }
              });
            }, 100);
          },
          */

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

          runAsync: function(func) {
            window.setTimeout(func, 0);
          },

          getChild: function(o, s) {
            while(s.length) {
              var n = s.shift();
              if(!(o instanceof Object && n in o)) {
                return;
              }
              o = o[n];
            }
            return o;
          },

          setChild: function(o, s, v) {
            while(s.length) {
              var n = s.shift();
              if(s.length == 0) {
                if(v == null) {
                  delete o[n];
                }
                else {
                  o[n] = v;
                }
                return;
              }
              if(!(typeof o == "object" && n in o)) {
                o[n] = new Object();
              }
              o = o[n];
            }
          },

    fixOfficialMessagePopup: function() {
        var dismiss = function() {
          $("[aria-describedby=upRequiredMessageReader_upmodal_RequiredMessageReader_divpopup] .ui-dialog-content").dialog("close");
        };

        window.setInterval(function() {
          var messagePopup = $("#upRequiredMessageReader_upmodal_RequiredMessageReader_divpopup:visible").closest(".ui-dialog");
          if(messagePopup.size() > 0 && $("#upFunction_c_messages_upMain_upGrid").size() === 0) {
            nep.runEval(dismiss);
          }
          if(messagePopup.size() > 0 && messagePopup.is(":not([data-nep-enhanced])")) {
            messagePopup.attr("data-nep-enhanced", "true");
            $("input[commandname=Tovabb]", messagePopup).val("Elolvasom");
            var dismissBtn = $('<input value="Most nem érdekel" class="nep_dismiss ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button">');
            dismissBtn.click(function() {
              nep.runEval(dismiss);
            });
            $(".ui-dialog-footerbar > div", messagePopup).append(dismissBtn);
          }
        }, 200);
      },

    }
    nep.init();
  })();