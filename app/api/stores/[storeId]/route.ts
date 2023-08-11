import client from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface IParams {
    params: {
        storeId: string;
    };
}
export async function PATCH(req: Request, { params }: IParams) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name } = body;
        const { storeId } = params;
        if (!userId) {
            return new NextResponse('Unauthorized user', { status: 401 });
        }
        if (!name) {
            return new NextResponse('Invalid Name', { status: 400 });
        }
        if (!storeId) {
            return new NextResponse('Invalid Store Id', { status: 400 });
        }
        const updatedStore = await client.store.updateMany({
            where: {
                userId,
                id: storeId,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(updatedStore);
    } catch (error) {
        console.log('[STORE_PATCH]', error);

        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: IParams) {
    try {
        const { userId } = auth();
        const { storeId } = params;
        if (!userId) {
            return new NextResponse('Unauthorized user', { status: 401 });
        }
        if (!storeId) {
            return new NextResponse('Invalid Store Id', { status: 400 });
        }
        const res = await client.store.deleteMany({
            where: {
                userId,
                id: storeId,
            },
        });

        return NextResponse.json(res);
    } catch (error) {
        console.log('[STORE_PATCH]', error);

        return new NextResponse('Internal error', { status: 500 });
    }
}
