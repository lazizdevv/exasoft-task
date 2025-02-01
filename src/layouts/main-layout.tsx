import { Button, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import CreateOrEditModal from "../components/reusableModal"; // Import qilish
import { useState } from "react";
import { useCreate } from "../services/mutation/useCreate";
import { endpoints } from "../configs/endpoints";
import { Outlet } from "react-router-dom";
// import { useCreate } from "../../services/mutation/useCreate";
// import { endpoints } from "../../configs/endpoints";

const { Header, Content } = Layout;

const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useCreate(
    endpoints.companies.post,
    endpoints.companies.list
  );

  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  return (
    <Layout className="max-w-[1920px] w-full mx-auto">
      <Header
        className="flex justify-between"
        style={{ color: "white", background: "#212121", paddingInline: "14px" }}
      >
        <h1>Компании</h1>
        <div>
          <Button
            className="text-white"
            type="text"
            variant="solid"
            size="large"
            icon={<LogoutOutlined style={{ color: "white" }} />}
            onClick={() => localStorage.removeItem("exasoft")}
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            color="geekblue"
            variant="filled"
          >
            Добавить компания
          </Button>
        </div>
      </Header>
      <Content className="px-3">
        <Outlet />
        <CreateOrEditModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onFinish}
          loading={isPending}
          title="Добавить компанию"
        />
      </Content>
    </Layout>
  );
};

export default MainLayout;
