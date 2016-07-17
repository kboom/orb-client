angular.module('orb.components.imageCrop.classes').factory('cropAreaSquare', ['cropArea', function (CropArea) {
  var CropAreaSquare = function () {
    CropArea.apply(this, arguments);

    this._resizeCtrlBaseRadius = 10;
    this._resizeCtrlNormalRatio = 0.75;
    this._resizeCtrlHoverRatio = 1;
    this._iconMoveNormalRatio = 0.9;
    this._iconMoveHoverRatio = 1.2;

    this._resizeCtrlNormalRadius = this._resizeCtrlBaseRadius * this._resizeCtrlNormalRatio;
    this._resizeCtrlHoverRadius = this._resizeCtrlBaseRadius * this._resizeCtrlHoverRatio;

    this._posDragStartX = 0;
    this._posDragStartY = 0;
    this._posResizeStartX = 0;
    this._posResizeStartY = 0;
    this._posResizeStartSize = [-1, -1];

    this._resizeCtrlIsHover = -1;
    this._areaIsHover = false;
    this._resizeCtrlIsDragging = -1;
    this._areaIsDragging = false;
  };

  CropAreaSquare.prototype = new CropArea();

  CropAreaSquare.prototype._calcSquareCorners = function () {
    var hSize = this._sizeX / 2;
    var vSize = this._sizeY / 2;
    return [
      [this._x - hSize, this._y - vSize],
      [this._x + hSize, this._y - vSize],
      [this._x - hSize, this._y + vSize],
      [this._x + hSize, this._y + vSize]
    ];
  };

  CropAreaSquare.prototype._calcSquareBordersCenters = function () {
    var hSize = this._sizeX / 2;
    var vSize = this._sizeY / 2;
    return [
      [this._x - hSize, this._y], // W
      [this._x + hSize, this._y], // E
      [this._x, this._y + vSize], // N
      [this._x, this._y - vSize] // S
    ];
  };

  CropAreaSquare.prototype._calcBordersPoints = function () {
    return this._calcSquareCorners().concat(this._calcSquareBordersCenters());
  };

  CropAreaSquare.prototype.getSize = function () {
    return [this._sizeX, this._sizeY];
  };

  CropAreaSquare.prototype._calcSquareDimensions = function () {
    var hSize = this._sizeX / 2;
    var vSize = this._sizeY / 2;
    return {
      left: this._x - hSize,
      top: this._y - vSize,
      right: this._x + hSize,
      bottom: this._y + vSize
    };
  };

  CropAreaSquare.prototype._isCoordWithinArea = function (coord) {
    var squareDimensions = this._calcSquareDimensions();
    return (coord[0] >= squareDimensions.left && coord[0] <= squareDimensions.right && coord[1] >= squareDimensions.top && coord[1] <= squareDimensions.bottom);
  };

  CropAreaSquare.prototype._isCoordWithinResizeCtrl = function (coord) {
    var resizeIconsCenterCoords = this._calcBordersPoints();
    var res = -1;
    for (var i = 0, len = resizeIconsCenterCoords.length; i < len; i++) {
      var iconCenterCoordinates = resizeIconsCenterCoords[i];
      if (coord[0] > iconCenterCoordinates[0] - this._resizeCtrlHoverRadius && coord[0] < iconCenterCoordinates[0] + this._resizeCtrlHoverRadius &&
        coord[1] > iconCenterCoordinates[1] - this._resizeCtrlHoverRadius && coord[1] < iconCenterCoordinates[1] + this._resizeCtrlHoverRadius) {
        res = i;
        break;
      }
    }
    return res;
  };

  CropAreaSquare.prototype._drawArea = function (ctx, centerCoords, size) {
    var hSize = size[0] / 2;
    var vSize = size[1] / 2;
    ctx.rect(centerCoords[0] - hSize, centerCoords[1] - vSize, size[0], size[1]);
  };

  CropAreaSquare.prototype.draw = function () {
    CropArea.prototype.draw.apply(this, arguments);
    this._cropCanvas.drawIconMove([this._x, this._y], this._areaIsHover ? this._iconMoveHoverRatio : this._iconMoveNormalRatio);
    var resizeIconsCenterCoords = this._calcBordersPoints();
    var handleScaleRatio = this._resizeCtrlIsHover === i ? this._resizeCtrlHoverRatio : this._resizeCtrlNormalRatio;
    for (var i = 0, len = resizeIconsCenterCoords.length; i < len; i++) {
      this._cropCanvas.drawIconResizeCircle(resizeIconsCenterCoords[i], this._resizeCtrlBaseRadius, handleScaleRatio);
    }
  };

  CropAreaSquare.prototype.processMouseMove = function (mouseCurX, mouseCurY) {
    var cursor = 'default';
    var res = false;

    this._resizeCtrlIsHover = -1;
    this._areaIsHover = false;

    if (this._areaIsDragging) {
      this._x = mouseCurX - this._posDragStartX;
      this._y = mouseCurY - this._posDragStartY;
      this._areaIsHover = true;
      cursor = 'move';
      res = true;
      this._events.trigger('area-move');
    } else if (this._resizeCtrlIsDragging > -1) {
      var xMulti, yMulti;
      switch (this._resizeCtrlIsDragging) {
        case 0: // Top Left
          xMulti = -1;
          yMulti = -1;
          cursor = 'nwse-resize';
          break;
        case 1: // Top Right
          xMulti = 1;
          yMulti = -1;
          cursor = 'nesw-resize';
          break;
        case 2: // Bottom Left
          xMulti = -1;
          yMulti = 1;
          cursor = 'nesw-resize';
          break;
        case 3: // Bottom Right
          xMulti = 1;
          yMulti = 1;
          cursor = 'nwse-resize';
          break;
        case 4: // Left
          xMulti = -1;
          yMulti = 0;
          cursor = 'ew-resize';
          break;
        case 5: // Right
          xMulti = 1;
          yMulti = 0;
          cursor = 'ew-resize';
          break;
        case 6: // Top
          xMulti = 0;
          yMulti = 1;
          cursor = 'ns-resize';
          break;
        case 7: // Bottom
          xMulti = 0;
          yMulti = -1;
          cursor = 'ss-resize';
          break;
      }
      var iFX = this._posResizeStartSizeX + (mouseCurX - this._posResizeStartX) * xMulti;
      var iFY = this._posResizeStartSizeY + (mouseCurY - this._posResizeStartY) * yMulti;
      var wasSizeX = this._sizeX;
      var wasSizeY = this._sizeY;
      this._sizeX = Math.max(this._minSizeX, iFX);
      this._sizeY = Math.max(this._minSizeY, iFY);

      this._x += ((this._sizeX - wasSizeX) / 2) * xMulti;
      this._y += ((this._sizeY - wasSizeY) / 2) * yMulti;
      this._resizeCtrlIsHover = this._resizeCtrlIsDragging;
      res = true;
      this._events.trigger('area-resize');
    } else {
      var hoveredResizeBox = this._isCoordWithinResizeCtrl([mouseCurX, mouseCurY]);
      if (hoveredResizeBox > -1) {
        switch (hoveredResizeBox) {
          case 0:
            cursor = 'nwse-resize';
            break;
          case 1:
            cursor = 'nesw-resize';
            break;
          case 2:
            cursor = 'nesw-resize';
            break;
          case 3:
            cursor = 'nwse-resize';
            break;
          case 4: // Left
            cursor = 'e-resize';
            break;
          case 5: // Right
            cursor = 'w-resize';
            break;
          case 6: // Top
            cursor = 'n-resize';
            break;
          case 7: // Bottom
            cursor = 's-resize';
            break;
        }
        this._areaIsHover = false;
        this._resizeCtrlIsHover = hoveredResizeBox;
        res = true;
      } else if (this._isCoordWithinArea([mouseCurX, mouseCurY])) {
        cursor = 'move';
        this._areaIsHover = true;
        res = true;
      }
    }

    this._dontDragOutside();
    angular.element(this._ctx.canvas).css({'cursor': cursor});

    return res;
  };

  CropAreaSquare.prototype.processMouseDown = function (mouseDownX, mouseDownY) {
    var isWithinResizeCtrl = this._isCoordWithinResizeCtrl([mouseDownX, mouseDownY]);
    if (isWithinResizeCtrl > -1) {
      this._areaIsDragging = false;
      this._areaIsHover = false;
      this._resizeCtrlIsDragging = isWithinResizeCtrl;
      this._resizeCtrlIsHover = isWithinResizeCtrl;
      this._posResizeStartX = mouseDownX;
      this._posResizeStartY = mouseDownY;
      this._posResizeStartSizeX = this._sizeX;
      this._posResizeStartSizeY = this._sizeY;
      this._events.trigger('area-resize-start');
    } else if (this._isCoordWithinArea([mouseDownX, mouseDownY])) {
      this._areaIsDragging = true;
      this._areaIsHover = true;
      this._resizeCtrlIsDragging = -1;
      this._resizeCtrlIsHover = -1;
      this._posDragStartX = mouseDownX - this._x;
      this._posDragStartY = mouseDownY - this._y;
      this._events.trigger('area-move-start');
    }
  };

  CropAreaSquare.prototype.processMouseUp = function (/*mouseUpX, mouseUpY*/) {
    if (this._areaIsDragging) {
      this._areaIsDragging = false;
      this._events.trigger('area-move-end');
    }
    if (this._resizeCtrlIsDragging > -1) {
      this._resizeCtrlIsDragging = -1;
      this._events.trigger('area-resize-end');
    }
    this._areaIsHover = false;
    this._resizeCtrlIsHover = -1;

    this._posDragStartX = 0;
    this._posDragStartY = 0;
  };


  return CropAreaSquare;
}]);
