'use strict';

angular.module('confusionApp')
        .constant("baseURL", "http://localhost:3000/")
        .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            this.getDishes = function(){

                return $resource(baseURL + "dishes/:id");
            };

            // implement a function named getPromotion
            // that returns a selected promotion.
            this.getPromotion = function() {

                //return promotions[index];
                return $resource(baseURL + "promotions/:id");
            };
                        
        }])
        
        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            var corpfac = {};
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not e
            corpfac.getLeaders = function() {
                
                //return leadership;
                return $resource(baseURL + "leadership/:id");
            };
    
            corpfac.getLeader = function() {
                
                //return leadership[index];
                return $resource(baseURL + "leadership/:id");
            };
    
            return corpfac;
        }])

        .service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
            
            this.setFeedback = function() {
                return $resource(baseURL + "feedback");
            };
        }]);
