(function() {
  'use strict';

	 angular
    .module('rss')
    .controller('mainCtrl', ['$scope','$http', function($scope,$http) {
	  	$scope.newRss = '';
	  	$scope.rssArray =[];
		$scope.reversRssArray =[];
	  	$scope.responseArray=[];

		var saveArray =function(){
			var rssArray = JSON.stringify($scope.rssArray);
			window.localStorage.setItem("rssArray", rssArray);
		}

		if(JSON.parse(localStorage.getItem("rssArray")) != null){
			$scope.rssArray =JSON.parse(localStorage.getItem("rssArray"));
			$scope.reversRssArray =  $scope.rssArray.reverse();
		}

		$(window).on("navigate", function (event, data) {
			var direction = data.state.direction;
			if (direction == 'back') {
				alert("i am back")
			}

		});

		
		$scope.selected = function(index){
			$scope.getData($scope.rssArray[index].url);
			for(var i =0; i< $scope.rssArray.length;i++){
				if (i != index){
					$scope.rssArray[i].selected = false;
				}else{
					$scope.rssArray[i].selected = true;
				}
			}
		}
		
	  $scope.addRss =function(){
	  	 $scope.getData($scope.newRss);
		  $scope.rssArray.push({url:$scope.newRss ,selected: true} );
		  $scope.selected($scope.rssArray.length-1);
	  	 $scope.newRss ="";
		  $scope.reversRssArray = $scope.rssArray.reverse();
		  saveArray();
	  }

	  $scope.remove= function(index){
	  	 $scope.reversRssArray.splice(index,1);
		  console.log($scope.reversRssArray);

			if(isNaN($scope.rssArray[index] -1) ){
				$scope.responseArray=[];    // // if  there us  no next item display nothing
			}else{
				$scope.selected($scope.rssArray[index] -1); // select the next one in the list
			}

		  $scope.rssArray = $scope.reversRssArray.reverse();
		  saveArray();
	  }

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
			dd='0'+dd
		}
		if(mm<10){
			mm='0'+mm
		}
		var today = dd+'/'+mm+'/'+yyyy;
		$scope.date = today;

	 $scope.getData = function(url){

			$http({
			  method: 'GET',
			  url: url,
			transformResponse: function(cnv)
			{
				var x2js = new X2JS();
				var aftCnv = x2js.xml_str2json(cnv);
				console.log("aftCnv:");
				console.log(aftCnv);
				return aftCnv;
			}
			}).then(function successCallback(response) {
					console.log(response);
				console.log("response data");
				$scope.responseArray=[];

				if(response.data.rss.channel.item.length == undefined){
					$scope.responseArray.push( response.data.rss.channel.item) ;
				}else{
					$scope.responseArray = response.data.rss.channel.item;
				}
				console.log(response.data.rss.channel.item);
			  }, function errorCallback(response) {
					console.log(response);
			  });
	 }

	}]);

})();