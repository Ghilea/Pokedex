export const downloadPokemonFromAPI: any = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=1";

    return getPokemons().then((response: Response) => response.json()).then(async (data: any) => {
        if (data.length === 0) {
            return await fetch(url)
                .then((response) => response.json())
                .then((data) => addPokemon(data.results));
        }
    });
}

export const getPokemons: any = async () => {
    const url = "http://localhost:3004/pokemons";

    return await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const addPokemon: any = async (data: any) => {
    const url = "http://localhost:3004/pokemons";
    
    const newObjectData = data.map(async (pokemons: { name: string, url: string }) => {
        const detail = await fetch(pokemons.url)
            .then((response) => response.json())
            .then((data) => data)
        console.log({
            id: detail.order, name: pokemons.name, image: detail.sprites.other.dream_world.front_default, weight: detail.weight, abilities: detail.abilities, stats: { hp: Object.values(detail.stats).filter((item: any) => item.stat.name === "hp")[0].base_stat, attack: Object.values(detail.stats).filter((item: any) => item.stat.name === "attack")[0].base_stat, defense: Object.values(detail.stats).filter((item: any) => item.stat.name === "defense")[0].base_stat, speed: Object.values(detail.stats).filter((item: any) => item.stat.name === "speed")[0].base_stat }
        });
    });
    /* return fetch(url, {
        method: "POST",
        body: JSON.stringify({  }),
        headers: {
            "Content-Type": "application/json",
        },
    }); */
}