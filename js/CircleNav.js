/*
  jquery and CicleNav.css is required to this scrips work properly

--------------------------Constructor--------------------------------
  element -> jquery element for the father
  angle -> central angle of items number or 'auto'
  options -> {
    itens -> array of elements that this nav bar has exemple of element {title,callback when iten clicked,color}
    startVisibe -> if this object will start visible
    itensSize -> size in percentage
    maxAngle -> centralangle of all elements if the angle is 'auto'
    itensColor -> hexcode of the color
    centerTop -> centralizes at the top on the 90 angles obs true or false
    fontSize -> nav itens font size
    size -> size of the navbar in relantion to the father div
  }
  -------------------------Methods-----------------------------------
  ExpandFromCenterAnimation(speed,finalSize) -> if the element is hide this method shows it with a animation that will make the element grow from the center to the finalSize

  tutorial that i use to create this script -> https://tympanus.net/codrops/2013/08/09/building-a-circular-navigation-with-css-transforms/
*/

function CircleNavBar(element,angle,options) {
  this.father = element;

  this.angle = angle;

  this.element = $('<div id="CircleNavBar"></div>').appendTo(element);

  // this.element.css({height:this.father.outerHeight(),width:this.father.outerWidth()})

  if(options!=undefined){
    this.itens = options.itens ? options.itens : null;
    this.itensSize = options.itensSize ? options.itensSize: null;
    this.maxAngle = options.maxAngle ? options.maxAngle: 360;
    this.itensColor = options.itensColor ? options.itensColor: null;
    this.centerTop = options.centerTop ? options.centerTop: null;
    this.fontSize = options.fontSize ? options.fontSize: null;
    this.size = options.size ? options.size: 100;
    if(options.startVisibe){
      console.log('hidede');
      this.element.hide();
    }
    this.setItens();
  }
  else {
    console.log('options not defined');
  }

}

CircleNavBar.prototype.setItens = function () {
  if(this.itens instanceof Array){
    if(this.angle=='auto'){
      this.angle = this.maxAngle/this.itens.length;
      this.offset = 0;
      if(this.centerTop){
        this.offset = (180-this.maxAngle)/2;
      }
    }
    else {
      if(this.centerTop){
        this.offset = (180-(this.itens.length*this.angle))/2;
      }
    }
    for (var i = 0; i < this.itens.length; i++) {
      var iten = $('<div class="CircleNavIten"></div>').appendTo(this.element);
      iten.css({transform:'translate(-100%,-100%) rotate('+((i*this.angle)+this.offset)+'deg) skew('+(90-this.angle)+'deg)'})
      var subiten =$('<div class="CircleIten"></div>').appendTo(iten);
      subiten.css({transform:'skew('+((90-this.angle)*-1)+'deg) rotate('+((90-(this.angle/2))*-1)+'deg)'})
      if(this.itens[i].title){
        var link = $('<a>'+this.itens[i].title+'</a>').appendTo(subiten);
        if(this.itens[i].color){
          link.css({color:this.itens[i].color});
        }
        if(typeof this.itens[i].clicked =='function'){
          var callback = this.itens[i].clicked;
          link.click(this.itens[i].clicked);
        }
      }
    }
    if(this.itensSize){
      console.log('itensSize')
      $('.CircleNavIten .CircleIten').css({width:(this.itensSize)+'%',height:(this.itensSize)+'%',left:-((this.itensSize)/2)+'%',bottom:-((this.itensSize)/2)+'%'})
    }
    if(this.itensColor){
      $('.CircleIten a').css({color:this.itensColor})
      $('.CircleIten a').css({color:this.itensColor})
    }
    if(this.fontSize){
      $('.CircleIten a').css({fontSize:this.fontSize})
    }
  }
  else {
    console.warn('itens is not array');
  }
};

CircleNavBar.prototype.setSize = function (width,height) {

};

CircleNavBar.prototype.ExpandFromCenterAnimation = function (speed,callback) {
  this.element.css({width:'20%',height:'20%',display:'block',opacity:0});
  var circleiten = this;
  setTimeout(function () {
    circleiten.element.css({width:circleiten.size+'%',height:circleiten.size+'%',opacity:1,transition:'all '+(speed/1000)+'s'});
    setTimeout(function(){
      if(callback){
        callback();
      }
      circleiten.element.css({transition:'all 0s'});
    },speed);
  },1);
};

CircleNavBar.prototype.FadeIn = function (speed,callback) {
  this.element.css({display:'block',opacity:0});
  var circleiten = this;
  setTimeout(function () {
    circleiten.element.css({opacity:1,transition:'all '+(speed/1000)+'s'});
    setTimeout(function(){
      if(callback){
        callback();
      }
      circleiten.element.css({transition:'all 0s'});
    },speed);
  },1);
};

Math.progresion = function (n) {
  if(n>1){
    return n+this.progresion(n-1);
  }
  else {
    return 1;
  }
};

CircleNavBar.prototype.FadeInOneByOne = function (speedFade,speed,callback) {
  this.element.css({display:'block',opacity:1});
  var itens = $('.CircleNavIten .CircleIten');
  itens.css({opacity:0});
  var circleiten = this;
  speed = speed/Math.progresion(itens.length);
  console.log('speed is '+speed);
  setTimeout(function () {
    $.each(itens,function functionName(i,iten) {
      setTimeout(function () {
        $(iten).css({opacity:1,transition:'all '+(speedFade/1000)+'s'});
        if(i==itens.length-1){
          setTimeout(function(){
            if(callback){
              callback();
            }
            itens.css({transition:'all 0s'});
          },speedFade);
        }
      },speed*i);
    });
  },1);
};

CircleNavBar.prototype.FanCloseAtTop = function () {
  $('.CircleNavIten').css({transform:'translate(-100%,-100%) rotate('+(90-(this.angle/2))+'deg) skew('+(90-this.angle)+'deg)'});
};

CircleNavBar.prototype.FanOpen = function (speed) {
  var circleiten = this;
  $.each($('.CircleNavIten'),function (i,iten) {
    console.log('translate(-100%,-100%) rotate('+((i*circleiten.angle)+circleiten.offset)+'deg) skew('+(90-circleiten.angle)+'deg)');
    $(iten).css({transform:'translate(-100%,-100%) rotate('+((i*circleiten.angle)+circleiten.offset)+'deg) skew('+(90-circleiten.angle)+'deg)',transition:'all '+(speed/1000)+'s'});
  })
  setTimeout(function () {
    circleiten.element.css({transition:'all 0s'});
  },speed);
}

CircleNavBar.prototype.setCircle = function () {
  this.element
};
