var reactor, shaders, dish, rule, palette;
var renderDish;


Meteor.startup(function () {
  init();
});

setRule = function(url) {
  if (!reactor || !dish) {
    console.log("setRule before init!")
  }
  else {
    var loader = new EvoCell.ResLoader();
    loader.load("rule", url, "ecfile");
    var setupFn = function (data) {
      if (data.rule && data.rule.containsRule) {
        rule = reactor.compileRule(data.rule);
        dish.randomize(data.rule.nrStates, 0.1);
      }
      else {
        console.log("invalid ecfile!")
      }
    }
    loader.start(false, setupFn);
  }
};

function init() {
  var loader = new EvoCell.ResLoader();

  var usedShaderUrls = ["primitiveRenderer", "clear", "primitivePalette", "cameraRenderer", "scroller",
    "drawAll", "mixPalette", "intersectSpawn"];

  for (var i in usedShaderUrls) {
    var key = usedShaderUrls[i];
    var shaderFile = "shaders/" + usedShaderUrls[i] + ".shader";
    loader.load(key, shaderFile, "text");
  }

  var setupFn = function (data) {
    var width = 700;
    var height = 300;

    var canvas = document.getElementById('c');
    reactor = new EvoCell.Reactor(canvas, width, height);
    reactor.setRenderSize(width, height);

    dish = reactor.compileDish();
    renderDish = reactor.compileDish();
    renderDish.randomize(4, 0.3);

    shaders = {};
    for (var i in usedShaderUrls) {
      var key = usedShaderUrls[i];
      var src = data[key];
      var shader  = reactor.compileShader(src);
      if (shader) {
        shader.name = key;
        shaders[key] = shader;
      }
      else
      {
        console.log("could not load shader: " + key);
      }
    }



    palette = new EvoCell.Palette(reactor, [
      [0, 0, 0, 0],
      [140, 10, 140, 255],
      [255, 255, 255, 255],
      [255, 30, 255, 255],
      [255, 110, 255, 255],
      [0, 255, 0, 255],
    ]);
    setRule("rules/GameOfLife");



    // animation
    var mainLoop = new Utils.AnimationLoop(10, function() {
      if (rule) {
        reactor.step(rule, dish);
        //reactor.paintDish(shaders.mix, dish, dish, {texPalette: palette.getTexture()});

        //reactor.step(rule, renderDish);

        //
      }
      reactor.mixDish(shaders.clear, renderDish, {color: [0, 0, 0, 0]});
      reactor.mixDish(shaders.mixPalette, renderDish, {texNew: dish, texPalette: palette.getTexture()});

      reactor.paintDish(shaders.primitiveRenderer, renderDish, renderDish);

      //reactor.paintDish(shaders.primitivePalette, dish, dish);
      //reactor.paintDish(shaders.primitivePalette, renderDish, renderDish);
    });
    mainLoop.start();
  };

  loader.start(false, setupFn);
}