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
            <TableRow>
            <TableHead className="w-[100px] text-shade-5 text-lg
            font-inter-thin">Symbol</TableHead>
            {/* <TableHead>Status</TableHead>
            <TableHead>Method</TableHead> */}
            <TableHead className="text-right">Name</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {stocks.map((stock) => (
                <TableRow key={stock.Symbol}>
                <TableCell className="font-medium text-shade-5 text-lg
                font-inter-thin">{stock.Symbol}</TableCell>
                {/* <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell> */}
                <TableCell className="text-right">{stock.Name}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default ShowWatchList
