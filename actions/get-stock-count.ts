import client from '@/lib/prismadb';

const getStockCount = async (storeId: string) => {
    const store = await client.store.findFirst({
        where: {
            id: storeId,
        },
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });

    if (!store) {
        return 0;
    }
    return store._count.products;
};

export default getStockCount;
