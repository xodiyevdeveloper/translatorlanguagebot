const translate = require('@vitalets/google-translate-api')
module.exports=async (message,bot,db)=>{
const data=message.data
    const chatId=message.from.id
    let user =await db.findUser(chatId)
    const text=message.message.text
    console.log(user)
    let translatedWord=await translate(text,{to:data})
    await bot.editMessageText(translatedWord.text,{
        chat_id:chatId,
        message_id:message.message.message_id
    })
}
console.log(translate)