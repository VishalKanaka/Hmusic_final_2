import { CreatePlaylist } from "../types/types";
import { MySession } from "../types/types";

export const customPost = async (url: string, session: MySession | null, playlistData: CreatePlaylist) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify(playlistData),
    }).then((res) => res.json());

    return res;
};