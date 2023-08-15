import client from '@/lib/prismadb';

const getSalesCount = async (storeId: string) => {
    const orders = await client.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            _count: {
                select: {
                    orderItems: true,
                },
            },
        },
    });
    if (!orders) {
        return 0;
    }

    let cnt = 0;
    const total = orders.reduce(
        (acc, order) => acc + order._count.orderItems,
        cnt
    );

    return total;
};

export default getSalesCount;
