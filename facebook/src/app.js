import React from "react"
import {Route} from "react-router-dom"
import Register from "./component/Register"
import UserDashboard from "./component/UserDashboard"
import Home from "./component/Home"
import EditInfo from "./component/EditInfo"
import ListofAllUser from "./component/ListofAllUser"
import Requests from "./component/Requests"
import Friends from "./component/Friends"

export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return(
            <div>
                <Route path="/" exact component={Register} />
                <Route path="/userdashboard" component={UserDashboard} />
                <Route path="/home" component={Home} />
                <Route path="/editinfo" component={EditInfo} />
                <Route path="/listofallusers" component={ListofAllUser} />
                <Route path="/requests" component={Requests} />
                <Route path="/friends" component={Friends} />
            </div>
        )
    }
}