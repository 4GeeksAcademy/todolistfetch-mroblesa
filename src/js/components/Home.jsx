import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTrash } from  '@fortawesome/free-solid-svg-icons';


//create your first component
const Home = () => {
	const [listValue , setListValue] = useState('');
	const [toDoList , setToDoList] = useState([]);
	const [user] = useState('alejajaja');



	//CREAR USUARIO
	const createUser = async (user) => {

		try {
			await fetch(`https://playground.4geeks.com/todo/users/alejajaja`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                    label: listValue,
                    is_done: false
                })
		});
		 if (resp.ok) {
				alert('usuario creado correctamente')
			}
		} catch(err) {
			console.log(`error al crear el usuario ${JSON.stringify(err)}`);}
	}

 	
 	const fetchToDos = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/users/${user}`);
			if (response.status === 404) {
				await createUser();
				return;
			}
			const data = await response.json();
			setToDoList(data.todos || []);

		} catch (err) {
			console.log(err);
		}
	}


	//FETCH PARA LEER EL USUARIO Y TAREA 
	 const addTodo = async () => {
        if (!listValue.trim()) return;
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    label: listValue,
                    is_done: false
                }),
            });
            if (response.ok) {
                setListValue('');
                await fetchToDos();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
		//DELETE USER AND TASK 
	 const deleteTodo = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) await fetchToDos();
        } catch (error) {
            console.log('Error:', error);
        }
    };

	const clearAll = async () => {
		try {
			const deleteResponse = await fetch(`https://playground.4geeks.com/todo/users/${user}`, {
				method: 'DELETE',
				headers: { 'Content-Type' : 'application/json'},
			});
			if(deleteResponse.ok) {
				await createUser();
				await fetchToDos();
			} 
			}
			catch (err) {
				console.error('Error:', err)
			}
		}
	

	useEffect(() => {
		fetchToDos();
	}, []);


	return (
		<div className="text-center principal">
			<h1 className="text-center mt-5 title">-Your ToDo list-</h1>
			<div className="list-group col-4 text-center">
			<input className="input list-group-item"
				type="text"
				onChange={(e)=> setListValue(e.target.value)}
				value={listValue}
				placeholder="Type your ToDo's"
				onKeyUp={(e)=> e.key === 'Enter' && addTodo()}
				/>

				{
				toDoList.map((todo) => (
                    <div key={todo.id} className="list-group-item border d-flex justify-content-between align-items-center">
                        {todo.label}
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="text-success cursor-pointer"
                            onClick={() => deleteTodo(todo.id)}
                        />
                    </div>
                ))
				}
                
                <div className="list-group-item border d-flex justify-content-between align-items-center">
                    <span>{toDoList.length} task{toDoList.length !== 1 && 's'}</span>
                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={clearAll}
                    >
                        <FontAwesomeIcon icon={faTrash} /> Clear All
                    </button>
				</div>
			</div>
			</div>
	)
		}


export default Home;