import classes from '../CSS/Modal.module.css';
import axios from 'axios';
import {useReducer} from 'react'
const formInitialData={   
     username:"",
    name:"",    
    duration:"",
    calories:"",
    date:""
}
function formReducer(state,action){
    switch(action.type){
        case "Name": return ({...state,name:action.value});
        case "Duration":return ({...state, duration:action.value});
        case "Calories":return ({...state,calories:action.value})
        default :return state
    }
}
function Modal( props){
 const [formData,disPatch]=useReducer(formReducer,props.value?props.value:formInitialData);
//   const [Data,setData]=useState(formData);

 function handleName(e){
    if(e.target.value!==""&&!isNaN(e.target.value))return;
     disPatch({type:"Name",value:e.target.value});
 }

 function handleDuration(e){
    // if(e.target.value!==""&&!isNaN(e.target.value))return;
     disPatch({type:"Duration",value:e.target.value});
 }
 function handleCalories(e){
    // if(e.target.value!==""&&!isNaN(e.target.value))return;
     disPatch({type:"Calories",value:e.target.value});
 }
   function closeHandler(){
        props.onClose();
   }


   async function HandleSubmit(){

    const date=new Date();
    const Dat=date.toISOString().substr(0, 10);
    formData.date=Dat;
   
       if(props.type==='Edit'){
        // props.onSubmit({
        //     id:props.id,
        //     Name:formData.name,
        //     Duration:formData.duration,
        //     Calories:formData.calories
        //    });
            await axios.put(`http://localhost:8080/user/${props.id}`,formData);
           
            props.onClose();
            props.onRefresh();
           
            return;
       }
     
       await axios.post("http://localhost:8080/user",formData);
      // props.onSubmit(formData);
        props.onClose();
        props.onRefresh();

   }
    return (
        <>
         <div className={classes.popBox}> 
           <div className={classes.box}>
            <div className={classes.head}>
             <h1>{props.type==='Edit'?'Edit':'Add'}</h1>
            </div>
            <div className={classes.form}>
                <div className={classes.inp}>
                <div>
                <label htmlFor='Name'>Name*</label>
                </div>
             <div className={classes.isNameErr}>
             <input  type='text' value={formData.name} onChange={handleName}/>             
             </div>
               </div>

               <div className={classes.inp}>
                <div>
                <label htmlFor='Duration'>Duration*</label>
                </div>
             <div className={classes.isDurationErr}>
             <input  type='number' value={formData.duration} onChange={handleDuration}/>             
             </div>
               </div>

               <div className={classes.inp}>
                <div>
                <label htmlFor='Calories'>Calories*</label>
                </div>
             <div className={classes.isCaloriesErr}>
             <input  type='number' value={formData.calories} onChange={handleCalories}/>             
             </div>
               </div>

             

            </div>
            <div className={classes.button}>
                <button className={classes.btn1}  onClick={HandleSubmit} >Confirm</button>
                <button className={classes.btn2} onClick={closeHandler} >Cancel</button>
            </div>

           </div>
         </div>
        </>
    )
}
export default Modal;