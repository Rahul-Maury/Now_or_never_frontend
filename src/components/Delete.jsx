

import classes from "../CSS/Delete.module.css"

import {useState} from 'react';

import RemoveModal from "./RemoveModal";
function Delete( props){
    const [show,setShow]=useState(false);
    function showHandler(){
        setShow(true);
    }
    function close(){
        setShow(false);
    }
    return (
        <>
        <button className={classes.Deletebtn} onClick={showHandler}>
            <span>Delete</span>
        </button>
        {
            show&&<RemoveModal onRefresh={props.onRefresh} id={props.id} onClose={close}/>
        }
        </>
    )
}
export default Delete;