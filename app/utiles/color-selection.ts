export const colorSelection = (color: string) => {
    switch (color) {
        case 'grass':
        case 'bug':
            return 'bg-gradient-to-r from-emerald-500 to-green-500';
        case 'water':
        case 'ice':
            return 'bg-gradient-to-r from-cyan-500 to-blue-500';
        case 'fire':
            return 'bg-gradient-to-r from-pink-500 to-red-500';
        case 'electric':
            return 'bg-gradient-to-r from-yellow-500 to-yellow-500';
        case 'ground':
        case 'fighting':
            return 'bg-gradient-to-r from-yellow-700 to-yellow-700';
        case 'poison':
        case 'psychic':
        case 'ghost':
            return 'bg-gradient-to-r from-purple-500 to-purple-500';
        case 'fairy':
            return 'bg-gradient-to-r from-pink-300 to-pink-300';
        case 'rock':
            return 'bg-gradient-to-r from-gray-700 to-gray-700';
        case 'dragon':
            return 'bg-gradient-to-r from-indigo-500 to-indigo-500';
        default:
            return 'bg-gradient-to-r from-gray-500 to-gray-500';
    }

}