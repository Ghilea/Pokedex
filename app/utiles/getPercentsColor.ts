import { Background } from '~/types/color';

export const getPercentColor = (percent: number, isForeground: boolean) => {
    switch (true) {
        case percent >= 70:
            return isForeground ? Background.GREENLIGHT : Background.GREEN
        case percent < 30:
            return isForeground ? Background.REDLIGHT : Background.RED
        default:
            return isForeground ? Background.ORANGELIGHT : Background.ORANGE
    }
}
