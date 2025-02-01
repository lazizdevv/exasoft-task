import { Button, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCreate } from "../../services/mutation/useCreate";
import { endpoints } from "../../configs/endpoints";
import { saveState } from "../../utils/states";

const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useCreate(endpoints.login, endpoints.login);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    mutate(values, {
      onSuccess: (data) => {
        saveState("exasoft", data);
        console.log(data);
        navigate("/home");
      },
    });
  };
  return (
    <Flex justify="center" align="center" className="h-screen">
      <Form
        style={{ maxWidth: 462, paddingInline: "32px", paddingBlock: "12px" }}
        layout="vertical"
        onFinish={onFinish}
        className="h-fit border rounded-md w-full max-w-md"
      >
        <h1 className="text-4xl font-bold pb-5">Вход</h1>
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
          <Link to={"/register"}>Регистрация</Link>
        </Form.Item>
        <Form.Item className="text-center" layout="vertical">
          <Button
            className="mx-auto"
            shape="default"
            color="green"
            variant="solid"
            htmlType="submit"
          >
            Вход
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Login;
