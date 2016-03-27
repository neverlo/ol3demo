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
        
        var shadowStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 0, 127, 0.15],
                width: 8
            }),
            zIndex: 1
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
            style: [shadowStyle, style]
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
    },
    drawPolygon: function(type,params){
        var geom = null;
        switch(type){
            case 'point':
                geom = new ol.geom.Point(params);
                break;
            case 'lineString':
                geom = new ol.geom.LineString(params);
                break;
        }
        geom.transform('EPSG:4326', 'EPSG:3857');
        var feature = new ol.Feature({});
        feature.setGeometry(geom);
        return feature;
    },
    drawPoint: function (lon,lat) {
        var params = [];
        params[0] = lon;
        params[1] = lat;
        var feature = this.drawPolygon('point',params);
        var vector_layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [feature]
            })
        });
        this.map.addLayer(vector_layer);
    },
    drawLineString: function(){
        var params = [[110, 20], [120, 10], [130, 20]];
        var feature = this.drawPolygon('lineString',params);
        var vector_layer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [feature]
            })
        });
        this.map.addLayer(vector_layer);
    }
}
