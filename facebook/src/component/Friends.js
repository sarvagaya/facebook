import React from "react"
import NavBar from "./NavBar"

export default class Friends extends React.Component
{
    render()
    {
        return(
            <div>
                <NavBar />
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>Friend-List</h4>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}