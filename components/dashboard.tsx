import React from 'react';
import Heading from './ui/heading';
import { Separator } from './ui/separator';
import DashboardCard from './dashboard-card';
import { CreditCard, DollarSign, Package } from 'lucide-react';
import DashboardOverview from './dashboard-overview';
import { Order, OrderItem, Product } from '@prisma/client';

interface DashboardFormProps {
    orders: Order[];
}

const DashboardForm = ({ orders }: DashboardFormProps) => {
    return (
        <>
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator />
            <div className="grid grid-cols-3 gap-4 ">
                <DashboardCard
                    title="Total Revenue"
                    icon={DollarSign}
                    price={0}
                />
                <DashboardCard title="Sales" price={0} icon={CreditCard} />
                <DashboardCard
                    title="Products In Stock"
                    price={0}
                    icon={Package}
                />
            </div>
            <DashboardOverview orders={orders} />
        </>
    );
};

export default DashboardForm;
