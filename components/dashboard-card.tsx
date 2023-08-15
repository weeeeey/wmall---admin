import { LucideIcon } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface DashboardCardProps {
    title: string;
    icon: LucideIcon;
    style?: string;
    value: number;
}

const DashboardCard = ({
    icon: Icon,
    value,
    title,
    style = '',
}: DashboardCardProps) => {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                    <p className="text-sm font-medium">{title}</p>
                    <Icon className="w-4 h-4 text-muted-foreground" />
                </CardTitle>
            </CardHeader>
            <CardContent className="font-bold text-2xl ">
                {style === 'USD' ? USDollar.format(value) : `${style}${value}`}
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
