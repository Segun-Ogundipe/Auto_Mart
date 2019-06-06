"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getNewId = function getNewId(array) {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  }
  return 1;
};

exports.default = {
  getNewId: getNewId
};