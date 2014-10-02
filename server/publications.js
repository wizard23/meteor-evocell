Meteor.publish('ruleFiles', function() {
  return RuleFiles.find();
});