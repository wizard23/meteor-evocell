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
    template: 'rulesList'
  });
  this.route('ruleFilesList', {
    path: '/ruleFilesList',
    template: 'ruleFilesList'
  });
});