Template.ruleFileAdd.events({
  'submit form': function(event, template) {
    console.log("submited");
    event.preventDefault();
    event.stopPropagation();
  },

  'change': function(event, template) {
    console.log("change event");
    FS.Utility.eachFile(event, function(file) {
      console.log("file handling: " + file);
      RuleFiles.insert(file, function (err, fileObj) {
        //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      });
    });
  }
});


Template.ruleFilesList.helpers({
  rules: function () {
    //return RuleFiles.find();
    return RuleFiles.find();
  }
});


Template.ruleFileItem.events = {
  'click': function() {
    Session.set("activeRuleFileId", this._id);
    //alert(this.getFileRecord());
  }
};


Template.ruleFileItem.helpers({
  maybe_selected: function () {
    return Session.equals("activeRuleFileId", this._id) ? "selected" : "";
  },

  debugtst: function() {
    var str = "";
    for (var key in this) {
      str += "K: " + key + "/";
    }
    str = this.url();
    return str;
  }
});

Meteor.startup(function () {
  Tracker.autorun(function () {
    //alert(Session.get("activeRuleId"));
    var activeRule = RuleFiles.findOne({_id: Session.get("activeRuleFileId")});
    if (activeRule)
      setRule(activeRule.url());
  })
});