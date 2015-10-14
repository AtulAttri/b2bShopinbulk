/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,contactusService,$ionicLoading,$http, $q,$ionicPopup,$state,$ionicPush,$ionicUser) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
$scope.enquire = {"name": "", "mobile_no": "", "create_ts": new Date(), "email": "", "enquire_from": "Puma","created_by": "","product_code":"","additional_remarks":"Enquiry From Mobile APP"}

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////
        $scope.alertMsg = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Enquiry Status',
                template: 'Thank You! Your Enquiry has been sent. Our team will get in touch with you soon'
            });
            alertPopup.then(function(res) {
                console.log('Your Enquiry has been sent');
            });
        };

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

        $scope.sendEnquiry= function(){

         //   $scope.enquire.product_code = $stateParams.prod_id;
            $scope.enquire.created_by= $scope.enquire.name;


            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });

            contactusService.insertenquireinfo($http, $q, $scope.enquire ,$ionicLoading).then(function (data) {

                    $ionicLoading.hide();


                    $scope.alertMsg();

                    $state.go('app.gallery');

                },
                function () {

                    $scope.error = error;
                });
        }
//
//        // kick off the platform web client
//        Ionic.io();
//
//// this will give you a fresh user or the previously saved 'current user'
//        var user = Ionic.User.current();
//
//// if the user doesn't have an id, you'll need to give it one.
//        if (!user.id) {
//            user.id = Ionic.User.anonymousId();
//            // user.id = 'your-custom-user-id';
//        }
//
////persist the user
//        user.save();



})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,$ionicPush,$ionicUser,$rootScope) {
        $scope.$parent.clearFabs();
        $timeout(function () {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();

        $scope.viewGallery = function () {

//            $ionicUser.identify({
//                user_id:  $ionicUser.generateGUID() ,
//                name: 'User',
//                message: 'I come from B2bShopinbulk'

//            });
            var user = $ionicUser.get();
            if(!user.user_id) {
                // Set your user_id here, or generate a random one.
                user.user_id = $ionicUser.generateGUID();
            };

            // Metadata
            angular.extend(user, {
                name: 'User',
                app: 'Shopinbulk'
            });

            $ionicUser.identify(user).then(function(){
                $scope.identified = true;
                console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
            })


            $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
             //   alert("Successfully registered token " + data.token);
                console.log('Ionic Push: Got token ', data.token, data.platform);
                $scope.token = data.token;
            });

        $ionicPush.register({
                canShowAlert: true, //Should new pushes show an alert on your screen?
                canSetBadge: true, //Should new pushes be allowed to update app icon badges?
                canPlaySound: true, //Should notifications be allowed to play a sound?
                canRunActionsOnWake: true, // Whether to run auto actions outside the app,
                onNotification: function (notification) {
                    console.log('onNotification', JSON.stringify(notification));
                    // Called for each notification for custom handling
                    $scope.lastNotification = JSON.stringify(notification);
                }
            }

            // Some metadata to send through the webhook for your own
            // linking of device token and user
//            {
//                "user_id": "ionic101202",
//                "email": "tester@example.com"
//          }
        ).then(function (deviceToken) {
                console.log("deviceToken", deviceToken);
                $scope.token = deviceToken;


            });
    }
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProdListCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $state,
                                    $http,$q,
                                    catService,$ionicLoading,
                                    $ionicSlideBoxDelegate,$ionicScrollDelegate) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();



            var cat_id = $stateParams.Id;
            $scope.product_title=$stateParams.title;

            var user_info;
            init();
            function init() {

                $scope.loading = $ionicLoading.show({
                    content: '<i class="icon ion-loading-c"></i>',
                    animation: 'fade-in',
                    showBackdrop: false,
                    maxWidth: 50,
                    showDelay: 0
                });


                $scope.route= function(){

                    $state.href('')
                }

                var prod_list=[];
                var  productList=[];
                var each_prod_image=[];



                catService.get_prod_by_cat($http, $q,cat_id).then(function (data){


                        var prod_list=[];
                        $ionicLoading.hide();
                        prod_list = data;
                        for (var i = 0; i < prod_list.length; i++) {
                            if(JSON.parse(prod_list[i]).image_urls.length >1) {
                                productList.push(JSON.parse(prod_list[i].toString()));
                            }
                        }
                        $scope.product_lists=productList;


                        var x=[];
                        x =  prod_list[0].Name;


                    },


                    function () {

                        $ionicLoading.hide();
                        $scope.error = error;
                    });

            }






})

