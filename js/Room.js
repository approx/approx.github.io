function Room(webobj) {
  if(webobj instanceof WEBOBJ){
    this.obj=webobj;
  }
  this.imgsHuds=[];
}

Room.prototype.addHud = function (hud) {
  if(hud instanceof HUDOBJ){
    this.imgsHuds.push(hud);
  }
};

Room.prototype.zoom = function (index,to,obj,func) {
  if(index<to){
    index++;
    SCENE.instance.camera.fov-=0.5;
    SCENE.instance.camera.updateProjectionMatrix();
    var zomobj = this;
    return requestAnimationFrame(function () {
      console.log(obj);
      zomobj.zoom(index,to,obj,func);
    });
  }
  else {
    func();
    this.fadePrivate(obj);
  }
}

Room.prototype.fadePrivate = function (to) {
  if(to instanceof Room){
    if(this.obj.obj3D.material.opacity>0){
      console.log(this.obj.obj3D.material);
      this.obj.obj3D.material.opacity-=1/100;
      to.obj.obj3D.material.opacity+=1/100;
      var obj = this;
      return requestAnimationFrame(function () {
        //console.log(obj);
        obj.fadePrivate(to);
      });
    }
    else {
      SCENE.instance.camera.fov=75;
      SCENE.instance.camera.updateProjectionMatrix();
    }
  }
  else {
    console.warn('to is not a Room object');
  }
};

Room.prototype.fade = function (to) {
  this.disableHud();
  this.zoom(0,20,to,function () {
    to.enableHud();

  });
  //this.fadePrivate(to);
};

Room.prototype.disableHud = function () {
  if(this.imgsHuds!=null){
    for (var i = 0; i < this.imgsHuds.length; i++) {
      if(this.imgsHuds[i] instanceof HUDOBJ){
        this.imgsHuds[i].enabled=false;
        this.imgsHuds[i].element.fadeOut('slow');
      }
      else {
        console.warn('imgsHud '+i+' is not a HUDOBJ');
      }
    }
  }
  else {
    console.warn('imgsHuds of this object is not a array of HUDOBJ');
  }

};

Room.prototype.enableHud = function () {
  if(this.imgsHuds!=undefined&&this.imgsHuds[0] instanceof HUDOBJ){
    for (var i = 0; i < this.imgsHuds.length; i++) {
      this.imgsHuds[i].enabled=true;
      this.imgsHuds[i].element.fadeIn('slow')
    }
  }
  else {
    console.warn('imgsHuds of this object is not a array of HUDOBJ');
  }
};
