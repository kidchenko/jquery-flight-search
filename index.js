import * as jQuery from 'jquery';

(function($) { 

    $.fn.flightSearchBox = function (options) { 
        
        let opts = $.extend(true, {}, $.fn.flightSearchBox.defaults, options);

        $(this).append('<h1>Flight Search Box</h1>');

        return this;
    }

    $.fn.flightSearchBox.defaults = {
        onSearch: $.noop
    };



})(jQuery);