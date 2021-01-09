"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepcopy = _interopRequireDefault(require("deepcopy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOption = {
  maxLevel: 5,
  defaultReducer: '+',
  onlySchema: true
};

class DeepReduce {
  constructor(schema, options = defaultOption) {
    this.schema = schema;
    this.options = options;
    this.addedObject = 0;
    this.failedAttempts = 0;

    if (!schema) {
      this.options.onlySchema = false;
    }

    this.reducedObject = this.createFirstObject({}, this.schema, 0);
    this.print();
  }

  createFirstObject(accObject, schema, level) {
    if (!schema) {
      return {};
    }

    console.log("-------------------------------------");

    if (level > this.options.maxLevel) {
      // console.log(`level, ${level}, maxLevel[${this.options.maxLevel}]`);
      return null;
    } // console.log("sch",schema,"level",level);


    for (const [key, content] of Object.entries(schema)) {
      // console.log(`${key}: ${content}`);
      // if (! content?.type) {
      //     throw new Error(`Invalid Schema 'no type'; ${key}: ${content}, level:${level}`)
      // }
      if (content.type && !content.outputType) {
        content.outputType = content.type;
      }

      switch (content.outputType) {
        case 'Number':
        case 'Int':
          accObject[key] = 0;
          break;

        case 'String':
          accObject[key] = '';
          break;

        case 'Array':
          accObject[key] = [];
          break;

        default:
          accObject[key] = this.createFirstObject({}, content, level + 1);
          break;
      }
    }

    return accObject;
  }

  createObjectBySchema() {}

  add(addedFile) {
    try {
      let current = this.options.keepBackup ? (0, _deepcopy.default)(this.reducedObject) : this.reducedObject;

      if (!this.schema) {
        current = this.addWithoutSchema(current, addedFile, 1);
        this.reducedObject = current;
      }
    } catch (e) {
      console.log(e);
    }
  }

  get() {
    return (0, _deepcopy.default)(this.reducedObject);
  }

  addWithoutSchema(current, added, level) {
    if (this.options.maxLevel && level > this.options.maxLevel) {
      console.log("level passed");
      return current;
    }

    for (let [key, content] of Object.entries(added)) {
      if (typeof content === 'object' && content !== null) {
        current[key] = this.addWithoutSchema(current[key] || {}, content, level + 1);
      } else {
        current[key] = current[key] ? current[key] + content : content;
      }
    }

    return current;
  }

  print() {
    // console.log(this.options,this.schema);
    console.log("object", JSON.stringify(this.reducedObject));
  }

}

var _default = DeepReduce;
exports.default = _default;