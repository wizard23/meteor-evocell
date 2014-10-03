Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {

  this.route('laboratory', {
    path: '/laboratory',
    template: 'laboratory'
  });
  this.route('rulesList', {
    path: '/rulesList',
    templatge: 'rulesList'
  });
  this.route('ruleFilesList', {
    path: '/ruleFilesList',
    template: 'ruleFilesList'
  });


  this.route('palettesList', {
    path: '/palettesList',
    template: 'palettesList'
  });

  this.route('palettePage', {
    path: '/palettePage:_id',
    template: 'PalettePage',
    data: function() {
      return Palettes.findOne(this.params._id);
    }
  });
});