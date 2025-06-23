import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
  TimePicker,
  Upload,
} from "antd";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useParams } from "react-router-dom";
import { useGetProductQuery, useGetSingleShopProductQuery, useUpdateShopProductMutation } from "../redux/api/productManageApi";
const { Option } = Select;
const EditNewShop = () => {
  const { id } = useParams();
  const { data: singleShopData,
    isLoading,
    isError, } = useGetSingleShopProductQuery({ id }, { refetchOnMountOrArgChange: true })
  const [updateShopProduct] = useUpdateShopProductMutation()
  const [form] = Form.useForm();
  const { data: availableProductId, isLoading: productLoading } = useGetProductQuery();
  const dynamicProductOptions = availableProductId?.data?.result || [];

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const [loading, setLoading] = useState(false);
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
  const [shopCoordinates, setShopCoordinates] = useState([]);
const [shopAddress, setShopAddress] = useState("");
  const onFinish = async (values) => {
    setLoading(true); 
    const id = singleShopData?.data?._id
    try {
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("shop_image", file.originFileObj);
      });

      const coordinates = values.shopAdress
        .split(",")
        .map((c) => parseFloat(c.trim()));

      const data = {
        shopName: values.name,
        contactNumber: values.contact,
        location: {
          type: "Point",
          coordinates: shopCoordinates.length > 0 ? shopCoordinates : [0, 0],
        },
        address: shopAddress,
        openDays: values.openDays,
        openingTime: values.openingTime.format("HH:mm"),
        closingTime: values.closingTime.format("HH:mm"),
        shopType: values.shopType,
        availalbeProducts: values.availableProducts,
      };

      formData.append("data", JSON.stringify(data));

      const res = await updateShopProduct({ formData, id });

      if (res?.data?.success) {
        message.success("Update Successfull");
        setLoading(false); 
      } else {
        message.error(message?.data?.error);
        setLoading(false); 
      }
    } catch (error) {
      console.error(error);
      message.error(message?.data?.error);
      setLoading(false); 
    }
  };

  const libraries = ["places"];
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  const autocompleteRef = useRef(null);

  
  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      const location = place.geometry?.location;

      if (location) {
        const lat = location.lat();
        const lng = location.lng();
        const address = `${lng}, ${lat}`;

        setShopAddress(place?.formatted_address);
        setShopCoordinates([lng, lat]);
        form.setFieldsValue({
          shopAdress: address,
        });
      }

    }
  };

  const reverseGeocode = async (lat, lng) => {
    const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      return data.results[0].formatted_address;
    } else {
      return `${lng}, ${lat}`;
    }
  };

  useEffect(() => {
    const loadShopData = async () => {
      if (singleShopData) {
        const shop = singleShopData.data;
        const openingTime = dayjs(shop.openingTime, "HH:mm");
        const closingTime = dayjs(shop.closingTime, "HH:mm");

        const [lng, lat] = shop.location?.coordinates;

        setShopCoordinates([lng, lat]);
        const humanReadableAddress = await reverseGeocode(lat, lng);
        setShopAddress(humanReadableAddress);

        const productIds = shop.availalbeProducts?.map((product) => product._id);

        form.setFieldsValue({
          name: shop.shopName,
          contact: shop.contactNumber,
          shopAdress: humanReadableAddress,
          openDays: shop.openDays,
          openingTime,
          closingTime,
          shopType: shop.shopType,
          availableProducts: productIds,
        });
        setFileList([
          {
            uid: "-1",
            name: "category-image.png",
            status: "done",
            url: `${shop.shopImage}`,
          },
        ]);
      }
    };

    loadShopData();
  }, [singleShopData, form]);


  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Shop Name"
            name="name"
            rules={[{ required: true, message: "Please enter shop name" }]}
          >
            <Input placeholder="Enter shop name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Contact Number"
            name="contact"
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input placeholder="Enter contact number" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Shop Address (lng, lat)"
            name="shopAdress"
            rules={[
              {
                required: true,
                message: "Please enter coordinates (lng, lat)",
              },
            ]}
          >
            <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
              <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={onPlaceChanged}
              >
                <Input
                  placeholder="Search shop location"
                  value={shopAddress}
                  onChange={(e) => {
                    setShopAddress(e.target.value);
                    form.setFieldsValue({ shopAdress: e.target.value });
                  }}
                />
              </Autocomplete>
            </LoadScript>
          </Form.Item>
        </Col>


        <Col xs={24} sm={12}>
          <Form.Item
            label="Open Days"
            name="openDays"
            rules={[{ required: true, message: "Please enter open days" }]}
          >
            <Select mode="tags" placeholder="e.g. Saturday, Sunday">
              <Option value="Saturday">Saturday</Option>
              <Option value="Sunday">Sunday</Option>
              <Option value="Monday">Monday</Option>
              <Option value="Tuesday">Tuesday</Option>
              <Option value="Wednesday">Wednesday</Option>
              <Option value="Thursday">Thursday</Option>
              <Option value="Friday">Friday</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Opening Time"
            name="openingTime"
            rules={[{ required: true, message: "Please select opening time" }]}
          >
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Closing Time"
            name="closingTime"
            rules={[{ required: true, message: "Please select closing time" }]}
          >
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Shop Type"
            name="shopType"
            rules={[{ required: true, message: "Please select shop type" }]}
          >
            <Select placeholder="Select shop type">
              <Option value="Supermarket">Supermarket</Option>
              <Option value="LocalStore">LocalStore</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Available Product Categories"
            name="availableProducts"
            rules={[
              {
                required: true,
                message: "Please select available product categories",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select product categories"
              loading={productLoading}
            >
              {dynamicProductOptions.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

        </Col>

        <Col xs={24}>
          <Form.Item label="Photos">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              multiple={true} // Allow multiple files
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item>
            <button
            type="submit"
            disabled={loading}
            className="px-8 py-2 mt-2 bg-[#212121] text-white rounded-md"
          >
            {loading ? <Spin size="small" /> : "Update"}
          </button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default EditNewShop;
