import { useEffect, useState } from "react";
import notifcationImage from "public/assets/icons/notification.svg";
import { getNotification } from "~/api/crud";

interface Props {
  session: { id: number; username: string };
}

const Notification = ({ session }: Props) => {
  const [notification, setNotification] = useState<number>(0);
  const [notificationList, setNotificationList] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<Boolean>(false);

  useEffect(() => {
    getNotification()
      .then((res: { json: () => any }) => res.json())
      .then((data: any[]) => {
        const filteredData = data.filter(
          (item: { date: string | number | Date; user_id: number[] }) =>
            new Date(item.date) > new Date() &&
            !item.user_id.includes(session.id)
        );

        filteredData.length > 0 && setNotification(filteredData.length);
        setNotificationList(filteredData);
      });
  }, []);

  useEffect(() => {
    if (isExpanded && notification > 0) {
      setNotification(0);
    }
  }, [isExpanded, notification]);

  console.log(notificationList);

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
          <ul>
            {notificationList.map((item, index) => {
              return <li key={`notification` + index}>En annan användare gillade samma pokémon som dig.</li>;
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Notification;
