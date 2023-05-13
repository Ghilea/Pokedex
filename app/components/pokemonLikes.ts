
import { addNotification, getLikes, getOtherLikes, getNotification, updateNotification } from "~/api/crud";

export default async function pokemonLikes(sessionId: number) {

    const getallLikes = await getLikes(sessionId);

    const getOther = await getOtherLikes(sessionId);

    getOther?.map(async (item: any) => {
        getallLikes?.find((o: { pokemon_id: number }) => o.pokemon_id == item.pokemon_id)
     });
    
    const notificationExist = await getNotification(sessionId);
    
    notificationExist?.length === 0 ? addNotification(sessionId) : getallLikes > 0 && updateNotification(sessionId, getallLikes)
}