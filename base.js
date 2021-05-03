const Mongoose=require('mongoose')
const url="mongodb://localhost/bot"
class Database{
    constructor(url) {
    this.#init(url).then(()=>{
        this.usersCollection()
    })


    }
    async #init(){
         this.mongo=await Mongoose.connect(url,{
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    }
    async collection(name,schema){
      return this.mongo.model(name,schema)
    }
    async usersCollection(){
        this.users=await this.collection('users',Mongoose.Schema({
          chat_id:{
              type:Number,
              required:true,
              unique:true,
              index:true
          },

          text:{
              type:String,
              trim:true,
              maxlength:1024
          }


        }))
    }
    async findUser(chat_id){
        return await this.users.findOne({chat_id:chat_id})
    }
    async createUser(chat_id){
        return await this.users.create({chat_id:chat_id})
    }
    async setText(chat_id, text){
        return await this.users.findOneAndUpdate({chat_id:chat_id},{text:text})
    }


}


module.exports=Database