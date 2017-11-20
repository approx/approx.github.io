/*
  Wraper for three.js created by Diego Matias
  V1.3
*/

function SCENE() {
  SCENE.instance=this;
  this.renderer;
  this.camera;
  this.spriteCamera;
  this.spriteScene;
  this.scene;
  this.ambientlight;
  this.objects=[];
  this.controls;
  this.components={};
  this.hud;
  this.hudObjs=[];
  this.mouse={};
  //this.mouseControlCamera=false;
}

SCENE.prototype.add = function (obj) {
  if(obj instanceof WEBOBJ){
    this.scene.add(obj.obj3D);
    this.objects.push(obj);
  }

  if(obj instanceof THREE.Group){
    for (var i = 0; i < obj.children.length; i++) {
      if(obj.children[i] instanceof THREE.Mesh){
        this.scene.add(obj.obj3D);
        this.objects.push(obj);
      }
    }
  }
  if(obj instanceof HUDOBJ){
    this.hudObjs.push(obj);
  }
};

SCENE.prototype.createOrthoSprite = function (textureUrl) {
  /*if(this.spriteCamera == undefined){
    console.log('created camera');
    var container = $('#container');
    this.spriteCamera = new THREE.OrthographicCamera( - container.outerWidth() / 2, container.outerWidth() / 2, container.outerHeight() / 2, - container.outerHeight() / 2, 1, 10 );
    console.log(this.spriteScene);
		this.spriteCamera.position.z = 10;

    this.spriteScene = new THREE.Scene();
    this.spriteScene.add(this.spriteCamera);
  }*/

  var texture, textureLoader, material;
  if(textureUrl!=undefined){
    textureLoader = new THREE.TextureLoader();
    texture = textureLoader.load( textureUrl );
    material = new THREE.SpriteMaterial({map:texture});

    /*var width = material.map.image.width;
		var height = material.map.image.height;*/

    var sprite = new THREE.Sprite(material);
    //sprite.scale.set(width,height,1);
    this.scene.add(sprite);
    return sprite
  }

};

SCENE.prototype.CreateSphere = function (radius,horizontalSeg,verticalSeg,material,group) {
  var geometry = new THREE.SphereGeometry( radius, horizontalSeg, verticalSeg );
  var mesh = new THREE.Mesh(geometry,material);
  var webobj = new WEBOBJ(mesh);
  if(!group){
    this.add(webobj);
  }
  return webobj;
};

SCENE.prototype.vectorToScreen = function (vector) {
  if(vector instanceof THREE.Vector3){
    vector.project(this.camera);

    vector.x = Math.round((vector.x + 1) * this.renderer.domElement.width /2);
    vector.y = Math.round(( -vector.y + 1) * this.renderer.domElement.height /2);
    vector.z = 0;

    return vector;
  }
  else {
    console.warn('vector is not a instance of THREE.Vector3');
  }
};

SCENE.rayIntersects = function (rayCaster,group) {
  var intersects;
  if(group==undefined){
    intersects = rayCaster.intersectObjects(SCENE.instance.scene.children);
  }
  else {
    intersects = rayCaster.intersectObjects(group);
  }
  return intersects;
}

SCENE.prototype.EnableDeviceControls = function () {
  this.devicecontrols = new THREE.DeviceOrientationControls( this.camera );
};

SCENE.prototype.fireRayCasters = function() {
  if(this.components.raycasters!=undefined){
    if(this.components.raycasters.length>0){
      for (var i = 0; i < this.components.raycasters.length; i++) {
        this.components.raycasters[i].raycaster.setFromCamera(this.components.raycasters[i].from,this.camera);
      }
    }
  }
}

SCENE.prototype.rayCaster = function  (from) {
  if(from instanceof THREE.Vector2){
    if(this.components.raycasters==undefined){
      this.components.raycasters =[];
    }
    var raycaster = new THREE.Raycaster();
    var customray = {
      'raycaster':raycaster,
      'from':from
    }
    this.components.raycasters.push(customray);
    return raycaster;

  }
  else {
    console.warn('raycaster could not be create: from parameter is not a Vector2');
  }
}

