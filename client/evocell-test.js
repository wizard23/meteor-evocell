var reactor, shaders, dish, rule, palette;
var renderDish;


Meteor.startup(function () {
  init();
});

setRule = function(url) {
  if (!dish) {
    console.log("setRule before init!")
  }
  else {
    var loader = new EvoCell.ResLoader();
    loader.load("rule", url, "ecfile");
    var setupFn = function (data) {
      if (data.rule && data.rule.containsRule) {
        rule = reactor.compileRule(data.rule, dish);
        dish.randomize(data.rule.nrStates, 0.1);
      }
      else {
        console.log("invalid ecfile!")
      }
    }
    loader.start(false, setupFn);
  }
};

/*
function testShader(shader) {
  if (reactor) {
    var gl = reactor.gl;
    gl.useProgram(shader);
    var aTexLoc = gl.getAttribLocation(shader, "aTexCoord");
    if (aTexLoc >= 0) {
      console.log("shader named " + shader.name + " is valid")
      return true;
    }
    else {
      console.log("shader named " + shader.name + " is INVALID :(")
      return false;
    }
  }
  return false;
};
*/

function init() {
  var loader = new EvoCell.ResLoader();

  var usedShaderUrls = ["primitiveRenderer", "clear", "clear2", "primitivePalette", "cameraRenderer", "scroller",
    "drawAll", "mixPalette", "intersectSpawn"];

  for (var i in usedShaderUrls) {
    var key = usedShaderUrls[i];
    var shaderFile = "shaders/" + usedShaderUrls[i] + ".shader";
    loader.load(key, shaderFile, "text");
  }
  //loader.load("fragmentPrimitiveRenderer",  "shaders/primitiveRenderer.shader", "text");
  //loader.load("fragmentClear",              "shaders/clear.shader", "text");
  //loader.load("fragmentPrimitivePalette",   "shaders/primitivePalette.shader", "text");

  //loader.load("rule", "rules/enemy_ludwigBuildships", "ecfile");
  var setupFn = function (data) {

    var width = 400;
    var height = 300;

    var canvas = document.getElementById('c');
    reactor = new EvoCell.Reactor(canvas, width, height);
    reactor.setRenderSize(width, height);

    dish = reactor.compileDish();
    renderDish = reactor.compileDish();
    //var rule = reactor.compileRule(data["rule"], dish);

    shaders = {};
    for (var i in usedShaderUrls) {
      var key = usedShaderUrls[i];
      var src = data[key];
      shaders[key] = reactor.compileShader(src);
      shaders[key].name = key;
    }
    /*
    shaders.primitiveDraw = reactor.compileShader(data.fragmentPrimitiveRenderer);
    shaders.primitiveDraw.name = "primitiveDraw";
    testShader(shaders.primitiveDraw);
    alert(data.fragmentPrimitiveRenderer);

    shaders.clear = reactor.compileShader(data.fragmentClear);
    shaders.clear.name = "clear";
    testShader(shaders.clear);
    alert(data.fragmentClear);

    shaders.simplePalette = reactor.compileShader(data.fragmentPrimitivePalette);
    shaders.simplePalette.name = "simplePalette";
    testShader(shaders.simplePalette);
    */



    palette = new EvoCell.Palette(reactor, [
      [0, 0, 0, 0],
      [140, 10, 140, 255],
      [255, 255, 255, 255],
      [255, 30, 255, 255],
      [255, 110, 255, 255]
    ]);
    setRule("rules/GameOfLife");



    // animation
    var mainLoop = new Utils.AnimationLoop(10, function() {
      if (rule) {
        reactor.step(rule, dish);
        //reactor.paintDish(shaders.mix, dish, dish, {texPalette: palette.getTexture()});

        //reactor.step(rule, renderDish);

        //reactor.mixDish(shaders.clear, renderDish, {color: [0, 0, 0, 255]});
      }
      //reactor.paintDish(shaders.palette, renderDish, renderDish, {texNew: dish, texPalette: palette.getTexture()});

      //reactor.paintDish(shaders.primitiveDraw, dish, dish, {texPalette: palette.getTexture()});

      reactor.paintDish(shaders.primitivePalette, dish, dish);
    });
    mainLoop.start();
  };

  loader.start(false, setupFn);
}