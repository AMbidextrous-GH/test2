$(function() {

    let tabMenu = function() {
  
      /**
       * 変数の指定
       * $tab_area          : tabの親要素のjQueryオブジェクト
       * $content           : tabによって切り替わる要素のjQueryオブジェクト
       * TAB_ACTIVE_CLASS   : tabが選択されたスタイルを変更するclass名
       * CONTENT_SHOW_CLASS : contentを表示させるためのclass名
       * id_arr             : $contentのIDを配列に格納
       */
      let $tab_area          = $('.tabArea');
      let $content           = $('.contents .tab_main');
      let TAB_ACTIVE_CLASS   = 'select';
      let CONTENT_SHOW_CLASS = 'is_show';
      let id_arr             = $content.map(function() { return '#' + $(this).attr('id');}).get();
  
      /**
       * 該当するhashデータがある場合、hashを返す
       * 該当とは id_arr[] に含まれるもの
       * @return {string} 該当する場合
       * @return {false} 該当しない（存在しない）場合
       */
      let getHash = function() {
        let hash = window.location.hash;
        let index = id_arr.indexOf(hash);
  
        if (index === -1) {
          return false;
        } else {
          return id_arr[index];
        }
      };
  
      /**
       * ページ読み込み時に実行
       * 1. hashがあれば、hashをhrefに持つタブのスタイル変更（専用のclass付与）
       * 2. hashがあれば、hashをidに持つコンテンツを表示（専用のclassを付与）
       * 3. hashがなければ、タブの先頭が選択された状態とする
       */
      let initialize = function() {
        let hash = getHash();
        if (hash) {
          $tab_area.find('a[href="'+hash+'"]').addClass(TAB_ACTIVE_CLASS); // 1
          $(hash).addClass(CONTENT_SHOW_CLASS); // 2
          $(window).on('load',function(){
            setTimeout(function(){
              // 移動先を100px上にずらす
              var adjust = 100;
              // スクロールの速度
              var speed = 400; // ミリ秒
              // 移動先を取得
              var target = $(hash);
              // 移動先を調整
              var position = target.offset().top - adjust;
              // スムーススクロール
              $('body,html').animate({scrollTop:position}, speed, 'swing');
            },100);
          });
        } else {
          $tab_area.find('.one_tab:first > a').addClass(TAB_ACTIVE_CLASS); // 3
          $($content[0]).addClass(CONTENT_SHOW_CLASS); // 3
        }
      };
  
      /**
       * タブのクリックイベント
       * 1. クリックされたタブのhref, 該当するcontentを取得
       * 2. 既にクリック済みの状態であればスキップ
       * 3. 一旦タブ・contentの専用classを全削除
       * 4. クリックしたタブのスタイルを変更、該当するcontentを表示（それぞれ専用のclassを付与）
       */
      let addEvent = function() {
        $tab_area.find('a').on('click', function() {
          // 1
          let href = $(this).attr('href');
          let $targetContent = $(href);
  
          // 2
          if ($(this).hasClass(TAB_ACTIVE_CLASS)) {
            return false;
          }
  
          // 3
          $tab_area.find('a').removeClass(TAB_ACTIVE_CLASS);
          $content.removeClass(CONTENT_SHOW_CLASS);
  
          // 4
          $(this).addClass(TAB_ACTIVE_CLASS);
          $targetContent.addClass(CONTENT_SHOW_CLASS);
  
          return false;
        });
      };
  
      return [initialize(), addEvent()];
    };
  
    // 実行
    tabMenu();
  });
$(function() {
    $('.spinner').each(function() {
      let el  = $(this);
      let add = $('.spinner-add');
      let sub = $('.spinner-sub');
  
      // substract
      el.parent().on('click', '.spinner-sub', function() {
        if (el.val() > parseInt(el.attr('min'))) {
          el.val(function(i, oldval) {
            return --oldval;
          });
        }
        // disabled
        if (el.val() == parseInt(el.attr('min'))) {
          el.prev(sub).addClass('disabled');
        }
        if (el.val() < parseInt(el.attr('max'))) {
          el.next(add).removeClass('disabled');
        }
      });
  
      // increment
      el.parent().on('click', '.spinner-add', function() {
        if (el.val() < parseInt(el.attr('max'))) {
          el.val(function(i, oldval) {
            return ++oldval;
          });
        }
        // disabled
        if (el.val() > parseInt(el.attr('min'))) {
          el.prev(sub).removeClass('disabled');
        }
        if (el.val() == parseInt(el.attr('max'))) {
          el.next(add).addClass('disabled');
        }
      });
    });
  });

 // 指定したエレメント(input)が所属する行(tr)を取得
function gyo(obj)
{
    return obj.parentElement.parentElement ;
}

// 指定したエレメント(input)と同じ行にある単価を取得
function tanka(obj)
{
    return gyo(obj).querySelectorAll("input[id^=tanka]")[0].value ;
}

// 指定したエレメント(input)と同じ行にある数量を取得
function suryo(obj)
{
    return gyo(obj).querySelectorAll("input[id^=suryo]")[0].value ;
}


//指定したエレメント(input)にかかる消費税を計算
/* 消費税を計算するtax関数 */
function tax(price) {
  let TAX = 0.08;
  let floatTax = price * TAX;
  return Math.round(floatTax);
}

$(function(){
  $('#tax').on('change', function(){	/* ← 文字入力を検知したら起動 */
    let num = parseInt( $('.ex_price').val() );	/* ← inputタグに入力された値を変数numに代入 */
    let t   = tax(num);		/* ← tax関数で計算した値を変数tに代入 */
    $('.ex_tax').text(t);		/* ← <span class="ex_tax">に変数tの値を出力 */
  });
});

// 指定したエレメント(input)の横計(単価×数量)を再計算してから取得
function yokokei(obj)
{
    result = Number(tanka(obj)) * Number(suryo(obj));
    gyo(obj).querySelectorAll("input[id^=yokokei]")[0].value = result ;
    return result ;
}

// 総合計を再計算
function tatekei()
{
    prices = Array.from(document.querySelectorAll("input[id^=yokokei]")).map(element => Number(yokokei(element))) ;
    result = prices.reduce(function(sum,element){
        return sum + element ;
    });
    return result;
}

// 再計算
function reCalc()
{
    document.getElementById("total").value = tatekei();
    return;
} 