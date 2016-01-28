var newsletterapp = angular.module('newsletter',[]);

newsletterapp
.controller('mainController',function($scope){
	$scope.tags = [];
	$scope.clickTag = function($event){
		var tag = angular.element($event.currentTarget);
		if(tag.hasClass("active")){
			tag.removeClass("active");
			$scope.tags = jQuery.grep($scope.tags, function(value){ //Removes tag from array
				return value != tag.text().trim();
			});
		}else{
			tag.addClass("active");
			$scope.tags.push(tag.text().trim()); //Adds tag to array
		}
		//console.log($scope.tags);
	}

});