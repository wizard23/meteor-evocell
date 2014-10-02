var reactor, shaders, dish, rule, palette;


Meteor.startup(function () {
  init();
});

setRule = function(url) {
  var loader = new EvoCell.ResLoader();
   loader.load("rule", url, "ecfile");
  var setupFn = function (data) {
    rule = reactor.compileRule(data.rule, dish);
    dish.randomize(data.rule.nrStates, 0.1);
  }
  loader.start(false, setupFn);
};

function init() {
  var loader = new EvoCell.ResLoader();
  loader.load("vertexPrimitive", "shaders/primitive.vshader", "text");
  loader.load("fragmentPrimitiveRenderer",  "shaders/primitiveRenderer.shader", "text");
  loader.load("fragmentClear",              "shaders/clear.shader", "text");
  loader.load("fragmentPrimitivePalette",   "shaders/primitivePalette.shader", "text");

  //loader.load("rule", "rules/enemy_ludwigBuildships", "ecfile");
  var setupFn = function (data) {

    var width = 400;
    var height = 300;

    var canvas = document.getElementById('c');
    reactor = new EvoCell.Reactor(canvas, width, height);
    reactor.setRenderSize(width, height);


    dish = reactor.compileDish();
    //var rule = reactor.compileRule(data["rule"], dish);

    shaders = {};
    shaders.primitiveDraw = reactor.compileShader(data.fragmentPrimitiveRenderer);
    shaders.clear = reactor.compileShader(data.fragmentClear);
    shaders.mix = reactor.compileShader(data.fragmentPrimitivePalette);

    palette = new EvoCell.Palette(reactor, [
      [0, 0, 0, 0],
      [140, 10, 140, 255],
      [255, 255, 255, 255],
      [255, 30, 255, 255],
      [255, 110, 255, 255]
    ]);

    setRule("rules/GameOfLife");

    // single frame
    reactor.paintDish(shaders.mix, dish, dish);

    // animation
    var mainLoop = new Utils.AnimationLoop(0, function() {
      if (rule)
        reactor.step(rule, dish);
      reactor.paintDish(shaders.mix, dish, dish);
    });
    mainLoop.start();
  }

  loader.start(false, setupFn);
}