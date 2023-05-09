
import { getUser } from "~/features/auth/api/crud";
import { addNotification, getAllLikes, getNotification, updateNotification } from "~/api/crud";

export default async function pokemonLikes(sessionId: number) {

    const allLikes = await getAllLikes().then((res: any) => res.json().then((data: any) => data));
    
    const getUserLastLogin = await getUser(sessionId).then((res: any) => res.json().then((data: any) => data));

    //get which pokemons to compare against
    const filterPokemons = await allLikes.filter((item: { user_id: number[] }) =>
        item.user_id.includes(sessionId)
    );

    //get likes before login date and not same as users id
    const filteredLikes = await allLikes.filter(
        (item: {
            added: string | number | Date;
            user_id: number[];
            pokemon_id: string;
        }) =>
            new Date(item.added) > new Date(getUserLastLogin[0]?.lastLogin) &&
            !item.user_id.includes(sessionId) &&
            filterPokemons.some((o: { pokemon_id: string }) => o.pokemon_id == item.pokemon_id));

    const notificationExist = await getNotification(sessionId)
        .then((res: { json: () => any }) => res.json())
        .then((data: any) => data);

    console.log(filteredLikes)
    notificationExist?.length === 0 ? console.log('post') : filteredLikes > 0 && updateNotification(sessionId, filteredLikes)
        //addNotification(sessionId, filteredLikes) : updateNotification(sessionId, filteredLikes)
}