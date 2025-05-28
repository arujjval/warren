import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

function ShowWatchList({stocks}: {stocks: any[]}) {
  return (
    <Table className='border-2 border-shade-5 text-shade-5'>
        <TableCaption>These are the stocks being tracked</TableCaption>
        <TableHeader>
            <TableRow className='hover:bg-transparent'>
            <TableHead className="w-[100px] text-shade-5 text-lg
            font-extrabold">Symbol</TableHead>
            <TableHead className="text-right text-shade-5 text-lg
            font-extrabold">Name</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {stocks.map((stock) => (
                <TableRow key={stock.Symbol}>
                <TableCell className="text-shade-5 text-lg
                font-inter-thin">{stock.Symbol}</TableCell>
                <TableCell className="text-right">{stock.Name}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default ShowWatchList
