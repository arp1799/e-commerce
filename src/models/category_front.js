const mongoose=require('mongoose')


const categoryschema=new mongoose.Schema({
    laptops:{
        type:   Array,
        default:["brand","prize","ram","hdd","ssd","processor","internal_memory","screen_size","os","touch_screen","front_camera","back_camera","color","battery_capacity"]
    },
    mobiles:{
        type:Array,
        default:["brand","prize","ram","processor","internal_memory","screen_size","os","front_camera","back_camera","color","battery_capacity"]
    },	
    tablets:{
        type:Array,
        default:["brand","prize","ram","processor","internal_memory","screen_size","os","front_camera","back_camera","color","battery_capacity"]
    },
    camera:{
        type:Array,
        default:["brand","prize","color","battery_capacity"]
    },
    speaker:{
        type:Array,
        default:["brand","prize","touch_screen","color","battery_capacity"]
    },
    football:{
        type:Array,
        default:["brand","prize","weight","size"]
    },
    cricket:{
        type:Array,
        default:["brand","prize","weight","size"]
    },
    table_tennis:{
        type:Array,
        default:["brand","prize","weight","size"]
    },
    basketball:{
        type:Array,
        default:["brand","prize","weight","size"]
    },
    
})    

module.exports=mongoose.model('category_front',categoryschema);