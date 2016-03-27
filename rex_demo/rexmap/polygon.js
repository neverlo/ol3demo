/**
 * 地图图形操作
 */
var polygon = function (map) {
    this.map = map.getMap();
}

polygon.prototype = {
    drawBounds: function (targetJson) {
         var style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                lineDash: [4],
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        });
        
        var topoJson  = new ol.layer.Vector({
            source: new ol.source.Vector({
                format: new ol.format.TopoJSON({
                    defaultProjection: 'EPSG:4326',
                    projection: 'EPSG:3857',
                }),
                // projection: 'EPSG:3857',
                url: tools.getRealPath()+'/rexmap/json/'+targetJson+'.json'
            }),
            style: style
        })
        this.map.addLayer(topoJson);
        return topoJson;
    },
    removeBounds: function (layer) {
        this.map.removeLayer(layer);
    },
    extendToLayer: function (layer) {
        var teMap = this.map;
        layer.addEventListener("change", function(event) {
            teMap.getView().fit(layer.getSource().getExtent(), (teMap.getSize()));
        });
    },
    drawWKT: function(wkt ){
        var format = new ol.format.WKT();
        var feature = format.readFeature(wkt, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });
         var vector = new ol.layer.Vector({
                source: new ol.source.Vector({
                features: [feature]
            })
        });
        this.map.addLayer(vector);
        return vector;
    }
}