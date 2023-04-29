export const colorSelection = (color: string) => {
    switch (color) {
        case 'grass':
            return 'bg-gradient-to-r from-emerald-500 to-green-500';
        case 'water':
            return 'bg-gradient-to-r from-cyan-500 to-blue-500';
        case 'fire':
            return 'bg-gradient-to-r from-pink-500 to-red-500';
    }

}