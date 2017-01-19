(function() {
    'use strict';

    angular
    .module('aajInfiniteScroll', [])
    .directive('aajInfiniteScroll', aajInfiniteScroll);

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 30; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    aajInfiniteScroll.$inject = ['$window', '$compile', '$document']
    function aajInfiniteScroll($window, $compile, $document) {
        return {
            restrict: 'A',
            link: function(scope, element, attr, controller) {
                var lastScrollTop = 0;
                var actualId = makeid();
                var topId, bottomId;
                element.prop('id', actualId);

                setTimeout(function(){
                    $window.scroll(0,1);
                },0);

                angular.element($window).bind( 'scroll', function ( e ) {
                    var st = $window.pageYOffset;

                    if (st > lastScrollTop){

                        if($window.pageYOffset + $window.innerHeight == angular.element(document.querySelector( 'body' )).prop('offsetHeight')) {
                            // SCROLL AT BOTTOM
                            bottomId = makeid();
                            var newView = angular.element(document.getElementById(actualId).cloneNode(true));

                            newView.removeAttr('infinite-loop');
                            newView.prop('id',bottomId);
                            $compile(newView[0])(scope);
                            document.querySelector( 'body' ).append(newView[0]);
                        }

                    } else {
                        if (st === 0) {
                            topId = makeid();
                            var newView = angular.element(document.getElementById(actualId).cloneNode(true));

                            newView.removeAttr('infinite-loop');
                            $compile(newView[0])(scope);
                            document.querySelector( 'body' ).prepend(newView[0]);
                            setTimeout(function(){
                                $window.scroll(0, element.prop('offsetHeight'));
                            },0)
                        }
                    }
                    lastScrollTop = st;
                });
            }
        };
    }

})();
