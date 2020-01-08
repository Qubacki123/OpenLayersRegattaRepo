window.onload = init;

//Definicja klasy przechowujacej wspolrzedne jachtów
class Jacht {
    constructor(lon, lat, name){
    this.lon = lon;
    this.lat = lat;
    this.name = name;
    }
}

var jachtArray = [];

//Stworzenie obiektów konkretnych jachtów
jacht1 = new Jacht(19.552234, 53.603602, "POL");
jachtArray.push(jacht1);
jacht2 = new Jacht(19.553876, 53.603335, "GER");
jachtArray.push(jacht2);
jacht3 = new Jacht(19.554905, 53.604570, "NZL");
jachtArray.push(jacht3);


console.log(jachtArray);

for (x of jachtArray){    
    console.log(x);
    console.log(x.lon);
    console.log(x.lat);
}

function init(){    
    
    var map = new ol.Map({
        target: "js-map",
        view: new ol.View({
            center: ol.proj.fromLonLat([19.583750, 53.698527]),
            zoom: 12
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ]        
    })

    var markerArray = [];

    for (let jacht of jachtArray){

    var marker = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([jacht.lon, jacht.lat])
        ),  // Wspolrzedne pierwszego jachtu
        name: jacht.name,
      });

      markerArray.push(marker);

    }

    var vectorSource = new ol.source.Vector({
        features: markerArray
    });

    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          anchor: [0.5, 0.5],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          opacity: 0.5,
          scale: 0.3,
          src: 'data/marker.png'
        }))
      });

    var markerVectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: iconStyle,
    });
    
    map.addLayer(markerVectorLayer);
    
    

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(overlay);

    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };

    map.on('singleclick', function (event) {
    if (map.hasFeatureAtPixel(event.pixel) === true) {
        var coordinate = event.coordinate;

        content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
        overlay.setPosition(coordinate);
    } else {
        overlay.setPosition(undefined);
        closer.blur();
    }
    });



}

