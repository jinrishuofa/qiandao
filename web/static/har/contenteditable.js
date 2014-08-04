// Generated by CoffeeScript 1.7.1
(function() {
  angular.module('contenteditable', []).directive('contenteditable', [
    '$timeout', function($timeout) {
      return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
          var oldRender;
          if (!ngModel) {
            return;
          }
          element.bind('input', function(e) {
            return scope.$apply(function() {
              var text;
              text = element.text();
              ngModel.$setViewValue(text);
              if (text === '') {
                return $timeout(function() {
                  if (element.prev().hasClass('contentedit-wrapper')) {
                    return element.prev().click();
                  } else {
                    element[0].blur();
                    return element[0].focus();
                  }
                });
              }
            });
          });
          element.bind('blur', function(e) {
            var text;
            text = element.text();
            if (ngModel.$viewValue !== text) {
              return ngModel.$render();
            }
          });
          oldRender = ngModel.$render;
          return ngModel.$render = function() {
            if (!!oldRender) {
              oldRender();
            }
            if (!element.is(':focus')) {
              return element.text(ngModel.$viewValue || '');
            }
          };
        }
      };
    }
  ]);

}).call(this);
