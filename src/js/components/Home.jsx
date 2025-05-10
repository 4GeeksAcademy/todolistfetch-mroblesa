import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from  '@fortawesome/free-solid-svg-icons';


//create your first component
const Home = () => {
	const [listValue , setListValue] = useState('');
	const [toDoList , setToDoList] = useState([]);
	const [user, setUser] = useState(' ');
	const [todoList, setTodoList] = useState([]);



	//CREAR USUARIO
	const createUser = async (user) => {
		await fetch(`https://playground.4geeks.com/todo/users/${user}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

		}).then((resp) => {
			if (resp.ok) {
				alert('usuario creado correctamente')
			}
		}).then (resp => resp.json())
			.catch((err) => alert(`error al crear el usuario ${JSON.stringify(err)}`));
	}




	//FETCH PARA LEER EL USUARIO Y TAREA 
	useEffect(() => {
		fetch('https://playground.4geeks.com/todo/users/alejajaja', {
			method: 'GET',
			headers:{
				'Content-Type': 'application/json'
			}
		})
		.then(resp => {
        console.log(resp.ok); // respuesta
        console.log(resp.status); // El código de estado 201, 300, 400, etc.
        return resp.json(); // pasa la info a json 
    })
    .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda


        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        console.log(error);
    });
		
	}, []) 

		//DELETE USER AND TASK 



	return (
		<div className="text-center principal">
			<h1 className="text-center mt-5 title">-Your ToDo list-</h1>
			<ul className="list-group col-4 text-center">
			<input className="input list-group-item"
				type="text"
				onChange={(e)=> setListValue(e.target.value)}
				value={listValue}
				placeholder="Type your ToDo's"
				onKeyUp={(e)=> {
					if (e.key === "Enter") { setToDoList([ ...toDoList , listValue]);
						setListValue("");
					}}}
				/>
				{toDoList.map((list)=> 
				<li className="list-group-item border border-info-subtle d-flex justify-content-between hover-item">{list}
				<FontAwesomeIcon className='check' 
				icon={faCircleCheck} style={{color: "#000000"}} 
				onClick={()=> setToDoList(toDoList.filter(toDo => toDo != list))}
				
				/>
				</li>)}
				<li className="list-group-item border border-info-subtle task"><span>{toDoList.length} task</span></li>
			</ul>
			
		</div>
	);
};

export default Home;