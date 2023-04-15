// const dotenv = require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const fs = require('fs')
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


// const openai = new OpenAIApi(configuration);
// async function sendPrompt() {
//     const response = await openai.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//         messages: [{role:'user', content:'make a short blog post for me about roleplaying'}],
//         max_tokens: 1400,
//         temperature: 0.8,
//     })

//     return response
// }


// module.exports = {sendPrompt}





