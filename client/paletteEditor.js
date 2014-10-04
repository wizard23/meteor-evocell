Template.palettesList.helpers({
  palettes: function () {
    return Palettes.find();
  },
});

Template.paletteItem.helpers({
  colorItems: function() {
    return _.map(this.colors, function(value, index){
      return {color: value, index: index};
    });
  },
});

/*
function getContrastColor(c) {
  var rgb = c.rgb();
  var rgbContrast = _.map(rgb, function(v) {
    return v < 128 ? 255 : 0;
  });
  return chroma(rgbContrast);
}
*/

function getContrastColor(c) {
  var rgb = c.rgb();
  var s = _.reduce(rgb, function(m, v) {
    return m + v;
  }, 0);

  if (s < 128*3) {
    return chroma([255, 255, 255])
  }
  return chroma([0, 0, 0]);
}

function getContrastColor2(c) {
  try {
    var hsv = c.hsl();
    var v = hsv[2];

    if (v < 0.5) {
      return chroma([255, 255, 255])
    }
    return chroma([0, 0, 0]);
  }
  catch (ex) {
    return
  }
}
var cWhite = chroma([255, 255, 255]);
var cBlack = chroma([0, 0, 0]);

var cGreen = chroma([0, 255, 0]);
var cMagenta = chroma([0, 255, 255]);

function parseColor(array) {
  try {
    return chroma(array);
  }
  catch (ex) {
    return cGreen;
  }
}

function getContrastColor3(c) {
  try {
    var cW = chroma.contrast(c, cWhite);
    var cB = chroma.contrast(c, cBlack);

    if (cW <= cB) return cBlack;
    else return cWhite;
  }
  catch (ex) {
    return cMagenta;
  }
}

Template.paletteItemEntry.helpers({
  htmlColor: function () {
    return parseColor(this.color).hex();
  },

  contrastColor: function () {
    return getContrastColor3(parseColor(this.color)).hex();
  }
});