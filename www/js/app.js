// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core','ionic.service.push','ngCordova','ionic.service.analytics','starter.controllers', 'ionic-material', 'ionMdInput'])

.run(function($ionicPlatform,$ionicAnalytics,$ionicUser,$ionicPush) {

    $ionicPlatform.ready(function() {
//        Ionic.io();
//
//        var push = new Ionic.Push({
//            "debug": true
//        });
//
//        push.register(function(token) {
//            console.log("Device token:",token.token);
//        });
        $ionicAnalytics.register();
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

//        $ionicUser.identify({
//            user_id:  '0' ,
//            name: 'Test User',
//            message: 'I come from planet Ion'
//        });

//        $ionicPush.register({
//                canShowAlert: true,
//                onNotification: function(notification) {
//                    console.log('onNotification', JSON.stringify(notification) );
//                    // Called for each notification for custom handling
//                    $scope.lastNotification = JSON.stringify(notification);
//                }
//            },
//
//            // Some metadata to send through the webhook for your own
//            // linking of device token and user
//            {
//                "user_id":  "ionic101" ,
//                "email": "tester@example.com"
//            }).then(function(deviceToken) {
//                console.log("deviceToken",deviceToken);
//                $scope.token = deviceToken;
//
//
//            });
//        $ionicPush.register({
//            canShowAlert: false, //Should new pushes show an alert on your screen?
//            canSetBadge: true, //Should new pushes be allowed to update app icon badges?
//            canPlaySound: false, //Should notifications be allowed to play a sound?
//            canRunActionsOnWake: true, // Whether to run auto actions outside the app,
//            onNotification: function(notification) {
//                // Called for each notification.
//                console.log('onNotification', JSON.stringify(notification) );
//            }
//        }, {
//            user_id: 'ionic101',
//            username: 'ionitron',
//            age: 9001
//        });
//
//    });

});
})

    .config(['$ionicAppProvider', function($ionicAppProvider) {
        // Identify app
        $ionicAppProvider.identify({
            // The App ID (from apps.ionic.io) for the server
            app_id: '1723ca8d',
            // The public API key all services will use for this app
            api_key: '79eb6890d3dc9eef4a3887ef28c2e1c37041e9f945c272bf',
            // Set the app to use development pushes
            dev_push: false
        });
    }])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

            // Turn off caching for demo simplicity's sake
            $ionicConfigProvider.views.maxCache(0);

            /*
             // Turn off back button text
             $ionicConfigProvider.backButton.previousTitleText(false);
             */

            $stateProvider.state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

                .state('app.trending', {
                    url: '/trending',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/trending.html',
                            controller: 'TrendingCtrl'
                        }
//            'fabContent': {
//                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
//                controller: function ($timeout) {
//                    $timeout(function () {
//                        document.getElementById('fab-activity').classList.toggle('on');
//                    }, 200);
//                }
//            }
                    }
                })

                .state('app.prod', {
                    url: '/prod/:prod_id',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/prod.html',
                            controller: 'ProdCtrl'
                        }
//            'fabContent': {
//                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
//                controller: function ($timeout) {
//                    $timeout(function () {
//                        document.getElementById('fab-friends').classList.toggle('on');
//                    }, 900);
//                }
//            }
                    }
                })

                .state('app.gallery', {
                    url: '/gallery',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/gallery.html',
                            controller: 'GalleryCtrl'
                        }
//            'fabContent': {
//                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
//                controller: function ($timeout) {
//                    $timeout(function () {
//                        document.getElementById('fab-gallery').classList.toggle('on');
//                    }, 600);
//                }
//            }
                    }
                })

                .state('app.login', {
                    url: '/login',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/login.html',
                            controller: 'LoginCtrl'
//            },
//                        'fabContent': {
//                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
//                controller: function ($timeout) {
//                    /*$timeout(function () {
//                        document.getElementById('fab-profile').classList.toggle('on');
//                    }, 800);*/
//                }
                        }
                    }
                })
                .state('app.enquiry', {
                    url: "/enquiry",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/enquiry.html",
                            controller: 'AppCtrl'
                        }
                    }
                })

                .state('app.prodList', {
                    url: '/prodList/:Id/:title',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/prodList.html',
                            controller: 'ProdListCtrl'
                            // controller: 'BrwCtrl'
                        }
//            'fabContent': {
//                template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
//                controller: function ($timeout) {
//                    /*$timeout(function () {
//                        document.getElementById('fab-profile').classList.toggle('on');
//                    }, 800);*/
//                }
//            }
                    }
                })


            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/login');

})
