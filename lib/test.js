"use strict";

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = {
  first: {
    type: 'Number'
  },
  second: {
    type: 'String'
  },
  third: {
    type: 'Array'
  },
  four: {
    first: {
      type: 'Number'
    },
    second: {
      type: 'String'
    }
  }
};
const newDeep = new _index.default(schema);