

// const o = {
//     a: {
//         b:"hello world"
//     }
// }


// if(o?.a?.b){
//     console.log(o.a.b);
// }

const defaultOption = {
    maxLevel: 5,
    defaultReducer: '+',
    onlySchema : true
}
class DeepReduce {

   
    constructor(schema, options=defaultOption) {
        this.schema = schema;
        this.options = options;
        this.addedObject = 0;
        this.failedAttempts = 0;
        if (!schema) {
            options.deepLevel = 0,
            option.onlySchema = false;
        }

        this.reducedObject = this.createFirstObject({}, this.schema, 0);
        this.print();

    }

    createFirstObject(accObject, schema, level) {
        if (!schema) { return {}; }
        console.log("-------------------------------------");
        if (level > this.options.maxLevel) {
            // console.log(`level, ${level}, maxLevel[${this.options.maxLevel}]`);
            return null;
        }
        // console.log("sch",schema,"level",level);

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

                default :
                    accObject[key] = this.createFirstObject({}, content, level + 1);
                    break;

            }

        }

        return accObject;

    }

    createObjectBySchema() {

    }

    add(o1) {

    }

    print() {
        // console.log(this.options,this.schema);
        console.log("object", JSON.stringify(this.reducedObject));
    }

}

export default DeepReduce;