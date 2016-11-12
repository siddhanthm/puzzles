var puzzleControllers = angular.module('puzzleControllers', ['720kb.datepicker']);

<<<<<<< 11e633d9b88b7295eca77c9f0a4cd36ad1103bde
puzzleControllers.controller('homeCtrl', ['$scope', '$http',  '$window' ,'$location','$anchorScroll' ,function($scope, $http,  $window,$location,$anchorScroll) {
	console.log("Do nothing");
}]);

puzzleControllers.controller('portfolioCtrl', ['$scope', '$http',  '$window' ,'$location','$anchorScroll' ,function($scope, $http,  $window,$location,$anchorScroll) {

	// Get sample data
	$http.get("./data/data.json").success(function(data){
		$scope.data = data;
		console.log(data);

		$scope.skills = list_format($scope.data["skills"]);
		$scope.education = $scope.data["education"][0]
		$scope.courses = list_format($scope.data["education"][0]["courses"])
		$scope.internship = $scope.data["internship"];
		$scope.project = $scope.data["projects"];
		console.log($scope.project);
	});


	var list_format = function(lists){
		var data = ""
		for(list in lists){
			data +=lists[list] + " , ";
		}
		return data.substring(0, data.length - 3) + ".";
	}
=======
var localData = {};
var jsonData;

puzzleControllers.controller('homeCtrl', ['$scope', '$http',  '$window' ,'$location','$anchorScroll' ,function($scope, $http,  $window,$location,$anchorScroll) {
	console.log("Do nothing");
>>>>>>> Week 2
}]);

puzzleControllers.controller('portfolioCtrl', ['$scope', '$http',  '$window' ,'$location','$anchorScroll' ,function($scope, $http,  $window,$location,$anchorScroll) {
	/**
	 * Takes in list and convert it into the a string with comma seperated values
	 * @param {list} lists
	 * @return {string} String with comma seperated values
	 */
	var listFormat = function(lists){
		var data = ""
		for(list in lists){
			data +=lists[list] + " , ";
		}
		return data.substring(0, data.length - 3) + ".";
	}
	/**
	 * Extract the information from the JSON file
	 */
	if(jsonData == undefined){
		$http.get("./data/data.json").success(function(data){
			$scope.data = data;
			$scope.skills = listFormat($scope.data["skills"]);
			$scope.education = $scope.data["education"][0];
			$scope.courses = listFormat($scope.data["education"][0]["courses"]);
			$scope.internship = $scope.data["internship"];
			$scope.project = $scope.data["projects"];
		});
	}else{
		$scope.data = JSON.parse(jsonData);
		console.log("Here", $scope.data);
		$scope.skills = listFormat($scope.data["skills"]);
		$scope.education = $scope.data["education"];
		$scope.courses = listFormat($scope.data["education"]["courses"]);
		$scope.internship = $scope.data["internship"];
		$scope.project = $scope.data["projects"];
	}
	/**
	 * Random Image Selector for Work Experience Section
	 */
	var number = Math.floor((Math.random()*6) + 1);
    if(number ==1){
    	$(".pExp").css({"background-image": "url('./data/images/one.jpg')"});
    }else if(number ==2){
    	$(".pExp").css({"background-image": "url('./data/images/two.jpg')"});
    }else if(number == 3){
    	$(".pExp").css({"background-image": "url('./data/images/three.jpg')"});
    }else if(number ==4){
    	$(".pExp").css({"background-image": "url('./data/images/four.jpg')"});
    }else{
    	$(".pExp").css({"background-image": "url('./data/images/five.jpg')"});
    }
}]);


puzzleControllers.controller('addUserCtrl', ['$scope', '$http',  '$window' ,'$location','$anchorScroll' ,function($scope, $http,  $window,$location,$anchorScroll) {

	/**
	 * Takes in string with comma seperated value and extracts the information on 
	 * @param {String} courses_data
	 * @return {list} courses_list
	 */
	var formatCSV = function(courses_data){
		if(courses_data == undefined){
			return courses_data;
		}
		var courses_list = courses_data.split(",");
		return courses_list;
	}

	/**
	 * Takes in the unprocessed internship data from the front-end and extracts only the required information
	 * @param {list} unprocessed_internship_data
	 * @return {list} processed_data
	 */
	var extractInternshipData = function(unprocessed_internship_data){
		var processed_data = []
		for(internship in unprocessed_internship_data){
			var temp_data = {};
			temp_data.company = unprocessed_internship_data[internship].name;
			temp_data.description = unprocessed_internship_data[internship].description;
			temp_data.startDate = unprocessed_internship_data[internship].startDate;
			temp_data.endDate = unprocessed_internship_data[internship].endDate;
			processed_data.push(temp_data);
		}
		return processed_data;
	}

	/**
	 * Takes in the unprocessed project data from the front-end and extracts only the required information
	 * @param {list} unprocessed_project_data
	 * @return {list} processed_data
	 */
	var extractProjectData = function(unprocessed_project_data){
		var processed_data = []
		for(project in unprocessed_project_data){
			var temp_data = {};
			temp_data.name = unprocessed_project_data[project].name;
			temp_data.description = unprocessed_project_data[project].description;
			temp_data.github = unprocessed_project_data[project].github;
			processed_data.push(temp_data);
		}
		return processed_data;
	}

	$scope.internshipChoices = []; 
	$scope.projectChoices = [];

	/**
	 * Function dynamically adds another entry to add internship information
	 */
	$scope.addNewChoice = function(){
		var newItemNo = $scope.internshipChoices.length+1;
    	$scope.internshipChoices.push({'id':'choice'+newItemNo});
	}

	/**
	 * Function dynamically adds another entry to add project information
	 */
	$scope.addNewChoiceProject = function(){
		var newItemNo = $scope.projectChoices.length+1;
    	$scope.projectChoices.push({'id':'choice'+newItemNo});
	}

	/**
	 * Saves the information from the front end and saves it into the data object.
	 * Navigates to the next form
	 */
	$scope.registerBasic = function(){
		localData.name = $scope.name;
		localData.emailid = $scope.email;
		localData.phonenumber = $scope.phonenumber;
		localData.github = $scope.github;
		localData.linkedin = $scope.linkedin;
		localData.skills = formatCSV($scope.skills);
		console.log(localData);
		$location.path('/add/education');
	}

	/**
	 * Saves the information from the front end and saves it into the data object.
	 * Navigates to the next form
	 */
	$scope.registerEducation = function(){
		localData.education = {};
		localData.education.name = $scope.name;
		localData.education.major = $scope.major;
		localData.education.startDate = $scope.startDate;
		localData.education.endDate = $scope.graduationDate;
		localData.education.CGPA = $scope.cgpa;
		localData.education.courses = formatCSV($scope.courses)
		console.log(localData);
		$location.path('/add/internship');
	}

	/**
	 * Saves the information from the front end and saves it into the data object.
	 * Navigates to the next form
	 */
	$scope.registerInternship = function(){
		localData.internship = extractInternshipData($scope.internshipChoices);
		console.log(localData);
		$location.path('/add/projects');
	}

	/**
	 * Saves the information from the front end and saves it into the data object.
	 * Navigates to the next form
	 */
	$scope.registerProjects = function(){
		localData.projects = extractProjectData($scope.projectChoices);
		jsonData = JSON.stringify(localData);
		var data2send = {
			"emailid" : localData.emailid,
			"data" : jsonData
		};

		// Send the data to the backend
		$http({
			method  : 'POST',
			url     : "http://localhost:3000/api/users/",
			data    : $.param(data2send), //forms user object
			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		}).success(function(data){
			$location.path('/portfolio');
		}).error(function(){
			$scope.msg = "Couldn't post data";
			console.log("Error");
		});
	}

	/**
	 * Discards any saved information on the form. 
	 * Navigates to the home page
	 */
	$scope.discardData = function(){
		localData = {}
		$location.path("/");
	}

}]);
