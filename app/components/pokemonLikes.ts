
import { addNotification, getLikes, getOtherLikes, getNotification, updateNotification } from "~/api/crud";

export default async function pokemonLikes(session: { id: number, lastLogin: any }) {

    const getallLikes = await getLikes(session.id);

    const getOther = await getOtherLikes(session.id);

    const pokemonsToBeListed = getallLikes?.map((item: any) => {
        return getOther?.find((o: { pokemon_id: number, added: any }) => o.pokemon_id == item.pokemon_id && o.added >= session.lastLogin)
     });
     
    const notificationExist = await getNotification(session.id);
    
    notificationExist?.length === 0 ? addNotification(session.id) : pokemonsToBeListed.length > 0 && updateNotification(session.id, pokemonsToBeListed)
}