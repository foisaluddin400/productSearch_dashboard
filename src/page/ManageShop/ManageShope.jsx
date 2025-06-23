import React from 'react'
import { Modal, Pagination, Table } from "antd";

import { useState } from "react";
import { MdBlockFlipped, MdDelete } from "react-icons/md";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { Navigate } from '../Navigate';
import { Link } from 'react-router-dom';
import img from '../../assets/header/ff.png'
import { FaDeleteLeft } from 'react-icons/fa6';
import { useDeleteShopProductMutation, useGetShopProductQuery, useGetSingleShopProductQuery } from '../redux/api/productManageApi';
const ManageShope = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [selectedShopProduct, setSelectedShopProduct] = useState(null);
    const [deleteShop] = useDeleteShopProductMutation()
    const id = selectedShopProduct?.key
    console.log(id)

    const { data: allShopSproduct } = useGetShopProductQuery({
        page: currentPage,
        limit: pageSize,
    });
    const shopList = allShopSproduct?.data?.data?.result || [];
    const dataSource = shopList.map((shop, index) => ({
        key: shop._id,
        no: index + 1,
        name: shop.shopName,
        phone: shop.contactNumber,
        openingTime: shop.openingTime,
        closingTime: shop.closingTime,
        OpenDays: shop.openDays.join(", "),
        shopImage: shop.shopImage,
        location: `${shop.location.coordinates[1]}, ${shop.location.coordinates[0]}`
    }));

    const handleDeleteFaq = async (id) => {
        try {
            const res = await deleteShop(id).unwrap();
            message.success(res?.message);
        } catch (err) {
            message.error(err?.data?.message);
        }
    };
    const { data: singleShopData } = useGetSingleShopProductQuery({ id })
    console.log(singleShopData)


    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModal2 = (record) => {

        setSelectedShopProduct(record);
        setIsModalOpen2(true);
    };



    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };
    // const dataSource = [
    //     {
    //         key: "1",
    //         no: "1",
    //         name: "John Doe",
    //         date: "05/03/2025",
    //         openingTime: "10:00 Am",
    //         closingTime: "12:00 Pm",
    //         OpenDays: "mon, sun, thu",
    //         phone: "+1 9876543210",
    //         email: "johndoe@example.com",
    //         location: "New York, USA",

    //     },
    //     {
    //         key: "2",
    //         no: "2",
    //         name: "John Doe",
    //         date: "05/03/2025",
    //         openingTime: "10:00 Am",
    //         closingTime: "12:00 Pm",
    //         OpenDays: "mon, sun, thu",
    //         phone: "+1 9876543210",
    //         email: "johndoe@example.com",
    //         location: "New York, USA",

    //     },
    //     {
    //         key: "3",
    //         no: "3",
    //         name: "John Doe",
    //         date: "05/03/2025",
    //         openingTime: "10:00 Am",
    //         closingTime: "12:00 Pm",
    //         OpenDays: "mon, sun, thu",
    //         phone: "+1 9876543210",
    //         email: "johndoe@example.com",
    //         location: "New York, USA",

    //     },

    // ];

    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        {
            title: "Name",
            key: "name",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.shopImage}
                        alt="Shop"
                        className="w-10 h-10 object-cover rounded-full border border-gray-300"
                    />
                    <span>{record.name}</span>
                </div>
            ),
        },

        { title: "Contact Number", dataIndex: "phone", key: "phone" },
        { title: "Opening Time", dataIndex: "openingTime", key: "openingTime" },
        { title: "Closing Time", dataIndex: "closingTime", key: "closingTime" },
        { title: "Open Days", dataIndex: "OpenDays", key: "OpenDays" },

        {
            title: "Action",
            key: "action",
            render: (_, record) => {
                return (
                    <div className="flex gap-2">

                        <button
                            onClick={() => showModal2(record)}
                            className="border border-[#212121]  rounded-lg p-1 bg-[#212121]"
                        >
                            <FaRegEye className="w-8 h-8 text-white" />
                        </button>
                        <Link to={`/dashboard/manageShop/editNewShope/${record?.key}`}>  <button
                            onClick={() => showModal(record)}
                            className="border border-[#212121]  rounded-lg p-1 bg-[#212121]"
                        >
                            <FaEdit className="w-8 h-8 text-white" />
                        </button></Link>
                        <button
                            onClick={() => handleDeleteFaq(record?.key)}
                            className="border border-[red] text-[red] rounded-lg p-1 "
                        >
                            <MdDelete className="w-8 h-8 text-[red]" />
                        </button>
                    </div>
                );
            },
        },
    ];
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className='flex justify-between'>
                <Navigate title={'Manage Shop'}></Navigate>
                <Link to={'/dashboard/manageShop/addNewShop'}><button className='bg-[#212121] rounded px-4 py-2 text-white'>+ Add New Shop</button></Link>
            </div>
           <div className='pt-6'>
             <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{ x: "max-content" }}
            />
           </div>

            <div className="mt-4 flex justify-center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={allShopSproduct?.data?.data?.meta?.total || 0}
                    onChange={handlePageChange}
                    showSizeChanger={false}

                />
            </div>

            <Modal
                open={isModalOpen2}
                centered
                onCancel={handleCancel2}
                footer={null}
            >
                {singleShopData?.data ? (
                    <div className="space-y-4 text-gray-800">
                        <img
                            src={singleShopData?.data?.shopImage}
                            alt={singleShopData?.data?.shopName}
                            className="w-full h-80 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-xl font-semibold">{singleShopData?.data?.shopName}</h2>

                        <div>
                            <h3 className="font-semibold">Shop Details</h3>
                            <div className="flex justify-between">
                                <p>— Location</p>
                                <p>{singleShopData?.data?.location?.coordinates?.[1]}, {singleShopData?.data?.location?.coordinates?.[0]}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>— Contact Number</p>
                                <p>{singleShopData?.data?.contactNumber}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>— Total Products</p>
                                <p>{singleShopData?.data?.availalbeProducts?.length || 0}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold">Shop Timing</h3>
                            <div className="flex justify-between">
                                <p>— Open Days</p>
                                <p>{singleShopData?.data?.openDays?.join(", ")}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>— Opening Time</p>
                                <p>{singleShopData?.data?.openingTime}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>— Closing Time</p>
                                <p>{singleShopData?.data?.closingTime}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold">Available Products</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {singleShopData?.data?.availalbeProducts?.map((item, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 rounded-full text-center text-sm border border-gray-300"
                                    >
                                        <h1 className='text-lg'>{item.name}</h1>
                                        <h1>{item.price}</h1>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal>
        </div>
    );
};

export default ManageShope;
