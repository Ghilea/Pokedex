export const downloadPokemonFromAPI: any = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=4";

    return getPokemons().then((response: Response) => response.json()).then(async (data: any) => {
        console.log(data)
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

                    data.map((items: any) => {

                        const abilities = items.abilities.map((item: any) => item.ability.name);
                        const stats = items.stats.map((item: any) => { return { [item.stat.name]: item.base_stat } });

                        addPokemon({
                            id: items.order,
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

export const getPokemons: any = async (search: string | number, type: string = 'name') => {
    const url = 'http://localhost:3004/pokemons';
    const urlSearch = `http://localhost:3004/pokemons/?${type}_like=${search}`;

    return await fetch(search ? urlSearch : url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const addPokemon: any = async (data: any) => {
    const url = "http://localhost:3004/pokemons";

    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data) ,
        headers: {
            "Content-Type": "application/json",
        },
    });
}