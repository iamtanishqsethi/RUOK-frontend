import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN=import.meta.env.VITE_MIXPANEL_TOKEN

class MixpanelService {
    constructor() {
        mixpanel.init(MIXPANEL_TOKEN, { debug: true })
    }

    trackButtonClick(buttonName: string, properties: Record<string, any> = {}) {
        mixpanel.track('Button Click', { button_name: buttonName, ...properties });
    }

    trackPageView(pageName: string) {
        mixpanel.track('Page View', { page_name: pageName });
    }

    trackTimeOnPage(pageName: string, timeSpent: number) {
        mixpanel.track('Time on Page', { page_name: pageName, time_spent_seconds: timeSpent });
    }
}

export default new MixpanelService();