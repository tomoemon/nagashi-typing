var Waka, WakaSelector;

Waka = (function() {

  Waka.empty = function() {
    return new Waka(["", "", "", ""], 100);
  };

  function Waka(wakaInfo, index) {
    this.index = index;
    this.notation = wakaInfo[0];
    this.author = wakaInfo[1];
    this.sei_kana = wakaInfo[2];
    this.sei_kami_list = this.sei_kana.split(" ").splice(0, 3);
    this.sei_simo_list = this.sei_kana.split(" ").splice(3);
    this.daku_kana = wakaInfo[3];
    this.daku_kami_list = this.daku_kana.split(" ").splice(0, 3);
    this.daku_simo_list = this.daku_kana.split(" ").splice(3);
    this.yomi_kana = wakaInfo[4] != null ? wakaInfo[4] : wakaInfo[3];
    this.yomi_kami_list = this.yomi_kana.split(" ").splice(0, 3);
    this.yomi_simo_list = this.yomi_kana.split(" ").splice(3);
    this.kami = this.daku_kami_list.join("");
    this.yomi_kami = this.yomi_kami_list.join("");
    this.simo = this.sei_simo_list.join("");
    this.kimariji_num = 0;
  }

  Waka.prototype.getSimo = function() {
    return this.simo;
  };

  Waka.prototype.getYomiKami = function(i) {
    return this.yomi_kami[i];
  };

  Waka.prototype.getKimariji = function() {
    return this.kami.slice(0, this.kimariji_num);
  };

  Waka.prototype.setKimariji = function(kimariji) {
    return this.kimariji_num = kimariji.length;
  };

  return Waka;

})();

