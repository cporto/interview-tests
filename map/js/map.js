
//Helper functions
function $(id){return document.querySelector(id)};

//simple ajax getter https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
};


// get the distance and convert to nautical miles
function getDistance(from,to) {
	var miles = google.maps.geometry.spherical.computeDistanceBetween(from,to);
	var nauticalMiles = (miles * .000539957);
	return nauticalMiles;
}


var DistanceMap = function() {
	this.map     = null;
	this.markers = [];
	this.paths   = [];

	this.startMap = function(id){
		this.map = new google.maps.Map($(id), {
			center: {lat: 40.730610, lng: -73.935242},
			zoom: 8
		});
	};

	this.plotPoints = function(positions) {
		for(i in positions){
			var iconurl  = "img/pointer.png";
			var marker = new google.maps.Marker({ icon:iconurl, anchor:google.maps.Point(15,15) });
			marker.setPosition(positions[i]);
			marker.setMap(this.map);
			this.markers.push(marker);
		}
	};

	this.mapRoute = function(start,end) {
		var position = [start, end];
		this.plotPoints(position);

		var path = new google.maps.Polyline({
			path: position,
			strokeColor: '#156f81',
			strokeOpacity: .7,
			strokeWeight: 2,
			geodesic: true
		});

		path.setMap(this.map);
		this.paths.push(path);
		this.zoomTo(position);
	};

	// Reset map
	this.resetRoute = function() {
		for(i in this.paths){
			this.paths[i].setMap(null);
		}
		this.paths = [];
	};
	this.resetMarkers = function() {
		for(i in this.markers){
			this.markers[i].setMap(null);
		}
		this.markers = [];
	};

	// Zoom map
	this.zoomTo = function(pos) {
		var bounds = new google.maps.LatLngBounds();
		for (i in pos) {
			if(typeof pos[i].position !== 'undefined'){
				bounds.extend(pos[i].position);
			} else {
				bounds.extend(pos[i]);
			}
		}
		this.map.fitBounds(bounds);
	};

	this.getInput = function (e) {
		e.preventDefault();
		//Reset the map incase it was already used
		gmap.resetRoute();
		gmap.resetMarkers();

		start = $("#from").value.split(" - ");
		end = $("#to").value.split(" - ");

		//Make sure we aren't empty and have the proper data to look up
		if((typeof usAirportLocations[start[0]] !== 'undefined') && (typeof usAirportLocations[end[0]] !== 'undefined')){

			gmap.mapRoute(usAirportLocations[start[0]],usAirportLocations[end[0]]);
			var dist = getDistance(usAirportLocations[start[0]],usAirportLocations[end[0]]);

			//hide input fields and display distance
			$("form").classList.add('visuallyhidden');
			$("#miles").classList.toggle('visuallyhidden');
			$("#reset").classList.toggle('visuallyhidden');
			$("#miles").classList.add('fade');
			$("#miles").innerHTML= 'The distance between <i>'+ start[1] +'</i> and  <i>'+ end[1] +'</i> is approximately <b>' + parseInt(dist) + '</b> nautical miles.';
		}
	}

}


// load the map
var start;
var end;
var gmap = new DistanceMap();

//Callback to initialize the map
function initMap() {
	gmap.startMap('#map');	
}

// Parse JSON and get airports from USA
var usAirports = [];
var usAirportLocations = new Object();

getAjax('js/airports.json', function(json){

	var json = JSON.parse(json);
	var data = json.data;

	for(var i in data){
	  if(data[i][11] == "United States"){
		  usAirports.push(data[i][12] + ' - ' + data[i][9] + ' - ' + data[i][10]);
		  usAirportLocations[data[i][12]] = new google.maps.LatLng(parseFloat(data[i][14]),parseFloat(data[i][15]));
	  }
	}
});

//autocomplete based on airport
//https://goodies.pixabay.com/javascript/auto-complete/demo.html
var fromInput = new autoComplete({
    selector: 'input[name="from"]',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = usAirports;
        var matches = [];
        for (i in choices)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});
var toInput = new autoComplete({
    selector: 'input[name="to"]',
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        var choices = usAirports;
        var matches = [];
        for (i in choices)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});


$("#btn").addEventListener("click", gmap.getInput, false);
$("form").addEventListener("submit", gmap.getInput, false);

$("#reset").addEventListener("click", function(){
	$("form").classList.toggle('visuallyhidden');
	$("#miles").classList.toggle('fade');	
	$("#miles").classList.toggle('visuallyhidden');
	$("#reset").classList.toggle('visuallyhidden');
	$("#from").value='';
	$("#to").value='';
	
	gmap.resetRoute();
	gmap.resetMarkers();
}, false);
