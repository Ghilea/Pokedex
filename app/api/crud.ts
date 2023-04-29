export const downloadPokemonFromAPI: any = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=4";

    return getPokemons().then((response: Response) => response.json()).then(async (data: any) => {
        console.log(data.length > 0)
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
                    addPokemon(data);
                });
        }
    });
}

export const getPokemons: any = async (type: string, search: string | number) => {
    const url = 'http://localhost:3004/pokemons';
    const urlSearch = `http://localhost:3004/pokemons?${type}=${search}`;

    return await fetch(search ? urlSearch : url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const addPokemon: any = async (data: any) => {
    const url = "http://localhost:3004/pokemons";

    const pokemons = data.map((pokemons: { order: number; name: string; sprites: { other: { dream_world: { front_default: string; }; }; }; weight: number; types: any, abilities: object; stats: object; }) => {
        return {
            id: pokemons.order, name: pokemons.name, image: pokemons.sprites.other.dream_world.front_default, weight: pokemons.weight, abilities: pokemons.abilities, stats: pokemons.stats, type: pokemons.types[0].type.name
        }
    })

    return fetch(url, { 
        method: "POST",
        body: pokemons.map((items: any) => {
            console.log(items)
            return JSON.stringify(items)
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}