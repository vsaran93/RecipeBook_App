if(Meteor.isClient){

Accounts.onLogin(function(){
	FlowRouter.go('/recipe-book');
});

Accounts.onLogout(function(){
	FlowRouter.go('/');
});

}


FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()){
		FlowRouter.go('/');
	}
}]);

FlowRouter.route('/', {
	action: function(){
		if(Meteor.userId()){
			FlowRouter.go('/recipe-book');
		}
		console.log("home router");
		BlazeLayout.render("HomeLayout");
	}
});

FlowRouter.route('/recipe-book',{
	action: function(){
		BlazeLayout.render("MainLayout" ,{main: 'Recipes'});
	}
});

FlowRouter.route('/recipe/:_id',{
	action: function(){
		BlazeLayout.render("MainLayout" ,{main: 'RecipeSingle'});
	}
});

FlowRouter.route('/menu',{
	action: function(){
		BlazeLayout.render("MainLayout" ,{main: 'Menu'});
	}
});

FlowRouter.route('/shopping-list',{
	action: function(){
		BlazeLayout.render("MainLayout" ,{main: 'ShoppingList'});
	}
});