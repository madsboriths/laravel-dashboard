import { CardContent } from "./card"

export function Widget({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div 
            data-slot="widget"
            {...props}/>
    )
}


type WidgetContentProps = {
  src: string
  alt?: string
} & React.ComponentProps<"img">

export function WidgetContent({src, alt, ...props}: WidgetContentProps) {
    return <img 
        src={src} 
        alt={alt}
        {...props}/>
}

// export function WidgetOverlay({}){
    
// }

// export function WidgetOverlay({}){
    
// }

type WidgetGalleryProps = React.ComponentProps<typeof Widget> & {
  images: string[];
};

export function WidgetGallery({images, ...props}: WidgetGalleryProps) {
    return (
        <div className="m-6 gap-6 md:columns-2 lg:columns-3">
            {images.map((src, i) => (
                <Widget key={src} {...props}>
                    <WidgetContent className="rounded-xl" src={src} alt={`Image ${i + 1}`} />
                </Widget>
            ))}
        </div>
    )
}