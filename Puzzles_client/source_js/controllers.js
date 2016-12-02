var puzzleControllers = angular.module('puzzleControllers', ['720kb.datepicker']);

var localData = {};
var userData = {};
var baseURL = "http://localhost:3000/api/users";
var passwordURL = "http://localhost:3000/api/password";
var loggedInUser = "";

var editData = {};

puzzleControllers.controller('homeCtrl', ['$scope', '$http',  '$window' ,'$location' ,function($scope, $http,$window,$location) {
	/**
	*Checks if the user is logged in or not and displays the home buttons accordingly.
	*/
	if(loggedInUser == ""){
		$scope.msg1 = "Join";
		$scope.msg2 = "Log In";
	}
	else {
		$scope.msg1 = "View Profile";
		$scope.msg2 = "Logout";
	}

	/**
	*Checks if the user is logged in or not and decides the path accordingly.
	*/
	$scope.decidePath1 = function(){
		if($scope.msg1 == "Join")
			$location.path("/signup");
		else if($scope.msg1 == "View Profile")
			$location.path("/portfolio/" + loggedInUser);
	}
	$scope.decidePath2 = function(){
		if($scope.msg2 == "Log In")
			$location.path("/login");
		else if($scope.msg2 == "Logout") {
			loggedInUser = "";
			$scope.msg1 = "Join";
			$scope.msg2 = "Log In";
		}
	}
}]);
puzzleControllers.controller('loginCtrl', ['$scope', '$http',  '$window' ,'$location' ,function($scope, $http,$window,$location) {
	/**
	*Checks if the username/password combination exist or not and proceeds accordingly.
	*/
	$scope.login = function(){
		var whereQuery = "?where={'username':'" + $scope.username + "'}";
		var selectQuery = '&&select={_id:1}';
		var urlToGet = baseURL + whereQuery + selectQuery;
		$http.get(urlToGet).success(function(apiData){
			if(apiData.data.length == 0){
				$scope.err = "Username/Password doesn't exist!";
			}else{
				var data2send = {
					"id":apiData.data[0]._id,
					"password": $scope.password
				}
				$http({
					method  : 'POST',
					url     : passwordURL,
					data    : $.param(data2send), 
					headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
				}).success(function(data){
					if(data.enter == true){
						loggedInUser = $scope.username;
						$location.path("/portfolio/" + $scope.username);
					}else{
						$scope.err = "Username/Password doesn't exist!";
					}
				}).error(function(){
					$scope.message = "Couldn't post data";
				});			
			}
		});
	}
}]);

puzzleControllers.controller('signUpCtrl', ['$scope', '$http',  '$window' ,'$location' ,function($scope, $http,$window,$location) {
	/**
	 * Checks if the emailid is unique.
	 * @param {list} users
	 * @return {boolean} true if unique 
	 */
	var checkUniqueEmail = function(users){
		for(user in users){
			if($scope.email == users[user].emailid)
				return false;
		}
		return true;
	}

	/**
	 * Checks if the username is unique.
	 * @param {list} users
	 * @return {boolean} true if unique 
	 */
	var checkUniqueUsername = function(users){
		for(user in users){
			if($scope.username == users[user].username){
				return false;
			}
		}
		return true;
	}

	$(".sign-up").click(function(){
		submitSignUp();
	});
	var select = '?select={emailid:1,username:1}';
	var urlToCall = baseURL + select;
	var users;
	$http.get(urlToCall).success(function(apiUsers){
		users = apiUsers.data;
	});

	/**
	*Checks the aunthenticity of username,password and email and proceeds accordingly.
	*/
	var submitSignUp = function(){
		if(checkUniqueEmail(users) && checkUniqueUsername(users)){
			userData.email = $scope.email;
			userData.username = $scope.username;
			userData.password = $scope.password;
			$location.path('/add/basic');

		}
		else if(!checkUniqueEmail(users)){
			$scope.msg = "Email already exists";
		}else{
			$scope.msg = "Username already exists";
		}
		$scope.$apply();
	}

}]);

