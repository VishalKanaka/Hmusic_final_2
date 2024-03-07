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
        const response = await fetch('/api/createPlaylist', {
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
            router.push('/'); // Redirect to homepage or any other page
        } else {
            // Handle error
            console.error('Error creating playlist:', response.statusText);
        }
    };

    return (
        <div>
            <h2>Create Playlist</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Collaborative:</label>
                    <input type="checkbox" checked={collaborative} onChange={(e) => setCollaborative(e.target.checked)} />
                </div>
                <div>
                    <label>Public:</label>
                    <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
                </div>
                <button type="submit">Create Playlist</button>
            </form>
        </div>
    );
}
