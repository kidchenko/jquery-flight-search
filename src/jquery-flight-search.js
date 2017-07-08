import * as $ from 'jquery';
import './jquery-flight-search.scss';

(function ($) { 

    let containerClass = 'jquery-flight-search';
    
    function createContainer() { 

        return $('<div />')
            .addClass(containerClass);

    }

    function inputBoxFactory() { }

    function calendarPickerBoxFactory() { }

    $.fn.flightSearchBox = function (options) { 
        
        let opts = $.extend(true, {}, $.fn.flightSearchBox.defaults, options);

        let $container = createContainer();
        

        //Insert plugin content into DOM        
        $(this).append($container);

        return this;
    }

    $.fn.flightSearchBox.defaults = {
        onSearch: $.noop
    };



})(window.jQuery || jQuery || $);