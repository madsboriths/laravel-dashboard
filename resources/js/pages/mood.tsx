import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';

export default function Mood() {
    function handleSync() {
        router.post('/mood/sync');
        // or: router.post(route('mood.sync')) if you have Ziggy
    }
    const { flash } = usePage().props as { flash?: { status?: string } };

    return (
        <AppLayout>
            <Head title="Mood" />
            <Button className="w-3xl" onClick={handleSync}>
                Sync Daylio Data
            </Button>

            {flash?.status && (
                <p className="text-sm text-green-600">{flash.status}</p>
            )}
        </AppLayout>
    );
}
