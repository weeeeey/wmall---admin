import client from '@/lib/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
    params: {
        storeId: string;
        categoryId: string;
    };
}

export async function PATCH(req: Request, { params }: IParams) {
    try {
        const body = await req.json();
        const { name, billboard } = body;
        const { categoryId, storeId } = params;
        if (name.legnth === 0 || billboard.legnth === 0) {
            return new NextResponse('Invalid data', { status: 401 });
        }
        if (!categoryId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }
        const updatedCategory = await client.category.update({
            where: {
                storeId,
                id: categoryId,
            },
            data: {
                name,
                billboardId: billboard,
            },
        });

        return NextResponse.json(updatedCategory);
    } catch (error) {
        console.log('[BILLBOARDS_UPDATE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: IParams) {
    try {
        const { categoryId, storeId } = params;
        if (!categoryId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }

        const deletedCategory = await client.category.delete({
            where: {
                id: categoryId,
            },
        });
        return NextResponse.json(deletedCategory);
    } catch (error) {
        console.log('[CATEGORY_DELETE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(req: Request, { params }: IParams) {
    try {
        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 400 });
        }

        const category = await client.category.findUnique({
            where: {
                storeId: params.storeId,
                id: params.categoryId,
            },
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[category_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
