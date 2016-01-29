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
			if($scope.tags.length>1){
				$(".err-div").css("display","none"); //Hides error message if number of tags selected is greater than 2
			}
		}
		//console.log($scope.tags);
	}

});


$(function() {
	$("#email-input").change(function(){
		validateSubscribeEmail();
	});

	$('#mc-embedded-subscribe-form').submit(function() {
        // DO STUFF
        console.log("submit");
        var correctForm = true;

        if(!validateNumberOfTags()){
        	$(".err-div").css("display","block");
        	correctForm = correctForm&&false;
        }

        if(!validateSubscribeEmail()){
        	correctForm = correctForm&&false;
        }
        
        return correctForm; // return false to cancel form action
    });
});

//Validates if the subscribe email input is correct
function validateSubscribeEmail(){
	var validate = validateEmail($("#email-input").val());
	if(!validate){
		$("#email-input").addClass("invalid");
		$(".input-div span").css("opacity","1");	
	}else{
		$("#email-input").removeClass("invalid");
		$(".input-div span").css("opacity","0");
	}
	return validate;
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);

}

function validateNumberOfTags(){
	var controllerElement = document.querySelector('body');
	var controllerScope = angular.element(controllerElement).scope();
	if(controllerScope.tags.length<2){
		return false;
	}else{
		return true;
	}
}



