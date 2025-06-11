import React from 'react'
import { Modal, Table } from "antd";

import { useState } from "react";
import { MdBlockFlipped } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
const RecentJoin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [activeTab, setActiveTab] = useState("User Statics");

    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModal2 = () => {
        setIsModalOpen2(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };
    const dataSource = [
        {
            key: "1",
            no: "1",
            name: "John Doe",
            date: "05/03/2025",
            phone: "+1 9876543210",
            email: "johndoe@example.com",
            location: "New York, USA",
        },
        {
            key: "2",
            no: "2",
            name: "Jane Smith",
            date: "10/04/2025",
            phone: "+44 1234567890",
            email: "janesmith@example.com",
            location: "London, UK",
        },
        {
            key: "3",
            no: "3",
            name: "Ali Khan",
            date: "15/02/2025",
            phone: "+92 3345678901",
            email: "alikhan@example.com",
            location: "Karachi, Pakistan",
        },
        {
            key: "4",
            no: "4",
            name: "Emily Davis",
            date: "20/05/2025",
            phone: "+33 6789012345",
            email: "emilydavis@example.com",
            location: "Paris, France",
        },
        
    ];

    const columns = [
        { title: "No", dataIndex: "no", key: "no" },
        {
            title: "Name",
            key: "name",
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <img
                        src={`https://avatar.iran.liara.run/public/${record.no}`}
                        className="w-10 h-10 object-cover rounded-full"
                        alt="User Avatar"
                    />
                    <span>{record.name}</span>
                </div>
            ),
        },

        { title: "Phone Number", dataIndex: "phone", key: "phone" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Location", dataIndex: "location", key: "location" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => {
                return (
                    <div className="flex gap-2">
                        {/* <button
                            onClick={() => showModal(record)}
                            className="border border-[#14803c] text-[#14803c] rounded-lg p-1 bg-[#d3e8e6]"
                        >
                            <MdBlockFlipped className="w-8 h-8 text-[#14803c]" />
                        </button> */}
                        <button
                            onClick={() => showModal2(record)}
                            className="border border-[#212121] rounded-lg p-1 bg-[#212121] "
                        >
                            <FaRegEye className="w-8 h-8 text-white" />
                        </button>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{ x: "max-content" }}
            />

            <Modal
                open={isModalOpen2}
                centered
                onCancel={handleCancel2}
                footer={null}
            >
                <div className="w-full max-w-md  p-5 relative mx-auto">
                    {/* Profile header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-blue-100 mb-3 overflow-hidden">
                            <img
                                src="https://avatar.iran.liara.run/public/24"
                                alt="Profile avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-xl font-bold">Ely Mohammed</h2>

                        {/* Contact info */}
                        <div className="flex items-center text-gray-500 mt-1">
                            <AiOutlinePhone size={16} className="text-gray-400" />
                            <span className="ml-1 text-sm">(629) 555-0129</span>
                        </div>

                        <div className="flex items-center text-gray-500 mt-1">
                            <GoLocation size={16} className="text-gray-400" />
                            <span className="ml-1 text-sm">Great Falls, Maryland</span>
                        </div>

                        <div className="flex items-center text-gray-500 mt-1">
                            <AiOutlineMail size={16} className="text-gray-400" />
                            <span className="ml-1 text-sm">Marvin@gmail.com</span>
                        </div>
                    </div>

                   

                  
                </div>
            </Modal></div>
    );
};

export default RecentJoin;
