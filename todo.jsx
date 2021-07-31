import React,{useEffect, useState} from 'react';



//to get localstorage

const getLocalItems=()=>{
    let list=localStorage.getItem('list');
    if (list){
        return JSON.parse(localStorage.getItem('list'));
    }else{
        return[];
    }

}


const Todo=()=>{
     const [inputData,setInputData]=useState("");
     const [items,setItems]=useState(getLocalItems());
     const [toggleSubmit,setToggleSubmit]=useState(true);
     const [isEditItem,setIsEditItem]=useState(null);


     const addItem=()=>{
    if(!inputData){
        alert("Please fill Data")

    }
    else if(inputData&& !toggleSubmit)
    {
       setItems(
           items.map((elem)=>{
   if (elem.id===isEditItem){
       return {...elem,name:inputData}
   }
   return elem;
           }))
           setToggleSubmit(true);
           setInputData('');
           setIsEditItem(null);
       
    }
    else{
        const allInputData={id:new Date().getTime().toString(),name:inputData}
      setItems([...items,allInputData]);
      setInputData('');
     }
    }

const deleteItem=(index)=>
{
 const updateditems=items.filter((elem)=>{
return index!=elem.id;
 });

 setItems(updateditems);
}

const editItem=(id)=>
{
 let newEditItem=items.find((elem)=>{
     return elem.id===id
 });
 console.log(newEditItem);
 setToggleSubmit(false);
 setInputData(newEditItem.name);
 setIsEditItem(id);
}


//localstorage

useEffect(()=>{
 localStorage.setItem('list',JSON.stringify(items))
},[items]);




    return(
        <>
         <div className="main-div">
        <div className="child-div">
        <br/>
            <h1>Todo-List</h1>
            <br/>

        <div className="addItems">
            <input type="text" placeholder="Add Items" value={inputData} 
            onChange={(e)=>setInputData(e.target.value)}
            />
            {
                toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:
                <i className="fa fa-edit add-btn" onClick={addItem} id="edit"></i>
            }
            
            </div>


<div className="showItems">
    {
        items.map((elem)=>{
            return (
                <div className="eachItem" key={elem.id}>
                <h3>{elem.name}</h3>
                <div className="todo-btn">
                 <i className="fa fa-edit add-btn" onClick={()=>editItem(elem.id)} id="edit"></i>
                <i className="fa fa-trash add-btn" onClick={()=>deleteItem(elem.id)} id="del"></i>
            </div>
            </div>
        
            )

        })
    }
</div>


        </div>
        </div>
       
        </>
    )
}
export default Todo;
