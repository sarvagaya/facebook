import React from "react"
import axios from "axios"
import {Link} from "react-router-dom"

export default class NavBar extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            userData: []
        }
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount()
    {
        let user = (localStorage.getItem("facebook"))
        // console.log(this.state.token)
        axios.post("http://localhost:5000/decode", {
            user_id: user["user_id"]
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("facebook")
            }
        }).then(response => {
            this.setState({
                userData: response.data.user
            })
        })
    }

    handleLogout = e => {
        window.location.href="/"
        window.localStorage.removeItem("facebook")
        
    }

    render()
    {
        // console.log(this.state.userData)
        return(
            <div className="container-fluid" style={{backgroundColor: "#4848ab"}}>
                {/* <div className="row">
                    <div className="col-1 text-right">
                        <img src="https://befc.com.au/wp-content/uploads/2019/07/2-21918_download-transparent-background-facebook-logo-clipart-facebook-logo.jpg" alt="facebook-logo" style={{height: 40}} />
                    </div>
                    <div className="col-2 text-light text-right">
                        <input type="text" placeholder="Search" className="w-40 border mt-2" />
                    </div>
                    <div className="col-1">
                    <button type="submit" className="mt-1"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png" alt="search-icon" style={{height: 10}} /></button>
                    </div> */}
                    {/* <div className="col-2 text-right">
                        <img src="https://images.unsplash.com/photo-1499070133092-614effc7d13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" alt="profilePic" style={{height: 40, width: 40, borderRadius: 100}} />
                    </div>
                    <div className="col-2 text-light mt-1">
                        <p>Sarvagaya</p>
                    </div>
                    <div className="col-2 text-light mt-1">
                        <p>Home</p>
                    </div>
                    <div className="col-2 text-light mt-1">
                        <p>Logout</p>
                    </div> */}
                    {this.state.userData.map(list => {
                        return(
                            <div className="row border">
                                <div className="col-1 text-right">
                                    <img src="https://befc.com.au/wp-content/uploads/2019/07/2-21918_download-transparent-background-facebook-logo-clipart-facebook-logo.jpg" alt="facebook-logo" style={{height: 40}} />
                                </div>
                                <div className="col-2 text-light text-right">
                                    {/* <input type="text" placeholder="Search" className="w-40 border mt-2" /> */}
                                    <p><Link to="/listofallusers" className="text-light">Search Users</Link></p>
                                </div>
                                <div className="col-1">
                                    <button type="submit" className="mt-1"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png" alt="search-icon" style={{height: 10}} /></button>
                                </div>
                                <div className="col-2 text-right">
                                    <img src={`http://localhost:5000/${list.user_picture}`} alt="profilePic" style={{height: 40, width: 40, borderRadius: 100}} />
                                </div>
                                <div className="col-2 text-light mt-1">
                                    <Link to="userdashboard" className="text-light"><p style={{fontWeight: "bold"}}>{list.user_firstname}</p></Link>
                                </div>
                                <div className="col-1 text-light mt-1">
                                    <p><Link to="/home" className="text-light" style={{fontWeight: "bold"}}>Home</Link></p>
                                </div>
                                <div className="col-1 text-center mt-1">
                                    <p><Link to="/requests" className="text-light" style={{fontWeight: "bold"}}>Requests</Link></p>
                                </div>
                                <div className="col-2 text-light mt-1">
                                    <button type="submit" className="btn btn-primary" onClick={e => {this.handleLogout(e)}}>Logout</button>
                                </div>
                            </div>
                        )
                    })}
                {/* </div> */}
            </div>
        )
    }
}