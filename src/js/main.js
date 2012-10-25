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
      $("#map").data("map", map)
      for(var i = 0, len = data.stations.length; i < len; i++) {
        var ii = i;
        geocoder.geocode({
          'address': data.stations[i].name
        }, function(results, status) {
          console.log(results);
          if(results) {
            position = new GM.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            marker = new GM.Marker({
              position: position,
              map: map,
              title: results[0].formatted_name,
              data: data.stations[ii].destinations
            });
            google.maps.event.addListener(marker, 'click', function() {
              for(var j = 0; j < 10; j++) {
                var name = this.data[j].name;
                geocoder.geocode({
                  'address': name
                }, function(results, status) {
                  console.log(results);
                  if(results) {
                    endPosition = new GM.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    HW.common.renderer(position, endPosition)
                    marker = new GM.Marker({
                      position: endPosition,
                      map: map,
                      title: results[0].formatted_name,
                    });

                  }
                });

              }
            });
          }
        });
      }
    },
    renderer: function(start, end) {
      var GM = google.maps,
        polylineOptions, DD, DS, map = $("#map").data("map");
      var polylineOptions = new GM.Polyline({
        strokeColor: '#FF0000',
        strokeOpacity: .7,
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
        }
      });
    }

  }
}(window, document, jQuery));
