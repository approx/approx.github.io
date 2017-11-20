var circleNav;
var pro = $('#PRO');
var blueprint;

pro.hide();
/*var wHeight=$(window).outerHeight();
var proHeight = (wHeight*2)/100;
pro.css({height:proHeight});*/

$(document).ready(function () {
  $('.start360').click(function () {
    show360();
    $('.bg-faded').fadeOut('slow');
    $('.logoWraper').fadeOut('slow');
  });

  var liveMarkting ={
    title : 'LiveMarkting',
    clicked : function () {
      liveMarketingCarousel.Show();
      console.log(liveMarketingCarousel);
    }
  }

  var tecnologia ={
    title : 'Tecnologia',
    clicked : function () {
      console.log('clickou');
    }
  }

  var Cenografia ={
    title : 'Cenografia',
    clicked : function () {
      console.log('clickou');
    }
  }

  var Clientes ={
    title : 'Clientes',
    clicked : function () {
      console.log('clickou');
    }
  }

  var TestDrive ={
    title : 'Test Drive',
    clicked : function () {
      console.log('clickou');
    }
  }


  var options = {
    itens:[liveMarkting,tecnologia,Cenografia,Clientes,TestDrive],
    itensSize:0,
    maxAngle:170,
    itensColor: 'white',
    centerTop: true,
    startVisibe: true,
    fontSize: 16,
    size: 100
  }

  //circleNav = new CircleNavBar($('.logoWraper'),'auto',options);

  //blueprint = new BluePrint($('.bluePrintContainer'));

  /*pro.css({height:(wHeight*60)/100,transition:'all 0.5s'});
  setTimeout(function () {
    pro.css({height:(wHeight*50)/100,transition:'all 0.5s'});
  },500);*/
  var leters = $('.title span');
  $.each(leters,function (index,element) {
    setTimeout(function () {
      $(element).css({display:'inline-block'});
      $(element).css({opacity:1});
    },100*index);
    if(index==leters.length-1){
      setTimeout(function () {
        pro.show();
        setTimeout(function () {
          fadeLetersToNav();
        },500);
      },100*(index+1));
    }
  });
});

function fadeLetersToNav(){
  $('ul.navbar-nav').css({display:'flex'});
  var navItens = $('ul.navbar-nav li a');

  var title = $('.title')
  var wraper = $('.logoWraper')
  title.css({opacity:0});
  wraper.css({width:wraper.outerWidth(true),justifyContent: 'flex-end'});
  title.css({opacity:0,transition:'all 0.5s'});
  setTimeout(function () {
    wraper.css({transition:'all 1s',width:pro.outerWidth()});
    title.hide();
    setTimeout(function () {
      wraper.css({transition:'all 0s',width:'auto'});
      $('.logoWraper').css({transform:'translateX(0%)',transition:'all 0.1s'});
      title.hide();
      var wHeight=$(window).outerHeight()>$(window).outerWidth() ? $(window).outerWidth():$(window).outerHeight();
      var proHeight = (wHeight*2)/100;
      pro.css({height:(wHeight*60)/100,width:(wHeight*60)/100,transition:'all 1s'});
      setTimeout(function () {
        console.log(window.innerWidth);
        if($(window).outerWidth()>1091){
          $.each(navItens,function (i,iten) {
            setTimeout(function () {
              $(iten).css({opacity:1,transition:'all 0.5s',marginTop:0});
            },i*250)
          });
        }
        $('#hud').css({opacity:1,transition:'all 1s'});
        pro.css({height:(wHeight*50)/100,width:(wHeight*50)/100,transition:'all 0.5s'});
        //$('#RoundNavBar').css({opacity:1,width:'100%',height:'100%'});
        //circleNav.FadeInOneByOne(2000,2000);
        setTimeout(function () {
          ProLoad360();
        },1200);
      },500);
    },1000);
  },500);
  console.log(pro.position());
  //wraper.css({transform:'translateX(-50%)'});
}

function HeigthByPercentage(percentage) {
  return 27+(percentage/2.128);
}

function ProLoad360() {
  var imgToLoad = $('#PRO .mask img');
  var mask = $('#PRO .mask');
  var height = pro.outerHeight();
  $('#PRO .imgBG').css({opacity:1});
  imgToLoad.css({height:height,transition:'all 1s',opacity:0});
  setTimeout(function () {
    mask.css({height:'0%'});
    imgToLoad.css({transition:'all 0s',opacity:1});
    StartLoad360(function (percentage) {

      mask.css({height:HeigthByPercentage(percentage)+'%',transition:'all 0.2s'});
      console.log(percentage);
      if(percentage==100){
        //active360();
        Initi();
        $('.start360').css({opacity:1});
        $('.bg-faded').css({backgroundColor:'rgba(19,19,19,0.9)'});
        setTimeout(function () {
          $('.imgBG').hide();
        },300)
        mask.css({height:'100%',transition:'all 0.2s'});
        console.log('teste');
      }
    })
    setTimeout(function () {
    },100);
  },1000);
}
