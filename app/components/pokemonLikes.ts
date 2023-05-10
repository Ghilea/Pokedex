
import { addNotification, getLikes, getNotification, updateNotification } from "~/api/crud";

export default async function pokemonLikes(sessionId: number) {

    const allLikes = await getLikes(sessionId);

    console.log('allLikes',allLikes)
    
    const notificationExist = await getNotification(sessionId);
    
    notificationExist?.length === 0 ? addNotification(sessionId, allLikes) : allLikes > 0 && updateNotification(sessionId, allLikes)
}