SCENE.prototype.dirLight = function () {
  light = new THREE.DirectionalLight(0xffffff,1.5);
  light.position.set(-1,0,1);
  this.scene.add(light);
  return light;
};

SCENE.prototype.getCenterPoint =function(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
}

SCENE.prototype.loadTex = function (imgUrl) {
  return new Promise(function (resolve,reject) {
    var texture = new THREE.TextureLoader().load(imgUrl,function (texture) {
      resolve(texture);
    },function () {

    },function () {
      reject('error happen');
    });
  });
};

SCENE.prototype.loadObj = function (objUrl,texture,group) {
  var manager = new THREE.LoadingManager();
  manager.onProgress = function(item,loaded,total){
    console.log(item,loaded,total);
  }

  var texture;

  var loader = new THREE.JSONLoader(manager,webojb);
  var webojb=null;

  return new Promise(function(resolve, reject) {
    var onProgress = function(xhr){
      if(xhr.lengthComputable ){
        var percentComplete = xhr.loaded/xhr.total * 100;
        console.log(Math.round(percentComplete, 2)+'% loaded');
      }
    }

    var onError = function(xhr) {
      reject('algum error aconteceu');
    }
    webojb = loader.load(objUrl,function (geometry,materials) {
      var material;

      if(texture !=undefined){

        texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
        texture.anisotropy = 16;
        material = new THREE.MeshBasicMaterial({map:texture});
      }
      else {
        material = new THREE.MeshBasicMaterial();
      }

      var mesh = new THREE.Mesh(geometry,material);
      obj = new WEBOBJ(mesh);
      if(group instanceof THREE.Group){
        group.add(mesh);
        SCENE.instance.objects.push(obj)
      }
      else {
        SCENE.instance.add(obj);
      }
      resolve(obj);
    },onProgress,onError);
  });
};

SCENE.prototype.render = function () {
  this.renderer.render(this.scene,this.camera);
}

SCENE.prototype.addOrbitControls = function () {
  this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
  //this.controls.autoRotate = true;
  //this.controls.addEventListener( 'change', this.run() );
  this.controls.enableDamping = true;
	this.controls.dampingFactor = 0.25
  return this.controls;
};

SCENE.prototype.AddMouseControlCamera = function(){
  var mouseControlCamera=false;
  var mouseX=10,onMouseDownLon=0;
  var mouseY=0,onMouseDownLat=0;
  var deltaMoveX=0,deltaMovey=0,lon=180,lat=0;
  var target = new THREE.Vector3(0,0,0);
  $('#hud').on('mousedown',function (event) {
    event.preventDefault();
		mouseControlCamera = true;
		mouseX = event.clientX;
		mouseY = event.clientY;
		onMouseDownLon = lon;
		onMouseDownLat = lat;
  })
  .on('mouseup',function (event) {
    mouseControlCamera=false;
  })
  .on('mousemove',function (event) {
    SCENE.instance.mouse.x=event.clientX;
    SCENE.instance.mouse.y=event.clientY;
    if(mouseControlCamera){
      lon = ( mouseX - event.clientX ) * 0.05 + onMouseDownLon;
      lat = ( event.clientY - mouseY ) * 0.05 + onMouseDownLat;
      lat = Math.max( - 85, Math.min( 85, lat ) );
      phi = THREE.Math.degToRad( 90 - lat );
      theta = THREE.Math.degToRad( lon );
      target.x = 500 * Math.sin( phi ) * Math.cos( theta );
      target.y = 500 * Math.cos( phi );
      target.z = 500 * Math.sin( phi ) * Math.sin( theta );
      SCENE.instance.camera.lookAt( target );
    }
  })
  lat = Math.max( - 85, Math.min( 85, lat ) );
  phi = THREE.Math.degToRad( 90 - lat );
  theta = THREE.Math.degToRad( lon );
  target.x = 500 * Math.sin( phi ) * Math.cos( theta );
  target.y = 500 * Math.cos( phi );
  target.z = 500 * Math.sin( phi ) * Math.sin( theta );
  SCENE.instance.camera.lookAt( target );
}

