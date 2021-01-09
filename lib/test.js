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
    },
    three: {
      one: {
        type: 'Number',
        outputType: 'Array'
      },
      second: {
        type: 'String'
      }
    }
  }
};
const arr = [{
  a: 1,
  b: 'b',
  his: {
    c: 1,
    d: {
      dd: 5
    }
  }
}, {
  a: 1,
  b: 'b',
  his: {
    c: 1,
    d: {
      dd: 5
    }
  }
}, {
  a: 1,
  b: 'b',
  his: {
    c: 1,
    d: {
      dd: 5
    }
  }
}, {
  a: 1,
  b: 'b',
  his: {
    c: 1,
    d: {
      dd: 5
    }
  }
}]; // const newDeep = new deepReduce(schema);

const newDeep = new _index.default();
arr.forEach(o => {
  newDeep.add(o);
  console.log(newDeep.get());
});