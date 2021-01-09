
Object,Array,String
schema {
    filed1: {
        type:Number,
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
        function: +,
    },
    field4: {
        type: Object,
        function:ReduceToArray,
        child1: {
            type: Number,
            function: -,
        }
        child2: {
            type: Number,
            function: ReduceToArray
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
    deep-level: 1 - infinate(@) // default 5,
    default-functions: +,-,*,/
    error-function: default print 
    only-schema: true/false

}


