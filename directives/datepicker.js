angular.module('noteShareApp')
.directive('datepicker', function ($parse) {
	return function(scope, element, attrs, controller){
		var ngModel = $parse(attrs.ngModel);
		$(function(){
			element.datepicker({
				onSelect: function(dateText, inst){
					scope.$apply(function(scope){
						ngModel.assign(scope, dateText);
					});
				}
			});
		});
	}
	
});