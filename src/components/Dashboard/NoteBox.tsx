import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import NoteItem from "./NoteItem";
import type {Note} from "@/utils/types.ts";


const NoteBox = () => {

    const notes:Note[]=[
        { _id: '1', title: '', note: '' },
        { _id: '2', title: '', note: '' },
        { _id: '3', title: '', note: '' },
    ]



    return (
        <div
            className={
                "group relative flex flex-col justify-between overflow-hidden rounded-xl " +
                "col-span-1 sm:col-span-2 lg:col-start-3 lg:col-end-7 lg:row-start-4 lg:row-end-7 " +
                "lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                "p-6 sm:p-8 "}
        >

            <div className="mb-3">
                <h2 className=" text-2xl font-medium">
                    Self Notes
                </h2>
            </div>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {notes.map((note) => (
                    <NoteItem
                        key={note._id}
                        title={note.title}
                        note={note.note}

                    />
                ))}
            </div>


            <div className=" pt-4 border-t border-white/10 flex items-center w-full justify-end">
                <Button
                    // variant="ghost"
                    className="  gap-2"
                >
                    <Plus size={16} />
                    Add New
                </Button>
            </div>
        </div>
    );
};

export default NoteBox;