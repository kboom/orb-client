angular.module('orb.components.imageCrop.classes').factory('cropArea', ['cropCanvas', function (CropCanvas) {
  var CropArea = function (ctx, events) {
    this._ctx = ctx;
    this._events = events;

    this._minSizeX = 80;
    this._minSizeY = 80;

    this._cropCanvas = new CropCanvas(ctx);

    this._image = new Image();
    this._x = 0;
    this._y = 0;
    this._sizeX = 200;
    this._sizeY = 200;
  };

  CropArea.prototype.getImage = function () {
    return this._image;
  };
  CropArea.prototype.setImage = function (image) {
    this._image = image;
  };

  CropArea.prototype.getCenter = function () {
    return [this._x, this._y];
  };

  CropArea.prototype.getX = function () {
    return this._x;
  };
  CropArea.prototype.setX = function (x) {
    this._x = x;
    this._dontDragOutside();
  };

  CropArea.prototype.getY = function () {
    return this._y;
  };
  CropArea.prototype.setY = function (y) {
    this._y = y;
    this._dontDragOutside();
  };

  CropArea.prototype.getSizeX = function () {
    return this._sizeX;
  };
  CropArea.prototype.setSizeX = function (size) {
    this._sizeX = Math.max(this._minSizeX, size);
    this._dontDragOutside();
  };

  CropArea.prototype.getSizeY = function () {
    return this._sizeY;
  };
  CropArea.prototype.setSizeY = function (size) {
    this._sizeY = Math.max(this._minSizeY, size);
    this._dontDragOutside();
  };

  CropArea.prototype.getMinSizeX = function () {
    return this._minSizeX;
  };
  CropArea.prototype.setMinSizeX = function (size) {
    this._minSizeX = Math.floor(size);
    this._sizeX = Math.max(this._minSizeX, this._sizeX);
    this._dontDragOutside();
  };

  CropArea.prototype.getMinSizeY = function () {
    return this._minSizeY;
  };
  CropArea.prototype.setMinSizeY = function (size) {
    this._minSizeY = Math.floor(size);
    this._sizeY = Math.max(this._minSizeY, this._sizeY);
    this._dontDragOutside();
  };

  /* FUNCTIONS */
  CropArea.prototype._dontDragOutside = function () {
    var h = this._ctx.canvas.height,
      w = this._ctx.canvas.width;
    if (this._sizeX > w) {
      this._sizeX = w;
    }
    if (this._sizeY > h) {
      this._sizeY = h;
    }
    if (this._x < this._sizeX / 2) {
      this._x = this._sizeX / 2;
    }
    if (this._x > w - this._sizeX / 2) {
      this._x = w - this._sizeX / 2;
    }
    if (this._y < this._sizeY / 2) {
      this._y = this._sizeY / 2;
    }
    if (this._y > h - this._sizeY / 2) {
      this._y = h - this._sizeY / 2;
    }
  };

  CropArea.prototype._drawArea = function () {
  };

  CropArea.prototype.draw = function () {
    this._cropCanvas.drawCropArea(this._image, [this._x, this._y], [this._sizeX, this._sizeY], this._drawArea);
  };

  CropArea.prototype.processMouseMove = function () {
  };

  CropArea.prototype.processMouseDown = function () {
  };

  CropArea.prototype.processMouseUp = function () {
  };

  return CropArea;
}]);
