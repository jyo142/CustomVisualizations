looker.plugins.visualizations.add({
    create: function(element, config) {
    // Insert a <style> tag with some styles we'll use later.
    var css = element.innerHTML = `
    <style>
      .hello-world-vis {
        // Vertical centering
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
    </style>
  `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "hello-world-vis";

    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement("div"));
    },
    updateAsync: function(data, element, config, queryResponse, done) {
      // Grab the first cell of the data.
      var firstRow = data[0];
  
      // Insert the data into the page.
  
      // Always call done to indicate a visualization has finished rendering.
      this.clearErrors();   
    }
  })