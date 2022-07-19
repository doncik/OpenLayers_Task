var lamarin = ol.proj.fromLonLat([23.90149237609774, 54.89542035719181]);
var view = new ol.View({
  center: lamarin,
  zoom: 5,
});

var vectorSource = new ol.source.Vector({});

$.get("ajax_maps.php", function (data) {
  const obj = JSON.parse(data);
  $.each(obj, function (_key, value) {
    let lat = parseFloat(value.lat);
    let lon = parseFloat(value.lon);
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.transform([lon, lat], "EPSG:4326", "EPSG:3857")
      ),
    });

    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "http://maps.google.com/mapfiles/ms/micons/blue.png",
        crossOrigin: "anonymous",
      }),
    });
    iconFeature.setStyle(iconStyle);
    vectorSource.addFeature(iconFeature);
  });
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  updateWhileAnimating: true,
  updateWhileInteracting: true,
});

var map = new ol.Map({
  target: "map",
  view: view,
  layers: [
    new ol.layer.Tile({
      preload: 3,
      source: new ol.source.OSM(),
    }),
    vectorLayer,
  ],
  loadTilesWhileAnimating: true,
});
