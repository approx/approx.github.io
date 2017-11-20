/*
  Carousel v1.1 - created by Diego Matias


  jqElement -> jquery object that will contain the Carousel
  itens -> array of json objects contain title description and image
  options ->{
    width,
    height,
    animations ->{
      zoomOutOnHover -> bolean
      moveBackOnDistance -> bolean
    },
    moveOnClick -> bolean,
    moveBGOnMouseMove -> bolean
    moveActiveBGOnMouseMove -> bolean
    moveBGAmount -> float
    margin-> int *margin for the itens
    navButtons ->boolean that tels if the carousel wil have butons to navigate
    moveOnOpen -> bolean
    blur -> jquery blur this on open
  }
*/

Math.getPercentageOfValue = function (x,percentage) {
  return (x*percentage)/100;
}

function Carousel(jqElement,itens,options) {
  var obj = this;
  this.jqElement = $("<div class='carousel-container'><div class='carousel-itens'></div></div>").appendTo(jqElement);
  $("<div class='carousel-hide'><i class='fa fa-times' aria-hidden='true'></i></div>").appendTo(this.jqElement).css({position:'fixed',bottom:'50px',left:'50%'}).click(function () {
    obj.Hide(true);
  })
  //this.jqElement = jqElement;
  this.options = options ? options:{};
  this.options.animations = this.options.animations ? this.options.animations : {};
  this.itens = itens;
  this.screenWidth = $(window).outerWidth();
  this.screenHeight = $(window).outerHeight();
  this.itenWidth = this.options.width ? this.options.width : Math.getPercentageOfValue(this.screenWidth,30);
  this.itenHeight = this.options.height ? this.options.height : Math.getPercentageOfValue(this.screenHeight,20);
  this.options.margin = this.options.margin ? this.options.margin : 0;
  this.options.moveBGAmount = this.options.moveBGAmount ? this.options.moveBGAmount : 1;
  //this.options.moveOnOpen = this.options.moveOnOpen ? this.options.moveOnOpen : true;

  this.open=false;

  this.jqItens=[];

  this.indexIten=0;

  this.SetItens();
}

