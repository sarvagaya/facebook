import React from "react"
import axios from "axios"
import NavBar from "./NavBar"

export default class ListofAllUser extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            userData: [],
            userInfo: [],
            user_id: 0
            // reciever_user_id: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount()
    {
        axios.get("http://localhost:5000/allusers").then(response => {
            console.log(response.data.data)
            this.setState({
                userInfo: response.data.data
            })
        })

        let user = (localStorage.getItem("facebook"))
        // console.log(this.state.token)
        axios.post("http://localhost:5000/decode", {
            user_id: user["user_id"]
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("facebook")
            }
        }).then(response => {
            // console.log(response.data.user)
            this.setState({
                userData: response.data.user[0],
                user_id: response.data.user[0].user_id
            })
            // console.log(this.state.user_id)
        })
        // console.log(this.state.userData)
    }

    handleSubmit = user_id => {
        let obj={
            reciever_user_id: user_id,
            // sender_user_id: this.state.user_id
        }
        axios.post("http://localhost:5000/sendingfriendrequest", obj, {
            headers: {
                // reciever_user_id: user_id,
                sender_user_id: this.state.user_id
            }
        } ).then(response => {
            console.log(response)
            if(response.data.Message="Success")
            {
                alert("Friend Request sent")
                this.props.history.push("/home")
            }
            
            
        })
        // console.log(this.state.user_id)
    }

    render()
    {
        // console.log(this.state.user_id)
        return(
            <div>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>Start Socializing</h4>
                        </div>
                    </div>
                    <br />
                    {this.state.userInfo.map(list => {
                    // console.log(list.user_id)
                        return(
                            <div className="row">
                                <div className="col-4 text-center">
                                    {list.user_picture? <img src={`http://localhost:5000/${list.user_picture}`} alt="user_pic" style={{height: 150, width: 150}} /> : <img src="https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg" style={{height: 150, width: 150}} />}
                                </div>
                                <div className="col-4 text-center pt-5">
                                    <p style={{fontSize: 20, fontWeight: "bold"}}>{list.user_firstname}</p>
                                </div>
                                <div className="col-4 pt-5">
                                    <button type="submit" className=" btn btn-lg btn-primary" onClick={e => {this.handleSubmit(list.user_id)}}>Add Friend</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}