var $ = require('jquery');
var iconActiveClass = "icon-active";
var htmlPath = "/plugins/visualizations/BizibleFilters/BizibleFrame.html"
var originPath = "https://52.162.241.35:9999";
looker.plugins.visualizations.add({
    id: "bizible_dash_frame",
    label: "Bizible Dash Frame",
    options: {
        dashboard_num: {
            type: "number",
            label: "Dashboard #",
            placeholder: ""
        },
        date_options: {
            type: "string",
            label: "Date Options (separated by ,)",
            placeholder: ""
        }
      },
    // Set up the initial state of the visualization
    create: function (element, config) {
        // Create a container element to let us center the text.
        var dashboard_num = config.dashboard_num;
        var srcUrl = originPath + "/embed/dashboards/" + dashboard_num + "?embed_domain=" + originPath;
        element.innerHTML = '<iframe id="looker" src="' + srcUrl + '" style="width:100%;height:100%"></iframe>';
        Bizible = {};
        Bizible.frameId = "";
        Bizible.onClickIcon = this.onClickIcon;
        Bizible.updateCustomFilter = this.updateCustomFilter;
        Bizible.sendCurrentFilterType = this.sendCurrentFilterType;
        $("#dashboard-filter-section").hide();
    },
    // Render in response to the data or settings changing
    update: function (data, element, config, queryResponse) {

        // Clear any errors from previous updates
        this.clearErrors();
        Bizible["filters-looker-" + config.id] = queryResponse.applied_filters;
        this.setupIFrame(element, config.id, queryResponse.applied_filters);
    },

    updateCustomFilter: function(filterValue, frameId) {
        var iframe = document.getElementById(frameId);
        iframe.contentWindow.postMessage(JSON.stringify({
            type: "dashboard:filters:update",
            filters: {
                "DateTypeFilter": filterValue
            }
        }), originPath);

        iframe.contentWindow.postMessage(JSON.stringify({
            type: "dashboard:run"
        }), originPath);
    },
    setupIFrame: function(element, id, applied_filters) {

        var frame = $(element).find("iframe")[0];
        Bizible.frameId = "looker-" + id;
        $(frame).attr("id",Bizible.frameId);
        window.addEventListener("message", function (event) {
            //Always validate the origin of messages before you trust their contents!
            //if(event.origin!=="https://expected-origin/"){return;}
            //See https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Security_concerns
            var sourceFrameId = event.source.frameElement.id;
            if (event.origin !== originPath) {
                return;
            }
            var curData = JSON.parse(event.data);
            if (curData.type == "dashboard:filters:changed") {
                this.curFilter = curData.dashboard.dashboard_filters["DateTypeFilter"];
            }
            if (curData && curData.Type && curData.Type == "Bizible Custom Filter") {
                Bizible.updateCustomFilter(curData.FilterValue, sourceFrameId)
            }
            if (curData && curData.Type == "DashReady") {
                var curDashFilter = Bizible["filters-" + sourceFrameId];
                if (curDashFilter && !jQuery.isEmptyObject(curDashFilter)) {
                    for(var curFilterProp in curDashFilter)
                    {
                        if (curDashFilter.hasOwnProperty(curFilterProp))
                        {
                            var curFilter = curDashFilter[curFilterProp];
                            var curType = curFilter.field.type;
                            if (curType == "date_month") {
                                var iframe = document.getElementById(sourceFrameId);
                                iframe.contentWindow.postMessage(JSON.stringify({
                                    type: "dashboard:filters:update",
                                    filters: {
                                        "MonthFilter": curFilter.value
                                    }
                                }), originPath);
                        
                                iframe.contentWindow.postMessage(JSON.stringify({
                                    type: "dashboard:run"
                                }), originPath);
                            }
                        }
                    }
                }
            }
          });   
    }
});