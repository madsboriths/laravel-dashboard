import { WidgetGallery } from '@/components/ui/widget';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const images = [
    '/images/examples/Daylio.jpg',
    '/images/examples/frog.jpg',
    '/images/examples/kitty.jpeg',
];

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
            <WidgetGallery images={images} className="py-4" />
            {/* <div className="m-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> */}
            {/* <div className="m-0 gap-6 md:columns-2 lg:columns-3">
                <Widget className="py-3">
                    <img
                        className="rounded-3xl"
                        src="/images/examples/Daylio.jpg"
                    ></img>
                </Widget>
                <Widget className="py-3">
                    <img
                        className="rounded-3xl"
                        src="/images/examples/frog.jpg"
                    ></img>
                </Widget>
                <Widget className="py-3">
                    <img
                        className="rounded-3xl"
                        src="/images/examples/kitty.jpeg"
                    ></img>
                </Widget>
            </div> */}
        </AppLayout>
    );
}
