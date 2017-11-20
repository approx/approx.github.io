function Animation(folder,frames,jqObj) {
  this.folder=folder;
  this.frames=frames;
  this.dom=jqObj;
  this.fpsTime = 32;
  this.index=1;
  this.end;
}

Animation.prototype.Start = function () {
  if(this.index<this.frames){
    this.dom.attr('src','animations/'+this.folder+'/'+("000" + this.index).slice(-4)+'.png');
    this.index++;
    var animation = this;
    setTimeout(function () {
      animation.Start();
    },this.fpsTime);
  }
  else {
    this.dom.attr('src','animations/'+this.folder+'/'+("000" + this.index).slice(-4)+'.png');
    this.end();
    this.index=1;
  }
};

Animation.prototype.Play = function (endCallBack) {
  this.end=endCallBack;
  this.Start();
};

function Odin(animations) {
  this.animations = animations,
  this.playing = false;
  this.animation;
}

Odin.prototype.HasAnimation = function (animationName) {
  for (var i = 0; i < this.animations.length; i++) {
    if(this.animations[i].folder==animationName){
      return this.animations[i];
    }
  }
   return null;
};

Odin.prototype.RandomAnimationsOverTime = function (time) {
  var index = Math.floor(Math.random() * this.animations.length);
  var odin = this;
  console.log(index);
  this.Play(this.animations[index].folder,function () {
    setTimeout(function () {
      odin.RandomAnimationsOverTime(time);
    },time*1000);
  });
};

Odin.prototype.Play = function (animation,endCallBack) {
  if(!this.playing){
    if(typeof animation === 'string'){
      var animationFinded = this.HasAnimation(animation);
      if(animationFinded!=null){
        this.playing=true;
        this.animation=animationFinded;
        var odin = this;
        this.animation.Play(function () {
          odin.playing=false;
          console.log(typeof endCallBack);
          if(typeof endCallBack === 'function'){
            endCallBack();
          }
        });
      }
      else {
        console.warn('No '+animation+' animation find');
      }
    }
  }
  else {
    console.warn('Odin alredy has a animation playing');
  }
};

Odin.prototype.Update = function () {
  if(this.playing){
    this.NextFrame();
  }
  setTimeout(this.Update(),this.fpsTime);
};
