import { Widget, WidgetGallery } from '@/components/ui/widget';
import AppLayout from '@/layouts/app-layout';
import { WidgetItem } from '@/types';
import { Head } from '@inertiajs/react';

const widgets: WidgetItem[] = [
    {
        image: '/images/examples/Daylio.jpg',
        href: '/mood',
        alt: 'Daylio report',
    },
    {
        image: '/images/examples/frog.jpg',
        alt: 'Frog photo',
    },
    {
        image: '/images/examples/dog.jpg',
        alt: 'Dog photo',
    },
    {
        image: '/images/examples/Dog2.jpg',
        alt: 'Dog photo',
    },
];

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <WidgetGallery className="space-y-6 py-4">
                {widgets.map((item, i) => (
                    <Widget
                        key={i}
                        href={item.href}
                        image={item.image}
                        alt={item.alt}
                        className="block overflow-hidden rounded-2xl"
                    />
                ))}
            </WidgetGallery>
        </AppLayout>
    );
}
