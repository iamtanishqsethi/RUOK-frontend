export const GEMINI_MODEL_STORAGE_KEY = "gemini_model";
export const GEMINI_API_KEY_STORAGE_KEY = "gemini_api_key";

export const GEMINI_MODELS = [
    {
        value: "gemini-2.5-flash",
        label: "Gemini 2.5 Flash",
    },
    {
        value: "gemini-2.5-flash-lite",
        label: "Gemini 2.5 Flash-Lite",
    },
    {
        value: "gemini-2.5-pro",
        label: "Gemini 2.5 Pro",
    },
] as const;

export type GeminiModel = (typeof GEMINI_MODELS)[number]["value"];

export const DEFAULT_GEMINI_MODEL: GeminiModel = "gemini-2.5-flash";
const GUEST_GEMINI_API_KEY = import.meta.env.VITE_GUEST_GEMINI_API_KEY?.trim() ?? "";

const LEGACY_GEMINI_MODEL_MAP: Record<string, GeminiModel> = {
    "gemini-3-flash": DEFAULT_GEMINI_MODEL,
    "gemini-3-flash-preview": DEFAULT_GEMINI_MODEL,
    "gemini-2.0-flash": DEFAULT_GEMINI_MODEL,
    "gemini-2.0-flash-lite": "gemini-2.5-flash-lite",
    "gemini-1.5-flash": DEFAULT_GEMINI_MODEL,
    "gemini-1.5-pro": "gemini-2.5-pro",
};

const SUPPORTED_GEMINI_MODELS = new Set<GeminiModel>(
    GEMINI_MODELS.map(({ value }) => value)
);

export function normalizeGeminiModel(model: string | null | undefined): GeminiModel {
    if (!model) {
        return DEFAULT_GEMINI_MODEL;
    }

    const trimmedModel = model.trim();

    if (!trimmedModel) {
        return DEFAULT_GEMINI_MODEL;
    }

    const migratedModel = LEGACY_GEMINI_MODEL_MAP[trimmedModel] ?? trimmedModel;

    if (SUPPORTED_GEMINI_MODELS.has(migratedModel as GeminiModel)) {
        return migratedModel as GeminiModel;
    }

    return DEFAULT_GEMINI_MODEL;
}

export function getStoredGeminiModel(storage: Pick<Storage, "getItem" | "setItem"> = localStorage): GeminiModel {
    const savedModel = storage.getItem(GEMINI_MODEL_STORAGE_KEY);
    const normalizedModel = normalizeGeminiModel(savedModel);

    if (savedModel !== normalizedModel) {
        storage.setItem(GEMINI_MODEL_STORAGE_KEY, normalizedModel);
    }

    return normalizedModel;
}

export function getGeminiApiKey(
    isGuest: boolean,
    storage: Pick<Storage, "getItem"> = localStorage
): string | null {
    const savedApiKey = storage.getItem(GEMINI_API_KEY_STORAGE_KEY)?.trim();

    if (savedApiKey) {
        return savedApiKey;
    }

    if (isGuest && GUEST_GEMINI_API_KEY) {
        return GUEST_GEMINI_API_KEY;
    }

    return null;
}
