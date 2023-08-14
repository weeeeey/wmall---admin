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
    price: number;
}

const DashboardCard = ({
    icon: Icon,
    price,
    title,
    style,
}: DashboardCardProps) => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                    <p className="text-sm font-medium">{title}</p>
                    <Icon className="w-4 h-4 text-muted-foreground" />
                </CardTitle>
            </CardHeader>
            <CardContent className="font-bold text-2xl ">{price}</CardContent>
        </Card>
    );
};

export default DashboardCard;
