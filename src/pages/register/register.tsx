import { Button, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCreate } from "../../services/mutation/useCreate";
import { endpoints } from "../../configs/endpoints";

export const Register = () => {
  const navigate = useNavigate();
  const { mutate } = useCreate(endpoints.register, endpoints.register);
  const onFinish = (values: any) => {
    mutate(values, { onSuccess: () => navigate("/login") });
  };
  return (
    <Flex justify="center" align="center" className="border h-screen">
      <Form
        style={{ maxWidth: 462, paddingInline: "32px", paddingBlock: "12px" }}
        layout="vertical"
        onFinish={onFinish}
        className="h-fit border w-full max-w-md rounded-md"
      >
        <h1 className="text-4xl font-bold pb-5">Регистрация</h1>
        <Form.Item
          layout="vertical"
          label="Ф.И.О"
          name="fullName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Логин"
          name="login"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          layout="vertical"
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item layout="vertical">
          <Link to={"/login"}>Вход</Link>
        </Form.Item>
        <Form.Item className="text-center" layout="vertical">
          <Button
            className="mx-auto"
            shape="default"
            color="green"
            variant="solid"
            htmlType="submit"
          >
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
