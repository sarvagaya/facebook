import React from "react"
import NavBar from "./NavBar"
import {Link} from "react-router-dom"
import axios from "axios"

export default class UserDashboard extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            userData: [],
            user_id: "",
            userPosts: [],
            userPhotos: []
        }
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
            // console.log(response.data)
            this.setState({
                userData: response.data.user[0],
                user_id: response.data.user[0].user_id
            })
            axios.post("http://localhost:5000/photos", {},{
            headers: {
                user_id: response.data.user[0].user_id
            }
        }).then(response => {
            console.log(response.data.data)
            this.setState({
                userPhotos: response.data.data
            })
        })
            // console.log(response.data.user[0].user_id)
            axios.post("http://localhost:5000/particularuserposts", {}, {
            headers: {
                user_id: response.data.user[0].user_id
            }
        }).then(response => {
            // console.log(response.data.data)
            this.setState({
                userPosts: response.data.data
            })
        })
        })

        


    }
    render()
    {
        // console.log(this.state.user_id)
        return(
            <div>
                <NavBar />
                {/* <br /> */}
                <div className="container-fluid" style={{backgroundColor: "#ededf2"}}>
                    <div className="container pt-3">
                        <div className="row border shadow-lg">
                            <div className="col-12">
                                <img src={`http://localhost:5000/${this.state.userData.user_cover}`} alt="cover_pic" className="w-100 shadow-lg" style={{height: 400}} />
                            </div>
                            <div className="col-4">
                                <img src={`http://localhost:5000/${this.state.userData.user_picture}`} alt="profilePic" style={{height: 200, width: 200, borderRadius: 100, borderWidth: 20, borderColor: "white", marginTop: -150}} />
                            </div>
                            <div className="col-6 text-right">
                                <button className="h-100" style={{color: "blue", fontWeight: "bold"}}>Photos</button>
                            </div>
                            <div className="col-6 text-center" style={{marginTop: -50}}>
                                <Link to="/editinfo"><button className="h-100" style={{color: "blue", fontWeight: "bold"}}>Edit Info</button></Link>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-6">
                                <div className="container-fluid bg-light">
                                    <div className="row" style={{backgroundColor: "white"}}>
                                        <div className="col-3 text-center">
                                            <img src="https://ak7.picdn.net/shutterstock/videos/8545777/thumb/2.jpg" alt="" style={{height: 50}} />
                                        </div>
                                        <div className="col-8 pt-2">
                                            <p style={{fontSize: 20}}>Intro</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <img src="https://cdn4.iconfinder.com/data/icons/vectory-basic/40/comment_2-512.png" alt="" style={{height: 40}} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <p style={{fontSize: 16, color: "gray"}}>Your Bio! So that people can know you a little better.</p>
                                            <p><Link to="/editinfo">Edit Bio</Link></p>
                                        </div>
                                    </div>
                                    <hr />
                                    <br /><br ></br>
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="https://img.icons8.com/cotton/2x/person-male.png" alt="" style={{height: 30}} />
                                        </div>
                                        <div className="col-6">
                                            <p>FirstName: <Link to="#">{this.state.userData.user_firstname}</Link></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="https://img.icons8.com/cotton/2x/person-male.png" alt="" style={{height: 30}} />
                                        </div>
                                        <div className="col-6">
                                            <p>Surname: <Link to="#">{this.state.userData.user_surname}</Link></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2">
                                            <img src="https://cdn1.iconfinder.com/data/icons/cv-resume-1/32/3-512.png" alt="" style={{height: 30}} />
                                        </div>
                                        <div className="col-8">
                                            <p>Email: <Link to="#">{this.state.userData.user_email}</Link></p>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-6 text-center">
                                            <Link to="/editinfo"><button type="submit" className="btn btn-secondary btn-lg">Edit Bio</button></Link>
                                        </div>
                                        <div className="col-6 text-center">
                                            <Link to="/friends"><button type="submit" className="btn btn-lg btn-secondary">Friends</button></Link>
                                        </div>
                                    </div>
                                    <br />
                                    {this.state.userPhotos.map(list => {
                            return(
                                <div className="container-fluid" style={{backgroundColor: "white"}}>
                                    <div className="row float-left" style={{backgroundColor: "white"}}>
                                        <div className="col-3">
                                            <img src={`http://localhost:5000/${list.post_image}`} style={{height: 100, width: 100}} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                                </div>
                            </div>
                            <div className="col-6 shadow-lg">
                                {this.state.userPosts.map(list => {
                                    return(
                                        <div className="container-fluid">
                                            <br />
                                            <div className="row">
                                                <div className="col-4">
                                                    <img src={`http://localhost:5000/${list.user_picture}`} alt="profile" style={{height: 40, width: 40, borderRadius: 100}} />
                                                </div>
                                                <div className="col-4">
                                                    <p>{list.user_firstname}</p>
                                                </div>
                                                <div className="col-4">
                                                    <p style={{fontSize: 10}}>{list.post_time}</p>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-12">
                                                    <p>{list.post_content}</p>
                                                </div>
                                                <div className="col-12">
                                                    <img className="w-100" src={`http://localhost:5000/${list.post_image}`} alt="post_image" style={{height: 200}} />
                                                </div>
                                                <div className="col-12">
                                                    <p className="text-light">.</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <br />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}