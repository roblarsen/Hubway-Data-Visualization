
;(function (window, document, $, undefined) {
  "use strict";
  if (window.HW === undefined) {
    window.HW = {};
  };
  var HW = window.HW;
  HW.common = {
    init : function(){
      console.log( "common.init" );
      $( "#map" ).height($( window ).height() );
      var GM = google.maps,
          defaultPosition = new GM.LatLng( 42, -71 ),
          mapOptions = {
            zoom: 12,
            center: defaultPosition,
            mapTypeId: GM.MapTypeId.ROADMAP
          },
          map = new GM.Map( document.getElementById('map'), mapOptions),
          success = function( data ){
            var position = new GM.LatLng( data.coords.latitude, data.coords.longitude ),
                niceAddress = "Your location",
                geocoder = new GM.Geocoder();
            geocoder.geocode(
              { 'latLng': position }, 
              function( results, status ) {
                if ( status == GM.GeocoderStatus.OK ) {
                  if ( results[0] ) {
                    niceAddress = results[0].formatted_address;
                  }
                } 
            });  
            map.setCenter(position);
          },
          failure = function( error ){
          //handle errors
          };
      if ( Modernizr.geolocation ){
        navigator.geolocation.getCurrentPosition( success, failure, {timeout:5000} ) ;      
      }    
    }
  }
}( window, document, jQuery ));
