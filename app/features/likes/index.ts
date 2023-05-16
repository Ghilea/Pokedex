
import { addNotification, getOtherLikes, getNotification, updateNotification } from "~/api/crud";
import { dateLoginToUserAccount, getUser } from "~/features/auth/api/crud";

const Likes = async (session: { id: number }) => {

    console.log('update noatification')
    const getUserInformation = await getUser(session.id);

    const getOther = await getOtherLikes(session.id, getUserInformation.lastLogin);

    const notificationExist = await getNotification(session.id);

    console.log(getUserInformation, getOther[0].length, notificationExist)
    if (notificationExist?.length === 0) {
        addNotification(session.id)
    } else if (getOther[0].length > 0) {
        dateLoginToUserAccount(session.id);
        updateNotification(session.id, getOther[0])
    }
}

export default Likes;