import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";

type CreateOrEditModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  loading: boolean;
  title: string;
};

const CreateOrEditModal = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  loading,
  title,
}: CreateOrEditModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      maskClosable={false}
      footer={false}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item label="Названия компании" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Количество сотрудников" name="count">
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit">
            {title === "Изменить компанию"
              ? "Обновить компанию"
              : "Добавить компания"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateOrEditModal;
