// ==UserScript==
// @name           Neptun Tinker
// @namespace      http://example.org
// @description    Neptun, viszont a mi verziónk!
// @version        0.1.6
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

(function () {
  "use strict";

  var nep = {
    init: async function () {
      // call function after timetable finished loading
      setTimeout(this.courseCollison, 2500);

      this.initKeepSession();
      this.newMenus();
      this.hideHeader();
      //this.hideFilter();
      this.changeLayout();

      var i;
      var max_num = document.getElementById(
        "c_messages_gridMessages_ddlPageSize"
      ).value;
      for (i = 0; i < max_num; i++) {
        const element = document.getElementsByClassName("link")[i];

        //NEM KÍVÁNATOS ÜZENETEK

        if (
          element.innerHTML == "Kurzus órarendi változás" ||
          element.innerHTML.toUpperCase().includes("EMLÉKEZTETŐ") ||
          element.innerHTML.toUpperCase().includes("ERASMUS") ||
          element.innerHTML.toUpperCase().includes("SPORT") ||
          element.innerHTML.toUpperCase().includes("ANGOL") ||
          element.innerHTML.toUpperCase().includes("ÉRTESÍTÉS")
        ) {
          const id = element.parentElement.parentElement.id;
          document.getElementById(id).style.display = "none";
        }

        //JEGYBEÍRÁS
        else if (
          element.innerHTML.includes("jegybeírás történt") ||
          element.innerHTML.includes("vizsgajegy került beírásra")
        ) {
          const id = element.parentElement.parentElement.id;
          document.getElementById(id).classList.remove("Row1_Bold");
          if (
            document.getElementById(id).children[5].children[0].alt ==
            "Elolvasott üzenet"
          ) {
            document.getElementById(id).style.backgroundColor = "#00FF00";
          } else {
            document.getElementById(id).style.backgroundColor = "#40D043";
            document.getElementById(id).style.color = "white";
          }
        }

        //VIZSGAKIÍRÁS
        else if (element.innerHTML.includes("Új vizsgakiírás")) {
          const id = element.parentElement.parentElement.id;
          document.getElementById(id).classList.remove("Row1_Bold");
          document.getElementById(id).style.color = "white";

          document
            .getElementById(id)
            .children[6].children[0].style.setProperty(
              "color",
              "white",
              "important"
            );

          if (
            document.getElementById(id).children[5].children[0].alt ==
            "Elolvasott üzenet"
          ) {
            document.getElementById(id).style.backgroundColor = "#6F9EFF";
          } else {
            document.getElementById(id).style.backgroundColor = "#3160F9";
          }
        }
        //ÖSZTÖNDÍJ
        else if (element.innerHTML.toUpperCase().includes("ÖSZTÖNDÍJ")) {
          const id = element.parentElement.parentElement.id;
          document.getElementById(id).classList.remove("Row1_Bold");
          if (
            document.getElementById(id).children[5].children[0].alt ==
            "Elolvasott üzenet"
          ) {
            document.getElementById(id).style.backgroundColor = "#FFED6B";
          } else {
            document.getElementById(id).style.backgroundColor = "#F9DD31";
          }
        }
        //ÜGYINTÉZŐ ÉLTAL TÖRTÉNT DELETE
        else if (element.innerHTML.toUpperCase().includes("ÜGYINTÉZŐ")) {
          const id = element.parentElement.parentElement.id;
          document.getElementById(id).classList.remove("Row1_Bold");
          document
            .getElementById(id)
            .children[6].children[0].style.setProperty(
              "color",
              "white",
              "important"
            );
          if (
            document.getElementById(id).children[5].children[0].alt ==
            "Elolvasott üzenet"
          ) {
            document.getElementById(id).style.backgroundColor = "#D82020";
          } else {
            document.getElementById(id).style.backgroundColor = "#FF0000";
          }
          document.getElementById(id).style.color = "white";
        }
      }
      var table = document.getElementById("c_messages_gridMessages_bodytable");
      var cell = table.getElementsByClassName("scrollablebody");
      for (var j = 1, row; (row = table.rows[j]); j++) {
        let date = row.cells[7].textContent;
        let str = date.split(".");
        let str2 = str[3].split(":");
        let newDate = new Date(
          str[0],
          str[1] - 1,
          str[2],
          str2[0],
          str2[1],
          str2[2]
        );
        let now = Date.now();
        let newText;
        if (Math.floor((now - newDate) / (1000 * 60 * 60)) < 1) {
          newText =
            Math.floor(Math.floor(now - newDate) / (1000 * 60)) + " perce";
        } else if (Math.floor((now - newDate) / (1000 * 60 * 60 * 24)) < 1) {
          newText =
            Math.floor(Math.floor(now - newDate) / (1000 * 60 * 60)) + " órája";
        } else if (Math.floor((now - newDate) / (1000 * 60 * 60 * 24)) < 365) {
          newText =
            Math.floor(Math.floor(now - newDate) / (1000 * 60 * 60 * 24)) +
            " napja";
        } else {
          newText =
            Math.floor(
              Math.floor(now - newDate) / (1000 * 60 * 60 * 24 * 365)
            ) + " éve";
        }
        if (newText != null) {
          row.cells[7].textContent = newText;
        }
      }
    },

    changeLayout: function () {
      document.getElementById("function_table_leftside").style.display = "none";
      document.getElementById("upFunctionCommandLineTop").style.display =
        "none";
      document.getElementById("upFunctionCommandLineTop").style.display =
        "none";
      document.getElementById("function_table_leftside").style.display = "none";
      document.getElementById(
        "upMuveletek_label_Muveletek_Main"
      ).style.display = "none";
      document.getElementById(
        "upFunctionCommandLineBottom_div_line_bottom"
      ).style.display = "none";
      document.getElementsByClassName("FunctionRightSide")[0].style.display =
        "none";
      document.getElementsByClassName("FunctionRightSide")[1].style.display =
        "none";
      document.getElementsByClassName("FunctionRightSide")[2].style.display =
        "none";
      document.getElementById("upFunctionCommand_lbtn_new").style.display =
        "none";
      document.getElementById("function_table_body").style.width = "70%";
      document.getElementById("function_table_body").style.padding = 0;
      document.getElementById("upBoxes_upCalendar").style.float = "right";
      document.getElementById("lblTrainingName").innerHTML = null;
      document.getElementById(
        "SDAUpdatePanel1_lbtnChangeTraining"
      ).innerHTML = null;
      document.getElementById("separator").innerHTML = null;
      document.getElementsByClassName("main_search")[0].style.display = "none";
      document.getElementsByClassName(
        "FunctionHeaderLeftCorner"
      )[0].style.display = "none";
      document.getElementsByClassName("caption")[0].style.display = "none";
    },

    courseCollison: function () {
      let table = document.getElementById("tgTable");
      let week = table.rows[0];
      console.log(week.cells);
      for (let k = 1; k <= 7; k++) {
        let tops = [];
        const day_column = week.cells[k].childNodes[0];
        if (day_column.childNodes.length != 0) {
          for (let index = 0; index < day_column.childNodes.length; index++) {
            if (tops.includes(day_column.childNodes[index].style.top)) {
              day_column.childNodes[index].style.backgroundColor = "red";
              day_column.childNodes[index].childNodes[2].style.backgroundColor =
                "red";
              for (let l = 0; l <= index; l++) {
                if (
                  day_column.childNodes[index].style.top ==
                  day_column.childNodes[l].style.top
                ) {
                  day_column.childNodes[l].style.backgroundColor = "red";
                  day_column.childNodes[l].childNodes[2].style.backgroundColor =
                    "red";
                }
              }
            }
            tops.push(day_column.childNodes[index].style.top);
          }
        }
      }
    },

    initKeepSession: function () {
      var cdt = $("#hfCountDownTime");
      var timeout = 120;
      if (cdt.size() > 0) {
        var cdto = parseInt(cdt.val());
        if (cdto > 60) {
          timeout = cdto;
        }
      }
      var keepAlive = function () {
        window.setTimeout(function () {
          $.ajax({
            url: "main.aspx",
          });
          keepAlive();
        }, timeout * 1000 - 30000 - Math.floor(Math.random() * 30000));
      };
      keepAlive();

      window.setInterval(function () {
        nep.runEval(function () {
          ShowModal = function () {};
          clearTimeout(timerID);
          clearTimeout(timerID2);
          sessionEndDate = null;
        });
        if ($("#npuStatus").size() == 0) {
          $("#upTraining_lblRemainingTime").html(
            '<span id="npuStatus" style="font-weight: normal">Neptun Tinker</span>'
          );
        }
      }, 1000);
    },

    hideHeader: function () {
      $("#panHeader, #panCloseHeader").hide();
      $("table.top_menu_wrapper")
        .css("margin-top", "5px")
        .css("margin-bottom", "8px");
      $("#form1 > fieldset").css("border", "0 none");
      $("#span_changeproject").parent().hide();
    },

    initParameters: function () {
      nep.user = nep.getUser();
      nep.domain = nep.getDomain();
      nep.training = nep.getTraining();
    },

    newMenus: function () {
      var orarend = $(
        '<li aria-haspopup="false" tabindex="0" role="menuitem" class="menu-parent has-target" id="mb1_Orarend" targeturl="main.aspx?ctrl=0203&amp;ismenuclick=true">Órarend</li>'
      );
      $("#mb1_Targyak").before(orarend);
      $("#mb1_Tanulmanyok_Órarend").remove();

      if (!$("#upChooser_chooser_kollab").hasClass("KollabChooserSelected")) {
        $(
          '<li aria-haspopup="true" tabindex="0" role="menuitem" class="menu-parent" id="mb1_Targyak" targeturl="main.aspx?ismenuclick=true&amp;ctrl=0303">Tárgy felvétel</li>'
        ).appendTo("#mb1");
      }

      if (!$("#upChooser_chooser_kollab").hasClass("KollabChooserSelected")) {
        $(
          '<li aria-haspopup="false" tabindex="0" role="menuitem" class="menu-parent has-target" id="mb1_MeetStreet" targeturl="javascript:__doPostBack(\'upChooser$btnKollab\',\'\')">Meet Street</li>'
        ).appendTo("#mb1");
      }
      if (!$("#upChooser_chooser_neptun").hasClass("NeptunChooserSelected")) {
        $(
          '<li aria-haspopup="false" tabindex="0" role="menuitem" class="menu-parent has-target" id="mb1_TanulmanyiRendszer" targeturl="javascript:__doPostBack(\'upChooser$btnNeptun\',\'\')">Neptun</li>'
        ).appendTo("#mb1");
      }

      $("#mb1 li[targeturl]")
        .css("position", "relative")
        .each(function () {
          $(this).addClass("has-target");
          var a = $(
            '<a href="' +
              $(this).attr("targeturl") +
              '" style="display: block; position: absolute; left: 0; top: 0; width: 100%; height: 100%"></a>'
          );
          a.click(function (e) {
            $("ul.menu").css("visibility", "hidden");
            e.stopPropagation();
          });
          var hoverid = $(this).attr("hoverid");
          if (hoverid) {
            a.hover(
              function () {
                $(hoverid).addClass("menu-hover");
              },
              function () {
                $(hoverid).removeClass("menu-hover");
              }
            );
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

    runEval: function (source) {
      if ("function" == typeof source) {
        source = "(" + source + ")();";
      }
      var script = document.createElement("script");
      script.setAttribute("type", "application/javascript");
      script.textContent = source;
      document.body.appendChild(script);
      document.body.removeChild(script);
    },

    runAsync: function (func) {
      window.setTimeout(func, 0);
    },

    getChild: function (o, s) {
      while (s.length) {
        var n = s.shift();
        if (!(o instanceof Object && n in o)) {
          return;
        }
        o = o[n];
      }
      return o;
    },

    setChild: function (o, s, v) {
      while (s.length) {
        var n = s.shift();
        if (s.length == 0) {
          if (v == null) {
            delete o[n];
          } else {
            o[n] = v;
          }
          return;
        }
        if (!(typeof o == "object" && n in o)) {
          o[n] = new Object();
        }
        o = o[n];
      }
    },

    fixOfficialMessagePopup: function () {
      var dismiss = function () {
        $(
          "[aria-describedby=upRequiredMessageReader_upmodal_RequiredMessageReader_divpopup] .ui-dialog-content"
        ).dialog("close");
      };

      window.setInterval(function () {
        var messagePopup = $(
          "#upRequiredMessageReader_upmodal_RequiredMessageReader_divpopup:visible"
        ).closest(".ui-dialog");
        if (
          messagePopup.size() > 0 &&
          $("#upFunction_c_messages_upMain_upGrid").size() === 0
        ) {
          nep.runEval(dismiss);
        }
        if (
          messagePopup.size() > 0 &&
          messagePopup.is(":not([data-nep-enhanced])")
        ) {
          messagePopup.attr("data-nep-enhanced", "true");
          $("input[commandname=Tovabb]", messagePopup).val("Elolvasom");
          var dismissBtn = $(
            '<input value="Most nem érdekel" class="nep_dismiss ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button">'
          );
          dismissBtn.click(function () {
            nep.runEval(dismiss);
          });
          $(".ui-dialog-footerbar > div", messagePopup).append(dismissBtn);
        }
      }, 200);
    },
  };
  nep.init();
  let stylesheet = `body, h2{
       background: #111111;
  }span, #upTraining,#upMenuCaption_menucaption, #mb1_Sajatadatok, #mb1_Tanulmanyok,
  #mb1_Orarend, #mb1_Targyak, #mb1_Vizsgak, #mb1_Penzugyek, #mb1_Informacio,
  #mb1_Ügyintezes,#mb1_MeetStreet, .tableRowName, .tableRowData, #lnkHelp,
  #lnkFunctionHelp, #hlSiteMap, #dtbBaseData_lblTitleRight,#ctl00_lblTitleRight,
  .caption, ul, li, #calendar_calendar tbody tr td,divCalendar,.FunctionCommandTitle,
  .link_pagesize,.grid_RowCount{
       color: #FFFFFF;
  }.FunctionHeaderItem, .FunctionHeaderTitle, .FunctionHeaderRightCorner,
   .FunctionHeaderLeftCorner,.footer_left,.footer_mid, .footer_menu,.footer_sda_logo,
   .footer_right, .readmessage_editor{
       background: #111111;
   }.top_menu_mid, .top_menu_left, .top_menu_right, ul,li,
    .GadgetHeaderPanelTitle, .HeaderLeftCorner, .GadgetHeaderPanelButtonLeftMenu,
    .HeaderRightCorner, .FunctionHeaderLeftCorner, .FunctionHeader,
    .FunctionHeaderRightCorner, .grid_pagerrow_left, .grid_topfunctionpanel,
    .grid_pagerpanel, .grid_pagerrow_right, .header, #head_chk,
    #head_SendDate,.grid_footerleftcorner, .grid_RowCount,
    .grid_bottomfunctionpanel, .grid_footerrightcorner{
       background: #1E2B33;
   }#upFunction_c_messages_upModal_upmodalextenderReadMessage_divpopup{
       background-color:#1E2B33;
   }`;
   let s = document.createElement('style');
   s.type = 'text/css';
   s.innerHTML = stylesheet;
   (document.head || document.documentElement).appendChild(s); })();