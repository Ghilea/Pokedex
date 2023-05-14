
import { addNotification, getOtherLikes, getNotification, updateNotification } from "~/api/crud";
import { dateLoginToUserAccount, getUser } from "~/features/auth/api/crud";

export default async function pokemonLikes(session: { id: number }) {

    const getUserInformation = await getUser(session.id);

    const getOther = await getOtherLikes(session.id, getUserInformation.lastLogin);

    const notificationExist = await getNotification(session.id);

    if (notificationExist?.length === 0) {
        addNotification(session.id)
    } else if (getOther[0].length > 0) {
        dateLoginToUserAccount(session.id);
        updateNotification(session.id, getOther[0])
    }
}