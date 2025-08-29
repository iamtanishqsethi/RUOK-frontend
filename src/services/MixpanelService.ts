// MixpanelService.ts
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

let initialized = false;

if (MIXPANEL_TOKEN) {
    mixpanel.init(MIXPANEL_TOKEN, {
        debug: true,
        track_pageview: false, // keep manual page tracking
    });
    initialized = true;
} else {
    console.warn("Mixpanel token not found. Analytics disabled.");
}

class MixpanelService {
    private safeTrack(event: string, properties: Record<string, any> = {}) {
        if (initialized && typeof mixpanel.track === "function") {
            mixpanel.track(event, properties);
        } else {
            console.warn(`Skipped tracking "${event}" - Mixpanel not initialized`);
        }
    }

    trackButtonClick(buttonName: string, properties: Record<string, any> = {}) {
        this.safeTrack("Button Click", { button_name: buttonName, ...properties });
    }

    trackPageView(pageName: string) {
        this.safeTrack("Page View", { page_name: pageName });
    }

    trackTimeOnPage(pageName: string, timeSpent: number) {
        this.safeTrack("Time on Page", {
            page_name: pageName,
            time_spent_seconds: timeSpent,
        });
    }

    identifyUser(userId: string) {
        if (initialized) {
            mixpanel.identify(userId);
        }
    }

    setUserProperties(properties: Record<string, any>) {
        if (initialized) {
            mixpanel.people.set(properties);
        }
    }
}

export default new MixpanelService();
