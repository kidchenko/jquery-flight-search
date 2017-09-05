'use strict';

$(document).ready(function () {
    console.log("ready!");
    var jFlightSearch = $('body').flightSearchBox({
        onSearch: function (query) { 
            console.log(query);
        }
    });
    jFlightSearch.open();
});