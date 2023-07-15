
import classess from '../CSS/Home.module.css';
import Modal from './Modal';
import {useState} from 'react'
function Add(props){
 const [show, setshow]=useState(false);
 function close(){
  setshow(false); 
 }
    return (
        <>
        <button  onClick={()=>{setshow(true)}} className={classess.btn}> 
           <span>+</span>
          
           <span>Add</span>
        </button>
       {
        show&&<Modal onClose={close} onRefresh={props.onRefresh}/>
       }

        </>
    )
}
export default Add;