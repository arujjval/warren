import { createClient } from '@/utils/supabase/client'

export async function sendAllNotifications() {
  const supabase = createClient()

  // Get all users and their watchlists
  const { data: watchlistData, error: watchlistError } = await supabase
    .from('watchlist')
    .select(`
      user_id,
      stocks
    `)

  if (watchlistError) {
    console.error('Error fetching watchlists:', watchlistError)
    return
  }

  // Get FCM tokens for all users
  const { data: tokenData, error: tokenError } = await supabase
    .from('user_fcm_tokens')
    .select('user_id, fcm_tokens')

  if (tokenError) {
    console.error('Error fetching FCM tokens:', tokenError)
    return
  }

  // Create a map of user_id to FCM tokens
  const userTokens = tokenData.reduce((acc: {[key: string]: string[]}, curr) => {
    acc[curr.user_id] = curr.fcm_tokens
    return acc
  }, {})

  // For each user's watchlist
  for (const watchlist of watchlistData) {
    const userStocks = watchlist.stocks
    const userId = watchlist.user_id
    const userFcmTokens = userTokens[userId]

    if (!userFcmTokens) continue

    // Get stock information
    const { data: stockData, error: stockError } = await supabase
      .from('stocks')
      .select('*')
      .in('Symbol', userStocks)

    if (stockError) {
      console.error(`Error fetching stocks for user ${userId}:`, stockError)
      continue
    }

    // For each stock, fetch news and send notifications
    for (const stock of stockData) {
      try {
        // Fetch news for this stock
        const newsResponse = await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock }),
        });

        if (!newsResponse.ok) {
          throw new Error(`HTTP error fetching news! status: ${newsResponse.status}`)
        }

        const newsData = await newsResponse.json();

        // Only send notification if there is news
        if (newsData.hasNews) {
          // Send notification to each FCM token
          try {
            // Send a notification for each news item
            for (const newsItem of newsData.news) {
              const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  tokens: userFcmTokens,
                  title: `${stock.Symbol}`,
                  body: newsItem.news,
                  data: {
                    stock: stock,
                    news: newsItem
                  }
                }),
              })

              if (!response.ok) {
                throw new Error(`HTTP error sending notification! status: ${response.status}`)
              }
            }
          } catch (error) {
            console.error(`Error sending notifications:`, error)
          }
        }
      } catch (error) {
        console.error(`Error fetching news for stock ${stock.Symbol}:`, error)
      }
    }
  }
}