SCENE.prototype.SetHudToWorldSpace = function (hudobj,position,clickCallBack,lookAtOnClick) {
  hudobj.update=function () {
    var positioninHud = SCENE.instance.vectorToScreen(position.clone());
    this.element.offset({top:positioninHud.y,left:positioninHud.x});
    this.element.css({position:'fixed'});
    if(this.enabled){
      if(SCENE.instance.chekIfisVisible(position)){
        this.element.show();
      }
      else {
        this.element.hide();
      }
    }
  }

  if(clickCallBack!=undefined){
    hudobj.start= function () {
      this.element.on('mouseover',function () {
        $('html,body').css('cursor','pointer');
      });
      this.element.on('mouseleave',function () {
        $('html,body').css('cursor','default');
      });
      this.element.click(function () {
        if(lookAtOnClick){
          SCENE.instance.SmoothLokAt(position,clickCallBack);
        }
        else {
          clickCallBack();
        }
      })
      console.log('start loaded');
    }
  }
  return hudobj;
};

SCENE.prototype.removeMouseControll = function () {
  $('#hud').off('mouseup mousemove mousedown');
};

SCENE.prototype.CreateImgHud = function (src,width,height) {
  var element = $("<div><img src='"+src+"' class='imgHud' width='"+width+"' height='"+height+"'></img></div>").appendTo('#hud');
  var hudObj = new HUDOBJ(element);
  this.add(hudObj);
  return hudObj;
};

SCENE.prototype.CreateTextHud = function (text) {
  var element = $("<div class='textHud'><i>"+text+"<i/></div>").appendTo('#hud');
  var hudObj = new HUDOBJ(element);
  this.add(hudObj);
  return hudObj;
};

SCENE.prototype.lookAt = function (obj) {
  this.camera.lookAt(obj.position);
};

SCENE.prototype.onWindowResize=function() {
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize( window.innerWidth, window.innerHeight );
}

SCENE.prototype.initi = function (backgroundColor,cameraPosition,cameraRotation,fov) {
  var container = $('#container');
  this.renderer = new THREE.WebGLRenderer({antialias:true});
  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setSize(container.outerWidth(),container.outerHeight());
  container[0].appendChild(this.renderer.domElement);

  this.scene = new THREE.Scene();
  if(backgroundColor!=undefined){
    this.scene.background = new THREE.Color( backgroundColor );
  }

  this.camera = new THREE.PerspectiveCamera(fov ? fov:45,container[0].offsetWidth/container[0].offsetHeight,1,4000);
  if(cameraPosition instanceof THREE.Vector3){
    this.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z);
  }
  else {
    this.camera.position.set(0,0,3);
  }

  if(cameraRotation instanceof THREE.Vector3){
    //this.camera.quaternion.applyQuaternion(cameraRotation);
    console.log(this.camera);
  }
  else {
  }
  //this.camera.quaternion.setFromEuler(new THREE.Euler(-0.5,0.7,0.3));
  this.scene.add(this.camera);

  this.hud=$('#hud');

  window.addEventListener( 'resize', function(){SCENE.instance.onWindowResize();}, false );

  this.ambientlight = new THREE.AmbientLight(0x404040);
  this.scene.add(this.ambientlight);

  this.renderer.autoClear = false;
};

SCENE.prototype.BeginRendering = function () {
  this.run()
  if(this.objects!=undefined && this.objects instanceof Array){
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].start();
    }
  }
  if(this.hudObjs!=undefined && this.hudObjs instanceof Array){
    for (var i = 0; i < this.hudObjs.length; i++) {
      this.hudObjs[i].start();
    }
  }
};

