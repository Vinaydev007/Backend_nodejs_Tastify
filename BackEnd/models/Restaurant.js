const mongoose=require("mongoose")
const Product = require("./Product")

const RestaurantSchema=new mongoose.Schema({
    firmname:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','bakery','chinese']
            }
        ]
    },
    offer:{
         type:String
    },
    image:{
        type:String
    },
  vendor:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'vendor'
    }
  ],
  Products:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Productt'
}]
})

const Restaurant=mongoose.model('Restaurant',RestaurantSchema)

module.exports=Restaurant