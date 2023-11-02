import { RootState } from "../../../../Store/store";
import { API } from "../../../../libs/api";
import { useSelector } from "react-redux";

export default function FollowHooks() {
  const user = useSelector((state: RootState) => state.auth);

  const isFollowing = user.following?.some((item: any) => {
    return item.id === item.id;
  })
  console.log(user);
  
  const handleFollow =  (id: number, user_id: number, isFollowed: boolean) => {
    const action = isFollowed ? "unfollow" : "follow";

    API.post("/follower/", {
      followingId: user_id,
      followedId: id,
      action: action,
    });
    // console.log(response);
  }

  return {
    handleFollow,
    isFollowing
  };
}
