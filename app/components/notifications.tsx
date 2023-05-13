import { useEffect, useState } from "react";
import notifcationImage from "public/assets/icons/notification.svg";
import { getNotification, deleteNotification } from "~/api/crud";
import addOrUpdatePokemonLikes from "~/components/pokemonLikes";

interface Props {
  session: any;
}

const Notification = ({ session }: Props) => {
  const [notification, setNotification] = useState<number>(0);
  const [notificationList, setNotificationList] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);

  useEffect(() => {
    const time = setInterval(async () => {
      await addOrUpdatePokemonLikes(session.id);

      if (session) {
        const notification = await getNotification(session.id);

        console.log('noti?', notification)
        notification?.map((item: any) => {
          return Promise.all([
            setNotification(JSON.parse(item.likes).length),
            setNotificationList(JSON.parse(item.likes)),
          ]);
        });
      }
    }, 10000);

    return () => clearInterval(time);
  }, [session]);

  useEffect(() => {
    if (isExpanded && notification > 0) {
      setNotification(0);

      if (session) {
        deleteNotification(session.id);
      }
    }
  }, [isExpanded, notification, session]);

  return (
    <>
      <div className="flex items-center justify-center w-5 gap-2 text-white">
        <img src={notifcationImage} alt="notification" />
        <button onClick={() => setIsExpanded(!isExpanded)} type="button">
          {notification}
        </button>
      </div>
      {isExpanded && (
        <div className="absolute flex items-center justify-start p-5 bg-white rounded-md w-[400px] top-10 right-5">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-1 right-3"
          >
            X
          </button>
          <ul>
            {notificationList?.map((item: any, index) => {
              return (
                <li key={`notification` + index}>
                  Användare ({item.user_id}) gillade pokémon ({item.pokemon_id})
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Notification;
