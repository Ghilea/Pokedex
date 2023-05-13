
import { addNotification, getLikes, getOtherLikes, getNotification, updateNotification } from "~/api/crud";

export default async function pokemonLikes(sessionId: number) {

    const getallLikes = await getLikes(sessionId);

    const getOther = await getOtherLikes(sessionId);

    const pokemonsToBeListed = getallLikes?.map((item: any) => {
        return getOther?.find((o: { pokemon_id: number }) => o.pokemon_id == item.pokemon_id)
     });
     
    const notificationExist = await getNotification(sessionId);

    console.log(pokemonsToBeListed.length)
    
    notificationExist?.length === 0 ? addNotification(sessionId) : pokemonsToBeListed.length > 0 && updateNotification(sessionId, pokemonsToBeListed)
}