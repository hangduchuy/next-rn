"use client";
import { Layout } from "antd";

const AdminFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <Footer style={{ textAlign: "center" }}>Duc Huy ©{new Date().getFullYear()} Created by @huy</Footer>
    </>
  );
};

export default AdminFooter;
