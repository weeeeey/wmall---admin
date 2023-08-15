import React from 'react';
import Heading from './ui/heading';
import { Separator } from './ui/separator';
import DashboardCard from './dashboard-card';
import { CreditCard, DollarSign, Package } from 'lucide-react';
import DashboardOverview from './dashboard-overview';
import { Order, OrderItem, Product } from '@prisma/client';
import { format } from 'date-fns';

interface DashboardFormProps {
    orders: Order[];
}
interface DashFormProps {
    graphRevenue: { name: string; total: number }[] | number;
    salesCount: number;
    stockCount: number;
    totalRevenue: number;
}

const DashboardForm = ({
    graphRevenue,
    salesCount,
    stockCount,
    totalRevenue,
}: DashFormProps) => {
    return (
        <>
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator />
            <div className="grid grid-cols-3 gap-4 ">
                <DashboardCard
                    title="Total Revenue"
                    icon={DollarSign}
                    value={totalRevenue}
                    style="USD"
                />
                <DashboardCard
                    title="Sales"
                    icon={CreditCard}
                    value={salesCount}
                    style="+"
                />
                <DashboardCard
                    title="Products In Stock"
                    icon={Package}
                    value={stockCount}
                />
            </div>
            <DashboardOverview graphRevenue={graphRevenue} />
        </>
    );
};

export default DashboardForm;
