import axios from "axios";
import moment from "moment";

export const downloadPokemonFromAPI: any = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=3";

    const pokemons = await axios.get(url)
        .then(async (res: any) => {

            let promisesArray = res.data.results?.map((result: { url: string }) => {
                return axios.get(result.url).then((res: any) => res.data);
            });

            return Promise.all(promisesArray);
        })

    pokemons.map(async (items: any) => {

        const abilities = await items.abilities?.map((item: any) => item.ability.name);
        const stats = await items.stats?.map((item: any) => ({ name: item.stat.name, amount: item.base_stat }));

        return addPokemon({
            name: items.name,
            image: items.sprites.other.dream_world.front_default,
            height: items.height,
            weight: items.weight,
            abilities: JSON.stringify(abilities),
            stats: JSON.stringify(stats),
            type: items.types[0].type.name
        })
    })
};

//pokemons
export const getPokemons: any = async (search: string | number = "", sort: string = 'id', order: string = 'asc') => {
    const url = `http://localhost:3004/getPokemons?search=${search}&sort=${sort}&order=${order}`;
    return await axios.get(url).then(data => data.data);
}

export const getPokemon: any = async (pokemonId: number) => {
    const url = `http://localhost:3004/getPokemon?pokemonId=${pokemonId}`;
    return await axios.get(url).then(res => res.data);
}

export const addPokemon: any = async (data: any) => {
    const url = `http://localhost:3004/addPokemons`;
    await axios.post(url, data)
}

//likes
export const addLike: any = async (pokemonId: any, userId: number) => {
    const url = `http://localhost:3004/addLike`;
    return axios.post(url, { userId: userId, pokemonId: pokemonId, added: moment().format('YYYY-MM-DD HH:mm:ss') });
}

export const deleteLike: any = async (id: any) => {
    const url = `http://localhost:3004/deleteLike`;
    await axios.delete(url, { params: { id: id } });
}

export const getLike: any = async (userId: number, pokemonId: number) => {
    const url = `http://localhost:3004/getLike?userId=${userId}&pokemonId=${pokemonId}`;
    return await axios.get(url).then(data => data.data);
}

export const getLikes: any = async (userId: number) => {
    const url = `http://localhost:3004/getLikes?userId=${userId}`;
    return await axios.get(url).then(data => data.data);
}

export const getOtherLikes: any = async (userId: number) => {
    const url = `http://localhost:3004/getOtherLikes?userId=${userId}`;
    return await axios.get(url).then(data => data.data);
}

//notifications
export const getNotification: any = async (userId: number) => {
    const url = `http://localhost:3004/getNotification?userId=${userId}`;
    return await axios.get(url).then(data => data.data);
}

export const deleteNotification: any = async (userId: number) => {
    const url = `http://localhost:3004/deleteNotification`;
    await axios.patch(url, { userId: userId });
}

export const updateNotification: any = async (userId: number, data: Array<any>) => {
    const url = `http://localhost:3004/updateNotification`;
    await axios.patch(url, { userId: userId, likes: data, added: moment().format('YYYY-MM-DD HH:mm:ss') });
}

export const addNotification: any = async (userId: number) => {
    const url = `http://localhost:3004/addNotification`;
    await axios.post(url, { userId: userId, added: moment().format('YYYY-MM-DD HH:mm:ss') })
}