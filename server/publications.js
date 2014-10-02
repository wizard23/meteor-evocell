Meteor.publish('ruleFiles', function() {
  return RuleFiles.find();
});

Meteor.publish('rules', function() {
  return Rules.find();
});