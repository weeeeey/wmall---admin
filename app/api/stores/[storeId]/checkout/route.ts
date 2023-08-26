import client from '@/lib/prismadb';
import ObjectID from 'bson-objectid';
import { NextResponse } from 'next/server';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST,PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = params;
        const body = await req.json();
        const { productIds, orderId, phone, address } = body;
        if (!productIds || productIds.length === 0) {
            return new NextResponse('Product ids are required', {
                status: 400,
            });
        }
        const products = await client.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        const id = ObjectID(orderId).toHexString();

        const order = await client.order.create({
            data: {
                id,
                storeId,
                phone,
                address,
                isPaid: false,
                orderItems: {
                    create: products.map((pro) => ({
                        product: {
                            connect: {
                                id: pro.id,
                            },
                        },
                    })),
                },
            },
        });
        return NextResponse.json(order, { headers: corsHeaders });
    } catch (error) {
        console.log('ORDER_ERROR', error);
        return new NextResponse('internal error', { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = params;
        const order = await client.order.findMany({
            where: {
                storeId,
            },
        });
        return NextResponse.json(order);
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { storeId } = params;
        if (!storeId) {
            return new NextResponse('invalid store', { status: 400 });
        }
        const body = await req.json();
        const { orderId, isPaid } = body;
        if (orderId.length === 0 || !orderId) {
            return new NextResponse('invalid order data', { status: 401 });
        }
        const id = ObjectID(orderId).toHexString();

        const updateOrder = await client.order.update({
            where: {
                storeId,
                id,
            },
            data: {
                isPaid,
            },
        });

        return NextResponse.json(updateOrder, { headers: corsHeaders });
    } catch (error) {
        return new NextResponse('CHECKOUT_ERROR_PATCH', { status: 500 });
    }
}
