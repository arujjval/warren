import { getUser } from '@/utils/auth/getUser'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export async function searchStocks(stock: string) {
  const { data, error } = await supabase
  .from('stocks')
  .select()
  .ilike('Symbol', `%${stock}%`)
  .limit(5)

  if (error) {
    console.error(error)
    return []
  }

  return data
}

export async function addStock(stock: string) {
  const user = await getUser();

  console.log(user)
  
  if (!user) {
    console.error('No user logged in')
    return
  }

  // Check if user already has a row
  const { data: existingData } = await supabase
  .from('watchlist')
  .select('stocks')
  .eq('user_id', user.id)
  .single()

  if (!existingData) {
    // Create new row if none exists
    const { error } = await supabase
    .from('watchlist')
    .insert({
      user_id: user.id,
      stocks: [stock]
    })

    if (error) {
      console.error(error)
      return
    }
  } else {
    // Only add stock if it's not already in the array
    if (!existingData.stocks.includes(stock)) {
      // Update existing row by appending to stocks array
      const { error } = await supabase
      .from('watchlist')
      .update({
        stocks: [...existingData.stocks, stock]
      })
      .eq('user_id', user.id)

      if (error) {
        console.error(error)
        return
      }
    }
  }
}

export async function getWatchlist() {
  const user = await getUser();

  if (!user) {
    console.error('No user logged in')
    return
  }

  const { data, error } = await supabase
  .from('watchlist')
  .select('stocks')
  .eq('user_id', user.id)
  .single()

  if (error) {
    console.error(error)
    return []
  }

  const stockSymbols = data?.stocks || []
  
  if (stockSymbols.length === 0) {
    return []
  }

  const { data: stockData, error: stockError } = await supabase
    .from('stocks') 
    .select('*')
    .in('Symbol', stockSymbols)

  if (stockError) {
    console.error(stockError)
    return []
  }

  return stockData;
}

export async function fetchNews(stock: string) {
  try {
      const response = await fetch('/api/news', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock }),
      });
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};