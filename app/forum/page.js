'use client'

import React , { useState, useEffect } from 'react';
import { IconMessage, IconSend } from '@tabler/icons-react';
import { useUser } from '@clerk/nextjs';

const Forum = () => {
    const [Email, setEmail] = useState()
    const { user } = useUser()
const [Chat, setChat] = useState([])
    const [Message, setMessage] = useState()
    async function listChat() {
        const res = await fetch('/api/listChats');
        const resJSON = await res.json()
        console.log(resJSON)
        console.log("Documents:", resJSON.documents);

        setChat(resJSON.documents)
    }
    useEffect(() => {
        if (user) {
            setEmail(user.emailAddresses[0].emailAddress);
        }
        listChat()

    }, [user]);
async function postChat() {
    const newMessage = {
        email: Email,
        chat: Message,
    };


    await fetch('/api/postChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
    });


    setChat((prev) => [...prev, newMessage]);
    setMessage("");
}

    return (
        <div className="relative min-h-screen bg-white overflow-hidden p-4">
            {/* Decorative Background Blurs */}
            <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-green-100 rounded-full blur-3xl opacity-40 z-0" />
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-green-100 rounded-full blur-2xl opacity-40 z-0" />
            <div className="absolute bottom-10 left-1/4 w-[250px] h-[250px] bg-green-100 rounded-full blur-[80px] opacity-20 z-0" />

            {/* Header */}
            <div className="relative z-10 flex justify-center items-center mt-10 flex-col">
                <div className="bg-green-700 text-white font-bold px-6 py-4 rounded-3xl w-fit flex items-center gap-4 shadow-lg">
                    <IconMessage className="w-6 h-6 md:w-8 md:h-8" />
                    <h1 className="text-2xl md:text-3xl">Forum</h1>
                </div>
                <h1 className='mt-5 text-gray-500'>💡 People won't see your name. You will remain anonymous.</h1>
            </div>

            {/* Forum Box */}
            <div className="relative z-10 max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-3xl shadow-lg min-h-[400px]">
                 {
                    Chat.map((item, index)=>(
                        <div key={index} className={`${item.email == Email?'bg-green-600 w-40 flex justify-center font-bold text-xl p-5 rounded-4xl justify-self-start text-white mt-5': 'bg-blue-700 w-40 flex justify-center font-bold text-xl p-5 rounded-4xl text-white mt-5 justify-self-end'}`}>
                            <h1>{item.chat}</h1>
                        </div>
                    ))
                 }   
            </div>

            {/* Input Section */}
            <div className="relative z-10 flex justify-center items-center mt-8 gap-4 px-4">
                <textarea
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 max-w-xl h-40 bg-slate-200 p-4 rounded-3xl shadow-inner outline-none focus:ring-2 focus:ring-green-400"
                    onChange={(e)=>{setMessage(e.target.value)}}
                />
                <button className="bg-green-500 hover:bg-green-600 transition p-4 cursor-pointer rounded-3xl text-white shadow-lg" onClick={()=>{postChat()}}>
                    <IconSend className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Forum;
