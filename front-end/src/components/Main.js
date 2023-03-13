import SignIn from "./SignIn";
import SignUp from "./SignUp";


function Main(){

    return(
        <div style={{ display: "flex"}}>
        
        <img src="../assets/planet.jpeg" ></img>
        <SignIn></SignIn>
        <SignUp></SignUp>
        </div>
    )
}

export default Main;
