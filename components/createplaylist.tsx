import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreatePlaylist() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [collaborative, setCollaborative] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Make POST request to create the playlist
        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                description,
                collaborative,
                public: isPublic,
            }),
        });
        if (response.ok) {
            router.push('/'); 
        } else {
            // Handle error
            console.error('Error creating playlist:', response.statusText);
        }
    }; 

    return (
        <div className='bg-black shadow-md 	rounded px-8 pt-6 pb-8 mb-4'>
            <span className="font-bold flex items-center justify-center text-2xl   h-full pb-30">Create Playlist</span>
            
            <form onSubmit={handleSubmit} className="" >
                <div className="mb-4">
                
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-black  leading-tight focus:outline-none focus:shadow-outline" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label>Collaborative:</label>
                    <input type="checkbox" checked={collaborative} onChange={(e) => setCollaborative(e.target.checked)} />
                </div>
                <div className="mb-4">
                    <label>Public:</label>
                    <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
                </div>
                <div className="flex items-center justify-center">
                <button className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" >Create Playlist</button>
                </div>
            </form>
        </div>
    );
}
