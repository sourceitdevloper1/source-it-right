/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascript/new-app-checkout.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/new-app-checkout.js":
/*!****************************************!*\
  !*** ./javascript/new-app-checkout.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _new_checkout_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./new-checkout.js */ \"./javascript/new-checkout.js\");\n/* harmony import */ var _new_checkout_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_new_checkout_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./javascript/new-app-checkout.js?");

/***/ }),

/***/ "./javascript/new-checkout.js":
/*!************************************!*\
  !*** ./javascript/new-checkout.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class changeItems {\n  constructor() {\n    this.COD_OBJ = window.COD_OBJ;\n    this.pincodes = null;\n    this.init();\n  }\n\n  replaceData() {\n    var selectorHtml = $('.order-summary__section--product-list .product-table tbody');\n    var selectorAvailable = $('.line-items-main table tbody');\n    selectorHtml.replaceWith(selectorAvailable);\n  }\n\n  arrayLowerCase(arr){\n    if(arr && Array.isArray(arr)){\n      arr = arr.map(item => item.toLowerCase());\n    }\n    return arr;\n  }\n\n  initInformationStep() {\n    const CODTEXT = this.COD_OBJ.CODHideText || \"For selected country/state COD service disabled\";\n    this.cache = {\n      stateElem: '#checkout_shipping_address_province',\n      countryElem: '#checkout_shipping_address_country',\n      zip: '#checkout_shipping_address_zip',\n      city: '#checkout_shipping_address_city',\n      phone: '[data-step=\"contact_information\"] [data-customer-information-form] [data-address-field=\"phone\"]',\n      codTextElem: '[data-step=\"contact_information\"] [data-customer-information-form] .cod-warn-text',\n      codHtml:'<div class=\"cod-warn-text field field--show-floating-label\">' + CODTEXT + '</div>'\n    };\n\n    \n    this.validateCountryStateForCOD();\n    this.initInformationStepEvents();\n    \n    const zipcode = $(this.cache.zip).val();\n    if(zipcode)this.validateCODBaseOnPincode(zipcode);\n  }\n\n  initInformationStepEvents() {\n    const that = this;\n    $(\"#checkout_shipping_address_country, #checkout_shipping_address_province\").change(function() {\n      that.validateCountryStateForCOD();\n    });\n\n    $(that.cache.zip).keyup(function(e){\n      e = e || window.event;\n      if(e.shiftKey && e.keyCode == 9) { \n        return false;\n      }\n      if (e.which <= 90 && e.which >= 48 || e.which >= 96 && e.which <= 105) {\n        const pincode = $(this).val();\n        that.validateCODBaseOnPincode(pincode);\n      }\n      //if(![16,37,38,39,40].includes(e.keyCode)){}\n    });\n  }\n  \n  validateCODBaseOnPincode(pincode){\n    const that = this;\n    if(pincode && pincode.length === 6){\n      const areaObj = that.getPincodeArea(pincode);\n      if(areaObj){\n        const stateElem = that.cache.stateElem;\n        const cityElem = that.cache.city;\n  \n        const stateValue = $(stateElem).val();\n        let cityValue = $(cityElem).val();\n        cityValue = cityValue ? cityValue.toLowerCase() : '';\n        const State = areaObj.State.toLowerCase() || '';\n        let City = areaObj.City.toLowerCase();\n        City = City ? City.toLowerCase() : '';\n  \n        const hasCOD = areaObj['Has Cod'].toLowerCase();\n        $(that.cache.codTextElem).remove();\n        if(hasCOD === \"no\"){\n          const errorMsg = $(that.cache.codHtml);\n          setTimeout(function() {\n            if($(that.cache.codTextElem).length){\n              $(that.cache.codTextElem).remove();\n            }\n            errorMsg.insertBefore(that.cache.phone);\n          }, 100);\n        }\n        \n        if(City !== cityValue){\n          $(cityElem).val(City.toUpperCase());\n        }\n        $(stateElem).find('option').each(function(index, elem){\n          let altrnateValues = $(elem).attr('data-alternate-values');\n          if(altrnateValues){\n            altrnateValues = JSON.parse(altrnateValues);\n            altrnateValues = that.arrayLowerCase(altrnateValues);\n            if(altrnateValues.includes(State)){\n              let value = $(elem).attr('value');\n              if(value === stateValue) {\n                return false;\n              } else {\n                $(stateElem).val(value).trigger('change');\n                return false;\n              }\n            }\n          }\n        });\n      }\n    }\n  }\n  \n  validateCountryStateForCOD() {\n    const that = this;\n    const hideCODEnable = this.COD_OBJ.hideCODEnable || false;\n    if(hideCODEnable){\n      let country = $(this.cache.countryElem).val();\n      country = country ? country.toLowerCase() : '';\n      const state = $(this.cache.stateElem).val();\n      const hideCODStates = this.COD_OBJ.hideCODStates || [];\n  \n      $(this.cache.codTextElem).remove();\n      const errorMsg = $(this.cache.codHtml);\n      let showErrorMsg = false;\n  \n      if(country === 'india'){\n        if(state && hideCODStates.includes(state)){\n          showErrorMsg = true;\n        }\n      } else {\n        showErrorMsg = true;\n      }\n  \n      if(showErrorMsg){\n        setTimeout(function() {\n          $(that.cache.codTextElem).remove();\n          errorMsg.insertBefore(that.cache.phone);\n        }, 100);\n      }\n    }\n  }\n\n  initShippingStep() {}\n\n  initPaymentStep() {\n    this.initPaymentStepEvents();\n  }\n\n  initPaymentStepEvents() {\n    const hideCODForCountry = this.COD_OBJ.hideCODForCountry || false;\n    if(hideCODForCountry){\n      const shipping_address = this.COD_OBJ.shipping_address;\n      if (shipping_address && shipping_address.country_code) {\n        let country_code = shipping_address.country_code;\n        let pincode = shipping_address.zip;\n        let hideCOD = false;\n        \n        if (country_code) {\n          country_code = country_code.toLowerCase();\n          if (country_code !== 'in'){\n            hideCOD = true;\n          } else {\n            const hideCODStates = this.COD_OBJ.hideCODStates || [];\n            const province_code = shipping_address.province_code;\n            if(province_code && hideCODStates.includes(province_code)){\n              hideCOD = true;\n            }\n            if(pincode && (!hideCOD)){\n              const areaObj = this.getPincodeArea(pincode);\n              if(areaObj && areaObj['Has Cod']){\n                const hasCOD = areaObj['Has Cod'].toLowerCase();\n                if(hasCOD === 'no'){\n                  hideCOD = true;\n                }\n              }\n            }\n          }\n        }\n        if(hideCOD){\n          $('[data-step=\"payment_method\"] [data-payment-method] [data-select-gateway=\"48777363595\"]').hide()\n        }\n      }\n    }\n    const isBannerExist = $('.step[data-step=\"payment_method\"] [data-payment-form] .checkout-offer-banner').length;\n    if(isBannerExist === 0){\n      const bannerSrc = this.COD_OBJ.offer_banner || '//cdn.shopify.com/s/files/1/0285/2667/4059/files/no-image-large.gif?v=1622456844';\n      $(\"<div class='checkout-offer-banner'><img src='https:\" + bannerSrc + \"' alt='Free Mask at \" + Shopify.shop + \" ' /></div>\").insertBefore('.step[data-step=\"payment_method\"] [data-payment-form] [data-payment-method]');\n    }\n  }\n\n  getPincodeArea(pincode){\n    if(pincode && this.pincodes){\n      const pincodes_arr = this.pincodes;\n      const areaObj = pincodes_arr.filter(p => p.Pincode === pincode)[0];\n      if(areaObj){\n        return areaObj;\n      }\n    }\n    return null;\n  }\n\n  fetchPincodes(){\n    const pincode_url = $('#pcd_url').val();\n    const that = this;\n    if(pincode_url){\n      fetch(pincode_url)\n      .then(res => res.json())\n      .then(data => {\n        that.pincodes = data;\n        that.initStepEvents();\n      })\n      .catch(err => console.log(err))\n    }\n  }\n\n  initStepEvents(){\n    switch(Shopify.Checkout.step){\n      case 'contact_information': this.initInformationStep(); break;\n      case 'shipping_method': this.initShippingStep(); break;\n      case 'payment_method': this.initPaymentStep(); break;\n    }\n  }\n\n  init() {\n    this.fetchPincodes();\n    this.replaceData();\n    this.initStepEvents();\n  }\n}\n\n$(document).on('page:ready page:load page:change page:refresh', function() {\n  new changeItems;\n})\n\n//# sourceURL=webpack:///./javascript/new-checkout.js?");

/***/ })

/******/ });