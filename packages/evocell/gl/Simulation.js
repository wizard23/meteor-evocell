Simulation = (function(_, Reactor){
  var Simulation = function(reactor, options) {
    this.reactor = reactor;

    this.dishes = {};
    this.rules = {};
    this.palettes = {};

    if (options.dishes) {
      this.addDishes(option.dishes);
    }
    if (options.rules) {
      this.addRules(option.rules)
    }
  }

  Simulation.prototype = {
    addDishes: function(dishNames) {
      _.each(dishNames, function(dishName) {
        var dish = Reactor.compileDish()
        this.dishes[dishName] = dish;
      });
    },

    addRules: function(ruleRequests) {
      var loader = new EvoCell.ResLoader();
      _.each(ruleRequests, function (url, name) {
        loader.load(name, url, "ecfile");
      });

      var setupFn = function (data) {
        _.each(ruleRequests, function (url, name) {
          if (data.rule && data.rule.containsRule) {
            var rule = reactor.compileRule(data.rule);
            this.rules[name] = rule;
          }
          else {
            console.log("Could not load rule: " + name + " invalid ecfile! " + url);
          }
        });
      };
      loader.start(false, setupFn);
    },

    step: function(dish, rule) {
      if (this.dishes.contains(dish)) {
        dish = this.dishes[dish];
      }
    },

    renderOnCanvas: function(dishName) {

    },
  };
})(_, Reactor);