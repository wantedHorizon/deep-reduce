
function mapMethodsTypes(inputType, outputType, accObject, addedObject, func) {
    switch (inputType) {
        case 'string':
            return stringHandler(outputType, accObject, addedObject, func);

        case 'number':
            return numberHandler(outputType, accObject, addedObject, func);
        case 'array':
            return arrayHandler(outputType, accObject, addedObject, func);

        case 'object':
            return numberHandler(outputType, accObject, addedObject, func);

    }
}



function stringHandler(outputType, accObject, addedObject, func){
    if (!typeof addedObject === 'string' || !addedObject instanceof String){
        throw new Error('invalid type; expected string received '+typeof addedObject);
    }

    
    switch(outputType){
        case 'string':
            
    }

}







export default mapMethodsTypes;