Template.RecipeSingle.onCreated(function(){
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('_id');
		self.subscribe('singleRecipe', id);
	});

});

Template.RecipeSingle.helpers({
	recipe: ()=> {
		var id = FlowRouter.getParam('_id');
		return Recipes.findOne({_id: id});
	}
});