"use client";

import { useSession } from "@/hooks/use-session";
import { IAddress } from "@/interfaces/address.interface";
import { PhoneCall, Trash2 } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

interface IProps {
  address: IAddress[];

  removeAddress: (id: string) => void;
}

export const AddressCard: FC<IProps> = ({ address, removeAddress }) => {
  const { user } = useSession();

  const handleRemoveAddress = (id: string) => {
    removeAddress(id);
    toast.success("Адрес успешно удален");
  };

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const items = address.filter((item) => item.userId === user?.id);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [items.length]);

  return (
    <div className="flex flex-col gap-10">
      {address
        .filter((item) => item.userId === user?.id)
        .map((item, idx) => (
          <div key={item.id} className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3 text-xl text-[#3c3b40]">
                <p className="font-bold text-2xl text-[#1b1b1b]">{item.name}</p>

                <p className="">
                  {item.zipCode}, {item.city}, {item.street}
                </p>

                <div className="flex items-center gap-2">
                  <PhoneCall />

                  <p>
                    {item.phoneNumber.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      "($1) $2-$3"
                    )}
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-2 cursor-pointer bg-red-100/50 hover:bg-red-200/50 transition duration-300 py-2 px-4 rounded-lg"
                onClick={() => handleRemoveAddress(item.id)}
              >
                <Trash2 className="text-red-400" />
                <p className="text-red-400">Удалить</p>
              </div>
            </div>
            {/* <div className={`${currentIndex === idx ? "timer-bar" : ""}`} /> */}
            <hr />
          </div>
        ))}
    </div>
  );
};
