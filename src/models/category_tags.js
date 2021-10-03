const mongoose=require('mongoose')


const categoryschema=new mongoose.Schema({
    laptops:{
        type:   Array,
        default:["brand","ex-lenovo","prize","In Rupees","ram","ex-8 GB","hdd","ex-2 TB","ssd","ex-256 GB","processor","ex-Intel i7 10th Gen","screen_size","ex-15.6 inch","os","ex-bios","touch_screen","Yes/No","front_camera","ex-16 MP","color","ex-Black/Grey","battery_capacity","ex-20000 mAh"]
    },
    mobiles:{
        type:Array,
        default:["brand","ex-lenovo","prize","In Rupees","ram","ex-8 GB","hdd","ex-2 TB","ssd","ex-256 GB","processor","ex-Snapdragon 865 plus","screen_size","ex-4.6 inch","os","ex-windows","touch_screen","Yes/No","front_camera","ex-16 MP","color","ex-Rose Gold","battery_capacity","ex-6000 mAh"]
    },	
    tablet:{
        type:Array,
        default:["brand","ex-lenovo","prize","In Rupees","ram","ex-8 GB","hdd","ex-2 TB","ssd","ex-256 GB","processor","ex-Snapdragon 865 plus","screen_size","ex-4.6 inch","os","ex-windows","touch_screen","Yes/No","front_camera","ex-16 MP","color","ex-Rose Gold","battery_capacity","ex-6000 mAh"]
    },
    camera:{
        type:Array,
        default:["brand","ex-Canon","prize","In Rupees","color","ex-black","battery_capacity","ex-5000 mAh"]
    },
    speakers:{
        type:Array,
        default:["brand","ex-Boat","prize","In Rupees","touch_screen","Yes/No","color","ex-black,green","battery_capacity","ex-2000 mAh"]
    },
    football:{
        type:Array,
        default:["brand","ex-Adidas","prize","In Rupees","weight","ex-1.3 kg","size","ex-3"]
    },
    cricket:{
        type:Array,
        default:["brand","ex-Adidas","prize","In Rupees","weight","ex-1.3 kg","size","ex-3"]
    },
    table_tennis:{
        type:Array,
        default:["brand","ex-Tamasu","prize","In Rupees","weight","ex-1.3 kg","size","2.74 m(in metres)"]
    },
    basketball:{
        type:Array,
        default:["brand","ex-Nivia","prize","In Rupees","weight","ex-1.3 kg","size","ex-3"]
    },
    
})    

module.exports=mongoose.model('category_front',categoryschema);
