import { z } from "zod/v4";

const AnswerFormat = z.object({
    hasNews: z.boolean(),
    news: z.array(
        z.object({
            news: z.string(),
            link: z.string()
        })
    )
});

const fetchNews = async (stock: string) => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SONAR_API_KEY!}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'sonar',
            messages: [
                {
                    role: 'system',
                    content: `Be concise and to the point.`
                },
                {
                    role: 'user', 
                    content: `Strictly provide the last "2 hours" news about ${stock} 
                    covering industry developments, economic/geopolitical events, 
                    and company announcements.
                    Please output a JSON object containing the following fields:
                    hasNews, news
                    If there is no news available, return an empty array for news and false for hasNews.
                    HasNews is true if there is news available, false otherwise
                    News is an array of news items, empty array if no news available
                    Each news item is a object with the following fields:
                    news, link
                    news should be short, concise and to the point. 
                    each news item will only have one citation.`

                }
            ],
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "schema": z.toJSONSchema(AnswerFormat)
                }
            },
        })
      };
    try {
        const data = await fetch(
            'https://api.perplexity.ai/chat/completions',
            options
        );
        const news = await data.json();
        const info = JSON.parse(news.choices[0].message.content);

        return info;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default fetchNews