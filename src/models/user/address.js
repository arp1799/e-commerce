var mongoose = require("mongoose");
var addressSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
	flatno: {
        type:String,
        required:true,
    },
    area:{
        type:String,
        default:"",
    },
    landmark:{
        type:String,
        default:"",
    },
    city:  {
        type:String,
        required:true,
    },
    state:  {
        type:String,
        required:true,
    },
    pin: {
        type:String,
        required:true,
    },
    country: {
        type:String,
        default:'India',
    },
    phoneno:{
		type:String,
		required:true,
		validate(value){
			if(!value.length==10){
				throw new Error('phn no not valid!!')
			}
		}
    },
    // type: {
    //     type:String,
    //     required:true,
    // },
    deafultaddress:{
		type:Boolean,
		default:false
	},
});
module.exports = mongoose.model("Address",addressSchema);