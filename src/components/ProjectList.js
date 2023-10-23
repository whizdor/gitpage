import React from "react";
import { Link } from "react-router-dom";
export const ProjectList=({ index, title, description, imgUrl,deadline,number})=>{
    
    function handleListClick(){
        localStorage.setItem('indexy', JSON.stringify({index}));
        localStorage.setItem('namey', JSON.stringify({title}));
        console.log("some thing")
    }
    return(
        <Link to="/project_details" onClick={handleListClick} className="proj-list">
        <div className="proj-list-cell" >
            <p className="proj-list-cell-index">{title}</p>
            <p className="proj-list-cell-deadline">{deadline}</p>
            <p className="proj-list-cell-deadline">{number}</p>
        </div>

        </Link>
    )
}