"use client";
import { handleCreateUserAction } from "@/utils/action";
import { Col, Form, Input, message, Modal, notification, Row } from "antd";

interface IProps {
  isCreateUserModalOpen: boolean;
  setIsCreateUserModalOpen: (v: boolean) => void;
}

const UserCreate = (props: IProps) => {
  const { isCreateUserModalOpen, setIsCreateUserModalOpen } = props;
  const [form] = Form.useForm();

  const handleCloseCreateUserModal = () => {
    form.resetFields();
    setIsCreateUserModalOpen(false);
  };

  const onFinish = async (values: any) => {
    const res = await handleCreateUserAction(values);
    if (res?.data) {
      handleCloseCreateUserModal();
      message.success("Create user successfully");
    } else {
      notification.error({
        message: "Create user failed",
        description: res?.message,
      });
    }
  };
  return (
    <Modal
      title="Add new user"
      open={isCreateUserModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateUserModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input type="email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserCreate;
