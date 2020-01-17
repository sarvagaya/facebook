import React from "react"
import NavBar from "./NavBar"
import axios from "axios"

export default class Home extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            userData: [],
            post_content: "",
            post_image: "",
            user_id: 0,
            postData: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleImage = this.handleImage.bind(this)
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
            // console.log(response.data.user[0])
            this.setState({
                userData: response.data.user,
                user_id: response.data.user[0].user_id
            })
        })

        axios.get("http://localhost:5000/userposts").then(response => {
            console.log(response.data.data)
            this.setState({
                postData: response.data.data
            })
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleImage = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }

    handleClick = e => {
        e.preventDefault()
        // console.log(this.state)
        const formData = new FormData();
        formData.append('post_image',this.state.post_image)
        axios.post("http://localhost:5000/createpost", formData, {
            headers: {
                post_content: this.state.post_content,
                user_id: this.state.user_id,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response.data)
            window.location.reload(false)
        })
    }

    render()
    {
        // console.log(this.state.user_id)
        return(
            <div>
                <NavBar />
                <div className="container-fluid" style={{backgroundColor: "#ededf2"}}>
                    <br />
                    <div className="row">
                        <div className="col-4">

                        </div>
                        <div className="col-4">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 border" style={{backgroundColor: "#eaf5e6"}}>
                                        <p style={{fontWeight: "bold"}}>Create Post</p>
                                    </div>
                                </div>
                                <div className="row border h-100">
                                    {this.state.userData.map(list => {
                                        return(
                                            // <div className="row">
                                                <div className="col-2 mt-4">
                                                    <img src={`http://localhost:5000/${list.user_picture}`} alt="profilePic" style={{height: 40, width: 40, borderRadius: 100}} />
                                                </div>
                                            // {/* </div> */}
                                        )
                                    })}
                                    <div className="col-10">
                                        <input type="text" className="w-100 h-100" placeholder={"What's on your mind?"} style={{borderColor: "white"}} name="post_content" onChange={e => {this.handleChange(e)}} />
                                    </div>
                                    <div className="col-12">
                                        <hr style={{backgroundColor: "lightgray"}} />
                                    </div>
                                    <div className="col-6 text-center">
                                        <input type="file" name="post_image" onChange={e => {this.handleImage(e)}} />
                                    </div>
                                    <div className="col-6 text-center">
                                        <button type="submit" className="btn btn-primary btn-lg" onClick={e => {this.handleClick(e)}}>Post</button>
                                    </div>
                                </div>
                                <br />
                                <br />
                                {this.state.postData.map(list => {
                                    return(
                                        <div className="container shadow-lg">
                                            <div className="row" style={{backgroundColor: "white"}}>
                                                <div className="col-2">
                                                    <img src={`http://localhost:5000/${list.user_picture}`} alt="profilePic" style={{height: 40, width: 40, borderRadius: 100}} />
                                                </div>
                                                <div className="col-3">
                                                    <p>{list.user_firstname}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p style={{fontSize: 10}}>Posted at {list.post_time}</p>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row" style={{backgroundColor: "white"}}>
                                                <div className="col-12">
                                                    <p>{list.post_content}</p>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <img src={`http://localhost:5000/${list.post_image}`} alt="post_image" className="w-100" style={{height: 200}} />
                                                </div>
                                            </div>
                                            <br /><br />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-4">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}