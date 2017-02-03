export function DrawingToolsDirective() {

  'ngInject';
  let directive = {
    restrict: 'E',
    template: '<div class="drawing-tools"></div>',
    controller: DrawingToolsController,
    controllerAs: 'drawToolCtrl',
    bindToController: true
  };

  return directive;

}

class DrawingToolsController {
  constructor(createOrbitService) {
    'ngInject';
    this.createOrbitService = createOrbitService;
    this.initDrawingTools();
    this.initEntities();
  }

  initDrawingTools() {
    let that = this;
    let drawingTools = d3.select('drawing-tools');
    drawingTools.append('div')
      .attr("class", "draw-polygon")
      .append('svg')
      .attr("height", 30)
      .attr("width", 30)
      .append("svg:image")
      .attr("height", 30)
      .attr("width", 30)
      .attr("xlink:href", 'assets/images/polygon.svg').on('click', () => {
      that.drawPolygon();
    });
    drawingTools.append('div')
      .attr("class", "draw-polyline")
      .append('svg')
      .attr("height", 30)
      .attr("width", 30)
      .append("svg:image")
      .attr("height", 30)
      .attr("width", 30)
      .attr("xlink:href", 'assets/images/polyline.svg').on('click', () => {
      that.drawPolyline();
    });
  }


  initEntities() {
    this.entity = this.createOrbitService.viewer.entities.getOrCreateEntity('drawingEntity');
    this.entity.polygon = new Cesium.PolygonGraphics({});
    this.entity.polygon.hierarchy = null;
    this.entity.polyline = new Cesium.PolylineGraphics({});
    this.entity.polyline.positions = null;
  }

  drawPolygon() {
    this.entity.position = null;
    this.entity.polyline.positions = null;
    this.createOrbitService.enableDrawPolygon('polygon')
  }

  drawPolyline() {
    this.entity.position = null;
    this.entity.polygon.hierarchy = null;
    this.createOrbitService.enableDrawPolygon('polyline')
  }
}
