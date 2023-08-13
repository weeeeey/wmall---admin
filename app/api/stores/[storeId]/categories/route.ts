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
        const { name, billboard } = body;
        const { storeId } = params;
        if (name.legnth === 0 || billboard.legnth === 0) {
            return new NextResponse('Invalid data', { status: 400 });
        }
        if (!storeId) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        const newCategory = await client.category.create({
            data: {
                name,
                billboardId: billboard,
                storeId,
            },
        });
        return NextResponse.json(newCategory);
    } catch (error) {
        console.log('[CATEGORY_ERROR_ADD]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
