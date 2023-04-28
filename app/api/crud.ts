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
    console.log(data)
    const newObjectData = data.map((pokemons: {name: string}, index: number) => { 
        console.log({ id: index+1, name: pokemons.name });
    });
    /* return fetch(url, {
        method: "POST",
        body: JSON.stringify({  }),
        headers: {
            "Content-Type": "application/json",
        },
    }); */
}