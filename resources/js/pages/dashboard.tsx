import { Widget } from '@/components/ui/widget';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="m-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <Widget />
                <Widget />
                <Widget />
            </div>
        </AppLayout>
    );
}
