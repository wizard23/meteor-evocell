Meteor.publish('ruleFiles', function() {
  return RuleFiles.find();
});

Meteor.publish('rules', function() {
  return Rules.find();
});

Meteor.publish('palettes', function() {
  return Palettes.find();
});