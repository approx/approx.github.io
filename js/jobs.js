$(document).ready(function () {
  $(window).resize(function () {
    calculateScreenSize();
  })
  //$('.jobs .job-iten .job-bg').css({width:'100%',height:'100%'});
  var jobs = $('.jobs .job-iten .job-bg');

  $.each(jobs,function (index,iten) {
    setTimeout(function () {
      console.log(iten);
      $(iten).css({width:'100%',height:'100%'});
    },400*index);
  });
  console.log();
  calculateScreenSize();
});

function calculateScreenSize() {
  var screensize = $(window).outerHeight();
  var navHeight = $('.container').outerHeight(true);
  console.log(screensize);
  var height = screensize - navHeight;
  $('.jobs .job-iten').css({height:height/2});

}
