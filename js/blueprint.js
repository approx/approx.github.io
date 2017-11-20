$(document).ready(function () {
  $('.Colliders').css({width:$('.bluePrintContainer .ref').outerWidth(true),height:$('.bluePrintContainer .ref').outerHeight(true)});
  var sala01 = new BluePrintRoom($('.sala01-a,.sala01-b'),$('.sala01-a,.sala01-b,.sala01-c'));
  $('.bluePrintContainer').css({transition:'all 0.3s',opacity:0});

  $('.bluePrintContainer').hide();

  $('.rounded-iten').click(function () {
    expandRoundIten();
  });

  $('.bluePrintContainer .content .close-round-iten').click(function () {
    shrinkRoundIten();
  });

});


function expandRoundIten() {
  console.log('exibindo');
  //$('.rounded-iten').fadeIn('slow');
  $('.bluePrintContainer').css({display:'flex'})
  $('.rounded-expand, .rounded-container').css({display:'block'});
  setTimeout(function () {
    $('.bluePrintContainer').css({opacity:1,display:'flex'});
    $('.bluePrintContainer .content .close-round-iten .bg-round-iten').css({width:'100%',height:'100%'})
  },300)
  setTimeout(function () {
    $('.rounded-expand').css({transform:'scale(150) translateZ(0)',borderRadius:'50%',transition: 'all 1s'});

  },10)
}

function shrinkRoundIten() {
  $('.rounded-expand').css({width:'50px',height:'50px',transform:'scale(1) translateZ(0)',borderRadius:'50%',transition: 'all 0.7s'});
  setTimeout(function () {
    $('.rounded-expand, .rounded-container').css({display:'none'});
  },700)
  setTimeout(function () {
    $('.bluePrintContainer .content .close-round-iten .bg-round-iten').css({width:'2%',height:'2%'})
    $('.bluePrintContainer').css({opacity:0});
    setTimeout(function () {
      $('.bluePrintContainer').css({display:'none'});
    },300);
  },150)
}

function BluePrintRoom(containers,objs) {
  this.objs = objs;
  this.containers = containers;
  var blueprint = this;
  var itens = this.objs;
  $.each(this.containers,function (i,iten) {
    $(iten).hover(function () {
      console.log(itens);
      itens.addClass('active');
    },function () {
      itens.removeClass('active');
    });
  });
}
