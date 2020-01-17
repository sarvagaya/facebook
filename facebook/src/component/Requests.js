import React from "react"
import axios from "axios"
import NavBar from "./NavBar"

export default class Requests extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            userData: [],
            user_id: "",
            requestData: [],
            request_id: 0
        }
        this.handleDeleteFriend = this.handleDeleteFriend.bind(this)
        this.handleFriend = this.handleFriend.bind(this)
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
                userData: response.data.user[0],
                user_id: response.data.user[0].user_id
            })
            axios.post("http://localhost:5000/pendingfriendrequest",{
                reciever_user_id: response.data.user[0].user_id
            }).then(response => {
            console.log(response.data.data)
            this.setState({
                requestData: response.data.data
            })
        })
        })
    }

    handleFriend = req_id => {
        let obj = {
            request_id: req_id
        }
        axios.post("http://localhost:5000/acceptrequest", obj).then(response => {
            console.log(response)
            if(response.data.Message="Success")
            {
                alert("Friend request accepted")
                window.location.reload(false)
            }
        })

    }

    handleDeleteFriend = req_id => {
        let obj = {
          request_id: req_id  
        }
        axios.post("http://localhost:5000/deleterequest", obj).then(response => {
            console.log(response)
            if(response.data.Message=="Success")
            {
                alert("Friend Request deleted")
                window.location.reload(false)
            }
        })
    }

    render()
    {
        return(
            <div>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>People Wants to connect with you!</h4>
                        </div>
                    </div>
                    <br />
                    {this.state.requestData.map((list => {
                        // console.log(list.req_id)
                        return(
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-4">
                                        {list.user_picture? <img src={`http://localhost:5000/${list.user_picture}`} style={{height: 150, width: 150}} /> : <img src="https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg" style={{height: 150, width: 150}} />}
                                        
                                    </div>
                                    <div className="col-2 text-center pt-5">
                                        <p style={{fontSize: 25}}>{list.user_firstname}</p>
                                    </div>
                                    <div className="col-3 text-center pt-5">
                                        <button type="submit" className="btn btn-lg btn-primary" onClick={e => {this.handleFriend(list.req_id)}}>Confirm</button>
                                    </div>
                                    <div className="col-3 text-center pt-5">
                                        <button type="submit" className="btn btn-lg btn-danger" onClick={e => {this.handleDeleteFriend(list.req_id)}}>Delete</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    }))}
                </div>
            </div>
        )
    }
}