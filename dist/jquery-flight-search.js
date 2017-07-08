(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("jFlightSearch", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["jFlightSearch"] = factory(require("jQuery"));
	else
		root["jFlightSearch"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function ($) {

    var containerClass = 'jquery-flight-search';
    var rowClass = 'jquery-flight-search-row';
    var inputBoxClass = 'jquery-flight-search-input-box';
    var dateBoxClass = 'jquery-flight-search-date-box';

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

        var opts = $.extend(true, {}, $.fn.flightSearchBox.defaults, options);
        var query = $.extend(true, {}, $.fn.flightSearchBox.defaultQuery, q);

        var $submitBtn = $('<button>Search Flights</button>');
        $submitBtn.on('click', function () {
            console.log(query);
            opts.onSearch.call(query);
        });

        var $container = createContainer();
        var $tripRow = rowFactory();
        var $fromToRow = rowFactory();
        var $dateRow = rowFactory();
        var $passengerRow = rowFactory();

        //From-To    
        var onInputChanged = function onInputChanged(e) {
            var target = e.target;
            query[target.name] = target.value;
        };

        $fromToRow.append(inputBoxFactory('from', query.from).on('keyup', onInputChanged)).append(inputBoxFactory('to', query.to).on('keyup', onInputChanged));

        $dateRow.append(calendarPickerBoxFactory('departDate', query.departDate)).append(calendarPickerBoxFactory('returnDate', query.returnDate));

        $passengerRow.append($submitBtn);

        $container.append([$tripRow, $fromToRow, $dateRow, $passengerRow]);

        //Insert plugin content into DOM        
        $(this).append($container);

        return this;
    };

    $.fn.flightSearchBox.defaults = {
        onSearch: $.noop
    };

    var departDate = new Date();
    var returnDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    function getShortDate(date) {

        var month = date.getMonth() + 1 + '';
        var day = date.getDate() + 1 + '';

        return [date.getFullYear(), month.length === 1 ? '0' + month : month, day.length === 1 ? '0' + day : day].join('-');
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
    };
})(__webpack_provided_window_dot_jQuery || jQuery || $);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=jquery-flight-search.js.map