import { Widget, WidgetGallery } from '@/components/ui/widget';
import AppLayout from '@/layouts/app-layout';
import { WidgetItem } from '@/types';
import { Head } from '@inertiajs/react';

const widgets: WidgetItem[] = [
    {
        image: '/images/examples/kitty.jpeg',
        href: '/gallery/kitty',
        alt: 'Kitty photo',
    },
];

export default function Mood() {
    return (
        <AppLayout>
            <Head title="Mood" />
            <WidgetGallery className="py-4">
                {widgets.map((item, i) => (
                    <Widget
                        key={i}
                        href={item.href}
                        image={item.image}
                        aria-label={item.alt} // helpful for a11y on links
                        className="block overflow-hidden rounded-2xl"
                    />
                ))}
            </WidgetGallery>
        </AppLayout>
    );
}
