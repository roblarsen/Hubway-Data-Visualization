
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
          defaultPosition = new GM.LatLng( 42.359 , -71.058 ),
          mapOptions = {
            zoom: 16,
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
            map.setCenter(defaultPosition);
            var DS = new GM.DirectionsService(),
                DD = new GM.DirectionsRenderer();
            DD.setMap(map);
            var request = {
              origin:defaultPosition,
              destination:position,
              travelMode: GM.TravelMode.BICYCLING
            };
            DS.route(request, function(result, status) {
              if (status == GM.DirectionsStatus.OK) {
                DD.setDirections(result);
              }
            });
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
