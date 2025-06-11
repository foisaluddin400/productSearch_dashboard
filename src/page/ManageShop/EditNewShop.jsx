import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Radio,
  Select,
  Spin,
  TimePicker,
  Upload,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { Navigate } from "../Navigate";

const EditNewShop = () => {
  const [form] = Form.useForm();

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <div className="p-1">
      <Navigate title="Edit New Shop" />
      <div id="recipe" className="p-5 mt-4 bg-white h-screen">
        <Form
          form={form}
          name="dynamic_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <div className="">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple={true}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
            <div className="grid grid-cols-2 gap-11">
              <Form.Item
                label="Shop Name"
                name="name"
                rules={[
                  { required: true, message: "Please input Shop Name!" },
                ]}
              >
                <Input placeholder="Enter Shop Name" />
              </Form.Item>

              <Form.Item
                label="Contact Number"
                name="contact"
                rules={[
                  { required: true, message: "Please input Contact Number!" },
                ]}
              >
                <Input placeholder="Enter Contact Number" />
              </Form.Item>
            </div>
            <Form.Item
              label="Shop Address Coordinate "
              name="shopAdress"
              rules={[{ required: true, message: "Please input Shop Address Coordinate " }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Open Days"
              name="flavor"
              rules={[
                { required: true, message: "Please select Open Days" },
              ]}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Open Days"
                onChange={handleChange}
                options={options}
              />
            </Form.Item>

            {/* Middle Column */}

            <div className="grid grid-cols-2 gap-11">
              <Form.Item
                label="Opening Time"
                name="flavor"
                rules={[
                  { required: true, message: "Please select Opening Time" },
                ]}
              >
                <TimePicker
                className="w-full"
                  onChange={onChange}
                  defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>

              <Form.Item
                label="Closing Time"
                name="flavor"
                rules={[
                  { required: true, message: "Please select Closing Time" },
                ]}
              >
                <TimePicker
                 className="w-full"
                  onChange={onChange}
                  defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="Shop Type"
                name="holiday_recipes"
                rules={[
                  {
                    required: true,
                    message: "Please select a Shop Type",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
              <Form.Item
                label="Product Categories Available"
                name="holiday_recipes"
                rules={[
                  {
                    required: true,
                    message: "Please select a Product Categories Available",
                  },
                ]}
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Product Categories Available"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div></div>
          </div>

          <Form.Item>
            <div className="flex justify-center gap-5 mt-11">
              <button
                className="bg-[#495F48] px-16 py-3 text-white rounded"
                type="submit"
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Create"}
              </button>
              <button
                className="bg-red-500 px-16 py-3 text-white rounded"
                type="button"
              >
                Cancel
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditNewShop;
