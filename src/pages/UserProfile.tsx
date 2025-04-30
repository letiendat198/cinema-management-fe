import { useRestrictUser } from "../hooks/restrictUser";
import { useUserStore } from "../hooks/userStore";
import UserForm from "./manage/manage-user/UserForm";

function UserProfile() {
    useRestrictUser('user');
    const user = useUserStore(state => state.user);

    return (
        <div>
            <p className="text-3xl font-bold">Profile</p>
            <UserForm edit data={user} />
        </div>
    )
}

export default UserProfile;