import * as $ from 'jquery';
import './jquery-flight-search.scss';

(function ($) {

    let containerClass = 'jquery-flight-search';
    let rowClass = 'jquery-flight-search-row';
    let inputBoxClass = 'jquery-flight-search-input-box';
    let dateBoxClass = 'jquery-flight-search-date-box';

    function createContainer() {

        return $('<div />', {
            class: containerClass
        });

    }

    function rowFactory() {

        return $('<div />', {
            class: [rowClass]
        });

    }

    function inputBoxFactory(name, val) {

        return $('<div />', {
            class: [inputBoxClass]
        }).append('<input type="text" name="' + name + '" value="' + val + '" />');

    }

    function calendarPickerBoxFactory(name, val) {

        return $('<div />', {
            class: [dateBoxClass]
        }).append('<input type="date" name="' + name + '" value="' + val + '" />');

    }

    $.fn.flightSearchBox = function (options, q) {

        let opts = $.extend(true, {}, $.fn.flightSearchBox.defaults, options);
        let query = $.extend(true, {}, $.fn.flightSearchBox.defaultQuery, q);

        let $submitBtn = $('<button>Search Flights</button>');
        $submitBtn.on('click', function () {
            console.log(query);
            opts.onSearch(query);
        });

        let $container = createContainer();
        let $tripRow = rowFactory();
        let $fromToRow = rowFactory();
        let $dateRow = rowFactory();
        let $passengerRow = rowFactory();

        //From-To    
        let onInputChanged = function (e) { 
            let target = e.target;
            query[target.name] = target.value;
        }

        $fromToRow
            .append(inputBoxFactory('from', query.from).on('keyup', onInputChanged))
            .append(inputBoxFactory('to', query.to).on('keyup', onInputChanged));

        $dateRow
            .append(calendarPickerBoxFactory('departDate', query.departDate))
            .append(calendarPickerBoxFactory('returnDate', query.returnDate));

        $passengerRow
            .append($submitBtn);


        $container.append([
            $tripRow,
            $fromToRow,
            $dateRow,
            $passengerRow
        ]);

        //Insert plugin content into DOM        
        $(this).append($container);

        return this;
    }

    $.fn.flightSearchBox.defaults = {
        onSearch: $.noop
    };

    let departDate = new Date();
    let returnDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7));

    function getShortDate(date) {

        let month = (date.getMonth() + 1) + '';
        let day = (date.getDate() + 1) + '';

        return [
            date.getFullYear(),
            (month.length === 1 ? '0' + month : month),
            (day.length === 1 ? '0' + day : day)
        ].join('-');
    }

    $.fn.flightSearchBox.defaultQuery = {
        from: 'BKK',
        to: 'MEL',
        departDate: getShortDate(departDate),
        returnDate: getShortDate(returnDate),
        adults: 1,
        children: 0,
        infants: 0,
        cabinClass: 'Economy',
        oneWayOrReturn: 'Return',
        currencyCode: 'AUD'
    }



})(window.jQuery || jQuery || $);