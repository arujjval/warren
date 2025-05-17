import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { addStock, searchStocks } from '@/app/home/actions'
import { Button } from './ui/button'

function SelectStock() {
    const [search, setSearch] = useState('')
    const [result, setResults] = useState<any>()

    const handleSearch = async (stock: string) => {
        const results = await searchStocks(stock)
        setResults(results)
    }

    useEffect(() => {
        if (search.trim()) {
        handleSearch(search)
        }
    }, [search])

    return (
        <div className='mt-10 max-w-96 font-inter-regular
        text-shade-5 text-lg'>
        <Input
        type="text"
        placeholder="Search stocks..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
        />
        {result && (search.length > 0) && (
        <div className='mt-2'>
            {result.map((stock: any) => (
                <Button key={stock.Symbol} 
                    className='w-full bg-shade-4 text-shade-5'
                    onClick={() => addStock(stock.Symbol)}>
                    {stock.Symbol} 
                    - {stock.Name.substring(0, 25)}
                    {stock.Name.length > 15 ? '...' : ''}
                </Button>
            ))}
        </div>
        )}
    </div>
    )
}

export default SelectStock
