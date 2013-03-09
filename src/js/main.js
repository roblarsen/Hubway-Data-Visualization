;
(function(window, document, $, undefined) {
  "use strict";
  if(window.HW === undefined) {
    window.HW = {};
  };
  var HW = window.HW;
  HW.common = {
    init: function() {
      $("#map").height($(window).height());
      var GM = google.maps,
        defaultPosition = new GM.LatLng(42.3520, -71.0560),
        mapOptions = {
          zoom: 12,
          center: defaultPosition,
          mapTypeId: GM.MapTypeId.ROADMAP
        },
        map = new GM.Map(document.getElementById('map'), mapOptions),
        geocoder = new GM.Geocoder(),
        position, endPosition, marker, polylineOptions, DD, DS;
      $("#map").data("map", map);
      var i = 0, timer;

      function render(){
        if (i == 10){
          clearInterval(timer);
          return;
        }
        createMarker(i);
        i++;   
      }
      timer = setInterval(render, 10000);
      function createMarker(i){
            var marker, position,start,end;
            position = new GM.LatLng(data.stations[i].latLng[0],data.stations[i].latLng[1]);
            marker = new GM.Marker({
              position: position,
              map: map,
              title: data.stations[i].name,
              data: data.stations[i].destinations
            });
            var j = 0, len =data.stations[i].destinations.length, rendertimer;
            function newrender(){
              if (j == len){
                clearInterval(rendertimer)
              return;
              }
              createRoutes(i,j,position);
              j++;   
            }
            rendertimer = setInterval(newrender, 2000);
        function createRoutes( i, j, start) {
          start =position;
          end =data.stations[i].destinations[j].latLng;
          HW.common.renderer(start,end, map);
        }
          
        
       }  
     
    },
    renderer: function(start, end) {
      var GM = google.maps,
        polylineOptions, DD, DS, map = $("#map").data("map");
      end = new GM.LatLng(end[0],end[1]);
      var polylineOptions = new GM.Polyline({
        strokeColor: '#FF0000',
        strokeOpacity: .4,
        strokeWeight: 10
      }),
        DS = new GM.DirectionsService(),
        DD = new GM.DirectionsRenderer({
          polylineOptions: polylineOptions
        });
      DD.setMap(map);
      var request = {
        origin: start,
        destination: end,
        travelMode: GM.TravelMode.BICYCLING
      };
      DS.route(request, function(result, status) {
        if(status == GM.DirectionsStatus.OK) {
          DD.setDirections(result);
        } else {
          console.log("throttle")
        }
      });
    }

  }
}(window, document, jQuery));
