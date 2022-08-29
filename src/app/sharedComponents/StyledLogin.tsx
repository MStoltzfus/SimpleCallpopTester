import { Login } from "@microsoft/mgt-react";
import utils from "../utils";

const StyledLogin = () => {

    const loginButtonTheme = () => {
        const theme = utils.localStorageGetter().theme;
        return theme === "dark" ? "mgt-dark" : "mgt-light";
    };
    return (
        <div style={{ margin: '15px', display: 'flex', justifyContent: 'center' }}>
            <Login className={loginButtonTheme()} />
        </div>
    )
}

export default StyledLogin