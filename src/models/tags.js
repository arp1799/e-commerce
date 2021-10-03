const mongoose=require('mongoose')


const tagschema=new mongoose.Schema({

    //category
    Electronics:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Sports:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Cloths:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Accessories:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],





    //sub-category
        //electronics
    Mobiles:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Laptops:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Tablet:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Camera:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    speakers:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    
        //sports
    Football:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Cricket:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Table_tennis:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Basketball:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
        //household
    Kitchen:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Hall:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Furniture:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],

        //cloths
    Men:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Women:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Kids:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],

        //accessories
    Cable:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Power_bank:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    pen_drives:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    Adapter:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],







    //Electronics
        //phone,laptop,powerbank
    ram:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    hdd:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    ssd:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    processor:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    internal_memory:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    screen_size:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    os:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    touch_screen:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    front_camera:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    back_camera:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    color:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    battery_capacity:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],


    //sports
        //cricket,
    weight:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }],
    size:[{
        product_id:mongoose.Schema.Types.ObjectId,
        // ref:'dynamicProduct'
    }]

})

module.exports=mongoose.model('Product_tags',tagschema)