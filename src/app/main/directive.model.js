/**
 * Created by Ziv on 3/15/2016.
 */
     angular
    .module('rss')
    .directive('box', function() {
    return {
        restrict: 'E',
        replace: 'true',
        template: '<div>    <div class="box-head">{{item.title}} <span class="date"><span class="fa fa-calendar"></span>{{date}}</span></div><p>{{item.description}}</p></div>'
    };
});