Carousel.prototype.SetItens = function () {
  var obj = this;

  var calculatedWidth = (this.options.width ? this.options.width : Math.getPercentageOfValue(this.screenWidth,30))*this.itens.length;
  calculatedWidth+= this.options.margin*this.itens.length;

  if(this.options.navButtons){
    console.log(this.jqElement.position());
    var offset=20;
    var butons = $('<div class="carousel-nav-buttons"><a id="left" href=""><i class="fa fa-arrow-left" aria-hidden="true"></i></a><a id="right" href=""><i class="fa fa-arrow-right" aria-hidden="true"></i></a></div>').appendTo(this.jqElement.parent());
    butons.css({position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)'});
    var obj = this;
    butons.find('a#right').click(function (e) {
      e.preventDefault();
      obj.Next();
    }).css({left:(this.itenWidth/2)+offset,position:'absolute',transform:'translateY(-50%)'});

    butons.find('a#left').click(function (e) {
      e.preventDefault();
      obj.Back();
    }).css({right:(this.itenWidth/2)+offset,position:'absolute',transform:'translateY(-50%)'});
  }

  if(this.itens instanceof Array){
    for (var i = 0; i < this.itens.length; i++) {
      var iten = this.CreateIten(this.itens[i]).css({height:this.itenHeight,width:this.itenWidth});
      this.jqItens.push(iten);
      iten.find('.carousel-title').click(function (data) {
        // console.log(data.target.parentElement);
        if($(data.target.parentElement).hasClass('active')){
          obj.Open($(data.target.parentElement));
        }
      });

      calculatedWidth+=((this.screenWidth/2)-((this.itenWidth/2)+this.options.margin))*2;

      if(this.options.animations.zoomOutOnHover){
        this.SetZoomOutOnHover(iten);
      }
      if(this.options.moveOnClick){
        this.SetMoveOnClick();
      }
    }
  }

  $('.carousel-iten').css({margin:'0px '+this.options.margin+'px'});
  $('.carousel-content .carousel-content-exit').click(function () {
    obj.Close();
  });


  $('.carousel-itens').css({paddingLeft:(this.screenWidth/2)-((this.itenWidth/2)+this.options.margin),paddingRight:(this.screenWidth/2)-((this.itenWidth/2)+this.options.margin)})
  calculatedWidth+=((this.screenWidth/2)-((this.itenWidth/2)+this.options.margin))*2
  this.jqElement.css({width:calculatedWidth>this.screenWidth ? calculatedWidth:'100%'});

  this.CheckBlur();

  if(this.options.moveActiveBGOnMouseMove){
    var obj = this;
    $(document).mousemove(function (e) {
      var movex = (e.clientX-(obj.screenWidth/2))/(obj.open ? 5 : 1);
      var movey = (e.clientY-(obj.screenHeight/2))/(obj.open ? 5 : 1);
      var percentageX = ((movex*100)/(obj.screenWidth))/obj.options.moveBGAmount;
      var percentageY = ((movey*100)/(obj.screenHeight))/obj.options.moveBGAmount;
      $('.carousel-iten.active .carousel-bg').css({backgroundPosition:(percentageX+50)+'% '+(percentageY+50)+'%'});
    });
  }
};

Carousel.prototype.Close = function () {
  var obj = this;
  setTimeout(function () {
    obj.run(100,0,function () {
      obj.jqElement.parent().scrollLeft((obj.indexIten*$('.carousel-iten').outerWidth(true)));
    });
    $('.carousel-iten').css({height:obj.itenHeight,width:obj.itenWidth,transition:'all 1s',margin:'0px '+obj.options.margin+'px'});
    $('.carousel-iten .carousel-bg').css({WebkitFilter:'brightness(100%)',filter:'brightness(100%)',transition:'all 2s'});
    setTimeout(function () {
      $('.carousel-iten .carousel-bg').css({transition:'all 0s'});
    },100);
    $('.carousel-itens').css({paddingLeft:(obj.screenWidth/2)-((obj.itenWidth/2)+obj.options.margin),paddingRight:(obj.screenWidth/2)-((obj.itenWidth/2)+obj.options.margin)})
    $('.carousel-iten .carousel-content').css({display:'none',opacity:0});
    $('.carousel-nav-buttons, .carousel-title').css({display:'block'});
    setTimeout(function () {
      $('.carousel-nav-buttons, .carousel-title').css({transition:'all 0.8s',opacity:1});
      $('.carousel-hide').css({display:'block',opacity:0});
      setTimeout(function () {
        $('.carousel-hide').css({opacity:1,transition:'all 0.5s'});
      },100)
    },1000);
  },1000);
  this.open=false;
  this.CloseAllAnimations();
};

Carousel.prototype.CloseAllAnimations = function () {
  for (var i = 0; i < this.jqItens.length; i++) {
    this.InitialAnim(this.jqItens[i].find('.carousel-content'));
  }
};

Carousel.prototype.Open = function (iten) {
  this.open=true;
  $('.carousel-hide').css({opacity:0,transition:'all 0.5s'});
  setTimeout(function () {
    $('.carousel-hide').css({display:'none'});
  },500)
  $('.carousel-iten').css({width:$('[carousel]').outerWidth(),height:$('[carousel]').outerHeight(),transition:'all 1s',margin:0})
  $('.carousel-iten .carousel-bg').css({WebkitFilter:'brightness(50%)',filter:'brightness(50%)',transition:'all 2s'});
  setTimeout(function () {
    $('.carousel-iten .carousel-bg').css({transition:'all 0s'});
  },100);
  iten.css({width:$('[carousel]').outerWidth(),height:$('[carousel]').outerHeight(),transition:'all 1s',margin:0});
  iten.parent().css({padding:0,transition:'all 1s'});
  iten.parent().removeClass('zoomOut');
  $('.carousel-iten').off("mouseenter mouseleave mousemove");
  $('.carousel-nav-buttons, .carousel-title').css({transition:'all 0.8s',opacity:0});
  setTimeout(function () {
    $('.carousel-nav-buttons, .carousel-title').css({display:'none'});
  },800)

  //this.indexIten = Math.round(currentOffset/this.screenWidth);

  // $(window).css({transition:'all 1s'});
  var obj = this;
  this.run(100,0,function () {
    obj.jqElement.parent().scrollLeft((obj.indexIten*$('.carousel-iten').outerWidth(true)));
  });


  this.ContentAnim1(iten.find('.carousel-content'));

  if(this.options.moveOnOpen==false){
    console.log('canelou');
    $('.carousel-itens').off('mousedown mouseup mousemove').removeClass('cursorOnHover');
  }
};

Carousel.prototype.run = function (miliSeconds,miliSecondsLeft,func) {
  var obj= this;
  window.requestAnimationFrame(function () {
    func();
    if(miliSeconds>miliSecondsLeft){
      obj.run(miliSeconds,miliSecondsLeft+=1,func);
    }
  });
};

Carousel.prototype.SetMoveOnClick = function () {
  $('.carousel-itens').addClass('cursorOnHover');
  var obj = this;
  obj.mousePosition={};

  $('.carousel-itens').on("drag",function (e) {
    e.preventDefault();
    e.stopPropagation();
  })

  $('.carousel-itens').mousedown(function (e) {
    e.preventDefault();
    obj.mousePosition.last = {x:e.clientX,y:e.clientY};
    obj.mousePosition.cliking=true;
    // console.log(obj.mousePosition);
  });

  $('.carousel-itens').mouseup(function (e) {
    e.preventDefault();
    obj.mousePosition.cliking=false;
    obj.CheckPosition();
    // console.log(obj.mousePosition);
  });

  $('.carousel-itens').mousemove(function (e) {
    obj.mousePosition.now = {x:e.clientX,y:e.clientY};
    obj.mousePosition.last = obj.mousePosition.last ? obj.mousePosition.last : {}
    if(obj.mousePosition.last.x){
      var dif = obj.mousePosition.last.x-obj.mousePosition.now.x;
    }
    if(obj.mousePosition.cliking){
      obj.jqElement.parent().scrollLeft(obj.jqElement.parent().scrollLeft()+dif);
    }
    obj.mousePosition.last = {x:e.clientX,y:e.clientY};
  });
};

Carousel.prototype.SetZoomOutOnHover = function (iten) {
  // $('.carousel-itens').css({paddingLeft:(this.screenWidth/2)-((this.itenWidth/2)+this.options.margin),paddingRight:(this.screenWidth/2)-((this.itenWidth/2)+this.options.margin)})
  var obj = this;
  iten.mousemove(function () {
    $('.carousel-itens').css({transition:'transform 4s'})
    // console.log(this.jqElement.parent().scrollLeft());
    var postioninpx = obj.jqElement.parent().scrollLeft()+($(window).outerWidth()/2);
    // var positionInPercentage = (postioninpx*100)/$('.carousel-container').
    $('.carousel-itens').css({transformOrigin:postioninpx+'px 50%'})
    $('.carousel-itens').addClass('zoomOut');
  });
  iten.hover(function () {
    $('.carousel-itens').css({transition:'transform 4s'})
    // console.log(this.jqElement.parent().scrollLeft());
    var postioninpx = obj.jqElement.parent().scrollLeft()+($(window).outerWidth()/2);
    // var positionInPercentage = (postioninpx*100)/$('.carousel-container').
    $('.carousel-itens').css({transformOrigin:postioninpx+'px 50%'})
    $('.carousel-itens').addClass('zoomOut');
  },function () {
    $('.carousel-itens').css({transition:'transform 0.5s'})
    //$('.carousel-container').css({transformOrigin:'50%'})
    $('.carousel-itens').removeClass('zoomOut');
  });
};

Carousel.prototype.InitialAnim = function (jqElement) {
  var fontSize = '65px';
  var fontInt = 65;
  setTimeout(function () {
    jqElement.css({display:'flex',opacity:1,width:'70%',height:'70%', color:'white',alignItems: 'center'});
  },800)
  var title = jqElement.find('.carousel-content-title').css({overflow:'hidden',display:'flex',justifyContent: 'center',flexDirection:'column',height:'100%',fontSize:fontSize,lineHeight:fontSize,width:'49.5%'});
  var galery = jqElement.find('.carousel-content-iamges').css({width:'49.5%', height: '100%',marginLeft:10})
  var description = title.find('.carousel-content-description').css({fontSize:'14px',opacity:0,lineHeight:'18px',paddingRight:'20px',paddingTop:'15px',textAlign:'right'});
  var p = title.find('p').css({textAlign:'right',opacity:0,paddingRight:'5px',float:'right',transition:'all 1s'});
  var partition = jqElement.find('.carousel-partition').css({width:'1px',backgroundColor:'white',transition:'all 1s',height:0});
  var exit = jqElement.find('.carousel-content-exit').css({display:'none',opacity:0,transition: 'all 1s'});
  var images = galery.find('.carousel-imageBox .carousel-image').css({transform:'scale(0)'})

  return {
    title:title,
    p:p,
    description:description,
    partition:partition,
    exit:exit,
    galery:galery,
    images:images
  }
};

Carousel.prototype.ContentAnim1 = function (jqElement) {
  var aninItens = this.InitialAnim(jqElement);
  aninItens.exit.css({display:'block'});
  setTimeout(function () {
    aninItens.p.css({opacity:1,transition:'all 1s'});
    setTimeout(function () {
      aninItens.partition.css({height:'100%'});
      setTimeout(function () {
        aninItens.description.css({opacity:1,transition:'all 1s'});
        $.each(aninItens.images,function (i,iten) {
          setTimeout(function () {
            $(iten).css({transform:'scale(1)',transition:'all 1s'})
          },i*100);
        })
        aninItens.exit.css({opacity:1});
        //aninItens.title.css({height:'100%',transition:'all 2s'});
      },800)
    },500)
  },1000);
};

Carousel.prototype.CheckPosition = function () {
  var currentOffset = this.jqElement.parent().scrollLeft();
  var itenWidth = $('.carousel-iten').outerWidth(true);
  var oldindex = this.indexIten;
  this.indexIten = Math.round((currentOffset/itenWidth));

  if(oldindex!=this.indexIten&&this.open){
    console.log(this.jqItens[this.indexIten]);
    this.ContentAnim1(this.jqItens[this.indexIten].find('.carousel-content'));
    this.InitialAnim(this.jqItens[oldindex].find('.carousel-content'))
  }

  // $(window).css({transition:'all 1s'});

  this.jqElement.parent().stop().animate({
    scrollLeft : this.indexIten*itenWidth
  },200);

  // this.jqElement.find('.carousel-itens').css({perspectiveOrigin:this.indexIten*itenWidth});

   this.CheckBlur();

};

Carousel.prototype.Next = function () {
  if(this.indexIten<this.itens.length-1){
    this.indexIten++;
    var totalWidth = (this.itenWidth)+(this.options.margin*2);
    this.jqElement.parent().stop().animate({
      scrollLeft : this.indexIten*totalWidth
    },200);
    // this.jqElement.find('.carousel-itens').css({perspectiveOrigin:(this.indexIten*totalWidth)+(totalWidth/2)});
    this.CheckBlur();
  }
};

Carousel.prototype.Back = function () {
  if(this.indexIten>0){
    this.indexIten--;
    var totalWidth = (this.itenWidth)+(this.options.margin*2);
    this.jqElement.parent().stop().animate({
      scrollLeft : this.indexIten*totalWidth
    },200);
    // this.jqElement.find('.carousel-itens').css({perspectiveOrigin:(this.indexIten*totalWidth)+(totalWidth/2)});
    this.CheckBlur();
  }
};

Carousel.prototype.CheckBlur = function () {
  var currentOffset = this.jqElement.parent().scrollLeft();

  this.jqItens[this.indexIten].addClass('active');
  var scaleFActor = 0.2;
  for (var i = 0; i < this.jqItens.length; i++) {
    if(this.options.animations.moveBackOnDistance){
      var dist = Math.abs(this.indexIten-i);
      this.jqItens[i].css({transform:'scale('+(1-(dist*scaleFActor))+')'})
    }
    if(this.indexIten!=i){

      this.jqItens[i].removeClass('active');
    }
  }
};

Carousel.prototype.CreateIten = function (iten) {
  var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam diam ipsum, sollicitudin non lectus id, gravida pharetra diam. Aenean ligula elit, vehicula tristique facilisis ac, fermentum non elit. Proin pharetra urna vitae erat convallis, nec vehicula felis sollicitudin. Cras eget molestie augue. Nunc auctor faucibus dui, fermentum interdum est auctor sit amet. Suspendisse dictum porttitor magna. Sed dui magna, aliquam vitae mi vel, egestas malesuada libero.'

  var galery = $("<div class='carousel-content-iamges'></div>");
  var index = 0;
  while (index<iten.galery.length) {
    var rnd =0;
    var combinations = [
      [{w:'100%',h:'100%'}],
      [{w:'50%',h:'100%'},{w:'50%',h:'100%'}],
      [{w:'50%',h:'50%'},{w:'50%',h:'50%'},{w:'100%',h:'50%'}],
      [{w:'50%',h:'50%'},{w:'50%',h:'50%'},{w:'50%',h:'50%'},{w:'50%',h:'50%'}]
    ];
    if(iten.galery.length-index>=4){
      rnd = Math.floor((Math.random() * 4));
    }
    else if(iten.galery.length-index>=3) {
      rnd = Math.floor((Math.random() * 3));
    }
    else if(iten.galery.length-index>=2) {
      rnd = Math.floor((Math.random() * 2));
    }

    var imageBox = $('<div class="carousel-imageBox"></div>').css({width:'100%',fontSize:0}).appendTo(galery);
    for (var i = 0; i < rnd+1; i++) {
      // console.log(combinations);
      $('<div class="carousel-image"><div>').css({width:combinations[rnd][i].w,height:combinations[rnd][i].h,display:'inline-block',backgroundImage:'url('+iten.galery[index+i]+')',backgroundSize:'cover',backgroundPosition: 'center' }).appendTo(imageBox)
    }
    index+=rnd+1;
  }

  var imgboxes = galery.find('.carousel-imageBox');
  imgboxes.css({height:(100/imgboxes.length)+'%'});


  var itenDOM = $("<div class='carousel-iten'><div class='carousel-title'>"+iten.title+"</div></div>").appendTo(this.jqElement.find('.carousel-itens'));
  var content = $("<div class='carousel-content'><div class='carousel-content-exit'><i class='fa fa-times' aria-hidden='true'></i></div><div class='carousel-content-title'><p>"+iten.title+"</p><div class='carousel-content-description'>"+lorem+"</div></div><div class='carousel-partition'></div></div>").css({display:'none',opacity:0}).appendTo(itenDOM);
  var bg = $("<div class='carousel-bg'></div>").css({position:'absolute',zIndex:-1,width:'100%',height:'100%',backgroundImage:'url('+iten.imgUrl+')',backgroundSize:'110% auto',backgroundPosition:'50% 50%'}).appendTo(itenDOM);
  galery.appendTo(content);
  if(this.options.moveBGOnMouseMove){
    var obj = this;
    $(document).mousemove(function (e) {
      var movex = e.clientX-(obj.screenWidth/2);
      var movey = e.clientY-(obj.screenHeight/2);
      var percentageX = ((movex*100)/(obj.screenWidth))/obj.options.moveBGAmount;
      var percentageY = ((movey*100)/(obj.screenHeight))/obj.options.moveBGAmount;
      bg.css({backgroundImage:'url('+iten.imgUrl+')',backgroundSize:'110% auto',backgroundPosition:(percentageX+50)+'% '+(percentageY+50)+'%'});
    });
  }
  return itenDOM;
};

Carousel.prototype.Hide = function (anim) {
  if(anim){
    this.jqElement.parent().css({opacity:0,transition:'all 1s'});
    var obj = this;
    setTimeout(function () {
      obj.jqElement.parent().css({display:'none',opacity:0});
    },1000)
    this.options.blur.css({transition:'all 0.5s',WebkitFilter: 'blur(0px) ',filter: 'blur(0px) '})
  }
  else {
    this.jqElement.parent().css({display:'none',opacity:0});
  }
};

Carousel.prototype.Show = function () {
  this.jqElement.parent().css({display:'flex'});
  var obj = this;
  if(this.options.blur){
    this.options.blur.css({transition:'all 0.5s',WebkitFilter: 'blur(5px) brightness(50%)',filter: 'blur(5px) brightness(50%)'})

    setTimeout(function () {
      obj.options.blur.css({transition:'none'});
    },500)
  }
  setTimeout(function () {
    obj.jqElement.parent().css({opacity:1,transition:'all 1s'});
  });
};
