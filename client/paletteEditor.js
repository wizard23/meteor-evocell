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

Template.paletteItemEntry.helpers({
  htmlColor: function () {
    return chroma(this.color).hex();
  }
});