WakaSelector = (function() {

  WakaSelector.prototype.get = function(i) {
    return this.wakaList[i];
  };

  WakaSelector.prototype.getEmpty = function() {
    return Waka.empty();
  };

  WakaSelector.prototype.getAll = function() {
    return this.wakaList;
  };

  WakaSelector.prototype.classifyKimari = function(wakaList) {
    var count, i, tempList, waka, _i, _j, _len, _len2, _results;
    for (_i = 0, _len = wakaList.length; _i < _len; _i++) {
      waka = wakaList[_i];
      console.log(waka.notation);
      console.log(waka.kimariji_num);
    }
    _results = [];
    for (i = 1; i <= 6; i++) {
      count = 0;
      tempList = [];
      for (_j = 0, _len2 = wakaList.length; _j < _len2; _j++) {
        waka = wakaList[_j];
        if (waka.kimariji_num === i) {
          tempList.push(waka);
          count++;
        }
      }
      trace("" + i + "字決まり");
      trace(count);
      tempList.sort(function(a, b) {
        if (a.kami > b.kami) {
          return 1;
        } else if (a.kami < b.kami) {
          return -1;
        }
        return 0;
      });
      _results.push((function() {
        var _k, _len3, _results2;
        _results2 = [];
        for (_k = 0, _len3 = tempList.length; _k < _len3; _k++) {
          waka = tempList[_k];
          _results2.push(console.log(waka.notation));
        }
        return _results2;
      })());
    }
    return _results;
  };

  WakaSelector.prototype.setKimariji = function(wakaList) {
    return this.setKimariPrefix("", wakaList, {});
  };

  WakaSelector.prototype.setKimariPrefix = function(prefix, wakaList, result) {
    var ch, commonWakaList, map, nextPrefix, waka, _i, _len;
    map = {};
    for (_i = 0, _len = wakaList.length; _i < _len; _i++) {
      waka = wakaList[_i];
      ch = waka.getYomiKami(prefix.length);
      if (!(map[ch] != null)) map[ch] = [];
      map[ch].push(waka);
    }
    for (nextPrefix in map) {
      commonWakaList = map[nextPrefix];
      if (commonWakaList.length === 1) {
        result[prefix + nextPrefix] = commonWakaList[0];
        commonWakaList[0].setKimariji(prefix + nextPrefix);
      } else {
        this.setKimariPrefix(prefix + nextPrefix, commonWakaList, result);
      }
    }
    return result;
  };

  function WakaSelector() {
    var i, wakaInfo;
    this.wakaBaseList = [["秋の田の かりほの庵の 苫をあらみ わが衣手は 露にぬれつつ", "天智天皇", "あきのたの かりほのいほの とまをあらみ わかころもては つゆにぬれつつ", "あきのたの かりほのいほの とまをあらみ わかころもでは つゆにぬれつつ"], ["春過ぎて 夏来にけらし 白妙の 衣干すてふ 天の香具山", "持統天皇", "はるすきて なつきにけらし しろたへの ころもほすてふ あまのかくやま", "はるすぎて なつきにけらし しろたへの ころもほすてふ あまのかぐやま"], ["あしびきの 山鳥の尾の しだり尾の ながながし夜を ひとりかも寝む", "柿本人麻呂", "あしひきの やまとりのをの したりをの なかなかしよを ひとりかもねむ", "あしびきの やまどりのをの しだりをの ながながしよを ひとりかもねむ"], ["田子の浦に うち出でて見れば 白妙の 富士の高嶺に 雪は降りつつ", "山辺赤人", "たこのうらに うちいててみれは しろたへの ふしのたかねに ゆきはふりつつ", "たごのうらに うちいでてみれば しろたへの ふじのたかねに ゆきはふりつつ"], ["奥山に 紅葉踏み分け 鳴く鹿の 声聞く時ぞ 秋は悲しき", "猿丸大夫", "おくやまに もみしふみわけ なくしかの こゑきくときそ あきはかなしき", "おくやまに もみじふみわけ なくしかの こゑきくときぞ あきはかなしき"], ["鵲の 渡せる橋に 置く霜の 白きを見れば 夜ぞ更けにける", "中納言家持", "かささきの わたせるはしに おくしもの しろきをみれは よそふけにける", "かささぎの わたせるはしに おくしもの しろきをみれば よぞふけにける"], ["天の原 ふりさけ見れば 春日なる 三笠の山に 出でし月かも", "安倍仲麿", "あまのはら ふりさけみれは かすかなる みかさのやまに いてしつきかも", "あまのはら ふりさけみれば かすがなる みかさのやまに いでしつきかも"], ["わが庵は 都の辰巳 しかぞ住む 世をうぢ山と 人はいふなり", "喜撰法師", "わかいほは みやこのたつみ しかそすむ よをうちやまと ひとはいふなり", "わがいほは みやこのたつみ しかぞすむ よをうぢやまと ひとはいふなり", "わがいおは みやこのたつみ しかぞすむ よをうぢやまと ひとはいふなり"], ["花の色は 移りにけりな いたづらに わが身世にふる ながめせしまに", "小野小町", "はなのいろは うつりにけりな いたつらに わかみよにふる なかめせしまに", "はなのいろは うつりにけりな いたづらに わがみよにふる ながめせしまに"], ["これやこの 行くも帰るも 別れては 知るも知らぬも あふ坂の関", "蝉丸", "これやこの ゆくもかへるも わかれては しるもしらぬも あふさかのせき", "これやこの ゆくもかへるも わかれては しるもしらぬも あふさかのせき"], ["わたの原 八十島かけて 漕ぎ出でぬと 人には告げよ 海人の釣船", "参議篁", "わたのはら やそしまかけて こきいてぬと ひとにはつけよ あまのつりふね", "わたのはら やそしまかけて こぎいでぬと ひとにはつげよ あまのつりぶね"], ["天つ風 雲の通ひ路 吹きとぢよ 乙女の姿 しばしとどめむ", "僧正遍昭", "あまつかせ くものかよひち ふきとちよ をとめのすかた しはしととめむ", "あまつかぜ くものかよひぢ ふきとぢよ をとめのすがた しばしとどめむ"], ["筑波嶺の 峰より落つる みなの川 恋ぞ積もりて 淵となりぬる", "陽成院", "つくはねの みねよりおつる みなのかわ こひそつもりて ふちとなりぬる", "つくばねの みねよりおつる みなのがわ こひぞつもりて ふちとなりぬる"], ["陸奥の しのぶもぢずり たれゆえに 乱れそめにし われならなくに", "河原左大臣", "みちのくの しのふもちすり たれゆゑに みたれそめにし われならなくに", "みちのくの しのぶもぢずり たれゆゑに みだれそめにし われならなくに"], ["君がため 春の野に出でて 若菜摘む わが衣手に 雪は降りつつ", "光孝天皇", "きみかため はるののにいてて わかなつむ わかころもてに ゆきはふりつつ", "きみがため はるののにいでて わかなつむ わがころもてに ゆきはふりつつ"], ["立ち別れ いなばの山の 峰に生ふる まつとし聞かば 今帰り来む", "中納言行平", "たちわかれ いなはのやまの みねにおふる まつとしきかは いまかへりこむ", "たちわかれ いなばのやまの みねにおふる まつとしきかば いまかへりこむ"], ["ちはやぶる 神代も聞かず 竜田川 からくれなゐに 水くくるとは", "在原業平朝臣", "ちはやふる かみよもきかす たつたかは からくれなゐに みつくくるとは", "ちはやぶる かみよもきかず たつたがは からくれなゐに みづくくるとは"], ["住の江の 岸に寄る波 よるさへや 夢の通ひ路 人目よくらむ", "藤原敏行朝臣", "すみのえの きしによるなみ よるさへや ゆめのかよひち ひとめよくらむ", "すみのえの きしによるなみ よるさへや ゆめのかよひぢ ひとめよくらむ"], ["難波潟 短き蘆の ふしの間も 逢はでこの世を 過ぐしてよとや", "伊勢", "なにはかた みしかきあしの ふしのまも あはてこのよを すくしてよとや", "なにはがた みじかきあしの ふしのまも あはでこのよを すぐしてよとや", "なにわがた みじかきあしの ふしのまも あはでこのよを すぐしてよとや"], ["わびぬれば 今はたおなじ 難波なる みをつくしても 逢はむとぞ思ふ", "元良親王", "わひぬれは いまはたおなし なにはなる みをつくしても あはむとそおもふ", "わびぬれば いまはたおなじ なにはなる みをつくしても あはむとぞおもふ"], ["今来むと いひしばかりに 長月の 有明の月を 待ち出でつるかな", "素性法師", "いまこむと いひしはかりに なかつきの ありあけのつきを まちてつるかな", "いまこむと いいしばかりに ながつきの ありあけのつきを まちいでつるかな", "いまこんと いいしばかりに ながつきの ありあけのつきを まちいでつるかな"], ["吹くからに 秋の草木の しをるれば むべ山風を あらしといふらむ", "文屋康秀", "ふくからに あきのくさきの しをるれは むへやまかせを あらしといふらむ", "ふくからに あきのくさきの しをるれば むべやまかぜを あらしといふらむ"], ["月見れば ちぢにものこそ 悲しけれ わが身ひとつの 秋にはあらねど", "大江千里", "つきみれは ちちにものこそ かなしけれ わかみひとつの あきにはあらねと", "つきみれば ちちにものこそ かなしけれ わがみひとつの あきにはあらねど"], ["このたびは 幣も取りあへず 手向山 紅葉の錦 神のまにまに", "菅家", "このたひは ぬさもとりあへす たむけやま もみちのにしき かみのまにまに", "このたびは ぬさもとりあへず たむけやま もみぢのにしき かみのまにまに"], ["名にし負はば 逢う坂山の さねかずら 人に知られで 来るよしもがな", "三条右大臣", "なにしおはは あふさかやまの さねかつら ひとにしられて くるよしもかな", "なにしおはば あふさかやまの さねかづら ひとにしられで くるよしもがな"], ["小倉山峰の 紅葉葉 心あらば いまひとたびの みゆき待たなむ", "貞信公", "おくらやま みねのもみちは こころあらは いまひとたひの みゆきまたなむ", "をぐらやま みねのもみぢば こころあらば いまひとたびの みゆきまたなむ", "おぐらやま みねのもみぢば こころあらば いまひとたびの みゆきまたなむ"], ["みかの原 わきて流るる いづみ川 いつ見きとてか 恋しかるらむ", "中納言兼輔", "みかのはら わきてなかるる いつみかは いつみきとてか こひしかるらむ", "みかのはら わきてながるる いづみがは いつみきとてか こひしかるらむ"], ["山里は 冬ぞ寂しさ まさりける 人目も草も かれぬと思へば", "源宗于朝臣", "やまさとは ふゆそさひしさ まさりける ひとめもくさも かれぬとおもへは", "やまざとは ふゆぞさびしさ まさりける ひとめもくさも かれぬとおもへば"], ["心あてに 折らばや折らむ 初霜の 置きまどはせる 白菊の花", "凡河内躬恒", "こころあてに おらはやおらむ はつしもの おきまとはせる しらきくのはな", "こころあてに おらばやおらむ はつしもの おきまどはせる しらぎくのはな"], ["有明の つれなく見えし 別れより 暁ばかり 憂きものはなし", "壬生忠岑", "ありあけの つれなくみえし わかれより あかつきはかり うきものはなし", "ありあけの つれなくみえし わかれより あかつきばかり うきものはなし"], ["朝ぼらけ 有明の月と 見るまでに 吉野の里に 降れる白雪", "坂上是則", "あさほらけ ありあけのつきと みるまてに よしののさとに ふれるしらゆき", "あさぼらけ ありあけのつきと みるまでに よしののさとに ふれるしらゆき"], ["山川に 風のかけたる しがらみは 流れもあへぬ 紅葉なりけり", "春道列樹", "やまかはに かせのかけたる しからみは なかれもあへぬ もみちなりけり", "やまがはに かぜのかけたる しがらみは ながれもあへぬ もみぢなりけり", "やまがわに かぜのかけたる しがらみは ながれもあへぬ もみぢなりけり"], ["ひさかたの 光のどけき 春の日に しづ心なく 花の散るらむ", "紀友則", "ひさかたの ひかりのとけき はるのひに しつこころなく はなのちるらむ", "ひさかたの ひかりのどけき はるのひに しづこころなく はなのちるらむ"], ["誰をかも 知る人にせむ 高砂の 松も昔の 友ならなくに", "藤原興風", "たれをかも しるひとにせむ たかさこの まつもむかしの ともならなくに", "たれをかも しるひとにせむ たかさごの まつもむかしの ともならなくに"], ["人はいさ 心も知らず ふるさとは 花ぞ昔の 香に匂ひける", "紀貫之", "ひとはいさ こころもしらす ふるさとは はなそむかしの かににほひける", "ひとはいさ こころもしらず ふるさとは はなぞむかしの かににほひける"], ["夏の夜は まだ宵ながら 明けぬるを 雲のいずこに 月宿るらむ", "清原深養父", "なつのよは またよひなから あけぬるを くものいつこに つきやとるらむ", "なつのよは またよひながら あけぬるを くものいづこに つきやどるらむ"], ["白露に 風の吹きしく 秋の野は つらぬきとめぬ 玉ぞ散りける", "文屋朝康", "しらつゆに かせのふきしく あきののは つらぬきとめぬ たまそちりける", "しらつゆに かぜのふきしく あきののは つらぬきとめぬ たまぞちりける"], ["忘らるる 身をば思はず 誓ひてし 人の命の 惜しくもあるかな", "右近", "わすらるる みをはおもはす ちかひてし ひとのいのちの をしくもあるかな", "わすらるる みをばおもはず ちかひてし ひとのいのちの をしくもあるかな"], ["浅茅生の 小野の篠原 忍ぶれど あまりてなどか 人の恋しき", "参議等", "あさちふの をののしのはら しのふれと あまりてなとか ひとのこひしき", "あさぢふの をののしのはら しのぶれと あまりてなどか ひとのこひしき", "あさじうの おののしのはら しのぶれと あまりてなどか ひとのこひしき"], ["忍ぶれど 色に出でにけり わが恋は ものや思ふと 人の問ふまで", "平兼盛", "しのふれと いろにいてにけり わかこひは ものやおもふと ひとのとふまて", "しのぶれど いろにいでにけり わがこひは ものやおもふと ひとのとふまで"], ["恋すてふ わが名はまだき 立ちにけり 人知れずこそ 思ひそめしか", "壬生忠見", "こひすてふ わかなはまたき たちにけり ひとしれすこそ おもひそめしか", "こひすてふ わがなはまだき たちにけり ひとしれずこそ おもひそめしか", "こいすちょう わがなはまだき たちにけり ひとしれずこそ おもひそめしか"], ["契りきな かたみに袖を しぼりつつ 末の松山 波越さじとは", "清原元輔", "ちきりきな かたみにそてを しほりつつ すゑのまつやま なみこさしとは", "ちぎりきな かたみにそでを しぼりつつ すゑのまつやま なみこさじとは"], ["逢ひ見ての のちの心に くらぶれば 昔はものを 思はざりけり", "権中納言敦忠", "あひみての のちのこころに くらふれは むかしはものを おもはさりけり", "あひみての のちのこころに くらぶれば むかしはものを おもはざりけり", "あいみての のちのこころに くらぶれば むかしはものを おもはざりけり"], ["逢ふことの 絶えてしなくは なかなかに 人をも身をも 恨みざらまし", "中納言朝忠", "あふことの たえてしなくは なかなかに ひとをもみをも うらみさらまし", "あふことの たえてしなくは なかなかに ひとをもみをも うらみざらまし", "おおことの たえてしなくは なかなかに ひとをもみをも うらみざらまし"], ["あはれとも いふべき人は 思ほえで 身のいたずらに なりぬべきかな", "謙徳公", "あはれとも いふへきひとは おもほえて みのいたつらに なりぬへきかな", "あはれとも いふべきひとは おもほえで みのいたづらに なりぬべきかな", "あわれとも いうべきひとは おもほえで みのいたづらに なりぬべきかな"], ["由良の門を 渡る舟人 かぢを絶え ゆくへも知らぬ 恋のみちかな", "曾禰好忠", "ゆらのとを わたるふなひと かちをたえ ゆくへもしらぬ こひのみちかな", "ゆらのとを わたるふなびと かちをたえ ゆくへもしらぬ こひのみちかな"], ["八重むぐら 茂れる宿の 寂しきに 人こそ見えね 秋は来にけり", "恵慶法師", "やへむくら しけれるやとの さひしきに ひとこそみえね あきはきにけり", "やへむぐら しげれるやとの さびしきに ひとこそみえね あきはきにけり", "やえむぐら しげれるやとの さびしきに ひとこそみえね あきはきにけり"], ["風をいたみ 岩打つ波の おのれのみ くだけてものを 思ふころかな", "源重之", "かせをいたみ いはうつなみの おのれのみ くたけてものを おもふころかな", "かぜをいたみ いはうつなみの おのれのみ くだけてものを おもふころかな"], ["御垣守 衛士のたく火の 夜は燃え 昼は消えつつ ものをこそ思へ", "大中臣能宣朝臣", "みかきもり ゑしのたくひの よるはもえ ひるはきえつつ ものをこそおもへ", "みかきもり ゑじのたくひの よるはもえ ひるはきえつつ ものをこそおもへ"], ["君がため 惜しからざりし 命さへ 長くもがなと 思ひけるかな", "藤原義孝", "きみかため おしからさりし いのちさへ なかくもかなと おもひけるかな", "きみがため おしからざりし いのちさへ ながくもがなと おもひけるかな"], ["かくとだに えやは伊吹の さしも草 さしも知らじな 燃ゆる思ひを", "藤原実方朝臣", "かくとたに えやはいふきの さしもくさ さしもしらしな もゆるおもひを", "かくとだに えやはいぶきの さしもぐさ さしもしらじな もゆるおもひを"], ["明けぬれば 暮るるものとは 知りながら なほ恨めしき 朝ぼらけかな", "藤原道信朝臣", "あけぬれは くるるものとは しりなから なほうらめしき あさほらけかな", "あけぬれば くるるものとは しりながら なほうらめしき あさぼらけかな"], ["嘆きつつ ひとり寝る夜の 明くる間は いかに久しき ものとかは知る", "右大将道綱母", "なけきつつ ひとりぬるよの あくるまは いかにひさしき ものとかはしる", "なげきつつ ひとりぬるよの あくるまは いかにひさしき ものとかはしる"], ["忘れじの ゆく末までは かたければ 今日を限りの 命ともがな", "儀同三司母", "わすれしの ゆくすゑまては かたけれは けふをかきりの いのちともかな", "わすれじの ゆくすゑまでは かたければ けふをかぎりの いのちともがな"], ["滝の音は 絶えて久しく なりぬれど 名こそ流れて なほ聞こえけれ", "大納言公任", "たきのおとは たえてひさしく なりぬれと なこそなかれて なほきこえけれ", "たきのおとは たえてひさしく なりぬれど なこそながれて なほきこえけれ"], ["あらざらむ この世のほかの 思ひ出に いまひとたびの 逢ふこともがな", "和泉式部", "あらさらむ このよのほかの おもひてに いまひとたひの あふこともかな", "あらざらん このよのほかの おもひでに いまひとたびの あふこともがな"], ["めぐり逢ひて 見しやそれとも 分かぬ間に 雲隠れにし 夜半の月影", "紫式部", "めくりあひて みしやそれとも わかぬまに くもかくれにし よはのつきかけ", "めぐりあひて みしやそれとも わかぬまに くもがくれにし よはのつきかげ", "めぐりあいて みしやそれとも わかぬまに くもがくれにし よはのつきかげ"], ["有馬山 猪名の篠原 風吹けば いでそよ人を 忘れやはする", "大弐三位", "ありまやま ゐなのささはら かせふけは いてそよひとを わすれやはする", "ありまやま ゐなのささはら かぜふけば いでそよひとを わすれやはする"], ["やすらはで 寝なましものを さ夜更けて かたぶくまでの 月を見しかな", "赤染衛門", "やすらはて ねなましものを さよふけて かたふくまての つきをみしかな", "やすらはで ねなましものを さよふけて かたぶくまでの つきをみしかな"], ["大江山 いく野の道の 遠ければ まだふみも見ず 天の橋立", "小式部内侍", "おほえやま いくののみちの とほけれは またふみもみす あまのはしたて", "おほえやま いくののみちの とほければ まだふみもみず あまのはしだて", "おおえやま いくののみちの とほければ まだふみもみず あまのはしだて"], ["いにしへの 奈良の都の 八重桜 けふ九重に 匂ひぬるかな", "伊勢大輔", "いにしへの ならのみやこの やへさくら けふここのへに にほひぬるかな", "いにしへの ならのみやこの やへざくら けふここのへに にほひぬるかな", "いにしえの ならのみやこの やへざくら けふここのへに にほひぬるかな"], ["夜をこめて 鳥のそら音は はかるとも よに逢坂の 関は許さじ", "清少納言", "よをこめて とりのそらねは はかるとも よにあふさかの せきはゆるさし", "よをこめて とりのそらねは はかるとも よにあふさかの せきはゆるさじ"], ["今はただ 思ひ絶えなむ とばかりを 人づてならで いふよしもがな", "左京大夫道雅", "いまはたた おもひたえなむ とはかりを ひとつてならて いふよしもかな", "いまはただ おもひたえなむ とばかりを ひとづてならで いふよしもがな"], ["朝ぼらけ 宇治の川霧 たえだえに あらはれわたる 瀬々の網代木", "権中納言定頼", "あさほらけ うちのかはきり たえたえに あらはれわたる せせのあしろき", "あさぼらけ うぢのかはぎり たえだえに あらはれわたる せぜのあじろぎ"], ["恨みわび 干さぬ袖だに あるものを 恋に朽ちなむ 名こそ惜しけれ", "相模", "うらみわひ ほさぬそてたに あるものを こひにくちなむ なこそをしけれ", "うらみわび ほさぬそでだに あるものを こひにくちなむ なこそをしけれ"], ["もろともに あはれと思え 山桜 花よりほかに 知る人もなし", "前大僧正行尊", "もろともに あはれとおもへ やまさくら はなよりほかに しるひともなし", "もろともに あはれとおもへ やまざくら はなよりほかに しるひともなし"], ["春の夜の 夢ばかりなる 手枕に かひなく立たむ 名こそをしけれ", "周防内侍", "はるのよの ゆめはかりなる たまくらに かひなくたたむ なこそをしけれ", "はるのよの ゆめばかりなる たまくらに かひなくたたむ なこそをしけれ"], ["心にも あらで憂き夜に 長らへば 恋しかるべき 夜半の月かな", "三条院", "こころにも あらてうきよに なからへは こひしかるへき よはのつきかな", "こころにも あらでうきよに ながらへば こひしかるべき よはのつきかな"], ["嵐吹く 三室の山の もみぢ葉は 竜田の川の 錦なりけり", "能因法師", "あらしふく みむろのやまの もみちはは たつたのかはの にしきなりけり", "あらしふく みむろのやまの もみぢばは たつたのかはの にしきなりけり"], ["寂しさに 宿を立ち出でて ながむれば いづくも同じ 秋の夕暮れ", "良暹法師", "さひしさに やとをたちいてて なかむれは いつくもおなし あきのゆふくれ", "さびしさに やどをたちいでて ながむれば いづくもおなじ あきのゆふぐれ"], ["夕されば 門田の稲葉 訪れて 蘆のまろ屋に 秋風ぞ吹く", "大納言経信", "ゆうされは かとたのいなは おとつれて あしのまろやに あきかせそふく", "ゆうされば かどたのいなば おとづれて あしのまろやに あきかぜぞふく"], ["音に聞く 高師の浜の あだ波は かけじや袖の ぬれもこそすれ", "祐子内親王家紀伊", "おとにきく たかしのはまの あたなみは かけしやそての ぬれもこそすれ", "おとにきく たかしのはまの あだなみは かけじやそでの ぬれもこそすれ"], ["高砂の 尾の上の桜 咲きにけり 外山のかすみ 立たずもあらなむ", "前権中納言匡房", "たかさこの をのへのさくら さきにけり とやまのかすみ たたすもあらなむ", "たかさごの をのへのさくら さきにけり とやまのかすみ たたずもあらなむ"], ["憂かりける 人を初瀬の 山おろしよ 激しかれとは 祈らぬものを", "源俊頼朝臣", "うかりける ひとをはつせの やまおろしよ はけしかれとは いのらぬものを", "うかりける ひとをはつせの やまおろしよ はげしかれとは いのらぬものを"], ["契りおきし させもが露を 命にて あはれ今年の 秋もいぬめり", "藤原基俊", "ちきりおきし させもかつゆを いのちにて あはれことしの あきもいぬめり", "ちぎりおきし させもがつゆを いのちにて あはれことしの あきもいぬめり"], ["わたの原 漕ぎ出でて見れば ひさかたの 雲居にまがふ 沖つ白波", "法性寺入道前関白太政大臣", "わたのはら こきいててみれは ひさかたの くもゐにまかふ おきつしらなみ", "わたのはら こぎいててみれは ひさかたの くもゐにまがふ おきつしらなみ"], ["瀬をはやみ 岩にせかるる 滝川の われても末に 逢はむとぞ思ふ", "崇徳院", "せをはやみ いわにせかるる たきかはの われてもすゑに あはむとそおもふ", "せをはやみ いわにせかるる たきがはの われてもすゑに あはむとぞおもふ"], ["淡路島 通ふ千鳥の 鳴く声に いく夜寝覚めぬ 須磨の関守", "源兼昌", "あはちしま かよふちとりの なくこゑに いくよねさめぬ すまのせきもり", "あはぢしま かよふちどりの なくこゑに いくよねざめぬ すまのせきもり", "あわじしま かよふちどりの なくこゑに いくよねざめぬ すまのせきもり"], ["秋風に たなびく雲の たえ間より 漏れ出づる月の 影のさやけさ", "左京大夫顕輔", "あきかせに たなひくくもの たえまより もれいつるつきの かけのさやけさ", "あきかぜに たなびくくもの たえまより もれいづるつきの かげのさやけさ"], ["ながからむ 心も知らず 黒髪の 乱れてけさは ものをこそ思へ", "待賢門院堀河", "なかからむ こころもしらす くろかみの みたれてけさは ものをこそおもへ", "ながからむ こころもしらず くろかみの みだれてけさは ものをこそおもへ", "ながからん こころもしらず くろかみの みだれてけさは ものをこそおもへ"], ["ほととぎす 鳴きつる方を ながむれば ただ有明の 月ぞ残れる", "後徳大寺左大臣", "ほとときす なきつるかたを なかむれは たたありあけの つきそのこれる", "ほととぎす なきつるかたを ながむれば ただありあけの つきぞのこれる"], ["思ひわび さても命は あるものを 憂きに堪へぬは 涙なりけり", "道因法師", "おもひわひ さてもいのちは あるものを うきにたへぬは なみたなりけり", "おもひわび さてもいのちは あるものを うきにたへぬは なみだなりけり", "おもいわび さてもいのちは あるものを うきにたへぬは なみだなりけり"], ["世の中よ 道こそなけれ 思ひ入る 山の奥にも 鹿ぞ鳴くなる", "皇太后宮大夫俊成", "よのなかよ みちこそなけれ おもひいる やまのおくにも しかそなくなる", "よのなかよ みちこそなけれ おもひいる やまのおくにも しかぞなくなる"], ["長らへば またこのごろや しのばれむ 憂しと見し世ぞ 今は恋しき", "藤原清輔朝臣", "なからへは またこのころや しのはれむ うしとみしよそ いまはこひしき", "ながらへば またこのごろや しのばれむ うしとみしよぞ いまはこひしき", "ながらえば またこのごろや しのばれむ うしとみしよぞ いまはこひしき"], ["夜もすがら もの思ふころは 明けやらぬ ねやのひまさへ つれなかりけり", "俊恵法師", "よもすから ものおもふころは あけやらぬ ねやのひまさへ つれなかりけり", "よもすがら ものおもふころは あけやらぬ ねやのひまさへ つれなかりけり"], ["嘆けとて 月やはものを 思はする かこちがほなる わが涙かな", "西行法師", "なけけとて つきやはものを おもはする かこちかほなる わかなみたかな", "なげけとて つきやはものを おもはする かこちがほなる わがなみだかな"], ["村雨の 露もまだ干ぬ まきの葉に 霧立ちのぼる 秋の夕暮", "寂蓮法師", "むらさめの つゆもまたひぬ まきのはに きりたちのほる あきのゆふくれ", "むらさめの つゆもまだひぬ まきのはに きりたちのぼる あきのゆふぐれ"], ["難波江の 蘆のかりねの ひとよゆゑ 身を尽くしてや 恋ひわたるべき", "皇嘉門院別当", "なにはえの あしのかりねの ひとよゆゑ みをつくしてや こひわたるへき", "なにはえの あしのかりねの ひとよゆゑ みをつくしてや こひわたるべき", "なにわえの あしのかりねの ひとよゆゑ みをつくしてや こひわたるべき"], ["玉の緒よ 絶えなば絶えね ながらへば 忍ぶることの 弱りもぞする", "式子内親王", "たまのをよ たえなはたえね なからへは しのふることの よはりもそする", "たまのをよ たえなばたえね ながらへば しのぶることの よはりもぞする", "たまのおよ たえなばたえね ながらへば しのぶることの よはりもぞする"], ["見せばやな 雄島の海人の 袖だにも 濡れにぞ濡れし 色は変はらず", "殷富門院大輔", "みせはやな をしまのあまの そてたにも ぬれにそぬれし いろはかはらす", "みせばやな をじまのあまの そでだにも ぬれにぞぬれし いろはかはらず"], ["きりぎりす 鳴くや霜夜の さむしろに 衣かたしき ひとりかも寝む", "後京極摂政前太政大臣", "きりきりす なくやしもよの さむしろに ころもかたしき ひとりかもねむ", "きりぎりす なくやしもよの さむしろに ころもかたしき ひとりかもねむ"], ["わが袖は 潮干に見えぬ 沖の石の 人こそ知らね かわく間もなし", "二条院讃岐", "わかそては しほひにみえぬ おきのいしの ひとこそしらね かわくまもなし", "わがそでは しほひにみえぬ おきのいしの ひとこそしらね かわくまもなし"], ["世の中は 常にもがもな 渚漕ぐ 海人の小舟の 綱手かなしも", "鎌倉右大臣", "よのなかは つねにもかもな なきさこく あまのおふねの つなてかなしも", "よのなかは つねにもがもな なぎさこぐ あまのおぶねの つなでかなしも"], ["み吉野の 山の秋風 さよ更けて ふるさと寒く 衣打つなり", "参議雅経", "みよしのの やまのあきかせ さよふけて ふるさとさむく ころもうつなり", "みよしのの やまのあきかぜ さよふけて ふるさとさむく ころもうつなり"], ["おほけなく 憂き世の民に おほふかな わが立つ杣に すみ染の袖", "前大僧正慈円", "おほけなく うきよのたみに おほふかな わかたつそまに すみそめのそて", "おほけなく うきよのたみに おほふかな わがたつそまに すみぞめのそで", "おおけなく うきよのたみに おほふかな わがたつそまに すみぞめのそで"], ["花さそふ 嵐の庭の 雪ならで ふりゆくものは わが身なりけり", "入道前太政大臣", "はなさそふ あらしのにはの ゆきならて ふりゆくものは わかみなりけり", "はなさそふ あらしのにはの ゆきならで ふりゆくものは わがみなりけり", "はなさそう あらしのにはの ゆきならで ふりゆくものは わがみなりけり"], ["来ぬ人を 松帆の浦の 夕なぎに 焼くや藻塩の 身もこがれつつ", "権中納言定家", "こぬひとを まつほのうらの ゆふなきに やくやもしほの みもこかれつつ", "こぬひとを まつほのうらの ゆふなぎに やくやもしほの みもこがれつつ"], ["風そよぐ 楢の小川の 夕暮は 御禊ぞ夏の しるしなりける", "従二位家隆", "かせそよく ならのをかはの ゆふくれは みそきそなつの しるしなりける", "かぜそよぐ ならのをがはの ゆふぐれは みそぎぞなつの しるしなりける"], ["人も愛し 人も恨めし あじきなく 世を思ふゆゑに もの思ふ身は", "後鳥羽院", "ひともをし ひともうらめし あちきなく よをおもふゆゑに ものおもふみは", "ひともをし ひともうらめし あぢきなく よをおもふゆゑに ものおもふみは"], ["百敷や 古き軒端の しのぶにも なほ余りある 昔なりけり", "順徳院", "ももしきや ふるきのきはの しのふにも なほあまりある むかしなりけり", "ももしきや ふるきのきばの しのぶにも なほあまりある むかしなりけり"]];
    this.wakaList = (function() {
      var _len, _ref, _results;
      _ref = this.wakaBaseList;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        wakaInfo = _ref[i];
        _results.push(new Waka(wakaInfo, i));
      }
      return _results;
    }).call(this);
    this.setKimariji(this.wakaList);
  }

  return WakaSelector;

})();