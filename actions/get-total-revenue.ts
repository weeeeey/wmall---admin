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
    const p = 0;

    return;
};

export default getTotalRevenue;

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce((a, c) => a + c, initialValue);

console.log(sumWithInitial);
// Expected output: 10
