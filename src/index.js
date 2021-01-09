import deepcopy from 'deepcopy';

const defaultOption = {
    maxLevel: 5,
    defaultReducer: '+',
    onlySchema: true,//will not take of objects outside the schema
    fileMustMatchSchema: true // throw error for files dont match the schema 
}
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

    add(addedFile) {
        try {
            let current = this.options.keepBackup ? deepcopy(this.reducedObject) : this.reducedObject;
            if (!this.schema) {
                current = this.addWithoutSchema(current, addedFile,1);
                this.reducedObject = current;
                
            }else {
                current = this.addWithSchema(current,this.schema,addedFile,1);
            }



        } catch (e) {
            console.log(e);
        }



    }

    get(){
        return deepcopy(this.reducedObject);
    }

    
    addWithoutSchema(current, added,level) {
        if(this.options.maxLevel && level > this.options.maxLevel){
            console.log("level passed");
            return current;
        }
        for (let [key, content] of Object.entries(added)) {
            if (typeof content === 'object' && content !== null) {
                current[key] = this.addWithoutSchema(current[key]||{}, content,level+1);
            } else {
                current[key] = current[key] ? current[key] + content : content;
            }
        }
        return current;
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

                default:
                    accObject[key] = this.createFirstObject({}, content, level + 1);
                    break;

            }

        }

        return accObject;

    }

    print() {
        // console.log(this.options,this.schema);
        console.log("object", JSON.stringify(this.reducedObject));
    }

}

export default DeepReduce;