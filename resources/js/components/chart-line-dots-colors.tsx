'use client';

import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { CartesianGrid, Dot, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { MoodPoints } from '@/types/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

export const description = 'A line chart with dots and colors';

const chartConfig = {
    mood: {
        label: 'Mood',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig;

export function ChartLineDotsColors({ chartData }: MoodPoints) {
    const [timeRange, setTimeRange] = React.useState('365d');

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        // const referenceDate = new Date('2025-11-20');
        const referenceDate = new Date(chartData[chartData.length - 1].date);

        let daysToSubtract = 365;
        if (timeRange === '90d') {
            daysToSubtract = 90;
        } else if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }

        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Line Chart - Dots Colors</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last Year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="365d" className="rounded-lg">
                            Last 365 days
                        </SelectItem>
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={filteredData}
                        margin={{
                            top: 24,
                            left: 24,
                            right: 24,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <YAxis></YAxis>
                        <XAxis dataKey="date" />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    nameKey="mood"
                                    hideLabel
                                />
                            }
                        />
                        <Line
                            dataKey="mood"
                            type="natural"
                            stroke="var(--chart-1)"
                            strokeWidth={5}
                            dot={({ payload, ...props }) => {
                                return (
                                    <Dot
                                        key={payload.date}
                                        r={10}
                                        cx={props.cx}
                                        cy={props.cy}
                                        fill="var(--chart-1)"
                                        stroke="var(--chart-1)"
                                    />
                                );
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{' '}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
