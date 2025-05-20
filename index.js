
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5678;

app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: question }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const answer = response.data.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ error: 'OpenAI API hatası', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});
