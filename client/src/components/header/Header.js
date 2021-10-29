import {useDispatch, useSelector} from "react-redux";

const Header = (props) => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    return (
        <div className={`header`}>
            {
                (currentUser.login_status.isSuccess) ? <avatar></avatar> : <TwoButton></TwoButton>
            }
        </div>
    )
}