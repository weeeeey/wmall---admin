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
        console.log(images);
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
        console.log(newProduct);
        return NextResponse.json(newProduct);
    } catch (error) {
        console.log('[PRODUCTS_ERROR_ADD]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
