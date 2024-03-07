import { NextApiRequest, NextApiResponse } from 'next';
import { customPost } from '../../utils/customPost';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const session = await getSession({ req });

            if (!session) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const { name, description, collaborative, publicc } = req.body;

            const url = `https://api.spotify.com/v1/users/me/playlists`;

            const playlistData = {
                name,
                description,
                collaborative,
                publicc
            };

            const response = await customPost(url, session, playlistData);

            return res.status(response.status).json(response.body);
        } catch (error) {
            console.error('Error creating playlist:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}

