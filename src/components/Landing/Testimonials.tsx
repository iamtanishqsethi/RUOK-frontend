import { cn } from "@/lib/utils.ts";
import { Marquee } from "@/components/magicui/marquee.tsx";

const reviews = [
    {
        name: "Sarah",
        username: "@sarahwellness",
        body: "Finally found an app that gets my emotions right. The 300+ emotion options helped me realize I wasn't just 'sad' - I was grieving. Game changer.",
        img: "https://avatar.vercel.sh/sarah",
    },
    {
        name: "Mike",
        username: "@mike_journey",
        body: "Sharing check-ins with my close friends through Ru-Ok has deepened our friendships more than I ever expected. We actually talk about real stuff now.",
        img: "https://avatar.vercel.sh/mike",
    },
    {
        name: "Emma",
        username: "@emma_grows",
        body: "The AI companion feels like having a therapist in my pocket. It remembers our conversations and actually gives helpful, personalized advice.",
        img: "https://avatar.vercel.sh/emma",
    },
    {
        name: "David",
        username: "@david_heals",
        body: "Those emotion charts showed me patterns I never noticed. Turns out my anxiety spikes every Sunday - now I can prepare for it.",
        img: "https://avatar.vercel.sh/david",
    },
    {
        name: "Lisa",
        username: "@lisa_mindful",
        body: "Been using mental health apps for years, but Ru-Ok is different. It doesn't just track - it actually helps me understand and grow.",
        img: "https://avatar.vercel.sh/lisa",
    },
    {
        name: "Alex",
        username: "@alex_authentic",
        body: "The daily check-ins became my favorite ritual. It's like having a conversation with myself that actually leads somewhere meaningful.",
        img: "https://avatar.vercel.sh/alex",
    }
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
                        img,
                        name,
                        username,
                        body,
                    }: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-zinc-950/[.1] bg-zinc-950/[.01] hover:bg-zinc-950/[.05]",
                // dark styles
                "dark:zinc-gray-50/[.1] dark:bg-zinc-50/[.10] dark:hover:bg-zinc-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function Testimonials() {
    return (
        <div className="font-secondary relative flex w-full flex-col items-center justify-center overflow-hidden my-16">
            <h1 className={'text-3xl font-bold sm:text-4xl md:text-5xl m-9 font-mynabali-serif'}>Shared Journeys</h1>
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    );
}
