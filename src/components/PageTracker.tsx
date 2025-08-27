import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import mixpanelService from '@/services/MixpanelService';

const PageTracker = () => {
    const location = useLocation();
    const startTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        const pageName = location.pathname; // e.g., "/home", "/about"
        startTimeRef.current = Date.now(); // Reset start time
        mixpanelService.trackPageView(pageName);

        return () => {
            const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000); // in seconds
            mixpanelService.trackTimeOnPage(pageName, timeSpent);
        };
    }, [location]); // Runs whenever the route changes

    return null;
};

export default PageTracker;