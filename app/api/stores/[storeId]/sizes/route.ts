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
        const { name, value } = body;
        const { storeId } = params;
        if (name.legnth === 0 || value.legnth === 0) {
            return new NextResponse('Invalid data', { status: 400 });
        }
        if (!storeId) {
            return new NextResponse('Invalid data', { status: 400 });
        }
        const newSize = await client.size.create({
            data: {
                name,
                value,
                storeId,
            },
        });
        return NextResponse.json(newSize);
    } catch (error) {
        console.log('[SIZES_ERROR_ADD]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function GET(req: Request, { params }: IParams) {
    try {
        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 400 });
        }

        const sizes = await client.size.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(sizes);
    } catch (error) {
        console.log('[SIZES_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
