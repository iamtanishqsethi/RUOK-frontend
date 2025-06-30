import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface NoteItemProps {
    title?: string;
    note?: string;

}

const NoteItem = ({title, note}: NoteItemProps) => {


    return (
        <Card className="flex flex-row items-center gap-2 p-3  ">
            <div className="w-4 h-4 border-2 border-white/40 rounded-sm flex-shrink-0" />
            <div className="flex-1 flex items-center gap-2">
                <Input
                    value={title}
                    readOnly={true}
                    placeholder="Title"
                    className="bg-transparent border-none text-white placeholder:text-white/60 p-1.5 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <span className="text-white/60">|</span>
                <Input
                    value={note}
                    readOnly={true}
                    placeholder="Note"
                    className="bg-transparent border-none text-white placeholder:text-white/60 p-1.5 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 w-20"
                />
            </div>
        </Card>
    );
};

export default NoteItem;