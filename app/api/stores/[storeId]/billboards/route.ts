import client from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface IParams {
    params: { storeId: string };
}

export async function POST(req: Request, { params }: IParams) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized ', { status: 401 });
        }
        const body = await req.json();
        const { imageUrl, label } = body;
        const { storeId } = params;
        if (imageUrl.legnth === 0 || label.legnth === 0) {
            return new NextResponse('Invalid data', { status: 400 });
        }
        if (!storeId) {
            return new NextResponse('Invalid data', { status: 400 });
        }
        const newBillboard = await client.billboard.create({
            data: {
                label,
                imageUrl,
                storeId,
            },
        });
        return NextResponse.json(newBillboard);
    } catch (error) {
        console.log('[BILLBOARDS_ERROR_ADD]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