puzzleControllers.controller('portfolioCtrl', ['$scope', '$http',  '$window' ,'$location','$anchorScroll', '$routeParams' ,function($scope, $http,  $window,$location,$anchorScroll, $routeParams) {
	/**
	*Checks if the user is logged in or not and sets the buttons accordingly.
	*/
	$scope.logged = "";
	if(loggedInUser != "") 
		$scope.logged = "Log Out";
	else if(loggedInUser == "") 
		$scope.logged = "Get Started";
	
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
	if($routeParams.id == "sample"){
		$http.get("./data/data.json").success(function(data){
			$scope.data = data;
			$scope.skills = listFormat($scope.data["skills"]);
			$scope.education = $scope.data["education"][0];
			$scope.courses = listFormat($scope.data["education"][0]["courses"]);
			$scope.internship = $scope.data["internship"];
			$scope.project = $scope.data["projects"];
			$scope.showOneI = true;
			$scope.showTwoI = true;
			$scope.showThreeI = true;
			$scope.showOneP = true;
			$scope.showTwoP = true;
			$scope.showThreeP = true;
			$scope.ifSample = true;
		});
	}
	else
	{
		/**
		*Sets myPage to true if you are viewing your own portfolio.
		*/
		if($routeParams.id == loggedInUser) {
			$scope.myPage = true;
			$scope.ifSample = true;
		}
		
		var whereQuery = "?where={'username':'" + $routeParams.id + "'}";
		var urlToGet = baseURL + whereQuery;
		$http.get(urlToGet).success(function(apiData){
			if(apiData.data.length == 0){
				$scope.error = "User does not exist :(";
				$location.path("/baduser");
			}else{
				$scope.userID = apiData.data[0]._id;
				$scope.data = JSON.parse(apiData.data[0].data);
				$scope.skills = listFormat($scope.data["skills"]);
				$scope.education = $scope.data["education"];
				$scope.courses = listFormat($scope.data["education"]["courses"]);
				$scope.internship = $scope.data["internship"];
				$scope.project = $scope.data["projects"];

				/**
				*Sets hideLinkedin and hideGithub to true if the fields are left empty by the user. 
				*/
				if($scope.data["linkedin"] == undefined)
					$scope.hideLinkedin = true;
				if($scope.data["github"] == undefined)
					$scope.hideGithub = true;

				/**
				*Makes the front-end scalable for upto 3 internships/projects. 
				*/
				if($scope.internship.length == 0)
					$scope.hideInternship = true;
				else if($scope.internship.length == 1) {
					$scope.showOneI = true;
					document.getElementsByClassName("exp-box")[0].style.marginLeft = "100%";
				}
				else if($scope.internship.length == 2) {
					$scope.showOneI = true;
					$scope.showTwoI = true;
					document.getElementsByClassName("exp-outerbox")[0].style.marginLeft = "22%";
				}
				else if($scope.internship.length == 3) {
					$scope.showOneI = true;
					$scope.showTwoI = true;
					$scope.showThreeI = true;
				}

				if($scope.project.length == 0)
					$scope.hideProject = true;
				else if($scope.project.length == 1) {
					$scope.showOneP = true;
					document.getElementsByClassName("project-box")[0].style.marginLeft = "100%";
				}	
				else if($scope.project.length == 2) {
					$scope.showOneP = true;
					$scope.showTwoP = true;
					document.getElementsByClassName("project-outerbox")[0].style.marginLeft = "22%";
				}
				else if($scope.project.length == 3) {
					$scope.showOneP = true;
					$scope.showTwoP = true;
					$scope.showThreeP = true;
				}		
			}
		});
	}

	/**
	*Decides the url while switching styles on your own page.
	*/
	$scope.switchStyle = function(){
		var path = "/portfolio2/" + $routeParams.id;
		$location.path(path);
	}

	/**
	*Takes you to the update page url
	*/
	$scope.updateInfo = function(){
		var updateURL = "/edit/" + $scope.userID;
		$location.path(updateURL);
	}

	/**
	* Logout or get started depending on the button.
	*/
	$scope.logout = function(){
		if($scope.logged == "Get Started")
			$location.path("/signup");
		else{
			loggedInUser = "";
			$location.path("/");
		}
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

puzzleControllers.controller('portfolio2Ctrl', ['$scope', '$http',  '$window' ,'$location','$anchorScroll', '$routeParams' ,function($scope, $http,  $window,$location,$anchorScroll, $routeParams) {
	/**
	*Checks if the user is logged in or not and sets the buttons accordingly.
	*/
	$scope.logged = "";
	if(loggedInUser != "") 
		$scope.logged = "Log Out";
	else if(loggedInUser == "") 
		$scope.logged = "Get Started";
	
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
	if($routeParams.id == "sample"){
		$http.get("./data/data.json").success(function(data){
			$scope.data = data;
			$scope.skills = listFormat($scope.data["skills"]);
			$scope.education = $scope.data["education"][0];
			$scope.courses = listFormat($scope.data["education"][0]["courses"]);
			$scope.internship = $scope.data["internship"];
			$scope.project = $scope.data["projects"];
			$scope.showOneP = true;
			$scope.showTwoP = true;
			$scope.showThreeP = true;
			$scope.ifSample = true;
		});
	}
	else
	{
		/**
		*Sets myPage to true if you are viewing your own portfolio.
		*/
		if($routeParams.id == loggedInUser) {
			$scope.myPage = true;
			$scope.ifSample = true;
		}
		
		var whereQuery = "?where={'username':'" + $routeParams.id + "'}";
		var urlToGet = baseURL + whereQuery;
		$http.get(urlToGet).success(function(apiData){
			if(apiData.data.length == 0){
				$scope.error = "User does not exist :(";
				$location.path("/baduser");
			}else{
				$scope.userID = apiData.data[0]._id;
				$scope.data = JSON.parse(apiData.data[0].data);
				$scope.skills = listFormat($scope.data["skills"]);
				$scope.education = $scope.data["education"];
				$scope.courses = listFormat($scope.data["education"]["courses"]);
				$scope.internship = $scope.data["internship"];
				$scope.project = $scope.data["projects"];

				/**
				*Sets hideLinkedin and hideGithub to true if the fields are left empty by the user. 
				*/
				if($scope.data["linkedin"] == undefined)
					$scope.hideLinkedin = true;
				if($scope.data["github"] == undefined)
					$scope.hideGithub = true;

				/**
				*Makes the front-end scalable for upto 3 internships/projects. 
				*/
				if($scope.internship.length == 0)
					$scope.hideInternship = true;

				if($scope.project.length == 0)
					$scope.hideProject = true;
				else if($scope.project.length == 1) {
					$scope.showOneP = true;
					document.getElementsByClassName("project-box")[0].style.marginLeft = "100%";
				}	
				else if($scope.project.length == 2) {
					$scope.showOneP = true;
					$scope.showTwoP = true;
					document.getElementsByClassName("project-outerbox")[0].style.marginLeft = "22%";
				}
				else if($scope.project.length == 3) {
					$scope.showOneP = true;
					$scope.showTwoP = true;
					$scope.showThreeP = true;
				}	
			}
		});
	}

	/**
	*Decides the url while switching styles on your own page.
	*/
	$scope.switchStyle = function(){
		var path = "/portfolio/" + $routeParams.id;
		$location.path(path);
	}

	/**
	*Takes you to the update page url
	*/
	$scope.updateInfo = function(){
		var updateURL = "/edit/" + $scope.userID;
		$location.path(updateURL);
	}

	/**
	* Logout or get started depending on the button.
	*/
	$scope.logout = function(){
		if($scope.logged == "Get Started")
			$location.path("/signup");
		else{
			loggedInUser = "";
			$location.path("/");
		}
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
	 * Ensures that all the required fields are filled in correctly.
	 * Navigates to the next form
	 */

	$scope.registerBasic = function(){
		localData.name = $scope.name;
		localData.emailid = userData.email;
		localData.phonenumber = $scope.phonenumber;
		localData.github = $scope.github;
		localData.linkedin = $scope.linkedin;
		localData.skills = formatCSV($scope.skills);
		if($scope.name != undefined && userData.email != undefined && $scope.phonenumber != undefined && $scope.skills != undefined)
			$location.path('/add/education');
		else 
			$scope.message = "Please fill in all the required information";
	}

	/**
	 * Saves the information from the front end and saves it into the data object.
	 * Ensures that all the required fields are filled in correctly.
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
		if($scope.name != undefined && $scope.major != undefined && $scope.startDate != undefined && $scope.graduationDate != undefined && $scope.cgpa != undefined && $scope.courses != undefined)
			$location.path('/add/internship');
		else 
			$scope.message = "Please fill in all the required information";
	}

	/**
	 * Saves the information from the front end and saves it into the data object.
	 * Ensures that all the required fields are filled in correctly.
	 * Navigates to the next form.
	 */
	$scope.registerInternship = function(){
		var moveOn = true;
		localData.internship = extractInternshipData($scope.internshipChoices);
		if(localData.internship.length > 0) {
			for(var i = 0; i < localData.internship.length; i++) {
				if(localData.internship[i]["company"] == "")
					localData.internship[i]["company"] = undefined;
				if(localData.internship[i]["description"] == "")
					localData.internship[i]["description"] = undefined;
				if(localData.internship[i]["startDate"] == "")
					localData.internship[i]["startDate"] = undefined;
				if(localData.internship[i]["endDate"] == "")
					localData.internship[i]["endDate"] = undefined;
				if(!(localData.internship[i]["company"] == undefined && localData.internship[i]["description"] == undefined && localData.internship[i]["startDate"] == undefined && localData.internship[i]["endDate"] == undefined)) {
					if(localData.internship[i]["company"] == undefined || localData.internship[i]["description"] == undefined || localData.internship[i]["startDate"] == undefined || localData.internship[i]["endDate"] == undefined)
						moveOn = false;
				}
			}
		}
		if(moveOn == false)
			$scope.message = "Please fill in all the required information";
	 	else
	 		$location.path('/add/projects');
	}

	/**
	 * Saves the information from the front end and saves it into the data object.
	 * Ensures that all the required fields are filled in correctly.
	 * Navigates to the next form
	 */
	$scope.registerProjects = function(){
		var moveOn = true;
		localData.projects = extractProjectData($scope.projectChoices);
		if(localData.projects.length > 0) {
			for(var i = 0; i < localData.projects.length; i++) {
				if(localData.projects[i]["name"] == "")
					localData.projects[i]["name"] = undefined;
				if(localData.projects[i]["description"] == "")
					localData.projects[i]["description"] = undefined;
				if(!(localData.projects[i]["name"] == undefined && localData.projects[i]["description"] == undefined)) {
					if(localData.projects[i]["name"] == undefined || localData.projects[i]["description"] == undefined)
						moveOn = false;
				}
			}
		}
		if(moveOn == false)
			$scope.message = "Please fill in all the required information";
	 	else {
	 		var jsonData = JSON.stringify(localData);
			var data2send = {
				"emailid" : userData.email,
				"username": userData.username,
				"password": userData.password,
				"data" : jsonData
			};

			$http({
				method  : 'POST',
				url     : baseURL,
				data    : $.param(data2send),
				headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
			}).success(function(data){
				$scope.message = "Your profile has been successfully created. Please log in to continue";
			}).error(function(){
				$scope.message = "Couldn't post data";
			});
	 	}
	}

	/**
	 * Discards any saved information on the form. 
	 * Navigates to the home page
	 */
	$scope.discardData = function(){
		localData = {};
		userData = {};
		$location.path("/");
	}

}]);


puzzleControllers.controller('editUserCtrl', ['$scope', '$http',  '$window' ,'$location','$anchorScroll', '$routeParams' ,function($scope, $http,  $window,$location,$anchorScroll,$routeParams) {

	/**
	 * Takes in list and convert it into the a string with comma seperated values
	 * @param {list} lists
	 * @return {string} String with comma seperated values
	 */
	var listFormat = function(lists){
		var data = ""
		for(list in lists){
			data +=lists[list] + ",";
		}
		return data.substring(0, data.length - 1);
	}

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

	var postData = function(dataToPost){
		$http({
		    method  : 'PUT',
		    url     : baseURL + "/" + $routeParams.id,
		    data    : $.param($scope.editUser), //forms user object
		    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		}).success(function(putdata){
		}).error(function(err){
		    $scope.message=err.message;
		});
	}

	var userURL = baseURL + "/" + $routeParams.id + "/";
	$http.get(userURL).success(function(userData){
		$scope.editUser = userData.data;
		$scope.username = userData.data.username;
		editData = JSON.parse(userData.data.data);
		$scope.name = editData.name;
		$scope.phonenumber = editData.phonenumber;
		$scope.linkedin = editData.linkedin;
		$scope.github = editData.github;
		$scope.skills = listFormat(editData.skills);
		$scope.education = editData.education;
		$scope.uniname = editData.education.name;
		$scope.major = editData.education.major;
		$scope.cgpa = editData.education.CGPA;
		$scope.startDate = editData.education.startDate;
		$scope.graduationDate = editData.education.endDate;
		$scope.courses = listFormat(editData.education.courses);
	});

	$scope.registerBasic = function(){
		editData.name = $scope.name;
		editData.phonenumber = $scope.phonenumber;
		editData.linkedin = $scope.linkedin;
		editData.github = $scope.github;
		editData.skills = formatCSV($scope.skills);
		$scope.editUser.data = JSON.stringify(editData);
		if($scope.name != undefined && $scope.phonenumber != undefined && $scope.skills != undefined){
			postData($scope.editUser);
			$location.path("/edit/" + $routeParams.id);
		}
		else 
			$scope.message = "Please fill in all the required information";
	}

	$scope.registerEducation = function(){
		editData.education.name = $scope.uniname;
		editData.education.major = $scope.major;
		editData.education.CGPA = $scope.cgpa;
		editData.education.startDate = $scope.startDate;
		editData.education.endDate = $scope.graduationDate;
		editData.education.courses = formatCSV($scope.courses);
		$scope.editUser.data = JSON.stringify(editData);
		if($scope.uniname != undefined && $scope.major != undefined && $scope.startDate != undefined && $scope.graduationDate != undefined && $scope.cgpa != undefined && $scope.courses != undefined){
			postData($scope.editUser);
			$location.path("/edit/" + $routeParams.id);
		}
		else 
			$scope.message = "Please fill in all the required information";
	}

	/**
	 * Delete the User from Database
	 */
	$scope.deleteUser = function(){
		localData = {};
		userData = {};
		editData = {};
		loggedInUser = "";
		$http.delete(userURL).success(function(data){
			$location.path("/");
		});
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
	 * Ensures that all the required fields are filled in correctly.
	 * Navigates to the next form.
	 */
	$scope.registerInternship = function(){
		var moveOn = true;
		editData.internship = extractInternshipData($scope.internshipChoices);
		if(editData.internship.length > 0) {
			for(var i = 0; i < editData.internship.length; i++) {
				if(editData.internship[i]["company"] == "")
					editData.internship[i]["company"] = undefined;
				if(editData.internship[i]["description"] == "")
					editData.internship[i]["description"] = undefined;
				if(editData.internship[i]["startDate"] == "")
					editData.internship[i]["startDate"] = undefined;
				if(editData.internship[i]["endDate"] == "")
					editData.internship[i]["endDate"] = undefined;
				if(!(editData.internship[i]["company"] == undefined && editData.internship[i]["description"] == undefined && editData.internship[i]["startDate"] == undefined && editData.internship[i]["endDate"] == undefined)) {
					if(editData.internship[i]["company"] == undefined || editData.internship[i]["description"] == undefined || editData.internship[i]["startDate"] == undefined || editData.internship[i]["endDate"] == undefined)
						moveOn = false;
				}
			}
		}
		if(moveOn == false)
			$scope.message = "Please fill in all the required information";
	 	else{
	 		$scope.editUser.data = JSON.stringify(editData);
	 		postData($scope.editUser);
			$location.path("/edit/" + $routeParams.id);
	 	}
	 		
	}

		/**
	 * Saves the information from the front end and saves it into the data object.
	 * Ensures that all the required fields are filled in correctly.
	 * Navigates to the next form
	 */
	$scope.registerProjects = function(){
		var moveOn = true;
		editData.projects = extractProjectData($scope.projectChoices);
		if(editData.projects.length > 0) {
			for(var i = 0; i < editData.projects.length; i++) {
				if(editData.projects[i]["name"] == "")
					editData.projects[i]["name"] = undefined;
				if(editData.projects[i]["description"] == "")
					editData.projects[i]["description"] = undefined;
				if(!(editData.projects[i]["name"] == undefined && editData.projects[i]["description"] == undefined)) {
					if(editData.projects[i]["name"] == undefined || editData.projects[i]["description"] == undefined)
						moveOn = false;
				}
			}
		}
		if(moveOn == false)
			$scope.message = "Please fill in all the required information";
	 	else {
	 		$scope.editUser.data = JSON.stringify(editData);
	 		postData($scope.editUser);
			$location.path("/edit/" + $routeParams.id);
	 	}
	}

	$scope.editInternship = function(){
		$location.path("/edit/" + $routeParams.id + "/internship");
	}

	$scope.discardData = function(){
		$location.path("/edit/" + $routeParams.id);
	}

	$scope.editBasic = function(){
		$location.path("/edit/" + $routeParams.id + "/basic");
	}

	$scope.editEducation = function(){
		$location.path("/edit/" + $routeParams.id + "/education");
	}

	$scope.editProjects = function(){
		$location.path("/edit/" + $routeParams.id + "/projects");
	}

	$scope.doneEditing = function(){
		$location.path("/portfolio/" + $scope.username);
	}

	$scope.doneEditing = function(){
		$location.path("/portfolio/" + $scope.username);
	}

}]);
