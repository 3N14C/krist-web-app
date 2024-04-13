import { NextPage } from "next";
import { SwitchComponent } from "./_components/switch";
import { SelectComponent } from "./_components/select-component";

interface Props {}

const options = ["Светлая", "Темная"];

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="w-[1250px] flex flex-col gap-8">
      <SelectComponent
        title="Тема сайта"
        body="настройте внешний вид вашей темы на вашем устройстве"
        options={options}
      />

      <hr />

      <SwitchComponent
        title="2FA Аутентификация"
        body="Защитить свой аккаунт с помощью двухфакторной аутентификации."
        switchId="two-factor-authentication"
      />

      <hr />

      <SwitchComponent
        title="Всплывающие уведомления"
        body="Получать уведомления"
        switchId="push-notifications"
      />

      <hr />

      <SwitchComponent
        title="Уведомления на рабочем столе"
        body="Получать уведомления на рабочем столе"
        switchId="push-desktop-notifications"
        checked={false}
      />

      <hr />

      <SwitchComponent
        title="Уведомления на почту"
        body="Получать уведомления на свой почтовый адрес"
        switchId="push-email-notifications"
        checked={false}
      />
    </div>
  );
};

export default Page;
