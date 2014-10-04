Meteor.publish('ruleFiles', function() {
  return RuleFiles.find();
});

Meteor.publish('rules', function() {
  return Rules.find();
});

Meteor.publish('palettes', function() {
  return Palettes.find();
});

/*Meteor.publish('RuleFiles', function() {
  return Palettes.find();
});*/