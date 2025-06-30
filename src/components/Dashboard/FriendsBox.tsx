import FriendItem from "./FriendsItem";

//just for place holder
//TODO: make a proper type for 'friends'
interface Friend {
    id: string;
    name: string;

}

const FriendsBox = () => {

    const friends: Friend[] =[
        { id: '1', name: 'John',  },
        { id: '2', name: 'Jane',  },
        { id: '3', name: 'Bob',  },
    ]


    return (
        <div
            className={
                "group relative flex flex-col justify-between overflow-hidden rounded-xl " +
                "col-span-1 lg:col-start-7 lg:col-end-10 lg:row-start-4 lg:row-end-7 " +
                "lg:h-[18rem] " +
                "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] " +
                "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] " +
                "p-6 sm:p-8 "}
        >

            <div className="mb-3">
                <h2 className="text-2xl font-medium ">
                    Friends check in
                </h2>
            </div>


            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {friends.map((friend) => (
                    <FriendItem
                        key={friend.id}
                        initialName={friend.name}

                    />
                ))}
            </div>

        </div>
    );
};

export default FriendsBox;