.controller('TrendingCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

    .controller('ProdCtrl', function ( $scope, $state,
                                       $http,$q,
                                       catService,$ionicLoading,$stateParams,
                                       $ionicSlideBoxDelegate,$location,ionicMaterialMotion

        )
    {

        $scope.go = function ( path ) {
            $location.path( path );
        };
        var product_id =  $stateParams.prod_id;
        $scope.product_id = product_id.toUpperCase();
        var user_info;
        init();
        function init() {
            $scope.loading = $ionicLoading.show({
                content: '<i class="icon ion-loading-c"></i>',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 50,
                showDelay: 0
            });

            var product_details, parent_product, child_product;
            child_product = [];
            catService.get_productDetailsById($http, $q, product_id).then(function (data) {
                    product_details = data;
                    $ionicLoading.hide();
                    ionicMaterialMotion.fadeSlideInRight({
                        selector: '.animate-fade-slide-in .list'
                    });

                    $scope.prod_details=product_details;

                    parent_product = product_details[0];
                   var imagesCount= JSON.parse(parent_product).image_urls.length;
                    var myImages=[];
                    for(var q=0; q<imagesCount; q++)
                    {

                        var Image = JSON.parse(parent_product).image_urls[q].link ;
                        myImages.push(Image);

                    }
                    $scope.allImages= myImages;
                    $scope.parent_prod_details = parent_product;
                    $scope.prod_name = JSON.parse(parent_product).Name;
                    $scope.prod_id = JSON.parse(parent_product).id;
                    $scope.prod_brand = JSON.parse(parent_product).brand.toUpperCase();

                    $scope.selected_image = JSON.parse(parent_product).image_urls[0].link;
                    $scope.selected_image_zoom = JSON.parse(parent_product).image_urls[0].zoom_link;
                    $scope.description= JSON.parse(parent_product).description;

                    var process_price_logic = function (parent_product) {


                        var arr_cat, arr_sku, special_price;
                        $scope.productDetails = parent_product;
                        $scope.productDetails.mrp = parent_product.price[0].mrp;

                        var prod_price_array=parent_product.price;
                        var array_prod_price=[];
                        angular.forEach(prod_price_array, function(item) {
                            if(item.list!="" && item.list!=null)
                            {

                                if(item.max_qty<=500){
                                    item.final_offer=item.list.toFixed(0);
                                    array_prod_price.push(item);
                                }
                            }
                        });

                        $scope.product_price = array_prod_price;


                    }

                    process_price_logic(JSON.parse(parent_product));


                    if (product_details.length > 1) {
                        $scope.size_ind = true;
                         var i;
                        for (i = 1; i < product_details.length; i++) {

                            var child_prod_block = 0;
                            var child_prod_detail=[];
                            var child_prod_stock=[];
                            child_prod_detail=JSON.parse(product_details[i]);
                            child_prod_block =  child_prod_detail.block_number;

                            child_prod_stock=JSON.parse(JSON.parse(product_details[i]).stock);
                            if(child_prod_stock.length>0){
                                var total_stock = 0;

                                angular.forEach(child_prod_stock, function(item) {
                                    total_stock += item.stock;

                                });

                                if(child_prod_block) {

                                    total_stock = (total_stock - child_prod_block);
                                }

                                if (total_stock > 0) {
                                    $scope.out_of_stock = 0;

                                    if(total_stock < 100){
                                        $scope.stock_msg = "* Only "+total_stock+" left";
                                        child_prod_detail.stock_msg= "* Only "+total_stock+" left";
                                    }
                                    else{
                                        $scope.stock_msg = "In stock";
                                        child_prod_detail.stock_msg= "In stock";
                                    }
                                    child_prod_detail.current_stock=total_stock;

                                }
                                else {
                                    $scope.out_of_stock = 1;
                                    $scope.stock_msg = "Out of stock";
                                    child_prod_detail.current_stock=total_stock;
                                    child_prod_detail.stock_msg="Out of stock";
                                }


                            }

                            child_prod_detail.stock=child_prod_stock;
                            child_prod_detail.ord_qty="";

                            child_product.push(child_prod_detail);

                        }

                        if (child_product.length > 0) {
                            $scope.out_of_stock = 0;
                            $scope.stock_msg = "In stock";
                        }
                        else {
                            $scope.out_of_stock = 1;
                            $scope.stock_msg = "Out of stock";
                        }

                    }
                    else {
                        $scope.size_ind = false;
                        var stock = JSON.parse(parent_product).stock;

                        if (stock <= 0) {
                            $scope.out_of_stock = 1;
                            $scope.stock_msg = "Out of stock";
                        }
                        else {
                            if ((stock <= 10) && (stock > 0)) {
                                $scope.out_of_stock = 0;
                                $scope.stock_msg = "Only " + stock.toString() + " left";
                            }
                            else {
                                $scope.out_of_stock = 0;
                                $scope.stock_msg = "In stock";
                            }
                        }
                    }
                    $scope.sizes = [];



                    $scope.child_product=child_product;



                },
                function () {

                    $scope.error = "Product Data not found";
                });
            $scope.$watch('myModel', function (v) {

                $scope.selected_prod = v;

            });


        }


    })
    .filter('unsafe', function($sce) {

        return function(val) {

            return $sce.trustAsHtml(val);

        };

    })

    .service('contactusService', function () {



        this.insertenquireinfo = function ($http, $q, dataobj) {
            var apiPath = 'http://app.annectos.net/ecomm.bulls.api' + '/user/registration/insert_enquire_info/';
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: apiPath,
                data: dataobj,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })
            return deferred.promise;
        };




    })

    .service('catService', function CatService() {

        this.get_prod_by_cat = function ($http, $q,id)
        {

            var cat_id= id;
           // var cat_id= '1.1.6';
            var apiPath = 'http://app.annectos.net/ecomm.bulls.api' + '/store/prod_list_by_cat_short?cat_id=' + cat_id+ '&json=true' ;
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: apiPath,
                //data: data,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })

            return deferred.promise;
        };

        this.get_productDetailsById = function ($http, $q, product_id) {
            var apiPath = 'http://app.annectos.net/ecomm.bulls.api' +  '/store/prod_details?prod_id=' + product_id + '&json=true';

            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: apiPath,
                //data: data,
                type: JSON
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (data) {
                deferred.reject("An error occured while validating User");
            })

            return deferred.promise;
        };

    })

;
