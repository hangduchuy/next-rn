"use client";
import { handleCreateUserAction, handleUpdateUserAction } from "@/utils/action";
import { Col, Form, Input, message, Modal, notification, Row } from "antd";
import { useEffect } from "react";

interface IProps {
  isEditUserModalOpen: boolean;
  setIsEditUserModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
}

const UserEdit = (props: IProps) => {
  const { isEditUserModalOpen, setIsEditUserModalOpen, dataUpdate, setDataUpdate } = props;
  console.log("props", props);
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      //code
      form.setFieldsValue({
        name: dataUpdate.name,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
      });
    }
  }, [dataUpdate, form]);

  const handleCloseUpdateModal = () => {
    form.resetFields();
    setIsEditUserModalOpen(false);
    setDataUpdate(null);
  };

  const onFinish = async (values: any) => {
    if (dataUpdate) {
      const { name, phone, address } = values;
      const res = await handleUpdateUserAction({
        _id: dataUpdate._id,
        name,
        phone,
        address,
      });
      if (res?.data) {
        handleCloseUpdateModal();
        message.success("Update user succeed");
      } else {
        notification.error({
          message: "Update User error",
          description: res?.message,
        });
      }
    }
  };

  return (
    <Modal
      title="Update a user"
      open={isEditUserModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUpdateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24} md={12}>
            <Form.Item label="Email" name="email">
              <Input type="email" disabled />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24} md={12}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UserEdit;
