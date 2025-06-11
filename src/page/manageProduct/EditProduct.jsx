import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";


const EditProduct = ({ editModal, setEditModal}) => {

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

 
  const handleCancel = () => {
    form.resetFields();
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
  
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <div className="mb-6 mt-2">
        <h2 className="text-center font-semibold text-xl mb-4">Edit Product</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="px-2"
        >
            <Form.Item
              label="Product Name"
              name="name"
              rules={[
                { required: true, message: "Please input Product Name!" },
              ]}
            >
              <Input placeholder="Enter Product Name" style={{ borderRadius: "0px", padding: "6px 8px" }} />
            </Form.Item>
          
          {/* Upload */}
          <Form.Item
              label="Product Price"
              name="url"
              rules={[
                { required: true, message: "Please input Product Price!" },
              ]}
            >
              <Input placeholder="Enter Product Price" style={{ borderRadius: "0px", padding: "6px 8px" }} />
            </Form.Item>

          

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#495F48] text-white rounded-md"
          >
            {loading ? <Spin size="small" /> : "Add"}
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default EditProduct;