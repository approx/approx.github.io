/*
options = {
  strings([strings]) -> strings to type,
  speed(int) -> speed of typing
  loop(bool) -> the animation should loop
}
*/

function TypeAnim(element,options) {
  this.element = element;
  this.options = options!=undefined ? options : {};
  console.log();
  if(this.options.strings==undefined){
    this.options.strings = [element.html()];
    element.html(" ");
  }
  this.options.speed = this.options.speed !=undefined ? this.options.speed : 10;
  this.charIndex=0;
  this.stringIndex=0;
  var typing=this;
  this.element.html(this.options.strings[0])
  /*setTimeout(function () {
    typing.typeLoop();
  },this.options.speed);*/
}

TypeAnim.prototype.typeLoop = function () {
  if(this.stringIndex<this.options.strings.length){
    var string = this.options.strings[this.stringIndex].trim();
    console.log("set String "+string);
    if(this.charIndex<string.length){
      console.log("typing "+string[this.charIndex]);
      this.type();
      var typing=this;
      setTimeout(function () {
        typing.typeLoop();
      },this.options.speed);
    }
    else {
      this.stringIndex++;
      this.charIndex=0;
      var typing=this;
      setTimeout(function () {
        typing.typeLoop();
      },this.options.speed);
    }
  }
};

TypeAnim.prototype.type = function () {
  var char = string[this.charIndex];
  this.element.html(this.element.html()+string[this.charIndex]);
  this.charIndex++;
};
