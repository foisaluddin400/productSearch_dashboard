import { Form, Modal, Upload, DatePicker, TimePicker, Input, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useUpdateProductMutation } from "../redux/api/productManageApi";


const EditProduct = ({ editModal, setEditModal, selectedProduct }) => {

  console.log(selectedProduct)

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [updateProduct] = useUpdateProductMutation();
  const handleCancel = () => {
    form.resetFields();
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const id = selectedProduct?.key
    const data = {
      name: values.name,
      price: Number(values.price),
    };

    try {
      
      const response = await updateProduct({ data, id }).unwrap();
      message.success(response.message);

      form.resetFields();
      setEditModal(false);
    } catch (error) {
      console.log(error);
      message.error(error?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (selectedProduct) {
      const rawPrice = selectedProduct?.price || "";
      const numericPrice = Number(rawPrice.replace(/[^0-9.]/g, "")); 

      form.setFieldsValue({
        name: selectedProduct?.name || "",
        price: isNaN(numericPrice) ? "" : numericPrice,
      });
    }
  }, [selectedProduct, form]);




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
            {loading ? <Spin size="small" /> : "Update"}
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default EditProduct;