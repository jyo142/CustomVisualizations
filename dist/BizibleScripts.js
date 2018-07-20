/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
				window.parent.func = function() {alert("test")};
	      // Insert the data into the page.
				window.parent.func();
	      // Always call done to indicate a visualization has finished rendering.
	      this.clearErrors();   
	    }
	  })

/***/ })
/******/ ]);