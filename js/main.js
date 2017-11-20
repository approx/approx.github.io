var materialCozinha,materialProduction,materialReception;
var cozinha;
var producao;
var reception;
var liveMarketingCarousel;

$(document).ready(function() {
  if($(window).outerWidth()>$(window).outerHeight()){
    $('.bluePrintContainer .content img').css({height:'80%',width:'auto'});
  }
  else {
    $('.bluePrintContainer .content img').css({width:'80%',height:'auto'});
  }



  var itens = [
    {
      title : "Life in Box",
      imgUrl : "imgs/galery/liveMarkteing/01/01.jpg",
      galery:[
        "imgs/galery/liveMarkteing/01/01.jpg",
        "imgs/galery/liveMarkteing/01/02.jpg",
        "imgs/galery/liveMarkteing/01/03.jpg",
        "imgs/galery/liveMarkteing/01/04.jpg",
        "imgs/galery/liveMarkteing/01/05.jpg"
      ]
    },{
      title : "Encontro de Líderes",
      imgUrl : "imgs/galery/liveMarkteing/02/01.jpg",
      galery:[
        "imgs/galery/liveMarkteing/02/01.jpg",
        "imgs/galery/liveMarkteing/02/02.jpg",
        "imgs/galery/liveMarkteing/02/03.jpg",
        "imgs/galery/liveMarkteing/02/04.jpg",
        "imgs/galery/liveMarkteing/02/05.jpg",
        "imgs/galery/liveMarkteing/02/06.jpg"
      ]
    },{
      title : "50 anos",
      imgUrl : "imgs/galery/liveMarkteing/03/01.jpg",
      galery:[
        "imgs/galery/liveMarkteing/03/01.jpg",
        "imgs/galery/liveMarkteing/03/02.jpg",
        "imgs/galery/liveMarkteing/03/03.jpg",
        "imgs/galery/liveMarkteing/03/04.jpg",
        "imgs/galery/liveMarkteing/03/05.jpg",
        "imgs/galery/liveMarkteing/03/06.jpg",
        "imgs/galery/liveMarkteing/03/07.jpg",
        "imgs/galery/liveMarkteing/03/08.jpg"
      ]
    },{
      title : "Qualitas",
      imgUrl : "imgs/galery/liveMarkteing/04/01.jpg",
      galery:[
        "imgs/galery/liveMarkteing/04/01.jpg",
        "imgs/galery/liveMarkteing/04/02.jpg",
        "imgs/galery/liveMarkteing/04/03.jpg",
        "imgs/galery/liveMarkteing/04/04.jpg",
        "imgs/galery/liveMarkteing/04/05.jpg",
        "imgs/galery/liveMarkteing/04/06.jpg",
        "imgs/galery/liveMarkteing/04/07.jpg",
        "imgs/galery/liveMarkteing/04/08.jpg",
        "imgs/galery/liveMarkteing/04/09.jpg",
        "imgs/galery/liveMarkteing/04/10.jpg"
      ]
    },{
      title : "Lançamento do Novo Uno",
      imgUrl : "imgs/galery/liveMarkteing/05/01.jpg",
      galery:[
        "imgs/galery/liveMarkteing/05/01.jpg",
        "imgs/galery/liveMarkteing/05/02.jpg",
        "imgs/galery/liveMarkteing/05/03.jpg",
        "imgs/galery/liveMarkteing/05/04.jpg",
        "imgs/galery/liveMarkteing/05/05.jpg",
        "imgs/galery/liveMarkteing/05/06.jpg",
        "imgs/galery/liveMarkteing/05/07.jpg",
        "imgs/galery/liveMarkteing/05/08.jpg"
      ]
    },{
      title : "Lançamento do 500 Abarth",
      imgUrl : "imgs/galery/liveMarkteing/06/01.jpg",
      galery:[
        "imgs/galery/liveMarkteing/06/01.jpg",
        "imgs/galery/liveMarkteing/06/02.jpg",
        "imgs/galery/liveMarkteing/06/03.jpg",
        "imgs/galery/liveMarkteing/06/04.jpg",
        "imgs/galery/liveMarkteing/06/05.jpg",
        "imgs/galery/liveMarkteing/06/06.jpg",
        "imgs/galery/liveMarkteing/06/07.jpg",
        "imgs/galery/liveMarkteing/06/08.jpg",
        "imgs/galery/liveMarkteing/06/09.jpg"
      ]
    },{
      title : "18º Prêmio Fiat de Educação",
      imgUrl : "imgs/galery/liveMarkteing/07/01.jpg",
      galery:[
        "imgs/galery/liveMarkteing/07/01.jpg",
        "imgs/galery/liveMarkteing/07/02.jpg",
        "imgs/galery/liveMarkteing/07/03.jpg",
        "imgs/galery/liveMarkteing/07/04.jpg",
        "imgs/galery/liveMarkteing/07/05.jpg",
        "imgs/galery/liveMarkteing/07/06.jpg",
        "imgs/galery/liveMarkteing/07/07.jpg",
        "imgs/galery/liveMarkteing/07/08.jpg",
        "imgs/galery/liveMarkteing/07/09.jpg"
      ]
    },{
      title : "Inauguração da Barragem de Setúbal",
      imgUrl : "imgs/galery/liveMarkteing/08/01.jpg",
      galery:[
        "imgs/galery/liveMarkteing/08/01.jpg",
        "imgs/galery/liveMarkteing/08/02.jpg",
        "imgs/galery/liveMarkteing/08/03.jpg",
        "imgs/galery/liveMarkteing/08/04.jpg"
      ]
    },
  ];

  var options ={
    width:700,
    height: 400,
    animations:{
      zoomOutOnHover:false,
      moveBackOnDistance:true
    },
    moveOnClick:true,
    moveActiveBGOnMouseMove:true,
    moveBGAmount: 3.5,
    margin:10,
    navButtons: true,
    moveOnOpen: true,
    blur:$('#container, #hud, .logoWraper, .navigationBar')
  }

  liveMarketingCarousel = new Carousel($('[carousel]#liveMarketingCarousel').css({zIndex:200}),itens,options);
  liveMarketingCarousel.Hide(false);

  $('#navLiveMarketing').click(function (e) {
    e.preventDefault();
    liveMarketingCarousel.Show();
  });

  $('#bluePrintLiveMarkting').hover(function () {
    $('.liveMarketingBox .ballon').css({animation: 'show .2s linear forwards '});
    $('.liveMarketingBox .ballonArrow').css({transition:'all .5s',top:0,opacity:1})
  },function () {
    $('.liveMarketingBox .ballon').css({animation: 'hide .2s linear forwards'});
    $('.liveMarketingBox .ballonArrow').css({transition:'all .2s',top:5,opacity:0})
    //$('.liveMarketingBox').css({animationPlayState:'running',animationDirection:'reverse'});
  });

  var toggleNav= false;
  $('[data-target]').click(function () {
    var id = $(this).attr('data-target');
    if(!toggleNav){
      $.each($(id).find('ul li a'),function (i,iten) {
        setTimeout(function () {
          $(iten).css({opacity:1,transition:'all 0.5s',marginTop:0});
        },i*250);
      });
      $(id).css({display:toggleNav?'none':'block'});
    }
    else {
      $.each($(id).find('ul li a'),function (i,iten) {
        setTimeout(function () {
          $(iten).css({opacity:0,transition:'all 0.5s',marginTop:-10});
          if(i==$(id).find('ul li a').length){
            $(id).css({display:toggleNav?'none':'block'});
          }
        },i*250);
      });
    }
    toggleNav=!toggleNav;
  })
});


