(function(window, angular, _) {

    'use strict';

    //Module
    var shoppingCart = angular.module('shoppingCart', [

        // Angular core plugins
        'ngResource',
        'ngRoute',
        'ngCookies',
        'ngStorage',
        'ngSanitize',
        'ngAnimate',

        // 3rd Party plugins
        'ui.router',
        'ui.bootstrap',
        'naif.base64',
        '720kb.datepicker',
        'smart-table',
        'ngProgress',
        'oitozero.ngSweetAlert',
        'rzModule',
        'angularUtils.directives.dirPagination',
        'ngMask',

        // Module Dependencies
        'shoppingCart.shared',
        'shoppingCart.dashboard'
        /*'sasretail.customer',
        'sasretail.project',
        'sasretail.program',
        'sasretail.workforce',
        'sasretail.activation',
        'sasretail.operations',
        'sasretail.shared'*/
    ]);

    var _lang =  (window.location.href).split(window.location.origin)[1].split('/')[1];
    var pagePartsTemplatesPath = '/templates/partial/';
    var includeObject = {
        header: {
            templateUrl: pagePartsTemplatesPath + 'header-partial',
            controller: 'HeaderController'
        },
        footer: {
            templateUrl: pagePartsTemplatesPath + 'footer-partial',
            controller: 'FooterController'
        }
    };

    /**
     * @name run
     * @desc Update xsrf $http headers to align with Django's defaults
     */
    var run = function ($http, $rootScope, $anchorScroll,$localStorage, $state,$stateParams, SweetAlert) {

       // $state.go('dashboard',{'lang':$rootScope.lang});

        /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState,fromParams) {

            $state.go(toState.name, toParams);

        });*/
        $rootScope.$on('$stateChangeSuccess', function() {
            $anchorScroll();
        });
    };

    shoppingCart.controller('AppController', ['$http', '$scope', '$rootScope', '$localStorage', '$state', 'ngProgressFactory', 'SweetAlert',

        function($http, $scope, $rootScope, $localStorage, $state, ngProgressFactory, SweetAlert) {

            $rootScope.lang = 'en';
            $rootScope.go = function(state) {


                $state.go(state, {lang: $rootScope.lang});
            };

            // Editor options.
            $rootScope.ckeditorOptions = {
                language: 'en',
                allowedContent: true,
                entities: false,
                height: '200px'
            };

            //handle SweetAlert Error
            $rootScope.handleSweetError = function(error) {
                SweetAlert.swal({title: 'Error!', text: error.data.message, type: 'error'});
            };

            //for progress bar
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.setColor('#33ffff'); //#66ffcc, #80d4ff, #33ffff
            $scope.progressbar.setHeight('3px');

            $scope.$watch(function() {

                return $rootScope.isLoading;

            }, function(newValue, oldValue) {

                if(newValue === true) {
                    $scope.progressbar.start();
                } else {
                    $scope.progressbar.complete();
                }
            });

        }]);

    // Routing using ui-router via states
    shoppingCart.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider,  $interpolateProvider) {

    
        var dashboardUrlBase = '/templates/dashboard/';
        var customerUrlBase = '/templates/customer/';


        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        debugger;
        $stateProvider
            .state('dashboard',{
                url: '/shoppingCart/dashboard',
                views: {
                    header: includeObject.header,
                    footer: includeObject.footer,
                    content:{
                        templateUrl: dashboardUrlBase + 'dashboard',
                        controller: 'DashboardController'
                    }
                },
                data: {
                    access: ['all']
                }

            });
/*            .state('profile', {
                url: '/:lang/sasretail/customer/profile',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'step1-partial',
                        controller: 'CustomerStep1Controller'
                    }
                },
                data: {
                        access:['Admin','Program Manager']
                }
            })
            .state('step1', {
                url: '/:lang/sasretail/customer/step1',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'step1-partial',
                        controller: 'CustomerStep1Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('step2', {
                url: '/:lang/sasretail/customer/step2',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'step2-partial',
                        controller: 'CustomerStep2Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('step3', {
                url: '/:lang/sasretail/customer/step3',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'step3-partial',
                        controller: 'CustomerStep3Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }   
            })
            .state('step4', {
                url: '/:lang/sasretail/customer/step4/:customerId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'step4-partial',
                        controller: 'CustomerStep4Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('saved', {
                url: '/:lang/sasretail/customer/saved/:customerId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'saved-partial',
                        controller: 'CustomerSavedController'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('management', {
                url: '/:lang/sasretail/customer/management',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'customer-management-partial',
                        controller: 'CustomerManagementController'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('management.active', {
                url: '/active',
                controller: 'CustomerManagementController',
                templateUrl: customerUrlBase + 'customer-management-partial-active',
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('management.draft', {
                url: '/draft',
                controller: 'CustomerManagementController',
                templateUrl: customerUrlBase + 'customer-management-partial-draft',
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('management.archived', {
                url: '/archived',
                controller: 'CustomerManagementController',
                templateUrl: customerUrlBase + 'customer-management-partial-archived',
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('customerSearch', {
                url: '/:lang/sasretail/customer/search?search',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'customer-search-partial',
                        controller: 'CustomerSearchController'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('editCustomer', {
                url: '/:lang/sasretail/customer/edit/:customerId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: customerUrlBase + 'customer-edit-partial',
                        controller: 'CustomerEditController'
                    }
                },
                data: {
                    access:['Admin','Program Manager']
                }
            })
            .state('projectManagement', {
                url: '/:lang/sasretail/project/management',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-management-partial',
                        controller: 'ProjectManagementController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectManagement.active', {
                url: '/active',
                templateUrl: projectUrlBase + 'project-management-partial-active',
                controller: 'ProjectManagementController',
                data: {
                    access:['all','Program Manager','Project Manager']
                }

            })
            .state('projectManagement.draft', {
                url: '/draft',
                templateUrl: projectUrlBase + 'project-management-partial-draft',
                controller: 'ProjectManagementController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectManagement.archived', {
                url: '/archived',
                templateUrl: projectUrlBase + 'project-management-partial-archived',
                controller: 'ProjectManagementController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectSearch', {
                url: '/:lang/sasretail/project/search',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-search-partial',
                        controller: 'ProjectSearchController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectSetupGeneral', {
                url: '/:lang/sasretail/project/general',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-setup-general',
                        controller: 'ProjectSetupGeneralController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectSetupServices', {
                url: '/:lang/sasretail/project/services',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-setup-services',
                        controller: 'ProjectSetupServicesController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectSetupBilling', {
                url: '/:lang/sasretail/project/billing',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-setup-billing',
                        controller: 'ProjectSetupBillingController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectSetupSummary', {
                url: '/:lang/sasretail/project/summary',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-setup-summary',
                        controller: 'ProjectSetupSummaryController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectIDGeneration', {
                url: '/:lang/sasretail/project/id-generation/:projectId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-id-generation',
                        controller: 'ProjectIDGenerationController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('editProject', {
                url: '/:lang/sasretail/project/edit/:projectId',
                // url: '/:lang/sasretail/project/edit-project',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-edit',
                        controller: 'EditProjectController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('editProjectConfirmation', {
                url: '/:lang/sasretail/project/edit-confirmation',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'edit-project-confirmation',
                        controller: 'EditProjectConfirmationController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectApprovalConfirmation', {
                url: '/:lang/sasretail/project/approval-confirmation/:projectId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-approval-confirmation',
                        controller: 'ProjectApprovalConfirmationController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectApprovalSummary', {
                url: '/:lang/sasretail/project/approval-summary/:projectId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-approval-summary',
                        controller: 'ProjectApprovalSummaryController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectClone', {
                url: '/:lang/sasretail/project/general/:projectId/clone',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-setup-general',
                        controller: 'ProjectSetupGeneralController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectCloneServices', {
                url: '/:lang/sasretail/project/services/:projectId/:clone',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-setup-services',
                        controller: 'ProjectSetupServicesController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectCloneBilling', {
                url: '/:lang/sasretail/project/billing/:projectId/:clone',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-setup-billing',
                        controller: 'ProjectSetupBillingController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectCloneSummary', {
                url: '/:lang/sasretail/project/summary/:projectId/:clone',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-setup-summary',
                        controller: 'ProjectSetupSummaryController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectIDCloneGeneration', {
                url: '/:lang/sasretail/project/id-generation/:projectId/:clone',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-id-generation',
                        controller: 'ProjectIDGenerationController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('projectSaved', {
                url: '/:lang/sasretail/project/saved/:projectId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-saved-partial',
                        controller: 'ProjectSavedController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programManagement', {
                url: '/:lang/sasretail/program/management',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-management',
                        controller: 'ProgramManagementController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programManagement.active', {
                url: '/active',
                templateUrl: programUrlBase + 'program-management-partial-active',
                controller: 'ProgramManagementController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programManagement.archived', {
                url: '/archived',
                templateUrl: programUrlBase + 'program-management-partial-archived',
                controller: 'ProgramManagementController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programSetupStep1', {
                url: '/:lang/sasretail/program/step1/:customerId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-setup-step1',
                        controller: 'ProgramSetupStep1Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programSetupStep2', {
                url: '/:lang/sasretail/program/step2/:customerId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-setup-step2',
                        controller: 'ProgramSetupStep2Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programSetupStep3', {
                url: '/:lang/sasretail/program/step3/:customerId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-setup-step3',
                        controller: 'ProgramSetupStep3Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programSetupStep4', {
                url: '/:lang/sasretail/program/step4/:customerId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-setup-step4',
                        controller: 'ProgramSetupStep4Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programSaved', {
                url: '/:lang/sasretail/program/saved/:programId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-setup-saved',
                        controller: 'ProgramSavedController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programEdit', {
                url: '/:lang/sasretail/program/edit/:programId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-edit',
                        controller: 'ProgramEditController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programEditStep2', {
                url: '/:lang/sasretail/program/edit-step2/:programId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-edit-step2',
                        controller: 'ProgramEditStep2Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('programEditStep3', {
                url: '/:lang/sasretail/program/edit-step3/:programId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: programUrlBase + 'program-edit-step3',
                        controller: 'ProgramEditStep3Controller'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('workforceManagement', {
                url: '/:lang/sasretail/workforce/management?customerId&editing&creating&visitId&cycleId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: workforceUrlBase + 'workforce-management',
                        controller: 'WorkforceManagementController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('workforceFullProfile', {
                url: '/:lang/sasretail/workforce/full-profile/:employeeId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: workforceUrlBase + 'full-profile',
                        controller: 'WorkforceFullProfileController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('workforceAllocationSummary', {
                url: '/:lang/sasretail/workforce/allocation-summary',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: workforceUrlBase + 'allocation-summary',
                        controller: 'WorkforceAllocationSummaryController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('workforceTeamManagement', {
                url: '/:lang/sasretail/workforce/team-management',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: workforceUrlBase + 'team-management',
                        controller: 'WorkforceTeamManagementController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('cycleManagementProject', {
                url: '/:lang/sasretail/activation/cycle-management/',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: activationUrlBase + 'cycle-management-project',
                        controller: 'CycleManagementProjectController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('cycleManagement', {
                url: '/:lang/sasretail/activation/cycle-management/:projectId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: activationUrlBase + 'cycle-management',
                        controller: 'CycleManagementController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('cycleServices', {
                url: '/:lang/sasretail/activation/cycle-services/:cycleId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: activationUrlBase + 'cycle-services',
                        controller: 'CycleServicesController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('surveyGeneral', {
                url: '/:lang/sasretail/activation/cycle-services/:cycleId/survey/general',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: activationUrlBase + 'survey-general',
                        controller: 'SurveyGeneralController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('surveyQuestions', {
                url: '/:lang/sasretail/activation/cycle-services/:cycleId/survey/questions',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: activationUrlBase + 'survey-questions',
                        controller: 'SurveyQuestionsController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('surveyTestrun', {
                url: '/:lang/sasretail/activation/cycle-services/:cycleId/survey/:surveyId/test-run/:runId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: activationUrlBase + 'survey-testrun',
                        controller: 'SurveyTestrunController'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('cycleServices.categoryReset', {
                url: '/category-reset',
                templateUrl: activationUrlBase + 'category-reset',
                controller: 'CategoryResetController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('cycleServices.survey', {
                url: '/survey',
                templateUrl: activationUrlBase + 'survey',
                controller: 'SurveyController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('cycleServices.nici', {
                url: '/nici',
                templateUrl: activationUrlBase + 'nici',
                controller: 'NiciController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('cycleServices.distributionVoid', {
                url: '/distribution-void',
                templateUrl: activationUrlBase + 'distribution-void',
                controller: 'DistributionVoidController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('cycleServices.planogramCompliance', {
                url: '/planogram-compliance',
                templateUrl: activationUrlBase + 'planogram-compliance',
                controller: 'PlanogramComplianceController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('cycleServices.promotionCheck', {
                url: '/promotion-check',
                templateUrl: activationUrlBase + 'promotion-check',
                controller: 'PromotionCheckController',
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('cycleServices.teamScheduling', {
                url: '/team-scheduling',
                templateUrl: activationUrlBase + 'team-scheduling',
                controller: 'TeamSchedulingController',
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('cycleServices.manageShifts', {
                url: '/manage-shifts/:visitId',
                templateUrl: activationUrlBase + 'manage-shifts',
                controller: 'ManageShiftsController',
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('projectEditStep3', {
                url: '/:lang/sasretail/project/edit-step3/:projectId',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: projectUrlBase + 'project-edit-billing',
                        controller: 'ProjectEditBillingController'
                    }

                },
                data: {
                    access:['Admin','Program Manager','Project Manager']
                }
            })
            .state('operations', {
                url: '/:lang/sasretail/operations',
                views: {
                    header: includeObject.header,
                    sidebar: includeObject.sidebar,
                    footer: includeObject.footer,
                    content: {
                        templateUrl: operationsUrlBase + 'operations-management-partial'
                    }
                },
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('operations.field', {
                url: '/field-data-management',
                templateUrl: operationsUrlBase + 'field-data-management',
                controller: 'FieldDataManagementController',
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }

            })
            .state('operations.time', {
                url: '/time-and-expense',
                templateUrl: operationsUrlBase + 'time-and-expense',
                controller: 'TimeAndExpenseController',
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('operations.schedule', {
                url: '/operations-schedule-view',
                templateUrl: operationsUrlBase + 'schedule',
                controller: 'OperationsScheduleController',
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('operations.scheduleMerchandiser', {
                url: '/operations-schedule-view',
                templateUrl: operationsUrlBase + 'schedule-merchandiser',
                controller: 'OperationsMerchandiserScheduleController',
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('operations.timeAndExpenseApproval', {
                url: '/:lang/sasretail/time-and-expense-approval/:id',
                templateUrl: operationsUrlBase + 'time-and-expense-approval',
                controller: 'TimeAndExpenseApprovalController',
                data: {
                    access:['Admin','Program Manager','Project Manager','Supervisor']
                }
            })
            .state('operations.billPrepMerchandiserView', {
                url: '/bill-prep-merchandiser-view',
                templateUrl: operationsUrlBase + 'bill-prep-merchandiser-view',
                controller: 'BillPrepMerchandiserController',
                data: {
                    access:['Admin','Program Manager']
                }
            });*/

            $urlRouterProvider.otherwise('/shoppingCart/dashboard');
            $locationProvider.html5Mode(true);
    });

    angular
        .module('shoppingCart')
        .run(run);

    run.$inject = ['$http','$rootScope','$anchorScroll','$localStorage','$state','$stateParams','SweetAlert'];

})(window, angular, _);













