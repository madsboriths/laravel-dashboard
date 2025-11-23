export type WidgetItem = {
    image: string; // required so it always shows something
    href?: string; // optional link
    alt?: string; // optional but recommended
};

export type MoodPoint = { date: string; mood: number };
export type MoodPoints = { chartData: MoodPoint[] };
