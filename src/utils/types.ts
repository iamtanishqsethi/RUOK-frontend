export type User={
    _id:string,
    firstName:string,
    lastName?:string,
    email:string,
    bio?:string,
    selfNotes:Note[],
    photoUrl:string,
    isGuest:boolean,
    createdAt:string,
}
export interface Emotion {
    _id: string;
    title: string;
    description: string;
    type: string;
}
export interface Payload {
    emotion: string;
    placeTag?: string;
    peopleTag?: string;
    activityTag?: string;
    description?: string;
}

export interface Tag{
    _id:string,
    title:string,
    userId:string,
}

//TODO : add date in Note type to automate notification for self notes
export interface Note {
    _id: string;
    title: string;
    note: string;
}

export interface CheckIn{
    _id:string,
    createdAt:string,
    description?:string,
    emotion:Emotion,
    activityTag?:null|Tag,
    placeTag?:null|Tag,
    peopleTag?:null|Tag,
}

export type Category =
  | "High Energy Unpleasant"
  | "Low Energy Unpleasant"
  | "High Energy Pleasant"
  | "Low Energy Pleasant";

export interface TechniqueCard {
    title: string;
    description: string;
    src: string;
    afterSrc: string;
    category: Category;
    steps: { text: string; image?: string }[];
}

export interface Step {
    text: string;
    image?: string;
}

export interface SlideStepperProps {
    steps: Step[];
    cardTitle: string;
}
export interface Feedback {
    toolName: string;
    rating: number;
    checkIn: CheckIn;
}
