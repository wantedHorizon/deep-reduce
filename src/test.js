import deepReduce from './index';


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
        }
}

const newDeep = new deepReduce(schema);

