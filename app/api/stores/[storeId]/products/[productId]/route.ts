import client from '@/lib/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
    params: {
        storeId: string;
        productId: string;
    };
}

export async function PATCH(req: Request, { params }: IParams) {
    try {
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
        const { productId, storeId } = params;
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

        if (!productId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }

        await client.image.deleteMany({
            where: {
                productId,
            },
        });
        const updatedProduct = await client.product.update({
            where: {
                storeId,
                id: productId,
            },
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
                    create: images.map((image: any) => ({
                        url: image.url,
                    })),
                },
            },
        });
        console.log(updatedProduct);
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.log('[PRODUCTS_UPDATE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: IParams) {
    try {
        const { productId, storeId } = params;
        if (!productId || !storeId) {
            return new NextResponse('Invalid object', { status: 401 });
        }

        const deletedProduct = await client.product.delete({
            where: {
                id: productId,
                storeId,
            },
        });
        console.log(deletedProduct);
        return NextResponse.json(deletedProduct);
    } catch (error) {
        console.log('[PRODUCTS_DELETE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

export async function GET(req: Request, { params }: IParams) {
    try {
        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 400 });
        }

        const product = await client.product.findUnique({
            where: {
                storeId: params.storeId,
                id: params.productId,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[product_GET]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}
