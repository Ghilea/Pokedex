import axios from "axios";

export const downloadPokemonFromAPI: any = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=5";

    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let results = data.results;

            let promisesArray = results.map((result: { url: string }) => {
                return fetch(result.url).then(response => response.json());
            });

            return Promise.all(promisesArray);
        }).then((data) => {

            data.map((items: any, index: number) => {

                const abilities = items.abilities.map((item: any) => item.ability.name);
                const stats = items.stats.map((item: any) => { return { [item.stat.name]: item.base_stat } });

                addPokemon({
                    id: index + 1,
                    name: items.name,
                    image: items.sprites.other.dream_world.front_default,
                    weight: items.weight,
                    abilities: abilities,
                    stats: stats,
                    type: items.types[0].type.name
                })

            })
        });
}

export const getPokemons: any = async (search: string | number = "", sort: string = 'name', order: string = 'asc', page: number = 1) => {
    const url = `https://json-server-six-xi.vercel.app/pokemons?_page=${page}&_sort=${sort}&_order=${order}`;
    const urlSearch = `https://json-server-six-xi.vercel.app/pokemons?_page=${page}&_sort=${sort}&_order=${order}&${Number(search) ? `id=${search}` : `name_like=${search}`}`;

    return await axios.get(search ? urlSearch : url).then(res => res.data);
}

export const getPokemon: any = async (id: number) => {
    const url = `https://json-server-six-xi.vercel.app/pokemons/${id}`;

    return await axios.get(url).then(res => res.data);
}

export const addPokemon: any = async (data: any) => {
    const url = `localhost:3004/addPokemons`;

    return axios.post(url, data);
}

export const addLike: any = async (pokemon_id: any, userId: number) => {
    const url = `https://pokedexeu-l0yx.onrender.com/likes`;

    return axios.post(url, { user_id: userId, pokemon_id: pokemon_id, added: new Date() });
}

export const deleteLike: any = async (id: any) => {
    const url = `https://pokedexeu-l0yx.onrender.com/likes/${id}`;

    return axios.delete(url);
}

export const getLike: any = async (userId: number, pokemonId: number) => {
    const url = `https://pokedexeu-l0yx.onrender.com/likes?user_id=${userId}&pokemon_id=${pokemonId}`;

    return await axios.get(url).then(res => res.data);
}

export const getLikes: any = async (userId: number) => {
    const url = `https://pokedexeu-l0yx.onrender.com/likes?user_id=${userId}`;

    return await axios.get(url).then(res => res.data);
}

export const getAllLikes: any = async () => {
    const url = `https://pokedexeu-l0yx.onrender.com/likes`;

    return await axios.get(url).then(res => res.data);
}

export const getNotification: any = async (userId: number) => {
    const url = `https://pokedexeu-l0yx.onrender.com/notification?userId=${userId}`;

    return await axios.get(url).then(res => res.data);
}

export const deleteNotification: any = async (userId: number) => {
    const url = `https://pokedexeu-l0yx.onrender.com/notification/${userId}`;

    return axios.patch(url, { likes: [] });
}

export const updateNotification: any = async (userId: number, data: Array<any>) => {
    const url = `https://pokedexeu-l0yx.onrender.com/notification/${userId}`;

    return axios.patch(url, { likes: data });
}

export const addNotification: any = async (userId: number, likes: object) => {
    const url = `https://pokedexeu-l0yx.onrender.com/notification`;

    return axios.post(url, { userId: userId, likes, added: new Date() });
}