var buildmap = function (params) {
    this.createMap(params);
}
/**
 * 建立地图
 */
buildmap.prototype = {
    /**
     * params = {
     *      target: string,
            url: string,
            minZoom: number,
            maxZoom: number,
            zoom: number,
            tileSize: number,
            centerLon: number,
            centerLat: number
       }
     */
    createMap: function (params) {
        var projection = ol.proj.get('EPSG:3857');
        var transform = ol.proj.getTransform('EPSG:4326','EPSG:3857');
        var mapUrl = params.url + '{z}/{x}/{y}.png';

        var mapDocument = document.createElement('div');
        mapDocument.setAttribute('id',params.target);
        mapDocument.style.height = '100%';
        mapDocument.style.width = '100%';
        mapDocument.style.margin = '0';
        (document.body).appendChild(mapDocument);

        var map = new ol.Map({
            target: params.target,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        maxZoom: params.maxZoom,
                        // tilePixelRatio: 1,
                        projection: projection,
                        tileSize: params.tileSize,
                        tileUrlFunction: function(tileCoord){
                            return mapUrl.replace('{z}', (tileCoord[0]).toString())
                                         .replace('{x}', tileCoord[1].toString())
                                         .replace('{y}', (-tileCoord[2]-1).toString());
                        },
                        wrapX: false
                    })
                })
            ],
            view: new ol.View({
                projection: projection,
                center: transform([params.centerLon, params.centerLat]),
                zoom:params.zoom,
                minZoom: params.minZoom
            })
        });
        // return map;
        this.map = map;
        this.projection = projection
    },
    getMap: function (params) {
        return this.map;
    },
    getProjection: function (params) {
        return this.projection;  
    },
    register: function (eventType,callBack) {
        this.map.on(eventType,function (params) {
            callBack(params);
        });
    }
}