function odinStart() {
  /*$('.odin').attr('src','imgs/odin.gif');
  setTimeout(function () {
    $('.odin').attr('src','imgs/odinStatic.gif');
    setTimeout(function () {
      odinStart();
    },7500);
  },7500);
  console.log('trocou');*/

  var odin = new Odin([new Animation('anim1',250,$('.odin.Anim1')),new Animation('anim2',329,$('.odin.Anim2'))]);
  odin.RandomAnimationsOverTime(3);

}
function StartLoad360(func) {
  new SCENE();
  SCENE.instance.initi(undefined,new THREE.Vector3(0,0,0),new THREE.Vector3(0,8,0),75);
  SCENE.instance.AddMouseControlCamera();

  var materialtoLoad={loaded:0,toLoad:3}

  materialCozinha = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load( 'imgs/ambiente.png' ,function () {
      materialtoLoad.loaded++;
      func((materialtoLoad.loaded*100)/materialtoLoad.toLoad);
      console.log('loading');
      if(materialtoLoad.loaded==materialtoLoad.toLoad){
      }
    }),
    transparent: true,
  });

  materialProduction = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load( 'imgs/producao.png' ,function () {
      materialtoLoad.loaded++;
      func((materialtoLoad.loaded*100)/materialtoLoad.toLoad);
      console.log('loading');
      if(materialtoLoad.loaded==materialtoLoad.toLoad){
      }
    }),
    transparent: true,
  });

  materialReception = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('imgs/teste.png',function () {
      materialtoLoad.loaded++;
      func((materialtoLoad.loaded*100)/materialtoLoad.toLoad);
      console.log('loading');
      if(materialtoLoad.loaded==materialtoLoad.toLoad){
      }
    }),
    transparent: true,
  });


}



