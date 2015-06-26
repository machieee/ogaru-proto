//LinkDataの情報
var ldDataset="rdf1s3258i";
var ldFileName="municipality";

//LinkDataで設定した項目名
//曜日
var labelDayOfWeek = "http://www.machiee.com/dc/elements/1.1/dayofweek";
//日付
var labelDay = "http://www.machiee.com/dc/elements/1.1/day";
// 主食
var labelMenuMainly = "http://www.machiee.com/dc/elements/1.1/menumainly";
// 汁物
var labelMenuSoup = "http://www.machiee.com/dc/elements/1.1/menusoup";
// 副菜１
var labelMenuSide1 = "http://www.machiee.com/dc/elements/1.1/menuside1";
// 副菜２
var labelMenuSide2 = "http://www.machiee.com/dc/elements/1.1/menuside2";
// 果物
var labelMenuFruits = "http://www.machiee.com/dc/elements/1.1/menufruits";

//TSVを本日から7日分のデータだけ抽出
var _tsv2EventData = function(tsv, todayObj) {

  var datas = tsv;

  var todayMonth = todayObj.getMonth()+1;
  var todayDay = todayObj.getDay();

    // get header
    var menus = [];
    var properties = null;
    datas = datas.split("\n");
    if (datas.length < 10) return;
    while(datas[0].match(/^#/)) {
        if (datas[0].match(/^#property\t/)) {
            properties = datas[0];
            properties = properties.trim().split("\t");
            properties[0] = "ID";
        }
        datas.splice(0,1);
    }
    if (properties===null) return;

////////////////////////
//テストデータ取得
  properties = getTestProperties();
//テストデータ取得
  datas = getTestData();
//  alert(datas.length);
////////////////////////

    //propertiesの位置取得
    var posDayofWeek = properties.indexOf(labelDayOfWeek)-1;
    var posDay = properties.indexOf(labelDay)-1;
    var posMenuMainly = properties.indexOf(labelMenuMainly)-1;
    var posMenuSoup = properties.indexOf(labelMenuSoup)-1;
    var posMenuSide1 = properties.indexOf(labelMenuSide1)-1;
    var posMenuSide2 = properties.indexOf(labelMenuSide2)-1;
    var posMenuFruits = properties.indexOf(labelMenuFruits)-1;

    for (var num_linea = 0; num_linea < datas.length; num_linea++) {
        var campos = datas[num_linea].trim().split("\t");
// if (num_linea < 10) {
// alert(campos.length);
// }
        // if (campos.length<2) break;

      if (campos[posDay] >= todayDay && campos[posDay] < todayDay + 7) {
        menu = {};
        menu.day = campos[posDay];
        if (campos[posDayofWeek] == "土" || campos[posDayofWeek] == "日") {
          menu.mainly = "";
          menu.soup = "";
          menu.side1 = "";
          menu.side2 = "";
          menu.fruits = "";
        } else {
          menu.mainly = campos[posMenuMainly];
          menu.soup = campos[posMenuSoup];
          menu.side1 = campos[posMenuSide1];
          menu.side2 = campos[posMenuSide2];
          menu.fruits = campos[posMenuFruits];
        }
        menus.push(menu);
      }
    }

    titles = properties;

    return menus;
}


/////////////////////////////////////////////////////////////////

//テストデータ
function getTestProperties() {
  var testproperties = [
    "ID",
    "http://www.machiee.com/dc/elements/1.1/dayofweek",
    "http://www.machiee.com/dc/elements/1.1/day",
    "http://www.machiee.com/dc/elements/1.1/menumainly",
    "http://www.machiee.com/dc/elements/1.1/menusoup",
    "http://www.machiee.com/dc/elements/1.1/menuside1",
    "http://www.machiee.com/dc/elements/1.1/menuside2",
    "http://www.machiee.com/dc/elements/1.1/menufruits"];

    return testproperties;
}

//テストデータ
function getTestData() {
    var testdata =[
      "月	1	ごはん・牛乳	じゃがいもと玉ねぎのみそしる	さばのみそに	ひじきとミニがんものにもの	",
      "火	2	しろごまパン・牛乳	しろはなまめのポタージュ	きのこのあんかけとうふハンバーグ	とうにゅうプリン	",
      "水	3	ごはん・牛乳	とうふとふのりのみそしる	すぶた	さんしょくナムル	",
      "木	4	ソフトフランスパン・牛乳	ハヤシシチュー	かぼちゃコロッケ	れんこんとマカロニのサラダ	",
      "金	5	ゆかりごはん・牛乳	かにたまスープ	さんまのしょうがに	じゃがいものそぼろあん	",
      "土	6					",
      "日	7					",
      "月	8	ごはん・牛乳	とうふとえのきのみそしる	たらのフライ（ごまみそ味）	きんぴらいため	グミ（ぶどう）",
      "火	9	（小学校）コッペパン＋マーマレードジャム・牛乳（中学校）ピザトースト・牛乳	キャベツとウインナーのスープ	アスパラのバターいため	おさつスティック	",
      "水	10	ごはん・牛乳	じゃがいもときぬさやのみそしる	さけチーズフライ＋ソース	ごもくいりどうふ	",
      "木	11	ナン・牛乳	キーマカレー	かいそうサラダ	アイスフルーツ（ようなし）	",
      "金	12	ぶたどん・牛乳	もやしとあげのみそしる	キムチ和え	オレンジゼリー	",
      "土	13					",
      "日	14					",
      "月	15	ごはん・牛乳	みそけんちん	あつやきたまご	いかとだいこんのにもの	",
      "火	16	バーガーパン・牛乳	きのこと野菜のスープ	ぎょにくソーセージかつ＋ソース	ジャーマンポテト	",
      "水	17	ごはん・牛乳	はちはいじる	メンチカツ	やさいのみそに	",
      "木	18	クリームパン・牛乳	じゃがいものスープ	とりにくのうめマヨネーズやき	かぼちゃとピーマンのごまいため	",
      "金	19	たけのこごはん・牛乳	おふとわかめのみそしる	アジのしおやき	こうみあえ	ドライピーナッツ（塩キャラメル味）",
      "土	20					",
      "日	21					",
      "月	22	ごはん・牛乳	はくさいとあげのみそしる	たまごととうふのしんじょ	おかかに	",
      "火	23	ナポリタン・牛乳	アメリカンドック＋ケチャップ	フルーツヨーグルトあえ		",
      "水	24	ごはん・牛乳	いしかりじる	ししゃもフライ＋ソース	いかときゅうりのすみそあえ	",
      "木	25	こくとうパン・牛乳	たまごスープ	さつまいものミルクに	チーズいりいももち	",
      "金	26	カレーライス・牛乳	ゆでやさい＋マヨネーズ	パイナップル		",
      "土	27					",
      "日	28					",
      "月	29	ごはん・牛乳	よしのじる	ちゅうかはるまき	ゆでぶたとキャベツのいためもの	",
      "火	30	（小）ピザトースト・牛乳（中）コッペパン＋マーマレードジャム・牛乳	ミートボールとはくさいのスープ	ボイルドウインナー	えだまめ	"
    ];

    return testdata;
}
