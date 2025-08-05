import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";


const FAQ = () => {

    return (
        <div className="flex flex-col items-center justify-center h-auto py-8 md:py-16  relative font-secondary bg-gradient-to-b from-white to-neutral-50 dark:from-zinc-950 dark:to-zinc-900">
            <div className="font-mynabali-serif flex items-center justify-center py-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center px-4">
                Frequently Asked Questions
            </div>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-4xl mx-auto px-6 text-xl"
                >
                <AccordionItem value="item-1">
                    <AccordionTrigger className={'text-lg font-medium'}>Do I need any experience with mental health apps to use RuOk?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                            Not at all! RuOk is designed for everyone, whether you're new to emotional wellness or have been on your mental health journey for years. Our intuitive interface and guided onboarding make it easy to start wherever you are
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className={'text-lg font-medium'}>How is RuOk different from other mood tracking apps?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                            Unlike generic mood trackers that limit you to \"happy\" or \"sad,\" RuOk offers 300+ specific emotions with contextual tagging. Our AI companion remembers your journey and provides personalized support, while our focus on precision helps you build genuine emotional vocabulary.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className={'text-lg font-medium'}>How does the AI companion work?</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        Sage, your AI companion, is trained specifically for mental health conversations. It remembers your previous check-ins and emotional patterns to provide contextual, personalized guidance. It's available 24/7 and designed to complement, not replace, professional mental health support
                    </p>
                    </AccordionContent>
                </AccordionItem>

            <AccordionItem value="item-4">
                <AccordionTrigger className={'text-lg font-medium'}>Do you offer professional mental health resources?</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>
                        While RuOk provides valuable self-care tools and AI support, we always recommend professional help for serious mental health concerns. We provide resources and guidance on when and how to seek professional support.
                    </p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

        </div>
    );
};



export default FAQ;