function Initi() {
  SCENE.instance.EnableDeviceControls();

  var cozinhaObj = SCENE.instance.CreateSphere(500,60,60,materialCozinha);
  cozinhaObj.obj3D.scale.set(-1,1,1);
  cozinhaObj.obj3D.material.opacity=0;

  var producaoObj = SCENE.instance.CreateSphere(500,60,60,materialProduction);
  producaoObj.obj3D.scale.set(-1,1,1);
  producaoObj.obj3D.material.opacity=0;

  var receptionObj = SCENE.instance.CreateSphere(500,60,60,materialReception);
  receptionObj.obj3D.scale.set(-1,1,1);
  receptionObj.obj3D.material.opacity=1;

  // cozinha = new Room(cozinhaObj);
  // producao = new Room(producaoObj);
  reception = new Room(receptionObj);

  var sCord =  new SphericalCordinate(180,90,500);

  //console.log(sCord.ToVector3());

  var hudReceptionToCozinha = SCENE.instance.SetHudToWorldSpace(SCENE.instance.CreateImgHud('imgs/logo.png',50,50),sCord.ToVector3(),function () {
    console.log('reception to kitchen');
    reception.fade(cozinha);
  },true);

  var liveMarketingCord =  new SphericalCordinate(250,90,500);

  var liveMarketing = SCENE.instance.SetHudToWorldSpace(SCENE.instance.CreateTextHud('+liveMarketing'),liveMarketingCord.ToVector3(),function () {
    liveMarketingCarousel.Show();
  },true);
  console.log(liveMarketing);



  var hudCozinhaToProducao = SCENE.instance.SetHudToWorldSpace(SCENE.instance.CreateImgHud('imgs/logo.png',50,50),new THREE.Vector3(0,0,-3),function() {
    console.log('fin');
    cozinha.fade(producao);
  },true);


  var hudCozinhaToReception = SCENE.instance.SetHudToWorldSpace(SCENE.instance.CreateImgHud('imgs/logo.png',50,50),new SphericalCordinate(0,90,500).ToVector3(),function () {
    cozinha.fade(reception);
  },true);


  var hudProducaoToCozinha = SCENE.instance.SetHudToWorldSpace(SCENE.instance.CreateImgHud('imgs/logo.png',50,50),new THREE.Vector3(-3,0,-1),function() {
    console.log('fin');
    producao.fade(cozinha);
  },true);


  SCENE.instance.dia

  cozinha.addHud(hudCozinhaToProducao);
  cozinha.addHud(hudCozinhaToReception);
  cozinha.disableHud();

  producao.addHud(hudProducaoToCozinha);
  producao.addHud(liveMarketing);
  producao.disableHud();

  reception.addHud(hudReceptionToCozinha);
  reception.disableHud();


  var fade = function recursive(from,to) {
    if(from.obj3D.material.opacity>0){
      from.obj3D.material.opacity-=1/100;
      to.obj3D.material.opacity+=1/100;
      return requestAnimationFrame(function () {
        fade(from,to);
      });
    }
  }

  SCENE.instance.BeginRendering();
  SCENE.instance.removeMouseControll();
  console.log(SCENE.instance.scene);
  $('#container,#hud').css({opacity:1,transition:'all 0.5s'})
}

function show360() {
  SCENE.instance.AddMouseControlCamera();
  reception.enableHud();
  $('#hud').addClass("eA");

  console.log(localStorage.getItem("tutorial"));
  if(localStorage.getItem("tutorial")==null){
    $('.hand360').css({display:'block'});
    setTimeout(function () {
      $('.hand360').css({transition:'all 0.5s',opacity:1});
      setTimeout(function () {
        $('.hand360').css({opacity:0});
        setTimeout(function () {
          $('.hand360').css({display:'none'});
        },500)
      },7000)
      localStorage.setItem("tutorial",true);
    },10);
  }

  console.log('iniciou');
  //$('#hud:hover').css({cursor:'grabbing'});
}
