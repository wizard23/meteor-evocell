Template.ruleAdd.events({
  'submit form': function(event) {
    console.log("submited");
    event.preventDefault();
    event.stopPropagation();
  }
});