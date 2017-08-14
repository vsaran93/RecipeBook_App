Recipes = new Mongo.Collection('recipes');

Recipes.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	update: function(userId, doc){
		return !!userId;
	}
});

Ingredient = new SimpleSchema({
	name: {
		type: String
	},
	amount: {
		type: String
	}
});

RecipeSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	desc: {
		type: String,
		label: "Description"
	},
	// author: {
	// 	type: String,
	// 	label:"Author",
	// 	autoValue: function(){
	// 		return Meteor.userId();
	// 	},
	// 	autoform: {
	// 		type: "hidden"
	// 	}
	// },
	// createdAt: {
	// 	type: String,
	// 	label: "CreatedAt",
	// 	autoValue: function(){
	// 		return new Date()
	// 	},
	// 	autoform: {
	// 		type: "hidden"
	// 	}
	// }
	ingredients: {
		type: [Ingredient]
	},
	inMenu: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function() {
			if (this.isInsert) {
				if (! this.isFromTrustedCode) {
					return this.userId;
				}
			} else {
				this.unset();
			}
		},
		autoform: {
			type: "hidden"
		}

	}
});

Meteor.methods({
	toggleMenuItem: function(id, currentState){
		Recipes.update(id, {
			$set: {
				inMenu: !currentState
			}
		});
	},
	deleteRecipe: function(id){
		Recipes.remove(id);
	}
});

Recipes.attachSchema( RecipeSchema );


