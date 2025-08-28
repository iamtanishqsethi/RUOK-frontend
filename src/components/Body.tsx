import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import useFetchUser from "@/utils/hooks/useFetchUser.ts";
import {useDispatch, useSelector} from "react-redux";
import type { User } from "@/utils/types";
import {setIsBlocked} from "@/utils/slice/configSlice.ts";
import {toast} from "sonner";
import useGuestDelete from "@/utils/hooks/useGuestDelete.ts";
import PageTracker from "@/components/PageTracker.tsx";

const Body = () => {
    const dispatch = useDispatch();
    const fetchUser = useFetchUser();
    const deleteGuest=useGuestDelete()

    useEffect(() => {
        fetchUser();
    }, []);

    const user = useSelector((store: {user: User | null}) => store.user);

    const SESSION_DURATION = 2 * 60 * 1000; // 2 min

    useEffect(() => {
        if (user == null || !user?.isGuest) {
            // Reset states for non-guest users
            dispatch(setIsBlocked(false))
            return;
        }

        const sessionStart = new Date(user.createdAt).getTime();

        // Initial check
        const now = Date.now();
        const elapsed = now - sessionStart;
        const remaining = SESSION_DURATION - elapsed;

        // If already expired when component loads
        if (remaining <= 0) {
            dispatch(setIsBlocked(true));
            toast.error('Session expired! Please log in to continue.');
            deleteGuest();
            return;
        }


        // Start interval timer
        const timer = setInterval(() => {
            const currentTime = Date.now();
            const currentElapsed = currentTime - sessionStart;
            const currentRemaining = SESSION_DURATION - currentElapsed;

            if (currentRemaining <= 0) {
                dispatch(setIsBlocked(true));
                toast.error('Session expired! Please log in to continue.');
                clearInterval(timer);
                deleteGuest();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [user])

    return (
        <>
            <PageTracker/>
            <Outlet/>
        </>
    );
};

export default Body;
