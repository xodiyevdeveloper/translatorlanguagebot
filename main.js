const TelegramBot = require('node-telegram-bot-api');
const TOKEN="1714631481:AAFQwugFSCHmshoYkxPIBUiTlsbP5jeQrMw"
const textController=require('./controller/textController')
const CallbackController=require('./controller/CallbackController')
const bot=new TelegramBot(TOKEN,{
    polling:true
})
const Database=require('./base')
const db=new Database('mongodb://localhost/bot')

bot.on('message',async (message)=>{

  textController(message, bot,db)


})
bot.on('callback_query',async (callback_query)=>{
 await CallbackController(callback_query,bot,db)
})