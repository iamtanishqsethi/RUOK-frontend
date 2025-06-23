import { useSelector } from "react-redux";
import type {Note, User} from "@/utils/types.ts"; // Ensure User type includes selfNotes with _id
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BASE_URL } from "@/utils/constants.ts";
import useFetchUser from "@/utils/useFetchUser.ts";
import ProfileEditModal from "@/components/ProfileEditModal.tsx";
import AddNoteModal from "@/components/AddNoteModal.tsx";

const CLOUD_NAME = "dxldm4ie8";
const UPLOAD_PRESET = "RUOK-project";



const Profile = () => {
    const user = useSelector((store: { user: null | User }) => store.user);
    const presentImage = user?.photoUrl;
    const [uploading, setUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fetchUser = useFetchUser();
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);

    // State for Add/Edit Note Modal
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [editingNote, setEditingNote] = useState<{ _id: string; title: string; note: string } | null>(null); // Explicit type for clarity

    useEffect(() => {
        if (user?.photoUrl) {
            setUploadedImage(user.photoUrl);
        }
    }, [user?.photoUrl]);

    const handleCloudinaryUpload = async (file: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data?.secure_url) {
                setUploadedImage(data.secure_url);
            }
        } catch (error) {
            console.error("Cloudinary Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    const handleImageChange = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) handleCloudinaryUpload(file);
    };

    const { getRootProps } = useDropzone({
        multiple: false,
        noClick: true,
        onDrop: handleImageChange,
    });

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const uploadImageToDb = async () => {
        try {
            if (uploadedImage) {
                const response = await axios.patch(`${BASE_URL}/api/profile/edit`, {
                    photoUrl: uploadedImage,
                }, { withCredentials: true });
                console.log(response.data);
                fetchUser();
            }
        } catch (err) {
            console.error("Image upload to DB failed", err);
        }
    };

    // Functions to handle note modal
    const handleAddNoteClick = () => {
        setEditingNote(null);
        setShowNoteModal(true);
    };

    const handleEditNoteClick = (note: { _id: string; title: string; note: string }) => {
        setEditingNote(note);
        setShowNoteModal(true);
    };

    // Make sure selfNotes is not undefined before mapping
    const displaySelfNotes: Note[] = user?.selfNotes || [];

    const handleDeleteNote = async (noteId: string) => {
        try {
            await axios.delete(`${BASE_URL}/api/selfNote/delete/${noteId}`, {
                withCredentials: true,
            });
            fetchUser();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };


    return (
        <div className="min-h-screen bg-black text-white px-6 py-10 flex flex-row justify-between gap-8 w-full">
            {showProfileEditModal && (
                <ProfileEditModal user={user} setShowModal={setShowProfileEditModal}/>
            )}

            {showNoteModal && (
                <AddNoteModal
                    setShowNoteModal={setShowNoteModal}
                    initialNoteData={editingNote} // This is the crucial prop for passing data
                />
            )}
            <div className="flex flex-col gap-6 w-full lg:w-2/3">
                <div
                    className="rounded-3xl p-8 flex flex-col justify-center items-center md:flex-row gap-10 shadow-md relative overflow-hidden">
                    <div
                        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-30">
                        <GridPattern/>
                    </div>

                    <div className="z-10 w-full md:w-1/2 flex flex-col gap-2">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                            className="flex flex-col gap-6 px-6 py-8 border border-neutral-800 rounded-3xl bg-neutral-900 shadow-sm"
                        >
                            <h2 className="text-3xl font-semibold text-center">Profile Info</h2>

                            <div className="flex justify-between text-sm sm:text-base">
                                <div className={'px-2'}>
                                    <span className="text-white"><span
                                        className="text-neutral-400">First Name:</span> {user?.firstName}</span>
                                </div>

                                <div className={'px-2'}>
                                    <span className="text-neutral-400">Last Name:</span>
                                    <span className="text-white"> {user?.lastName || "Edit to Enter"}</span>
                                </div>

                            </div>
                            <div
                                className="flex flex-col gap-1 border border-neutral-800 rounded-lg px-4 py-3 bg-neutral-950">
                                <span className="text-neutral-400">Bio:</span>
                                <span className="text-white">{user?.bio || "No bio added."}</span>
                            </div>
                        </motion.div>

                        <motion.button
                            whileTap={{scale: 0.95}}
                            onClick={() => setShowProfileEditModal(true)}
                            className="w-full mt-2 border border-neutral-700 rounded-3xl p-2 text-white bg-neutral-800 hover:bg-neutral-700 transition"
                        >
                            Edit Profile
                        </motion.button>
                    </div>


                    <div className="z-10 w-full md:w-1/2 flex flex-col items-center gap-4 p-8" {...getRootProps()}>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageChange(Array.from(e.target.files || []))}
                        />
                        <motion.div
                            onClick={handleClick}
                            whileHover={{scale: 1.05}}
                            className="w-64 h-64 rounded-full bg-neutral-800 flex items-center justify-center border-2 border-neutral-700 cursor-pointer overflow-hidden relative"
                        >
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Profile" className="object-cover w-full h-full"/>
                            ) : (
                                <div className="flex flex-col items-center text-neutral-400">
                                    <IconUpload className="h-5 w-5 mb-1"/>
                                    {uploading ? "Uploading..." : "Upload"}
                                </div>
                            )}
                        </motion.div>
                        <p className="text-sm text-neutral-400">Click or drag to change your profile image</p>
                        {uploadedImage !== presentImage && (
                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={uploadImageToDb}
                                className="bg-neutral-800 text-white px-4 py-2 rounded-lg w-full hover:bg-neutral-700 transition"
                            >
                                Submit
                            </motion.button>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div
                        className="bg-gradient-to-br from-lime-800 to-lime-500 border border-lime-700 rounded-3xl p-6 w-full md:w-1/2">
                        <h2 className="text-lg font-semibold mb-2">Last Emotion</h2>
                        <p className="text-3xl italic">Calm</p>
                        <p>Felt grounded and relaxed</p>
                        <p>on Date: <span className="italic">24th March</span></p>
                    </div>
                    <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 w-full md:w-1/2">
                        <h2 className="text-xl font-semibold mb-2">AI Tip</h2>
                        <p>💡 Tip: Do a 5-minute breathing exercise daily.</p>
                    </div>
                </div>
            </div>

            <div
                className="w-[30%] bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-md flex flex-col relative overflow-hidden">
                <div
                    className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-20">
                    <GridPattern/>
                </div>
                <h2 className="text-2xl font-semibold mb-4 z-10">Notes to Self</h2>
                <div className="overflow-y-scroll z-10 flex flex-wrap gap-4 justify-between">
                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={handleAddNoteClick}
                        className="w-42 h-50 border border-dashed border-white/20 rounded-xl bg-neutral-900 text-white flex flex-col items-center justify-center gap-2 shadow hover:shadow-lg transition"
                    >
                        <div className="text-3xl font-bold text-lime-400">+</div>
                        <p className="text-sm text-neutral-400 text-center">Add a new note</p>
                    </motion.button>

                    {displaySelfNotes.map((note, idx) => (
                        <motion.div
                            key={note?._id || idx}
                            whileHover={{scale: 1.02}}
                            className="relative bg-neutral-900 border border-white/10 rounded-xl p-4 w-42 h-50 shadow-sm hover:shadow-lg transition group"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNote(note._id);
                                }}
                                className="absolute top-1 right-1 text-xs text-red-400 hover:text-red-600"
                            >
                                ✕
                            </button>
                            <div onClick={() => handleEditNoteClick(note)} className="cursor-pointer">
                                <p className="text-sm text-neutral-300 font-semibold mb-1">{note.title}</p>
                                <p className="text-neutral-200 text-sm line-clamp-4 whitespace-pre-wrap">{note.note}</p>
                            </div>
                        </motion.div>

                    ))}
                </div>

            </div>
        </div>
    );
};

export default Profile;

function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div className="flex shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
            {Array.from({length: rows}).map((_, row) =>
                Array.from({length: columns}).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                                index % 2 === 0
                                    ? "bg-neutral-950"
                                    : "bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,0.05)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,0.3)_inset]"
                            }`}
                        />
                    );
                })
            )}
        </div>
    );
}