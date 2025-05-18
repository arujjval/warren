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
                    content: `Be precise and concise. 
                    Return only the news, no other text.`
                },
                {
                    role: 'user', 
                    content: `Fetch news regarding ${stock} stock, those
                    news that will affect its price in next 24 hours.`
                }
            ]
        })
      };
      
    try {
        const data = await fetch(
            'https://api.perplexity.ai/chat/completions',
            options
        );
        const news = await data.json();
        return news;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default fetchNews