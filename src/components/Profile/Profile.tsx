import { useSelector } from "react-redux";
import type {Note, User} from "@/utils/types.ts";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { BASE_URL } from "@/utils/constants.ts";
import useFetchUser from "@/utils/hooks/useFetchUser.ts";
import ProfileEditModal from "@/components/Profile/ProfileEditModal.tsx";
import AddNoteModal from "@/components/Profile/AddNoteModal.tsx";
import {toast} from "sonner";
import {FileUp, Pen } from "lucide-react";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME!;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET!;

const Profile = () => {

    const fetchUser = useFetchUser();
    const user = useSelector((store: { user: null | User }) => store.user);
    const presentImage = user?.photoUrl;

    const [uploading, setUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [selfNotes, setSelfNotes] = useState<Note[]>([]);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [editingNote, setEditingNote] = useState<{
        _id: string;
        title: string;
        note: string
    } | null>(null);
    const [isGuest, setIsGuest] = useState<boolean>(false);

    useEffect(() => {
        if(user?.email==="guest@gmail.com"){
            setIsGuest(true)
        }
    }, []);



    const getSelfNotes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/selfNote/getAll`, {
                withCredentials: true,
            });

            const notes = response.data.data;

            if (Array.isArray(notes)) {
                setSelfNotes(notes);
            } else {
                console.error("Expected an array of notes but got:", notes);
                setSelfNotes([]);
            }
        } catch (err) {
            console.error(err);
            setSelfNotes([]);
        }
    };

    useEffect(() => {

        getSelfNotes();

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
            const response = await axios.post<{secure_url:string}>(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
            const  imageUrl=response?.data?.secure_url
            setUploadedImage(imageUrl)
            toast.success("Image uploaded successfully.")
        } catch (error) {
            console.error("Cloudinary Upload failed", error);
            toast.error("Error uploading image");
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
                await fetchUser();
                toast.success("Image uploaded successfully.");
            }
        } catch (err) {
            console.error("Image upload to DB failed", err);
            toast.error("Error updating image");
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
    // const displaySelfNotes: Note[] = selfNotes || [];

    const handleDeleteNote = async (noteId: string) => {
        try {
            await axios.delete(`${BASE_URL}/api/selfNote/delete/${noteId}`, {
                withCredentials: true,
            });
            getSelfNotes();
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    console.log(selfNotes)

    return (
        <div className="min-h-screen px-6 py-10 flex flex-row justify-between gap-8 w-full">
            {showProfileEditModal && (
                <ProfileEditModal user={user} setShowModal={setShowProfileEditModal}/>
            )}

            {showNoteModal && (
                <AddNoteModal
                    setShowNoteModal={setShowNoteModal}
                    initialNoteData={editingNote}
                    refreshNotes={getSelfNotes}
                />
            )}
            <div className="flex flex-col gap-6 w-full lg:w-2/3">
                <div
                    className="rounded-3xl p-8 flex flex-col justify-center items-center md:flex-row gap-10 shadow-md relative overflow-hidden">


                    <div className="z-10 w-full md:w-1/2 flex flex-col gap-2">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                            className="flex flex-col items-center gap-6 px-6 py-8 border border-zinc-800 rounded-3xl dark:bg-zinc-950 bg-zinc-200 shadow-sm"
                        >
                            <h1 className="text-3xl font-semibold text-white">Profile</h1>

                            <div className="flex flex-col w-full  ">
                                <label className="text-zinc-400 font-medium">Full name:</label>
                                <h2 className="text-xl font-medium text-white">
                                    {user?.firstName} {user?.lastName}
                                </h2>
                            </div>

                            <div className="flex flex-col w-full  ">
                                <label className="text-zinc-400 font-medium">Bio:</label>
                                <div className="flex-1 ">
                                    <span className="">{user?.bio || "No bio added."}</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.button
                            disabled={isGuest}
                            whileTap={{scale: 0.95}}
                            onClick={() => setShowProfileEditModal(true)}
                            className={`${isGuest?'cursor-not-allowed':'cursor-pointer'} w-full mt-2 border border-zinc-700 rounded-3xl p-2 text-white bg-zinc-800 hover:bg-zinc-700 transition`}
                        >
                            Edit Profile
                        </motion.button>
                    </div>


                    <div className="z-10 w-full md:w-1/2 flex flex-col items-center gap-4 p-8 relative " {...getRootProps()}>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageChange(Array.from(e.target.files || []))}
                        />

                        <motion.div

                            whileHover={{scale: 1.05}}
                            className="w-64 h-64 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-zinc-700 cursor-pointer overflow-hidden relative"
                        >
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Profile" className="object-cover w-full h-full"/>
                            ) : (
                                <div className="flex flex-col items-center text-zinc-400">
                                    <IconUpload className="h-5 w-5 mb-1"/>
                                    {uploading ? "Uploading..." : "Upload"}
                                </div>
                            )}
                        </motion.div>
                        {uploadedImage !== presentImage ? (
                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={uploadImageToDb}
                                className="cursor-pointer hover:scale-105 transition-transform duration-150 ease-in-out absolute dark:bg-zinc-900 bg-zinc-200 px-5 py-2 rounded-full  bottom-2 flex items-center justify-between gap-2"
                            >
                                <FileUp />
                            </motion.button>
                        ):(
                            <button
                                disabled={isGuest}
                                onClick={handleClick}
                                className={`absolute rounded-full border border-zinc-800 z-20 p-2 dark:bg-zinc-900 bg-zinc-200 bottom-1/6 right-1/4 ${isGuest?'cursor-not-allowed':'cursor-pointer'} hover:scale-105 transition-transform ease-in-out duration-150`}
                                title={'Click or drag to change your profile image'}
                            >
                                <Pen />
                            </button>
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
                    <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 w-full md:w-1/2">
                        <h2 className="text-xl font-semibold mb-2">AI Tip</h2>
                        <p>💡 Tip: Do a 5-minute breathing exercise daily.</p>
                    </div>
                </div>
            </div>

            <div
                className="w-[30%] bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-md flex flex-col relative overflow-hidden">
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

                    {selfNotes.map((note, idx) => (
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