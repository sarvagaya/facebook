import React from "react"
import NavBar from "./NavBar"
import axios from "axios"

export default class EditInfo extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            userData: [],
            user_firstname: "",
            user_surname: "",
            user_email: "",
            user_picture: "",
            user_cover: "",
            user_id: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleProfileImage = this.handleProfileImage.bind(this)
        this.handleCoverImage = this.handleCoverImage.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount()
    {
        let user = (localStorage.getItem("facebook"))
        axios.post("http://localhost:5000/decode", {
            user_id: user["user_id"]
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("facebook")
            }
        }).then(response => {
            console.log(response.data.user[0])
            this.setState({
                userData: response.data.user[0],
                user_firstname: response.data.user[0].user_firstname,
                user_surname: response.data.user[0].user_surname,
                user_email: response.data.user[0].user_email,
                user_picture: response.data.user[0].user_picture,
                user_cover: response.data.user[0].user_cover,
                user_id: response.data.user[0].user_id
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        // console.log(this.state)
    }

    handleProfileImage = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })

    }

    handleCoverImage = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })

    }

    handleClick = e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('user_picture',this.state.user_picture)
        formData.append('user_cover',this.state.user_cover)

        axios.post("http://localhost:5000/updateuser", formData, {
            headers: {
                user_firstname: this.state.user_firstname, 
                user_surname: this.state.user_surname,
                user_email: this.state.user_email,
                user_id: this.state.user_id,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
            window.location.reload(false)
        })
    }

    render()
    {
        // console.log(this.state.userData[0])
        return(
            <div>
                <NavBar />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p style={{fontSize: 30, fontWeight: "bold"}}>Edit Your Information {this.state.userData.user_firstname}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <p style={{fontSize: 20, fontWeight: "bold"}}>Firstname</p>
                        </div>
                        <div className="col-12 text-center">
                            <input type="text" name="user_firstname" onChange={e => {this.handleChange(e)}} value={this.state.user_firstname} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12 text-center">
                            <p style={{fontSize: 20, fontWeight: "bold"}}>Surname</p>
                        </div>
                        <div className="col-12 text-center">
                            <input type="text" name="user_surname" onChange={e => {this.handleChange(e)}} value={this.state.user_surname} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12 text-center">
                            <p style={{fontSize: 20, fontWeight: "bold"}}>Email</p>
                        </div>
                        <div className="col-12 text-center">
                            <input type="email" name="user_email" onChange={e => {this.handleChange(e)}} value={this.state.user_email} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12 text-center">
                            <p style={{fontWeight: "bold", fontSize: 20}}>Profile Picture</p>
                        </div>
                        <div className="col-12 text-center">
                            <input type="file" name="user_picture" onChange={e => {this.handleProfileImage(e)}} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12 text-center">
                            <p style={{fontSize: 20, fontWeight: "bold"}}>Cover Picture</p>
                        </div>
                        <div className="col-12 text-center">
                            <input type="file" name="user_cover" onChange={e => {this.handleCoverImage(e)}} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary" onClick={e => {this.handleClick(e)}}>Update</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}