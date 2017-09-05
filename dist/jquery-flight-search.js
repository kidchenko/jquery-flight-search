(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"), require("jquery-ui/ui/widgets/datepicker"), require("jquery-ui/ui/widgets/selectmenu"), require("jquery-ui/themes/base/datepicker.css"), require("jquery-ui/themes/base/selectmenu.css"));
	else if(typeof define === 'function' && define.amd)
		define("jFlightSearch", ["jQuery", "jquery-ui/ui/widgets/datepicker", "jquery-ui/ui/widgets/selectmenu", "jquery-ui/themes/base/datepicker.css", "jquery-ui/themes/base/selectmenu.css"], factory);
	else if(typeof exports === 'object')
		exports["jFlightSearch"] = factory(require("jQuery"), require("jquery-ui/ui/widgets/datepicker"), require("jquery-ui/ui/widgets/selectmenu"), require("jquery-ui/themes/base/datepicker.css"), require("jquery-ui/themes/base/selectmenu.css"));
	else
		root["jFlightSearch"] = factory(root["jQuery"], root["jquery-ui/ui/widgets/datepicker"], root["jquery-ui/ui/widgets/selectmenu"], root["jquery-ui/themes/base/datepicker.css"], root["jquery-ui/themes/base/selectmenu.css"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, jQuery) {

var _jquery = __webpack_require__(0);

var $ = _interopRequireWildcard(_jquery);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function ($) {

    var opts = null;
    var query = null;

    var containerClass = 'jquery-flight-search';
    var rowClass = 'jquery-flight-search-row';
    var rowGrowClass = 'jquery-flight-search-row-grow';
    var rowShrinkClass = 'jquery-flight-search-row-shrink';
    var inputBoxClass = 'box jquery-flight-search-input-box';
    var dateBoxClass = 'box jquery-flight-search-date-box';
    var radioBoxClass = 'box jquery-flight-search-radio-box';
    var submitBtnClass = 'box jquery-flight-search-submit-button';

    var $container = null;
    var $infoPanel = null;
    var $tripRow = null;
    var $fromToRow = null;
    var $dateRow = null;
    var $passengerRow = null;
    var $searchRow = null;

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
        }).append('<label for="' + name + '">' + label + '</label>').append('<input type="' + type + '" id="' + name + '"  name="' + name + '" value="' + value + '" />');
    }

    function calendarPickerBoxFactory(label, name, value) {

        console.log(value);

        var $datePicker = $('<div />').datepicker({
            defaultDate: value,
            onSelect: function onSelect(date, obj) {
                query[name] = date;
            }
        });

        return $('<div />', {
            class: dateBoxClass
        }).append('<label for="' + name + '">' + label + '</label>').append($datePicker);
    }

    function radioBoxFactory(name, value) {

        var radio = [];

        radio.push('<input type="radio" id="' + name + '" name="' + name + '" value="' + value + '" />');
        radio.push('<label for="' + name + '"> ' + value + '</label>');

        return $('<div />', {
            class: radioBoxClass
        }).append(radio.join(''));
    }

    function onInputChanged(e) {

        var target = e.target;
        query[target.name] = isNaN(parseInt(target.value)) ? target.value : parseInt(target.value);
    }

    function onSubmit() {

        //Transform date format
        var finalQuery = $.extend({}, query, {
            departDate: getShortDate(query.departDate),
            returnDate: getShortDate(query.returnDate)
        });

        opts.onSearch(finalQuery);

        movePanel('-9999px');
    }

    function getShortDate(date) {

        var dateObj = date instanceof Date ? date : new Date(date);
        var month = dateObj.getMonth() + 1 + '';
        var day = dateObj.getDate() + '';

        return [dateObj.getFullYear(), month.length === 1 ? '0' + month : month, day.length === 1 ? '0' + day : day].join('-');
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
        $fromToRow.append(inputBoxFactory('text', 'From', 'from', query.from).on('keyup', onInputChanged)).append(inputBoxFactory('text', 'To', 'to', query.to).on('keyup', onInputChanged));

        //Date picker row
        $dateRow.append(calendarPickerBoxFactory('Departure date', 'departDate', query.departDate)).append(calendarPickerBoxFactory('Return date', 'returnDate', query.returnDate));

        //Passenger row
        $passengerRow.append(inputBoxFactory('number', 'Adults', 'adults', query.adults, 1).on('keyup', onInputChanged)).append(inputBoxFactory('number', 'Children', 'children', query.children, 0).on('keyup', onInputChanged)).append(inputBoxFactory('number', 'Infants', 'infants', query.infants, 0).on('keyup', onInputChanged));

        //Search row
        var $submitBtn = $('<button class="' + submitBtnClass + '">Search Flights</button>');

        //On Search
        $submitBtn.on('click', function () {
            onSubmit();
        });

        $searchRow.append($submitBtn);

        //Append all rows
        $container.append([
        // $tripRow,
        $fromToRow, $dateRow, $passengerRow, $searchRow]);

        //Insert plugin content into DOM        
        $(this).append($container);

        this.open = function () {
            movePanel('0');
        };

        this.hide = function () {
            movePanel('-9999px');
        };

        return this;
    };

    var departDate = new Date();
    var returnDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

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
    };
})(__webpack_provided_window_dot_jQuery || jQuery || $);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=jquery-flight-search.js.map