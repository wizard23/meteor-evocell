Rules = new Mongo.Collection('rules');

RuleFiles = new FS.Collection('RuleFiles', {
  stores: [new FS.Store.FileSystem("rules", {path: "~/uploads"})]
});