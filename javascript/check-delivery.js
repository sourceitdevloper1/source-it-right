var updateTimer = 0;
$(document).ready(function(){
  simply.deliveryJson = [];
  if($('.template-product').length > 0 || $('.template-cart').length > 0 ){
    if(!cn(simply.service_zip_json_file)){
      $.get(simply.service_zip_json_file, function(jsonArrayData){
        $.each(jsonArrayData, function(i, zipObj){
          simply.deliveryJson[zipObj.Pincode] = zipObj; 
        });
      })      
    }
  } 
  $(document).on('click','.shipping-estimator .estimation_btn',function(){
    parent = $(this).closest('.shipping-estimator');
    var new_zip = $('#shipping-estimator-zip',parent).val();
    var err_field = $('#msg_error',parent);
    if(new_zip != ""){
      $(this).text('checking');
      if(cn(simply.deliveryJson[new_zip])){
        err_field.addClass("msg_error");
        err_field.html(simply.zipServiceUnavailable);
        $('.cod_available,.delivery_available',parent).empty();
      }
      else{
        $('#msg_error').empty();
        $('#msg_error').removeClass("msg_error");
        zipObj = simply.deliveryJson[new_zip];
        if(zipObj['Has Cod'] == 'YES'){
          simply.hasCod = true;
        }
        else{
          simply.hasCod = false;
        }
        if(zipObj['Has Prepaid'] == 'YES'){
          simply.hasPrepaid = true;
        }
        else{
          simply.hasPrepaid = false;
        }
        if( simply.hasCod && simply.hasPrepaid ){
          $('.cod_available',parent).html('<h6 class="available deliver">'+simply.deliveryAvailable+'</h6> <h6 class="available">'+simply.codAvailable+'</h6>'); 
        }
        else if(simply.hasPrepaid && !simply.hasCod){
          $('.cod_available',parent).html('<h6 class="available">'+simply.codAvailable+'</h6> <h6 class="not_available">'+simply.codNotAvailable+'</h6>'); 
        }else{
          $('.delivery_available',parent).html('<h6 class="available">'+simply.deliveryAvailable+'</h6><h6 class="not_available">'+simply.deliveryNotAvailable+'</h6> ');
        }
      }
      $(this).text('check');
    }
    else{
      err_field.addClass("msg_error");
      err_field.html(simply.emptyZipField);
    }
  });
});
