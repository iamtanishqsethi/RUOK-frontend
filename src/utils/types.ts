export type User={
    _id:string,
    firstName:string,
    lastName?:string,
    email:string,
    photoUrl:string,
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