import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { addStock, searchStocks } from '@/app/home/actions'
import { Button } from './ui/button'
import Image from 'next/image'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function SelectStock() {
    const [search, setSearch] = useState('')
    const [result, setResults] = useState<any>()
    const [selectedStock, setSelectedStock] = useState<string | null>(null)

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
        <Dialog>
            <DialogTrigger>
                <div className='flex items-center justify-center'>
                    <div className='flex items-center justify-center
                    hover:cursor-pointer bg-shade-4 rounded-2xl p-3 gap-3
                    transition delay-100 hover:bg-shade-3'>
                        <Image src='/icons/plus.png' 
                        alt='add-stock'
                        width={32} height={32} 
                        style={{
                            filter: 'invert(1)'
                        }}/>
                        <p className='text-lg text-white
                        font-medium'>
                            Add Stock
                        </p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Stock to track</DialogTitle>
                </DialogHeader>
                <div className='mt-10 max-w-96 font-inter-regular
                text-shade-5 text-lg'>
                    <Input
                    type="text"
                    placeholder="Search stocks..."
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                    />
                    {result && (search.length > 0) && (
                    <div className='mt-1'>
                        {result.map((stock: any) => (
                            <Button key={stock.Symbol}
                                onClick={() => setSelectedStock(stock.Symbol)}
                                className='w-full border-2 border-shade-3 
                                mt-1 hover:cursor-pointer hover:bg-shade-3
                                transition delay-100'>
                                {stock.Symbol} 
                                - {stock.Name.substring(0, 25)}
                                {stock.Name.length > 15 ? '...' : ''}
                            </Button>
                        ))}
                    </div>
                    )}
                </div>
                <DialogFooter>
                <DialogClose asChild>
                    <Button
                        disabled={!selectedStock}
                        type='submit'
                        className={`${!selectedStock ? 
                            'opacity-50 cursor-not-allowed' : 'hover:cursor-pointer'}
                            bg-shade-2 hover:bg-shade-3`}
                        onClick={() => selectedStock && addStock(selectedStock)}>
                        Add {selectedStock ? selectedStock : 'Stock'}
                    </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SelectStock
