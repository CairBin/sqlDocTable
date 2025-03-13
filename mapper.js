import config from './config.js'
const map = new Map(Object.entries(config.mapper.struct));

const mapperValue = (val) => {
    if (val === null){
        return config.mapper.value.null;
    }else if(val === true){
        return config.mapper.value.true;
    }else if(val === false){
        return config.mapper.value.false;
    }else{
        return val;
    }
}

const mapperStruct = (field)=>{
    if (map.get(field) === undefined) {
        return field;
    }

    return map.get(field);
}

export default{
    mapperValue,
    mapperStruct
}