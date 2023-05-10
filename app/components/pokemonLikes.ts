
import { getUser } from "~/features/auth/api/crud";
import { addNotification, getLikes, getNotification, updateNotification } from "~/api/crud";

export default async function pokemonLikes(sessionId: number) {

    const allLikes = await getLikes(sessionId);

    console.log('allLikes',allLikes)
    
    const notificationExist = await getNotification(sessionId);
    
    notificationExist?.length === 0 ? console.log('post') : allLikes > 0 && updateNotification(sessionId, allLikes)
        //addNotification(sessionId, filteredLikes) : updateNotification(sessionId, filteredLikes)
}