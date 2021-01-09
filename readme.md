
Object,Array,String
schema {
    filed1: {
        preMapper: function
        type:Number/Int,
        defaultValue:1 
        function: +,-,*, outerFunction
    },

    field2: {
        type: Array,
        childrenType: Number
        function: +, - ,*,outerFunction
    },
    field3: {
        type: String,
        reducerFunction: +,
    },
    field4: {
        type: Object,
        outputType: 'Array'
        function:ReduceToArray,
        children: {

        child1: {
            type: Number,
            function: -,
        }
        child2: {
            type: Number,
            outputType: Array
            function: ReduceToArray
        }
        }
        
    
    }
    field5 : {
        type: Object,
        function: ReduceAllFields(+,-,*,/,customFunction ),ReduceFields(["f1","f2","f3"],+);
    }


    field3: {
        type: "!not"// don't include 
    }


}

customFunction: (val,key,acc) => {
    return newVal
}


options: {
    maxLevel: 1 - infinite(@) // default 5,
    default-functions: +,-,*,/
    errorFunction: default print 
    onlySchema: true/false // default true

}


