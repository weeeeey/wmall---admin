import { format } from 'date-fns';
import client from '@/lib/prismadb';

interface MonthPriceProps {
    [key: string]: number;
}
interface DataProps {
    name: string;
    total: number;
}
const getGraphRevenue = async (storeId: string) => {
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

    let monthRevenue: MonthPriceProps = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
    };
    for (let i = 0; i < orders.length; i++) {
        const mon: string = format(orders[i].updatedAt, 'MMM');
        let initialValue = 0;
        monthRevenue[mon] += orders[i].orderItems.reduce(
            (acc, current) => acc + current.product.price,
            initialValue
        );
    }

    let data: DataProps[] = [];
    for (let key in monthRevenue) {
        data.push({
            name: key,
            total: monthRevenue[key],
        });
    }
    return data;
};

export default getGraphRevenue;
