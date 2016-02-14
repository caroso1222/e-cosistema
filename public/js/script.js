var newsletterapp = angular.module('newsletter',[]);

newsletterapp
.controller('mainController',function($scope){
	$scope.alltags = [];
	$scope.alltags.names = ['STARTUPS','CALLS','ACCELERATO','COWORKING','INVESTORS','MEETUPS','BLOGS','FOUNDATION','GOVERNMENT','CROWDFUNDI','INNOVATION']; 
	$scope.alltags.labels = ['Emprendimientos','Convocatorias','Aceleradoras','Coworking spaces','Inversionistas','Meetups','Blogs','Fundaciones','Gobierno','Crowdfundings','Centros de innovación']; 
	$scope.tags = [];

	//Adds fields to url to post to mailchimp
	var oldurl = $("#mc-embedded-subscribe-form").attr('action');
	for(i = 0; i< $scope.alltags.names.length; i++){
		oldurl = oldurl + "&"+$scope.alltags.names[i] + "=No";
	}
	$("#mc-embedded-subscribe-form").attr('action',oldurl);


	$scope.clickTag = function($event){
		var tag = angular.element($event.currentTarget);
		if(tag.hasClass("active")){
			tag.removeClass("active");
			$scope.tags = jQuery.grep($scope.tags, function(value){ //Removes tag from array
				return value != tag.text().trim();
			});
			updateUrl(tag.attr('tag-name'),"No"); //Puts 'no' to tag in form url
		}else{
			tag.addClass("active");
			$scope.tags.push(tag.text().trim()); //Adds tag to array
			if($scope.tags.length>1){
				$(".err-div").css("display","none"); //Hides error message if number of tags selected is greater than 2
			};
			updateUrl(tag.attr('tag-name'),"Si"); //Puts 'no' to tag in form url
		}
		//console.log($scope.tags);
	}

	function updateUrl(changed,action){ //action = No, action = Si
		console.log(changed);
		var url = $("#mc-embedded-subscribe-form").attr('action');
		var urlparts = url.split(changed);
		urlparts[1] = urlparts[1].replaceAt(1,action.charAt(0)); //Change Si for No, or viceversa
		urlparts[1] = urlparts[1].replaceAt(2,action.charAt(1));
		url = urlparts[0]+changed+urlparts[1];
		$("#mc-embedded-subscribe-form").attr('action',url);
		console.log(url);
	}

	String.prototype.replaceAt=function(index, character) { //Function that replaces character in string
		return this.substr(0, index) + character + this.substr(index+character.length);
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
		//$(".input-div span").css("opacity","1");	
		$(".email-span span").css("opacity","1");	
	}else{
		$("#email-input").removeClass("invalid");
		//$(".input-div span").css("opacity","0");
		$(".email-span span").css("opacity","0");	
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

$(window).load(function() {
  $('select').niceSelect();
});

$("#go-down").click(function(event){
  goToID("suscribe-form",event);
});


function goToID(id,event){
  event.preventDefault();
  $('html,body').animate({
    scrollTop: $("#"+id).offset().top
  },1500
  );
}
