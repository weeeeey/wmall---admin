import client from '@/lib/prismadb';
import { OrderItem } from '@prisma/client';

const getTotalRevenue = async (storeId: string) => {
    const orders = await client.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });
    if (!orders) {
        return 0;
    }
    let totalPrice = 0;
    for (let i = 0; i < orders.length; i++) {
        let p = 0;
        totalPrice += orders[i].orderItems.reduce(
            (acc, orderItem) => acc + orderItem.product.price,
            p
        );
    }

    return totalPrice;
};

export default getTotalRevenue;
