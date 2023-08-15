'use client';

import { Order } from '@prisma/client';
import React, { useState } from 'react';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface DashFormProps {
    graphRevenue: { name: string; total: number }[] | number;
}
// name
// total
const DashboardOverview = ({ graphRevenue }: DashFormProps) => {
    if (typeof graphRevenue === 'number') {
        return;
    }
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={graphRevenue}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default DashboardOverview;
