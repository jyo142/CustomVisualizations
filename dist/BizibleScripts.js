(function() {
  // function to format axis label (sort of)
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function changeLowerMenuFilterNames(curElem, allCategories) {
    var curTable =  curElem.find(".filters .explore-filters");
    var curTableBody = curTable.find("tbody");
    var curTableRows = curTableBody.children();
    var numCategoriesFound = 0;
    curTableRows.each(function(index) {
      var curRow = $(this);
      var curNameColumn = curRow.find(".filter-name");
      if (curNameColumn.length > 0 && !curRow.hasClass("clause") && curNameColumn.text().indexOf("Category") != -1) {
        if (numCategoriesFound < allCategories.length) {
          curNameColumn.text(allCategories[numCategoriesFound]);
          numCategoriesFound += 1;
        } else {
          curRow.remove();
        }
      }
    });
  }

  function changeTopMenuFilterNames(curElem, allCategories) {
    var allSubTitles = $(".dashboard-filter-section-header .title .subtitle");
    var allDescriptions = allSubTitles.find(".ng-binding .descriptions");
    var numCategoriesFound = 0;
    allDescriptions.each(function(index) {
      var curDescriptionElem = $(this);
      if (curDescriptionElem.text().indexOf("Category") != -1) {
        var boldedElem = $(this).find("strong")[0];
        var boldedText = boldedElem.outerHTML;
        if (numCategoriesFound < allCategories.length) {
          var newHtmlText = allCategories[numCategoriesFound] + " " + boldedText;
          curDescriptionElem[0].innerHTML = newHtmlText;
          numCategoriesFound += 1;
        } else {
          curDescriptionElem.remove();
        }
      }
    });
  }
  var viz = {
    id: 'bizibleCustomScript',
    label: 'Bizible Custom Script',
    options: {
    },
    handleErrors: function(data, resp) {
      if (!resp || !resp.fields) return null;
      return true;
    },

    create: function(element, settings) {
      Bizible = {};
      $(window).on("message", (event) => {
        //Always validate the origin of messages before you trust their contents!
        try {
          var curData = JSON.parse(event.originalEvent.data);
          var allCategories = curData.categories;
          if (curData.type == "categoryNames") {
            Bizible.AllCategories = allCategories;
            changeTopMenuFilterNames($(this), Bizible.AllCategories)
          }
          if (curData.type == "trackingInfo") {          
              
          }
        } catch (e) {

        }
        

        $("#dashboard-filter-section").click(function() {
					changeLowerMenuFilterNames($(this), Bizible.AllCategories);
					changeTopMenuFilterNames($(this), Bizible.AllCategories)
        });
      });
      
    },

    update: function(data, element, settings, resp) {
      if (!this.handleErrors(data, resp)) return;
      $(element).html("")
    }
  };

  looker.plugins.visualizations.add(viz);

}());
