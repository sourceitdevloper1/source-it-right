class changeItems {
  constructor() {
    this.COD_OBJ = window.COD_OBJ;
    this.pincodes = null;
    this.init();
  }

  replaceData() {
    var selectorHtml = $('.order-summary__section--product-list .product-table tbody');
    var selectorAvailable = $('.line-items-main table tbody');
    selectorHtml.replaceWith(selectorAvailable);
  }

  arrayLowerCase(arr){
    if(arr && Array.isArray(arr)){
      arr = arr.map(item => item.toLowerCase());
    }
    return arr;
  }

  initInformationStep() {
    const CODTEXT = this.COD_OBJ.CODHideText || "For selected country/state COD service disabled";
    this.cache = {
      stateElem: '#checkout_shipping_address_province',
      countryElem: '#checkout_shipping_address_country',
      zip: '#checkout_shipping_address_zip',
      city: '#checkout_shipping_address_city',
      phone: '[data-step="contact_information"] [data-customer-information-form] [data-address-field="phone"]',
      codTextElem: '[data-step="contact_information"] [data-customer-information-form] .cod-warn-text',
      codHtml:'<div class="cod-warn-text field field--show-floating-label">' + CODTEXT + '</div>'
    };

    
    this.validateCountryStateForCOD();
    this.initInformationStepEvents();
    
    const zipcode = $(this.cache.zip).val();
    if(zipcode)this.validateCODBaseOnPincode(zipcode);
  }

  initInformationStepEvents() {
    const that = this;
    $("#checkout_shipping_address_country, #checkout_shipping_address_province").change(function() {
      that.validateCountryStateForCOD();
    });

    $(that.cache.zip).keyup(function(e){
      e = e || window.event;
      if(e.shiftKey && e.keyCode == 9) { 
        return false;
      }
      if (e.which <= 90 && e.which >= 48 || e.which >= 96 && e.which <= 105) {
        const pincode = $(this).val();
        that.validateCODBaseOnPincode(pincode);
      }
      //if(![16,37,38,39,40].includes(e.keyCode)){}
    });
  }
  
  validateCODBaseOnPincode(pincode){
    const that = this;
    if(pincode && pincode.length === 6){
      const areaObj = that.getPincodeArea(pincode);
      if(areaObj){
        const stateElem = that.cache.stateElem;
        const cityElem = that.cache.city;
  
        const stateValue = $(stateElem).val();
        let cityValue = $(cityElem).val();
        cityValue = cityValue ? cityValue.toLowerCase() : '';
        const State = areaObj.State.toLowerCase() || '';
        let City = areaObj.City.toLowerCase();
        City = City ? City.toLowerCase() : '';
  
        const hasCOD = areaObj['Has Cod'].toLowerCase();
        $(that.cache.codTextElem).remove();
        if(hasCOD === "no"){
          const errorMsg = $(that.cache.codHtml);
          setTimeout(function() {
            if($(that.cache.codTextElem).length){
              $(that.cache.codTextElem).remove();
            }
            errorMsg.insertBefore(that.cache.phone);
          }, 100);
        }
        
        if(City !== cityValue){
          $(cityElem).val(City.toUpperCase());
        }
        $(stateElem).find('option').each(function(index, elem){
          let altrnateValues = $(elem).attr('data-alternate-values');
          if(altrnateValues){
            altrnateValues = JSON.parse(altrnateValues);
            altrnateValues = that.arrayLowerCase(altrnateValues);
            if(altrnateValues.includes(State)){
              let value = $(elem).attr('value');
              if(value === stateValue) {
                return false;
              } else {
                $(stateElem).val(value).trigger('change');
                return false;
              }
            }
          }
        });
      }
    }
  }
  
  validateCountryStateForCOD() {
    const that = this;
    const hideCODEnable = this.COD_OBJ.hideCODEnable || false;
    if(hideCODEnable){
      let country = $(this.cache.countryElem).val();
      country = country ? country.toLowerCase() : '';
      const state = $(this.cache.stateElem).val();
      const hideCODStates = this.COD_OBJ.hideCODStates || [];
  
      $(this.cache.codTextElem).remove();
      const errorMsg = $(this.cache.codHtml);
      let showErrorMsg = false;
  
      if(country === 'india'){
        if(state && hideCODStates.includes(state)){
          showErrorMsg = true;
        }
      } else {
        showErrorMsg = true;
      }
  
      if(showErrorMsg){
        setTimeout(function() {
          $(that.cache.codTextElem).remove();
          errorMsg.insertBefore(that.cache.phone);
        }, 100);
      }
    }
  }

  initShippingStep() {}

  initPaymentStep() {
    this.initPaymentStepEvents();
  }

  initPaymentStepEvents() {
    const hideCODForCountry = this.COD_OBJ.hideCODForCountry || false;
    if(hideCODForCountry){
      const shipping_address = this.COD_OBJ.shipping_address;
      if (shipping_address && shipping_address.country_code) {
        let country_code = shipping_address.country_code;
        let pincode = shipping_address.zip;
        let hideCOD = false;
        
        if (country_code) {
          country_code = country_code.toLowerCase();
          if (country_code !== 'in'){
            hideCOD = true;
          } else {
            const hideCODStates = this.COD_OBJ.hideCODStates || [];
            const province_code = shipping_address.province_code;
            if(province_code && hideCODStates.includes(province_code)){
              hideCOD = true;
            }
            if(pincode && (!hideCOD)){
              const areaObj = this.getPincodeArea(pincode);
              if(areaObj && areaObj['Has Cod']){
                const hasCOD = areaObj['Has Cod'].toLowerCase();
                if(hasCOD === 'no'){
                  hideCOD = true;
                }
              }
            }
          }
        }
        if(hideCOD){
          $('[data-step="payment_method"] [data-payment-method] [data-select-gateway="48777363595"]').hide()
        }
      }
    }
    const isBannerExist = $('.step[data-step="payment_method"] [data-payment-form] .checkout-offer-banner').length;
    if(isBannerExist === 0){
      const bannerSrc = this.COD_OBJ.offer_banner || '//cdn.shopify.com/s/files/1/0285/2667/4059/files/no-image-large.gif?v=1622456844';
      $("<div class='checkout-offer-banner'><img src='https:" + bannerSrc + "' alt='Free Mask at " + Shopify.shop + " ' /></div>").insertBefore('.step[data-step="payment_method"] [data-payment-form] [data-payment-method]');
    }
  }

  getPincodeArea(pincode){
    if(pincode && this.pincodes){
      const pincodes_arr = this.pincodes;
      const areaObj = pincodes_arr.filter(p => p.Pincode === pincode)[0];
      if(areaObj){
        return areaObj;
      }
    }
    return null;
  }

  fetchPincodes(){
    const pincode_url = $('#pcd_url').val();
    const that = this;
    if(pincode_url){
      fetch(pincode_url)
      .then(res => res.json())
      .then(data => {
        that.pincodes = data;
        that.initStepEvents();
      })
      .catch(err => console.log(err))
    }
  }

  initStepEvents(){
    switch(Shopify.Checkout.step){
      case 'contact_information': this.initInformationStep(); break;
      case 'shipping_method': this.initShippingStep(); break;
      case 'payment_method': this.initPaymentStep(); break;
    }
  }

  init() {
    this.fetchPincodes();
    this.replaceData();
    this.initStepEvents();
  }
}

$(document).on('page:ready page:load page:change page:refresh', function() {
  new changeItems;
})