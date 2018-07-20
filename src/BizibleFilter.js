var $ = require('jquery');
var iconActiveClass = "icon-active";
var htmlPath = "/plugins/visualizations/BizibleFilters/BizibleFilter.html"
var selectOptions = [
{
    value: "modifieddate",
    text: "Modified Date"
},
{
    value: "createddate",
    text: "Created Date"
}];
var originPath = "https://52.162.241.35:9999";
looker.plugins.visualizations.add({
    id: "bizible_filter_prototype",
    label: "Bizible Filter Prototype",
    options: {
        date_options: {
            type: "string",
            label: "Date Options (JSON format)",
            placeholder: ""
        },
        default_date: {
            type: "string",
            label: "Default Date Option",
            placeholder: ""
        }
    },
    // Set up the initial state of the visualization
    create: function (element, config) {
        // Create a container element to let us center the text.
        var allDateOptions = JSON.parse(config.date_options);
        var defaultOption = config.default_date;
        $.get(htmlPath, function( data ) {
            element.innerHTML = data;
            var dropdown = $("#dateSelect");
            $.each(allDateOptions, function() {
                var curOption = $("<option />").val(this.value).text(this.text);
                if (this.value == defaultOption) {
                    curOption.prop("selected", true);
                }
                dropdown.append(curOption);
            });
        });
        Bizible = {};
        Bizible.onChangeOption = this.onChangeOption;
        Bizible.onClickIcon = this.onClickIcon;
        Bizible.allDateOptions = allDateOptions;
        Bizible.notifyDashReady = this.notifyDashReady;
        Bizible.curSelected = selectOptions[0];
        $("#dashboard-filter-section").hide();
    },
    // Render in response to the data or settings changing
    update: function (data, element, config, queryResponse) {
        // Clear any errors from previous updates
        Bizible.notifyDashReady();
        this.clearErrors();   
    },

    notifyDashReady: function() {
        var dashReadyMessage = {
            Type: "DashReady",
        };
        parent.postMessage(JSON.stringify(dashReadyMessage), originPath);
    },

    onChangeOption: function() {
        var curSelectValue = $("#dateSelect").val();
        var curSelected = $.grep(Bizible.allDateOptions, function (e) { return e.value == curSelectValue })[0];
        var filterMessage = {
            Type: "Bizible Custom Filter",
            FilterValue: curSelected.value,
        };
        parent.postMessage(JSON.stringify(filterMessage), originPath);
    },

    onClickIcon: function(icon) {
        if (!$(icon).hasClass(iconActiveClass)) {
            $(icon).addClass(iconActiveClass);
            $(icon).siblings().each(function() {
                $(this).removeClass(iconActiveClass);
            });
        }
    }
});