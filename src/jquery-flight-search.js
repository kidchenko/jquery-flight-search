import * as $ from 'jquery';
import './jquery-flight-search.scss';

(function($) { 

    $.fn.flightSearchBox = function (options) { 
        
        let opts = $.extend(true, {}, $.fn.flightSearchBox.defaults, options);

        $(this).append('<h1 class="jquery-flight-search">Flight Search Box</h1>');

        return this;
    }

    $.fn.flightSearchBox.defaults = {
        onSearch: $.noop
    };



})(window.jQuery || jQuery || $);