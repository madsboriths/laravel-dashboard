import { ChartLineDotsColors } from '@/components/chart-line-dots-colors';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { MoodPoints } from '@/types/types';
import { Head, router, usePage } from '@inertiajs/react';

export default function Mood() {
    const { chartData } = usePage<MoodPoints>().props;

    function handleSync() {
        router.post('/mood/sync');
    }

    return (
        <AppLayout>
            <Head title="Mood" />
            <div className="space-y-6 py-4">
                <Button className="cursor-pointer" onClick={handleSync}>
                    Sync Daylio data
                </Button>
            </div>
            <ChartLineDotsColors chartData={chartData} />
        </AppLayout>
    );
}
