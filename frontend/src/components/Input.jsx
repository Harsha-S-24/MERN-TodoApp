import axios from 'axios';
import React, { useState } from 'react';

export default function Input() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [buttonText, setButtonText] = useState("Add Todo");
    const [errorMessage, setErrorMessage] = useState("");

    async function sendReq() {
        if (!title || !description) {
            setErrorMessage("Details are required.");
            return;
        }
        try {
            const res = await axios.post("http://localhost:3000/todo", {
                title: title,
                description: description,
                completed: false
            });
            console.log(res.data);
            if (res.status === 200 && res.data.msg === "Successfully Created Todo") {
                setButtonText("Todo Created!!");
                setTimeout(() => {
                    setButtonText("Add Todo");
                }, 1000);
                setTitle("");
                setDescription("");
            }
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-xs">
                <input
                    required
                    className={`p-2 m-2 mt-20 border rounded-md text-slate-700 focus:text-violet-700 w-full 
                    ${!title && errorMessage ? 'border-red-500' : 'border-slate-300'}
                `}
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setErrorMessage("");
                    }}
                />
                <input
                    className={`p-2 m-2 border rounded-md text-slate-700 w-full
                    ${!description && errorMessage ? 'border-3.5 border-red-500' : 'border-slate-300'}
                `}
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setErrorMessage("");
                    }}
                />
                <button
                    onClick={sendReq}
                    className="text-white bg-sky-500 p-2 m-2 rounded-lg  hover:bg-white hover:text-slate-500  active:bg-violet-700 w-full"
                >
                    {buttonText}
                </button>
                {errorMessage && (
                    <p  className="text-center text-red-500">{errorMessage}</p>
                )}
            </div>
        </div>
    );
}
