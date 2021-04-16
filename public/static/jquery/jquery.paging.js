;(function ($, window, document, undefined) {
  'use strict';

  $('head').append(`
    <style>
    /* 外面盒子样式---自己定义 */
    .page_div{margin:20px 10px 20px 0;color:#666}
    /* 页数按钮样式 */
    .page_div button{display:inline-block;min-width:30px;height:28px;cursor:pointer;color:#666;font-size:13px;line-height:28px;background-color:#f9f9f9;border:1px solid #dce0e0;text-align:center;margin:0 4px;-webkit-appearance: none;-moz-appearance: none;appearance: none;}
    #firstPage,#lastPage,#nextPage,#prePage{width:80px;color:#0073A9;border:1px solid #0073A9}
    #nextPage,#prePage{width:70px}
    .page_div .current{background-color:#0073A9;border-color:#0073A9;color:#FFF}
    /* 页面数量 */
    .totalPages{margin:0 10px}
    .totalPages span,.totalSize span{color:#0073A9;margin:0 5px}
    /*button禁用*/
    .page_div button:disabled{opacity:.5;cursor:no-drop}
    #page button, #page span {
        margin-right: 10px;
    }
    #page {
        background: #fff;
        margin-top: 20px;
        padding: 20px 0;
        text-align: center;
    }
    #page .current{
        background: #0073A9;
        color: #fff;
        border-color: #0073A9;
    }
    </style>
    
  `)
  function Paging(element, options) {
      this.element = element;
      this.options = {
          pageNum: options.pageNum || 1, // 褰撳墠椤电爜
          totalNum: options.totalNum, // 鎬婚〉鐮�
          totalList: options.totalList, // 鏁版嵁鎬昏褰�
          callback: options.callback // 鍥炶皟鍑芥暟
      };
      this.init();
  }
  Paging.prototype = {
      constructor: Paging,
      init: function () {
          this.createHtml();
          this.bindEvent();
      },
      createHtml: function () {
          var me = this;
          var content = [];
          var pageNum = me.options.pageNum;
          var totalNum = me.options.totalNum;
          var totalList = me.options.totalList;
          content.push("<button type='button' id='firstPage'>首页〉</button><button type='button' id='prePage'>上一页</button>");
          // 鎬婚〉鏁板ぇ浜�6蹇呮樉绀虹渷鐣ュ彿
          if (totalNum > 6) {
              // 1銆佸綋鍓嶉〉鐮佸皬浜�5涓旀€婚〉鐮佸ぇ浜�6 鐪佺暐鍙锋樉绀哄悗闈�+鎬婚〉鐮�
              if (pageNum < 5) {
                  // 1涓�6涓昏鐪嬭鏄剧ず澶氬皯涓寜閽� 鐩墠閮芥樉绀�5涓�
                  for (var i = 1; i < 6; i++) {
                      if (pageNum !== i) {
                          content.push("<button type='button'>" + i + "</button>");
                      } else {
                          content.push("<button type='button' class='current'>" + i + "</button>");
                      }
                  }
                  content.push(". . .");
                  content.push("<button type='button'>" + totalNum + "</button>");
              } else {
                  // 2銆佸綋鍓嶉〉鐮佹帴杩戝悗闈� 鍒版渶鍚庨〉鐮侀殧3涓� 鐪佺暐鍙锋樉绀哄悗闈�+鎬婚〉闈�
                  if (pageNum < totalNum - 3) {
                      for (var i = pageNum - 2; i < pageNum + 3; i++) {
                          if (pageNum !== i) {
                              content.push("<button type='button'>" + i + "</button>");
                          } else {
                              content.push("<button type='button' class='current'>" + i + "</button>");
                          }
                      }
                      content.push(". . .");
                      content.push("<button type='button'>" + totalNum + "</button>");
                  } else {
                      // 3銆侀〉鐮佽嚦灏戝湪5锛屾渶澶氬湪銆恡otalNum - 3銆戠殑涓棿浣嶇疆 绗竴椤�+鐪佺暐鍙锋樉绀哄墠闈�
                      content.push("<button type='button'>" + 1 + "</button>");
                      content.push(". . .");
                      for (var i = totalNum - 4; i < totalNum + 1; i++) {
                          if (pageNum !== i) {
                              content.push("<button type='button'>" + i + "</button>");
                          } else {
                              content.push("<button type='button' class='current'>" + i + "</button>");
                          }
                      }
                  }
              }
          } else {
              // 鎬婚〉鏁板皬浜�6
              for (var i = 1; i < totalNum + 1; i++) {
                  if (pageNum !== i) {
                      content.push("<button type='button'>" + i + "</button>");
                  } else {
                      content.push("<button type='button' class='current'>" + i + "</button>");
                  }
              }
          }
          content.push("<button type='button' id='lastPage'>尾页〉</button><button type='button' id='nextPage'>下一页</button>");
          content.push("<span class='totalNum'> 共 " + totalNum + " 页 </span>");
          content.push("<span class='totalList'> 共 " + totalList + " 条记录 </span>");
          me.element.html(content.join(''));

          // DOM閲嶆柊鐢熸垚鍚庢瘡娆¤皟鐢ㄦ槸鍚︾鐢╞utton
          setTimeout(function () {
              me.dis();
          }, 20);
      },
      bindEvent: function () {
          var me = this;
          me.element.off('click', 'button');
          // 濮旀墭鏂扮敓鎴愮殑dom鐩戝惉浜嬩欢
          me.element.on('click', 'button', function () {
              var id = $(this).attr('id');
              var num = parseInt($(this).html());
              var pageNum = me.options.pageNum;
              if (id === 'prePage') {
                  if (pageNum !== 1) {
                      me.options.pageNum -= 1;
                  }
              } else if (id === 'nextPage') {
                  if (pageNum !== me.options.totalNum) {
                      me.options.pageNum += 1;
                  }
              } else if (id === 'firstPage') {
                  if (pageNum !== 1) {
                      me.options.pageNum = 1;
                  }
              } else if (id === 'lastPage') {
                  if (pageNum !== me.options.totalNum) {
                      me.options.pageNum = me.options.totalNum;
                  }
              } else {
                  me.options.pageNum = num;
              }
              me.createHtml();
              if (me.options.callback) {
                  me.options.callback(me.options.pageNum);
              }
          });
      },
      dis: function () {
          var me = this;
          var pageNum = me.options.pageNum;
          var totalNum = me.options.totalNum;
          if (pageNum === 1) {
              me.element.children('#firstPage, #prePage').prop('disabled', true);
          } else if (pageNum === totalNum) {
              me.element.children('#lastPage, #nextPage').prop('disabled', true);
          }
      }
  };
  $.fn.paging = function (options) {
      return new Paging($(this), options);
  }
})(jQuery, window, document);