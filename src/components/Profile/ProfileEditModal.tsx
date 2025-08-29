import { type Dispatch, type SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "@/utils/constants.ts";
import useFetchUser from "@/utils/hooks/useFetchUser.ts";
import type {User} from "@/utils/types.ts";
import {toast} from "sonner";
import {Button} from "@/components/ui/button.tsx";


interface ProfileEditModalProps {
    user: User | null;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ProfileEditModal = ({user, setShowModal }: ProfileEditModalProps) => {
    const [payload, setPayload] = useState({
        firstName:`${user?.firstName}` || "" ,
        lastName: `${user?.lastName}` || "",
        email: `${user?.email}` ,
        bio: `${user?.bio}` || "",
    })
    const fetchUser = useFetchUser();


    const editProfileInfo = async () => {
        try {
             await axios.patch(`${BASE_URL}/profile/edit`, {
                firstName: payload.firstName,
                lastName: payload.lastName,
                bio: payload.bio,
            }, { withCredentials: true });
            await fetchUser();
            setShowModal(false);
            toast.success("Profile edited successfully.");
        } catch (err){
            if (axios.isAxiosError(err)) {
                console.log(err)
                toast.error(err.response?.data.message)
            } else {
                toast.error("Internal server error");
            }
        }
    };

    return (
        <div className="font-secondary fixed inset-0 bg-black/2 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 40}}
                transition={{duration: 0.3}}
                className="bg-zinc-200 dark:bg-zinc-950 border-2 rounded-2xl p-8 max-w-lg w-full mx-auto relative shadow-2xl"
            >
                <h2 className="text-2xl font-semibold  mb-6">Edit Profile</h2>


                <div className="mb-4">
                    <label className="text-sm  block mb-1">First Name</label>
                    <input
                        type="text"
                        value={payload.firstName}
                        onChange={(e) =>
                            setPayload((prev) => ({...prev, firstName: e.target.value}))
                        }
                        className="rounded-full w-full px-4 py-2  border border-neutral-700  focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                </div>

                <div className="mb-4">
                    <label className="text-sm  block mb-1">Last Name</label>
                    <input
                        type="text"
                        value={payload.lastName}
                        onChange={(e) =>
                            setPayload((prev) => ({...prev, lastName: e.target.value}))
                        }
                        className="w-full px-4 py-2  border border-neutral-700 rounded-full focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                </div>

                {/* Email (read-only) */}
                <div className="mb-4">
                    <label className="text-sm  block mb-1">Email</label>
                    <input
                        type="email"
                        value={payload.email}
                        readOnly
                        className="w-full px-4 py-2  border border-neutral-700 rounded-full cursor-not-allowed"
                    />
                </div>

                {/* Bio */}
                <div className="mb-4">
                    <label className="text-sm  block mb-1">Bio</label>
                    <textarea
                        value={payload.bio}
                        onChange={(e) =>
                            setPayload((prev) => ({...prev, bio: e.target.value}))
                        }
                        rows={3}
                        className="w-full px-4 py-2  border border-neutral-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                </div>



                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                    <Button
                        onClick={editProfileInfo}
                        className="px-4 py-2  rounded-lg cursor-pointer transition"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 b rounded-lg cursor-pointer transition"
                    >
                        Cancel
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileEditModal;
