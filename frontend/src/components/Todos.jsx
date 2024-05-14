import axios from 'axios';
import React, { useState } from 'react';

export default function Todos({ todos }) {
    const [completedTodos, setCompletedTodos] = useState(
        todos.filter(todo => todo.completed).map(todo => todo._id)
    );

    const handleCheckboxChange = async (todoId) => {
        try {
            await axios.put("http://localhost:3000/update", { _id: todoId });
            setCompletedTodos([...completedTodos, todoId]);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <div className='m-4' key={todo._id}>
                    <div className={`font-mono text-xl ${completedTodos.includes(todo._id) ? 'line-through' : ''}`}>
                        {todo.title}
                    </div>
                    <div className="flex justify-between max-w-xs">
                        <div className={`w-full ${completedTodos.includes(todo._id) ? 'line-through' : ''}`}>
                            {todo.description}
                        </div>
                        <div className="w-full">
                            <input
                                className="size-4"
                                type="checkbox"
                                onChange={() => handleCheckboxChange(todo._id)}
                                // checked={completedTodos.includes(todo._id)}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
