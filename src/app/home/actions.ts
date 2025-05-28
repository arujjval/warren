import { getUser } from '@/utils/auth/getUser'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

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

export async function signOut() {
  try {
    const supabase = createClient()
    const user = await getUser();

    // if (user) {
    //   const fcmToken = localStorage.getItem('fcmToken');

    //   if (fcmToken) {
    //     const { data: tokenData, error: fetchError } = await supabase
    //       .from('user_fcm_tokens')
    //       .select('fcm_tokens')
    //       .eq('user_id', user.id)
    //       .single();

        

    //     if (fetchError) {
    //       console.error('Error fetching FCM tokens:', fetchError);
    //     } else {
    //       const updatedTokens = tokenData.fcm_tokens.filter((token: string) => token !== fcmToken);

    //       const { error } = await supabase
    //         .from('user_fcm_tokens')
    //         .update({
    //           fcm_tokens: updatedTokens
    //         })
    //         .eq('user_id', user.id);

    //       if (error) {
    //         console.error('Error removing FCM token:', error);
    //       }

    //       localStorage.removeItem('fcmToken');
    //     }
    //   }
    // }

    const { error: signOutError } = await supabase.auth.signOut();
    
    if (signOutError) {
      console.error('Error signing out:', signOutError);
      throw signOutError;
    }

    console.log('signed out')
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
}

export async function removeStock(stock: string) {

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

export async function sendNotification() {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

export async function addUserFcmToken(token: string) {
  const user = await getUser();

  if (!user) {
    console.error('No user logged in')
    return
  }

  const { data: existingTokens } = await supabase
    .from('user_fcm_tokens')
    .select('fcm_tokens')
    .eq('user_id', user.id)
    .single()

  if (existingTokens) {
    if (!existingTokens.fcm_tokens.includes(token)) {
      const { error } = await supabase
        .from('user_fcm_tokens')
        .update({ 
          fcm_tokens: [...existingTokens.fcm_tokens, token]
        })
        .eq('user_id', user.id)
    }
  } else {
    const { error } = await supabase
      .from('user_fcm_tokens')
      .insert({
        user_id: user.id,
        fcm_tokens: [token]
      })
  }
}