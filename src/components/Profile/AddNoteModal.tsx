import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "@/utils/constants.ts";
import type {Note} from "@/utils/types.ts";

interface AddNoteModalProps {
    setShowNoteModal: Dispatch<SetStateAction<boolean>>;
    initialNoteData?: Note | null;
    refreshNotes: () => Promise<void>;
}

const AddNoteModal = ({ setShowNoteModal, initialNoteData,refreshNotes }: AddNoteModalProps) => {

    const [payload, setPayload] = useState<Note>({
        _id: "",
        title: "",
        note: ""
    });

    useEffect(() => {
        if (initialNoteData) {
            setPayload({
                _id:initialNoteData._id,
                title: initialNoteData.title,
                note: initialNoteData.note
            });
        } else {
            setPayload({_id:"", title: "", note: "" });
        }
    }, [initialNoteData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPayload((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveNote = async () => {
        try {
            if (initialNoteData && initialNoteData._id) {
                const response = await axios.patch(
                    `${BASE_URL}/selfNote/update/${initialNoteData._id}`,
                    payload,
                    { withCredentials: true }
                );
                console.log("Note updated:", response.data);
            } else {
                const response = await axios.post(`${BASE_URL}/selfNote/new`, payload, { withCredentials: true });
                console.log("New note added:", response.data);
            }

            await refreshNotes();
            setShowNoteModal(false);
        } catch (error) {
            console.error("Failed to save note:", error);
        }
    };

    const getModalTitle = () => {
        return initialNoteData ? "Edit Note" : "Add New Note";
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/2 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.3 }}
                    className="bg-neutral-950 border border-white/10 rounded-2xl p-8 max-w-lg w-full mx-auto relative shadow-2xl"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">{getModalTitle()}</h2>

                    {/* Title Input */}
                    <div className="mb-4">
                        <label htmlFor="noteTitle" className="text-sm text-neutral-400 block mb-1">Title</label>
                        <input
                            id="noteTitle"
                            type="text"
                            name="title" // Add name attribute for consistent handling
                            value={payload.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-neutral-900 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                            placeholder="My awesome note title"
                        />
                    </div>

                    {/* Note Content Textarea */}
                    <div className="mb-6">
                        <label htmlFor="noteContent" className="text-sm text-neutral-400 block mb-1">Note</label>
                        <textarea
                            id="noteContent"
                            name="note" // Add name attribute for consistent handling
                            value={payload.note}
                            onChange={handleInputChange}
                            className="w-full min-h-[10em] px-4 py-2 bg-neutral-900 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 resize-y"
                            placeholder="Write your thoughts here..."
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleSaveNote}
                            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition"
                        >
                            {initialNoteData ? "Save Changes" : "Add Note"}
                        </button>
                        <button
                            onClick={() => setShowNoteModal(false)}
                            className="px-4 py-2 border border-neutral-700 text-white rounded-lg hover:bg-neutral-800 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddNoteModal;