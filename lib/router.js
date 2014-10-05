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

  //this.route('palettePageNew')

  this.route('palettePage', {
    path: '/palettePage/:_id',
    template: 'palettePage',
    data: function() {
      if (this.params._id) {
        var item = Palettes.findOne(this.params._id);
        if (item)
          return item;
      }

      return {name:"new", colors:[[0,0,0,255]], _id:"new"};
    }
  });
});