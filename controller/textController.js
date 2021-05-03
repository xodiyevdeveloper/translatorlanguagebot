module.exports=async (message,bot,db)=>{
    const chatId=message.chat.id
    const name=message.from.first_name
    const messageId=message.message_id
    const text=message.text
    let user=await db.findUser(chatId)

    if (!user){
        await db.createUser(chatId)
        bot.sendMessage(chatId,"So'z yoki matn kiriting.")

    } else {
        const keyboard= {
            resize_keyboard:true,
            inline_keyboard:[
              [
                  {
                      text:"Uz",
                      callback_data:"uz"
                  },
                  {
                      text:"Ru",
                      callback_data:"ru"
                  }, {
                  text:"En",
                  callback_data:"en"
              },
                  {
                      text:"Ar",
                      callback_data:"ar"
                  }
              ],
                [
                    {
                       text:'Ger',
                        callback_data:'de'
                    },
                    {
                      text:'French',
                        callback_data: 'fr'
                    },
                    {
                       text:'Kazak',
                        callback_data: 'kk'
                    },
                    {
                        text:'japan',
                        callback_data: 'ja'
                    }

                ]



            ]
        }
        await db.setText(chatId,text)
        await bot.sendMessage(chatId,text,{
            reply_markup:keyboard
        })
    }


}

