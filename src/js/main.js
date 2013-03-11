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
      createMarker(0);
      var i = 1, timer;

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
            var marker, position,start,end, dist;
            position = new GM.LatLng(data.stations[i].latLng[0],data.stations[i].latLng[1]);
           
            marker = new GM.Marker({
              position: position,
              map: map,
              title: data.stations[i].name,
              data: data.stations[i].destinations
            });
            //http://www.movable-type.co.uk/scripts/latlong.html
            //http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
function distance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

            var j = 0, len =data.stations[i].destinations.length, rendertimer;
            function newrender(){
              if (j == len){
                clearInterval(rendertimer)
              return;
              }
              dist = distance(data.stations[i].latLng[0],data.stations[i].latLng[1], data.stations[i].destinations[j].latLng[0], data.stations[i].destinations[j].latLng[1] )
              createRoutes(i,j,position, dist);
              j++;   
            }
            rendertimer = setInterval(newrender, 2000);
        function createRoutes( i, j, start, distance) {
          start =position;
          end =data.stations[i].destinations[j].latLng;

          var trips =data.stations[i].destinations[j].trips;
         HW.common.renderer(start,end, trips, i, distance, data.stations[i].name, data.stations[i].destinations[j].name);

        }
          
        
       }  
     
    },
    renderer: function(start, end, trips, index, distance,startName,endName) {

      var GM = google.maps,
        polylineOptions, DD, DS, map = $("#map").data("map"),
        colors = ["#B22937",
        "#DE5003",
        "#80C837",
        "#229F6E",
        "#60B6CA",
        "#6F6DA7",
        "#1F1D6D",
        "#80529A",
        "#A6358C",
        "#A2395B"


        ];

      end = new GM.LatLng(end[0],end[1]);
      var polylineOptions = new GM.Polyline({
        strokeColor: colors[index],
        strokeOpacity: .4,
        strokeWeight: trips/100
      }),
        DS = new GM.DirectionsService(),
        DD = new GM.DirectionsRenderer({
          polylineOptions: polylineOptions,
          markerOptions : { icon : "img/Hubwaylogo.png" }
        });
      DD.setMap(map);
      var request = {
        origin: start,
        destination: end,
        travelMode: GM.TravelMode.BICYCLING
      };
      var table 
      DS.route(request, function(result, status) {
        if(status == GM.DirectionsStatus.OK) {
          DD.setDirections(result);
          var delta = result.routes[0].legs[0].distance.value/(distance * 1000);
         console.log("<tr><td>"+startName+"</td><td>"+endName+"</td><td>"+delta.toPrecision(3)+"</td></tr>")
        } else {
        }

      });
    
    }

  }
}(window, document, jQuery));
