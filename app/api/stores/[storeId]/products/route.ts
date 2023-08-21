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
        const {
            name,
            images,
            price,
            size,
            category,
            color,
            isFeatured,
            isArchived,
        } = body;
        const { storeId } = params;
        const priceInt = parseInt(price);
        if (
            name.legnth === 0 ||
            images.legnth === 0 ||
            size.legnth === 0 ||
            color.legnth === 0 ||
            category.legnth === 0 ||
            priceInt < 0
        ) {
            return new NextResponse('Invalid data', { status: 400 });
        }

        if (!storeId) {
            return new NextResponse('Invalid data', { status: 400 });
        }
        const newProduct = await client.product.create({
            data: {
                name,
                price: priceInt,
                isFeatured,
                isArchived,
                categoryId: category,
                sizeId: size,
                colorId: color,
                storeId,
                images: {
                    create: images.map((image: any) => ({ url: image.url })),
                },
            },
        });
        return NextResponse.json(newProduct);
    } catch (error) {
        console.log('[PRODUCTS_ERROR_ADD]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function GET(req: Request, { params }: IParams) {
    try {
        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 400 });
        }
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        let isFeatured;
        if (searchParams.get('isFeatured') === 'false') {
            isFeatured = false;
        } else if (searchParams.get('isFeatured') === 'true') {
            isFeatured = true;
        } else {
            isFeatured = undefined;
        }

        const products = await client.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived: false,
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.log('[products_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
