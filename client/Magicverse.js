if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);
  Session.setDefault("activeRuleId", "");

  Template.rulesList.helpers({
    rules: function () {
      return Rules.find();
    }
  });

  Template.rulesList.events = {
    'click': function() {
      Session.set("activeRuleId", this._id);
    }
  };


  Template.ruleItem.helpers({
    maybe_selected: function () {
      return Session.equals("activeRuleId", this._id) ? "selected" : "";
    }
  });

  Meteor.startup(function () {
    Tracker.autorun(function () {
      //alert(Session.get("activeRuleId"));
      var activeRule = Rules.findOne({_id: Session.get("activeRuleId")});
      if (activeRule)
        setRule(activeRule.url);
    })
  });
}