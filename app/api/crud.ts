import axios from "axios";

export const downloadPokemonFromAPI: any = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=1";

    await fetch(url)
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
                    name: items.name,
                    image: items.sprites.other.dream_world.front_default,
                    weight: items.weight,
                    abilities: JSON.stringify(abilities),
                    stats: JSON.stringify(stats),
                    type: items.types[0].type.name
                })

            })
        });

};

export const getPokemons: any = async (search: string | number, sort: string = 'name', order: string = 'asc', page: number = 1) => {
    const url = `http://localhost:3004/getPokemons?_page=${page}&_sort=${sort}&_order=${order}`;
    const urlSearch = `http://localhost:3004/getPokemons?_page=${page}&_sort=${sort}&_order=${order}&${Number(search) ? `id=${search}` : `name_like=${search}`}`;

    return await axios.get(search ? urlSearch : url).then(res => res.data);
}

export const getPokemon: any = async (id: number) => {
    const url = `http://localhost:3004/getPokemon/${id}`;

    return await axios.get(url).then(res => res.data);
}

export const addPokemon: any = async (data: any) => {

    console.log('adddata', data)
    const url = `http://localhost:3004/addPokemons`;

    return axios.post(url, data);
}

export const addLike: any = async (pokemon_id: any, userId: number) => {
    const url = `http://localhost:3004/addLike`;

    return axios.post(url, { user_id: userId, pokemon_id: pokemon_id, added: new Date() });
}

export const deleteLike: any = async (id: any) => {
    const url = `http://localhost:3004/deleteLike/${id}`;

    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getLike: any = async (userId: number, pokemonId: number) => {
    const url = `http://localhost:3004/likes?user_id=${userId}&pokemon_id=${pokemonId}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getLikes: any = async (userId: number) => {
    const url = `http://localhost:3004/getLike?user_id=${userId}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getAllLikes: any = async () => {
    const url = `http://localhost:3004/getLikes`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getNotification: any = async (userId: number) => {
    const url = `http://localhost:3004/getNotification?id=${userId}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const deleteNotification: any = async (userId: number) => {
    const url = `http://localhost:3004/deleteNotification/${userId}`;

    return fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: [] }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const updateNotification: any = async (userId: number, data: Array<any>) => {
    const url = `http://localhost:3004/updateNotification/${userId}`;

    console.log(data)
    return fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: data }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const addNotification: any = async (userId: number, likes: object) => {
    const url = `http://localhost:3004/addNotification`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify({ userId: userId, likes, added: new Date() }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}