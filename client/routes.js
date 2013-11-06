Meteor.Router.add({
	'/': function() {
		return "home";
	}
	, "*": function() {
		return "404";
	}
});