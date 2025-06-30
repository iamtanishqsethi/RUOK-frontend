import { Card } from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";


interface FriendItemProps {
    initialName?: string;

}

const FriendItem = ({initialName}: FriendItemProps) => {

    return (
        <div className={'flex items-center '}>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Card className=" p-2 w-full ">
                <h1>{initialName}</h1>
            </Card>
        </div>


    );
};

export default FriendItem;