import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/selectmenu';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/themes/base/selectmenu.css';
import './jquery-flight-search.scss';

(function ($) {

    let opts = null;
    let query = null;

    let containerClass = 'jquery-flight-search';
    let rowClass = 'jquery-flight-search-row';
    let rowGrowClass = 'jquery-flight-search-row-grow';
    let rowShrinkClass = 'jquery-flight-search-row-shrink';
    let inputBoxClass = 'box jquery-flight-search-input-box';
    let dateBoxClass = 'box jquery-flight-search-date-box';
    let radioBoxClass = 'box jquery-flight-search-radio-box';
    let submitBtnClass = 'box jquery-flight-search-submit-button';

    let $container = null;
    let $infoPanel = null;
    let $tripRow = null;
    let $fromToRow = null;
    let $dateRow = null;
    let $passengerRow = null;
    let $searchRow = null;

    function createContainer() {

        return $('<div />', {
            class: containerClass
        });

    }

    function rowFactory(isGrow) {

        return $('<div />', {
            class: rowClass + ' ' + (isGrow ? rowGrowClass : rowShrinkClass)
        });

    }

    function inputBoxFactory(type, label, name, value) {

        return $('<div />', {
            class: [inputBoxClass]
        }).append('<label for="'+ name +'">' + label + '</label>')
            .append('<input type="' + type + '" id="' + name + '"  name="' + name + '" value="' + value + '" />');

    }

    function calendarPickerBoxFactory(label, name, value) {

        console.log(value);

        let $datePicker = $('<div />').datepicker({
            defaultDate: value,
            onSelect: function (date, obj) {
                query[name] = date;
            }
        });

        return $('<div />', {
            class: dateBoxClass
        }).append('<label for="'+ name +'">' + label + '</label>')
            .append($datePicker);

    }

    function radioBoxFactory(name, value) {

        let radio = [];

        radio.push('<input type="radio" id="' + name + '" name="' + name + '" value="' + value + '" />');
        radio.push('<label for="' + name + '"> ' + value + '</label>');

        return $('<div />', {
            class: radioBoxClass
        }).append(radio.join(''));

    }

    function onInputChanged(e) {

        let target = e.target;
        query[target.name] = isNaN(parseInt(target.value)) ? target.value : parseInt(target.value);

    }

    function onSubmit() { 
        
        //Transform date format
        let finalQuery = $.extend({}, query, {
            departDate: getShortDate(query.departDate),
            returnDate: getShortDate(query.returnDate)
        });

        opts.onSearch(finalQuery);

        movePanel('-9999px');
    }

    function getShortDate(date) {

        let dateObj = date instanceof Date ? date : new Date(date);
        let month = (dateObj.getMonth() + 1) + '';
        let day = (dateObj.getDate()) + '';

        return [
            dateObj.getFullYear(),
            (month.length === 1 ? '0' + month : month),
            (day.length === 1 ? '0' + day : day)
        ].join('-');

    }

    function movePanel(top) { 
        $container.animate({
            top: top
        }, 600);
    }

    $.fn.flightSearchBox = function (options, q) {

        opts = $.extend(true, {}, $.fn.flightSearchBox.defaults, options);
        query = $.extend(true, {}, $.fn.flightSearchBox.defaultQuery, q);

        $container = createContainer();
        $tripRow = rowFactory(true);
        $fromToRow = rowFactory(false);
        $dateRow = rowFactory(true);
        $passengerRow = rowFactory(false);
        $searchRow = rowFactory(true);

        //Trip
        // $tripRow
        //     .append(radioBoxFactory('trip', opts.tripChoices[0]))
        //     .append(radioBoxFactory('trip', opts.tripChoices[1]));

        //From-To
        $fromToRow
            .append(inputBoxFactory('text', 'From', 'from', query.from).on('keyup', onInputChanged))
            .append(inputBoxFactory('text', 'To', 'to', query.to).on('keyup', onInputChanged));

        //Date picker row
        $dateRow
            .append(calendarPickerBoxFactory('Departure date', 'departDate', query.departDate))
            .append(calendarPickerBoxFactory('Return date', 'returnDate', query.returnDate));

        //Passenger row
        $passengerRow
            .append(inputBoxFactory('number', 'Adults', 'adults', query.adults, 1).on('keyup', onInputChanged))
            .append(inputBoxFactory('number', 'Children', 'children', query.children, 0).on('keyup', onInputChanged))
            .append(inputBoxFactory('number', 'Infants', 'infants', query.infants, 0).on('keyup', onInputChanged));

        //Search row
        let $submitBtn = $('<button class="' + submitBtnClass + '">Search Flights</button>');

        //On Search
        $submitBtn.on('click', function () {
            onSubmit();
        });

        $searchRow
            .append($submitBtn);

        //Append all rows
        $container.append([
            // $tripRow,
            $fromToRow,
            $dateRow,
            $passengerRow,
            $searchRow
        ]);

        //Insert plugin content into DOM        
        $(this).append($container);

        this.open = function () { 
            movePanel('0');
        };

        this.hide = function () { 
            movePanel('-9999px');
        };

        return this;
    }

    let departDate = new Date();
    let returnDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7));

    $.fn.flightSearchBox.defaults = {
        possiblePassengerNumber: 9,
        tripChoices: ['Return', 'One-Way'],
        onSearch: $.noop
    };

    $.fn.flightSearchBox.defaultQuery = {
        from: 'BKK',
        to: 'MEL',
        departDate: departDate,
        returnDate: returnDate,
        adults: 1,
        children: 0,
        infants: 0,
        cabinClass: 'Economy',
        oneWayOrReturn: 'Return',
        currencyCode: 'AUD'
    }



})(window.jQuery || jQuery || $);