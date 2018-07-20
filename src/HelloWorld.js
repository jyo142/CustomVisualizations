var $ = require('jquery');
var iconActiveClass = "icon-active";
looker.plugins.visualizations.add({
    id: "bizible_filter_prototype",
    label: "Bizible Filter Prototype",
    options: {
        font_size: {
            type: "string",
            label: "Font Size",
            values: [
                { "Large": "large" },
                { "Small": "small" }
            ],
            display: "radio",
            default: "large"
        }
    },
    // Set up the initial state of the visualization
    create: function (element, config) {
        // Create a container element to let us center the text.
        $.get( "/plugins/visualizations/Testing/HelloWorld.html", function( data ) {
            element.innerHTML = data;
        });
        Bizible = {};
        Bizible.onClickIcon = this.onClickIcon;
        $("#dashboard-filter-section").hide();
    },
    // Render in response to the data or settings changing
    update: function (data, element, config, queryResponse) {

        // Clear any errors from previous updates
        this.clearErrors();

        // Throw some errors and exit if the shape of the data isn't what this chart needs
        if (queryResponse.fields.dimensions.length == 0) {
            this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
            return;
        }        
    },

    onClickIcon: function(icon) {
        if (!$(icon).hasClass(iconActiveClass)) {
            $(icon).addClass(iconActiveClass);
            $(icon).siblings().each(function() {
                $(this).removeClass(iconActiveClass);
            });
        }
    },

    closeDate: function(){
        parent.postMessage(`{
            "FilterName": "Date Type Filter",
            "FilterValue": "CLOSEDATE"
        }`, 'http://localhost:5000');
        $(".biz_button_active").removeClass("biz_button_active");
        $("#biz_close_date").addClass("biz_button_active");
    },
    createdDate: function () {
        parent.postMessage(`{
            "FilterName": "Date Type Filter",
            "FilterValue": "CREATEDDATE^_CRM"
        }`, 'http://localhost:5000');
        $(".biz_button_active").removeClass("biz_button_active");
        $("#biz_created_date").addClass("biz_button_active");
    },
    touchpointDate: function () {
        parent.postMessage(`{
            "FilterName": "Date Type Filter",
            "FilterValue": "Touchpoint Date"
        }`, 'http://localhost:5000');
        $(".biz_button_active").removeClass("biz_button_active");
        $("#biz_touchpoint_date").addClass("biz_button_active");
    }
});