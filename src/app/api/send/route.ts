import { sendStockUpdateNotifications } from "@/utils/firebase/sendNotification";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {

        const { tokens, title, body  } = await request.json();
        await sendStockUpdateNotifications({
            tokens,
            title,
            body,
        });
        
        return NextResponse.json({
            message: 'Notification sent'
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}