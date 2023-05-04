export const downloadPokemonFromAPI: any = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    return getPokemons().then((response: Response) => response.json()).then(async (data: any) => {
        if (data.length === 0) {
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
    });
}

export const getPokemons: any = async (search: string | number, sort: string = 'name', order: string = 'asc', page: number = 1) => {
    const url = `https://json-server-six-xi.vercel.app/pokemons?_page=${page}&_sort=${sort}&_order=${order}`;
    const urlSearch = `https://json-server-six-xi.vercel.app/pokemons?_page=${page}&_sort=${sort}&_order=${order}&${Number(search) ? `id=${search}` : `name_like=${search}`}`;

    return await fetch(search ? urlSearch : url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getPokemon: any = async (id: number) => {
    const url = `https://json-server-six-xi.vercel.app/pokemons/${id}`;

    return await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const addPokemon: any = async (data: any) => {
    const url = `https://json-server-six-xi.vercel.app/pokemons`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const addLike: any = async (pokemon_id: any, userId: number) => {
    const url = `https://json-server-six-xi.vercel.app/likes`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify({ user_id: userId, pokemon_id: pokemon_id, added: new Date() }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const deleteLike: any = async (id: any) => {
    const url = `https://json-server-six-xi.vercel.app/likes/${id}`;

    return fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getLikes: any = async (userId: number) => {
    const url = `https://json-server-six-xi.vercel.app/likes?user_id=${userId}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getAllLikes: any = async () => {
    const url = `https://json-server-six-xi.vercel.app/likes`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getNotification: any = async () => {
    const url = `https://json-server-six-xi.vercel.app/notification`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const deleteNotification: any = async (userId: number) => {
    const url = `https://json-server-six-xi.vercel.app/notification/${userId}`;

    return fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: [] }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const updateNotification: any = async (userId: number, data: Array<any>) => {
    const url = `https://json-server-six-xi.vercel.app/notification/${userId}`;

    return fetch(url, {
        method: "PATCH",
        body: JSON.stringify({ likes: data }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const addNotification: any = async (userId: number, likes: object) => {
    const url = `https://json-server-six-xi.vercel.app/notification`;

    return fetch(url, {
        method: "POST",
        body: JSON.stringify({ userId: userId, likes, added: new Date() }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const getLike: any = async (userId: number, pokemonId: number) => {
    const url = `https://json-server-six-xi.vercel.app/likes?user_id=${userId}&pokemon_id=${pokemonId}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}