var camera, scene, renderer;
var mesh;

Meteor.startup(function () {
  //alert(EvoCell);

  var loader = new EvoCell.ResLoader();
  loader.load("vertexPrimitive", "shaders/primitive.vshader", "text");
  loader.load("fragmentPrimitiveRenderer",  "shaders/primitiveRenderer.shader", "text");
  loader.load("fragmentClear",              "shaders/clear.shader", "text");
  loader.load("fragmentPrimitivePalette",   "shaders/primitivePalette.shader", "text");

  loader.load("rule", "rules/enemy_ludwigBuildships", "text");

  loader.load("rule", "rules/enemy_ludwigBuildships", "ecfile");
  var setupFn = function (data) {

    var canvas = document.getElementById('c');
    var reactor = new EvoCell.Reactor(canvas, 300, 500);

    var dish = reactor.compileDish();
    var rule = reactor.compileRule(data["rule"], dish);

    var shaders = {};
    shaders.primitiveDraw = reactor.compileShader(data.fragmentPrimitiveRenderer);
    shaders.clear = reactor.compileShader(data.fragmentClear);
    shaders.mix = reactor.compileShader(data.fragmentPrimitivePalette);

    var palette = new EvoCell.Palette(reactor, [
      [0, 0, 0, 0],
      [140, 10, 140, 255],
      [255, 255, 255, 255],
      [255, 30, 255, 255],
      [255, 110, 255, 255]
    ]);

    dish.randomize(4, 0.1);

    reactor.paintDish(shaders.mix, dish, dish);


  }

  loader.start(false, setupFn);


  //init();
  //animate();
});


function init() {
  renderer = new THREE.WebGLRenderer({canvas: document.getElementById("c")});
  renderer.setSize(window.innerWidth, window.innerHeight);
  //document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;

  scene = new THREE.Scene();

  var geometry = new THREE.BoxGeometry(200, 200, 200);

  var texture = THREE.ImageUtils.loadTexture('textures/crate.gif');
  texture.anisotropy = renderer.getMaxAnisotropy();

  var material = new THREE.MeshBasicMaterial({ map: texture });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

  requestAnimationFrame(animate);

  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);

}