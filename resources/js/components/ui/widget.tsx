import { cn } from "@/lib/utils";

type WidgetProps = {
  href?: string;
  image?: string;
  alt?: string;
} & React.ComponentProps<"a">;

export function Widget({href, image, alt, ...props}: WidgetProps) {
  return (
    <a data-slot="widget" href={href} {...props}>
      {image && <img src={image} alt={alt ?? ""} />}
    </a>
  );
}

export function WidgetGallery({className, children, ...props}: React.ComponentProps<"div">) {
    return (
        <div className={cn("gap-6 md:columns-2 lg:columns-3", className)} {...props}>
            {children}
        </div>
    );
}

// export function WidgetOverlay({}){
    
// }