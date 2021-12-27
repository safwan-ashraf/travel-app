import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Places from "./components/screens/Places";
import Place from "./components/screens/Place";
import NotFound from "./components/screens/NotFound";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import React, {useState, useEffect} from "react";

export const UserContext = React.createContext();

function App(props) {
    const [userData, setUserData] = useState({});  //an object
    const updateUserData = (action) => {
        switch(action.type){
            case "LOGOUT":
                setUserData(null);
                localStorage.clear();
                break;
            case "LOGIN":
                setUserData(action.payload)
                break;
            default:
                break; 
        }
    }

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("user_data")));
    }, []) //only on component mount
    
    return (
        <div> 
            <UserContext.Provider value={{userData, updateUserData}}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Places} />
                        <Route path="/auth/login/" exact component={Login} />
                        <Route path="/auth/create/" exact component={Signup} />
                        <Route path="/place/:id" component={Place} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
