import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"

var token = ""
export default class Register extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            user_firstname: "",
            user_surname: "",
            user_email: "",
            user_password: "",
            user_dob: "",
            user_gender: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handleLoginClick = this.handleLoginClick.bind(this)

    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = e => {
        // console.log(this.state)
        let obj={
            user_firstname: this.state.user_firstname,
            user_surname: this.state.user_surname,
            user_email: this.state.user_email,
            user_password: this.state.user_password,
            user_dob: this.state.user_dob,
            user_gender: this.state.user_gender
        }
        axios.post("http://localhost:5000/signup", obj).then(response => {
            // console.log(response)
            alert(response.data.Message)
            window.location.reload(false)
        })
    }

    handleLoginChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginClick = e => {
        // console.log(this.state)
        let obj={
            user_email: this.state.user_email,
            user_password: this.state.user_password
        }
        axios.post("http://localhost:5000/login", obj).then(response => {
            console.log(response.data.data.user[0].user_id)
            token = (response.data.data.token)
            // token.push(response.data.data.user[0].user_id)
            JSON.stringify(localStorage.setItem("facebook", token))
            console.log(token)
            if(response.data.Message==="Wrong Credentials")
            {
                alert(response.data.Message)
            }
            else
            {
                alert("Welcome back " + response.data.data.user[0].user_firstname + " " + response.data.data.user[0].user_surname)
                this.props.history.push("/home")
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render()
    {
        return(
            <div className="container-fluid">
                <div className="row text-light" style={{backgroundColor: "#4848ab", height: "15vh"}}>
                    <div className="col-6">
                        <Link to="/"><img className="offset-3" src="https://media.szg.io/uploads/media/590b0d85f25b7/facebook-logo.svg" style={{height: "20vh", marginTop: -20}} alt="facebook-logo" /></Link>
                    </div>
                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 text-center">
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="col-12 text-center">
                                <input type="text" style={{height: 30}} name="user_email" onChange={e => {this.handleLoginChange(e)}} />
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="row">
                            <div className="col-12 text-center">
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="col-12 text-center">
                                <input type="password" style={{height: 30}} name="user_password" onChange={e => {this.handleLoginChange(e)}} />
                            </div>
                            <div className="col-12 text-center">
                                <Link to="/"><p style={{fontSize: 10, color: "whitesmoke"}}>Forgotten password?</p></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <Link to="/"><button type="submit" className="btn btn-primary mt-4" style={{height: 35}} onClick={e => {this.handleLoginClick(e)}}>Login</button></Link>
                    </div>
                </div>
                <div className="row" style={{backgroundColor: "#ededf2"}}>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h4 className="mt-5" style={{color: "#060e63", fontWeight: "bold"}}>Facebook helps you connect and share with the people in your life.</h4>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12 text-center">
                                <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/OBaVg52wtTZ.png" alt="connecting-logo" />
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="mt-3 offset-2">Create an account</h1>
                            </div>
                            <div className="col-12">
                                <p className="offset-2" style={{fontSize: 20}}>Its quick and easy</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 text-right">
                                <input type="text" placeholder="First name" style={{height: 45}} name="user_firstname" onChange={e => {this.handleChange(e)}} />
                            </div>
                            <div className="col-6">
                                <input type="text" placeholder="Surname" style={{height: 45}} name="user_surname" onChange={e => {this.handleChange(e)}} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12 text-center">
                                <input type="email" placeholder="Email address" style={{height: 45, width: 450}} name="user_email" onChange={e => {this.handleChange(e)}} /> 
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12 text-center">
                                <input type="password" placeholder="New password" style={{height: 45, width: 450}} name="user_password" onChange={e => {this.handleChange(e)}} />
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12">
                                <p className="offset-2" style={{fontSize: 18, fontWeight: "bold", color: "gray"}}>Birthday</p>
                            </div>
                            <div className="col-5">
                                <input type="date" className="offset-5" style={{width: 150}} name="user_dob" onChange={e => {this.handleChange(e)}} />
                            </div>
                            <div className="col-1">
                            <button type="button" data-toggle="tooltip" data-placement="top" title="Click for more information" style={{borderRadius: 100, height: 30, width: 30, backgroundColor: "gray", color: "white"}}>?</button>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12">
                                <p className="offset-2" style={{fontSize: 19, fontWeight: "bold", color: "gray"}}>Gender</p>
                            </div>
                            <div className="col-3">
                                <input type="radio" className="offset-5" name="user_gender" value="male" onChange={e => {this.handleChange(e)}} />
                                <label htmlFor="male" className="offset-1">Male</label>
                            </div>
                            <div className="col-3">
                                <input type="radio" className="offset-2" name="user_gender" value="female" onChange={e => {this.handleChange(e)}} />
                                <label htmlFor="male" className="offset-1">Female</label>
                            </div>
                            <div className="col-3">
                                <input type="radio" className="offset-2" name="user_gender" value="custom" onChange={e => {this.handleChange(e)}} />
                                <label htmlFor="male" className="offset-1">Custom</label>
                            </div>
                            <div className="col-3">
                                <button type="button" data-toggle="tooltip" data-placement="top" title="Click for more information" style={{borderRadius: 100, height: 30, width: 30, backgroundColor: "gray", color: "white"}}>?</button>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-5 text-left offset-1">
                                <p style={{fontSize: 10, color: "gray"}}>By clicking Sign Up, you agree to our <Link to="/">Terms, Data Policy</Link> and <Link to="/">Cookie Policy</Link>. You may receive SMS notifications from us and can opt out at any time.</p>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12 offset-1">
                                <button type="submit" className="btn" style={{backgroundColor: "#5e914a", color: "white", width: 150}} onClick={e => {this.handleClick(e)}}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}