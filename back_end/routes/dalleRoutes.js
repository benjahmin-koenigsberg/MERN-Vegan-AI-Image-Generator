import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
// import { Configuration, OpenAIApi } from "openai";
import axios from 'axios'


dotenv.config();

const router = express.Router();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


router.route('/').get((req, res) => {
    res.send('Hello from DALL-E')
})

// router.route('/').post(async (req, res) => {
//     // const veganPromptAdds = ['vegan', 'animal rights', 'animal liberation' , 'vegan activist', 'animal liberation front', 'veganism', 'animal defender']
//     // const randomAdd = veganPromptAdds[Math.floor(Math.random()*veganPromptAdds.length)];

//     try {
//         const { prompt } = req.body
//         prompt+=' veganism'

//         // const response = await axios.get(
//         //     `https://lexica.art/api/v1/search?q=${prompt}`
//         // );
//         // const image = response.data.images[0].src
//         // res.status(200).json({ photo: image });


//         const aiResponse = await openai.images.generate({
//             model: "dall-e-3",
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64_json',
//         });
//         const image = aiResponse.data[0].b64_json
//         res.status(200).json({ photo : image });

//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error);
//     }
// });

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;



        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            // prompt: prompt + ' veganism',
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);

        // res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

export default router;
