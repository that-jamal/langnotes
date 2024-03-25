'use client'
import { cookies } from 'next/headers'

import React, { useState, useEffect } from 'react';

export default function Finswe() {
    const [langSwitch, setLangSwitch] = useState(false);
    const [lang, setLang] = useState("");
    const [add, setAdd] = useState(0);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        setLang(langSwitch ? "fi" : "sv");
    }, [langSwitch]);

    useEffect(() => {
        const getNotes = () => {
            const noteType = langSwitch ? "finote" : "swnote";
            const cookiesArray = document.cookie.split('; ');
            const matchingNotes = cookiesArray.filter(cookie => cookie.startsWith(`${noteType}_`));
            const extractedNotes = matchingNotes.map(cookie => cookie.split('=')[1]);
            setNotes(extractedNotes);
        };
        getNotes();
    }, [langSwitch]);

    const switchs = () => {
        setLangSwitch(prevState => !prevState);
        setAdd(prevAdd => prevAdd + 1);
    };

    const saveNote = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const noteId = generateUniqueId();
        const noteType = langSwitch ? "finote" : "swnote";
        const note = form.elements[noteType].value;
        document.cookie = `${noteType}_${noteId}=${note}; path=/`;
        console.log("Note saved to cookies:", note);
        setNotes(prevNotes => [...prevNotes, note]);
    };

    function generateUniqueId() {
        return Math.random();
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="shadow-md shadow-green-500 flex flex-col items-center justify-center gap-4 min-h-64 max-w-96 bg-green-100 p-5 rounded-md mb-8 ">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={switchs}>
                    {langSwitch ? 'Finnish' : 'Swedish'}
                </button>
                {langSwitch ? (
                    <div className="flex flex-col items-center justify-center">
                        <h1>Finnish</h1>
                        <form className="flex flex-col items-center justify-center" onSubmit={saveNote}>
                            <input
                                className='min-h-20 pl-1'
                                type="text"
                                name="finote"
                                placeholder="Note"
                            />
                            <button className="bg-green-400 hover:bg-green-500 active:bg-green-600 text-xl text-indigo-950 rounded-full px-4 py-2 transition-colors duration-300 ease-in-out">Save Note</button>
                        </form>

                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <h1>Swedish</h1>
                        <form className="flex flex-col items-center justify-center" onSubmit={saveNote}>
                            <input
                                className='min-h-20 pl-1 overflow-wrap-break-word'
                                type="text"
                                name="swnote"
                                placeholder="Note"
                            />
                            <button className="bg-green-400 hover:bg-green-500 active:bg-green-600 text-xl text-indigo-950 rounded-full px-4 py-2 transition-colors duration-300 ease-in-out">Save Note</button>
                        </form>

                    </div>
                )}
                <div className='flex flex-col items-center justify-center'>
                    <h1> Notes:</h1>
                    <ul className=' '>
                        {notes.map((note, index) => (
                            <li className='border px-9 bg-green-400 text-indigo-950 rounded-lg  transition-colors duration-300 ease-in-out' key={index}>{note}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
