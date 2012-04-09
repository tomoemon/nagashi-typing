$(function() {
  var TorifudaView, appLoad, currentView, next, selector, torifudaSpace, wakaPrintIndex;
  wakaPrintIndex = 0;
  selector = new WakaSelector();
  torifudaSpace = $('#torifuda_space');
  currentView = null;
  appLoad = function() {
    currentView = new TorifudaView(selector.get(16));
    currentView.show(torifudaSpace);
    currentView.showKimariji(false);
    return $('body').click(next);
  };
  next = function() {
    if (currentView.isShowKimariji) {
      currentView.remove();
      currentView = new TorifudaView(selector.get(wakaPrintIndex++));
      return currentView.show(torifudaSpace);
    } else {
      return currentView.showKimariji(false);
    }
  };
  TorifudaView = (function() {
    var i, image, wakaImages;

    wakaImages = [];

    for (i = 0; i <= 99; i++) {
      image = new Image();
      image.src = 'img/torifuda/torifuda_' + i + '.png';
      wakaImages.push(image);
    }

    image = new Image();

    image.src = 'torifuda_bg_resize.png';

    wakaImages.push(image);

    function TorifudaView(waka) {
      this.waka = waka;
      this.node = this.create_torifuda_node(waka.index, waka.getKimariji());
      this.isShowKimariji = false;
      this.textNode = this.node.children('p');
    }

    TorifudaView.prototype.show = function(parentNode) {
      this.node.insertBefore(parentNode);
      this.node.css({
        'display': 'block'
      });
      return this.node.css({
        'zIndex': 1000 - this.waka.index
      });
    };

    TorifudaView.prototype.remove = function(afterFunction) {
      var _this = this;
      return this.node.animate({
        left: '+=300',
        top: '-=500'
      }, 500, "easeOutQuart", function() {
        return _this.node.remove();
      });
    };

    TorifudaView.prototype.showKimariji = function(isSucceeded) {
      var colorStyle, kimariji, splitted;
      this.isShowKimariji = true;
      colorStyle = isSucceeded ? 'kimari_text_succeeded' : 'kimari_text_failed';
      kimariji = this.waka.getKimariji();
      this.textNode.html('');
      if (kimariji.length === 6) {
        splitted = kimariji.split("").map(function(e) {
          return "　" + e;
        });
        splitted[2] = splitted[2].replace("　", splitted[5][1]);
        splitted.pop();
        this.textNode.attr('class', 'kimari_text kimari5');
      } else {
        splitted = kimariji.split('');
      }
      this.textNode.css('display', 'block');
      this.textNode.attr('class', "kimari_text kimari" + splitted.length + " " + colorStyle);
      return this.textNode.html(splitted.join("<br />"));
    };

    TorifudaView.prototype.create_torifuda_node = function(index, kimariji) {
      var torifuda;
      torifuda = $('#torifuda_block_base').clone();
      torifuda.attr('id', 'waka_' + index);
      torifuda.children('div').css('backgroundImage', "url(" + wakaImages[index].src + ")");
      return torifuda;
    };

    return TorifudaView;

  })();
  return appLoad();
});