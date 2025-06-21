import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin } from "antd";
import React, { useState } from "react";

import { useAddProductMutation } from "../redux/api/productManageApi";


const AddProduct = ({ openAddModal, setOpenAddModal }) => {

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

const [addProduct] = useAddProductMutation();
 
  const handleCancel = () => {
    form.resetFields();
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true); 
    const data = {
      name: values.name,
      price: Number(values.price),
    };

    try {
      
      const response = await addProduct(data).unwrap();
      message.success(response.message);

      form.resetFields(); 
      setOpenAddModal(false); 
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };
  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={400}
    >
      <div className="mb-6 mt-2">
        <h2 className="text-center font-semibold text-xl mb-4">Add Product</h2>

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
              name="price"
              rules={[
                { required: true, message: "Please input Product Price!" },
              ]}
            >
              <Input type="number" placeholder="Enter Product Price" style={{ borderRadius: "0px", padding: "6px 8px" }} />
            </Form.Item>

          

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#212121] text-white rounded-md"
          >
            {loading ? <Spin size="small" /> : "Add"}
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default AddProduct;