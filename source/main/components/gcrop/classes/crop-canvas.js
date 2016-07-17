angular.module('orb.components.imageCrop.classes').factory('cropCanvas', function () {

  'use strict';

  var shapeArrowN = [[-1.5, -2.5], [-1.5, -6], [-5, -6], [0, -11], [5, -6], [1.5, -6], [1.5, -2.5]];
  var shapeArrowW = [[-2.5, -1.5], [-6, -1.5], [-6, -5], [-11, 0], [-6, 5], [-6, 1.5], [-2.5, 1.5]];
  var shapeArrowS = [[-1.5, 2.5], [-1.5, 6], [-5, 6], [0, 11], [5, 6], [1.5, 6], [1.5, 2.5]];
  var shapeArrowE = [[2.5, -1.5], [6, -1.5], [6, -5], [11, 0], [6, 5], [6, 1.5], [2.5, 1.5]];

  var colors = {
    areaOutline: '#fff',
    resizeBoxStroke: '#fff',
    resizeBoxFill: '#444',
    resizeBoxArrowFill: '#fff',
    resizeCircleStroke: '#fff',
    resizeCircleFill: '#444',
    moveIconFill: '#fff'
  };

  return function (ctx) {

    var calcPoint = function (point, offset, scale) {
      return [scale * point[0] + offset[0], scale * point[1] + offset[1]];
    };

    var drawFilledPolygon = function (shape, fillStyle, centerCoords, scale) {
      ctx.save();
      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      var pc, pc0 = calcPoint(shape[0], centerCoords, scale);
      ctx.moveTo(pc0[0], pc0[1]);

      for (var p in shape) {
        if (p > 0) {
          pc = calcPoint(shape[p], centerCoords, scale);
          ctx.lineTo(pc[0], pc[1]);
        }
      }

      ctx.lineTo(pc0[0], pc0[1]);
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };

    this.drawIconMove = function (centerCoords, scale) {
      drawFilledPolygon(shapeArrowN, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowW, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowS, colors.moveIconFill, centerCoords, scale);
      drawFilledPolygon(shapeArrowE, colors.moveIconFill, centerCoords, scale);
    };

    this.drawIconResizeCircle = function (centerCoords, circleRadius, scale) {
      var scaledCircleRadius = circleRadius * scale;
      ctx.save();
      ctx.strokeStyle = colors.resizeCircleStroke;
      ctx.lineWidth = 2;
      ctx.fillStyle = colors.resizeCircleFill;
      ctx.beginPath();
      ctx.arc(centerCoords[0], centerCoords[1], scaledCircleRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };

    /* Crop Area */

    this.drawCropArea = function (image, centerCoords, size, fnDrawClipPath) {
      var xRatio = image.width / ctx.canvas.width,
        yRatio = image.height / ctx.canvas.height,
        xLeft = centerCoords[0] - size[0] / 2,
        yTop = centerCoords[1] - size[1] / 2;

      ctx.save();
      ctx.strokeStyle = colors.areaOutline;
      ctx.lineWidth = 2;
      ctx.beginPath();
      fnDrawClipPath(ctx, centerCoords, size);
      ctx.stroke();
      ctx.clip();

      // draw part of original image
      if (size) {
        ctx.drawImage(image, xLeft * xRatio, yTop * yRatio, size[0] * xRatio, size[1] * yRatio, xLeft, yTop, size[0], size[1]);
      }

      ctx.beginPath();
      fnDrawClipPath(ctx, centerCoords, size);
      ctx.stroke();
      ctx.clip();

      ctx.restore();
    };

  };
});