SCENE.prototype.SRecursiveLA = function (position,index,quantite,callback) {
  var lerped = new THREE.Vector3();
  if(index<0.5){
    var projectedPosition = new THREE.Vector3(window.offsetWidth/2,window.offsetHeight/2,-1).unproject(this.camera);
    lerped.lerpVectors(projectedPosition,position,index+quantite);
    this.camera.lookAt(lerped);
    requestAnimationFrame(function() {
      SCENE.instance.SRecursiveLA(position,index+quantite,quantite,callback);
    })
  }
  else {
    if(callback!=undefined){
      callback();
    }
  }
};

SCENE.prototype.SmoothLokAt = function (position,callback) {
  if(position instanceof THREE.Vector3){
    this.SRecursiveLA(position,0,0.01,callback);
  }
  else {
    console.warn('position for SmoothLokAt need to be a Vector3');
  }
};

SCENE.prototype.chekIfisVisible = function (position) {
  var frustum = new THREE.Frustum();
  var cameraViewProjectionMatrix = new THREE.Matrix4();

  // every time the camera or objects change position (or every frame)

  this.camera.updateMatrixWorld(); // make sure the camera matrix is updated
  this.camera.matrixWorldInverse.getInverse( this.camera.matrixWorld );
  cameraViewProjectionMatrix.multiplyMatrices( this.camera.projectionMatrix, this.camera.matrixWorldInverse );
  frustum.setFromMatrix( cameraViewProjectionMatrix );

  // frustum is now ready to check all the objects you need
  if(position instanceof THREE.Vector3){
    return frustum.containsPoint( position );
  }
};

SCENE.prototype.run = function(){
  this.fireRayCasters();
  if(this.objects!=undefined && this.objects instanceof Array){
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update();
    }
  }
  if(this.hudObjs!=undefined && this.hudObjs instanceof Array){
    for (var i = 0; i < this.hudObjs.length; i++) {
      this.hudObjs[i].update();
    }
  }
  this.renderer.clear();
  if(this.devicecontrols!=undefined){
    // this.devicecontrols.update();
  }
  this.renderer.render(this.scene,this.camera);
  if(this.spriteScene!=undefined&&this.spriteCamera!=undefined){
    //this.renderer.clearDepth();
    //this.renderer.render(this.spriteScene,this.spriteCamera);
  }
  requestAnimationFrame(function() {
    if(SCENE.instance.controls instanceof THREE.OrbitControls){
      SCENE.instance.controls.update();
    }
    SCENE.instance.run();
  });
}

Math.degree2rad = function (degree) {
  var radian = (degree*Math.PI)/180;
  //console.log('degree :'+degree+' radian:'+radian);
  return radian;
};

Math.RoundedSin = function (rad) {
  var sin = Math.sin(rad);
  return Math.round(sin*100)/100;
}
Math.RoundedCos = function (rad) {
  var cos = Math.cos(rad);
  console.log(Math.round(cos*10000)/10000);
  return Math.round(cos*100)/100;
}

function SphericalCordinate(colatitude,azimute,dist) {
  this.colatitude=colatitude;
  this.azimute=azimute;
  this.dist=dist;
}

SphericalCordinate.prototype.ToVector3 = function () {
  var x = this.dist*Math.RoundedSin(Math.degree2rad(this.azimute))*Math.RoundedCos(Math.degree2rad(this.colatitude));
  var z = this.dist*Math.RoundedSin(Math.degree2rad(this.azimute))*Math.RoundedSin(Math.degree2rad(this.colatitude));
  var y = this.dist*Math.RoundedCos(Math.degree2rad(this.azimute));
  var posi = new THREE.Vector3(x,y,z);
  console.log(posi);
  return posi;
};
