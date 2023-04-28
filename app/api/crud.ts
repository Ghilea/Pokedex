export const downloadPokemonFromAPI: any = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=2";

    return await fetch(url)
        .then((response) => response.json())
        .then((data) => addPokemon(data.results));

}

export const getPokemons: any = () => {
    const url = "http://localhost:3004/pokemons";

    return fetch(url, {
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
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
}