import { useNavigate } from "react-router"
import { useUserStore } from "./userStore";
import { useEffect } from "react";
import { useLoginState } from "./loginState";

export const useRestrictUser = (requiredRole?: 'admin' | 'user') => {
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const loginOpen = useLoginState(state => state.loginOpen);
    const setForce = useLoginState(state => state.setForce);


    // Must place navigate inside useEffect otherwise it will run while render -> Error
    useEffect(() => {
        console.log(user)

        if (!user) { // If no user signed in
            if (requiredRole != undefined) {
                setForce(true);
                loginOpen(); // If role requirement not undefined -> Kick out    
            } 
        }
        else {
            if (requiredRole == 'admin' && user.role != 'admin') navigate("/"); // If admin role required but user don't have that role
            // If role == user, user exists -> Always satisfy
        }    
    }, [])
}