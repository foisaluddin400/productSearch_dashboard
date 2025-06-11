import React from 'react'
import { Modal, Table } from "antd";

import { useState } from "react";
import { MdBlockFlipped, MdDelete } from "react-icons/md";
import { FaEdit, FaRegEye } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { Navigate } from '../Navigate';
import { Link } from 'react-router-dom';
import img from '../../assets/header/ff.png'
import { FaDeleteLeft } from 'react-icons/fa6';
const ManageShope = () => {
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
        {
            key: "5",
            no: "5",
            name: "Michael Brown",
            date: "25/06/2025",
            phone: "+61 4567890123",
            email: "michaelbrown@example.com",
            location: "Sydney, Australia",
        },
        {
            key: "6",
            no: "6",
            name: "Linda Wilson",
            date: "30/07/2025",
            phone: "+49 3216549870",
            email: "lindawilson@example.com",
            location: "Berlin, Germany",
        },
        {
            key: "7",
            no: "7",
            name: "David Lee",
            date: "12/08/2025",
            phone: "+82 7654321098",
            email: "davidlee@example.com",
            location: "Seoul, South Korea",
        },
        {
            key: "8",
            no: "8",
            name: "Sophia Martinez",
            date: "18/09/2025",
            phone: "+34 6543219870",
            email: "sophiamartinez@example.com",
            location: "Madrid, Spain",
        },
        {
            key: "9",
            no: "9",
            name: "William Johnson",
            date: "22/10/2025",
            phone: "+1 3120987654",
            email: "williamjohnson@example.com",
            location: "Chicago, USA",
        },
        {
            key: "10",
            no: "10",
            name: "Hiroshi Tanaka",
            date: "05/11/2025",
            phone: "+81 9876543210",
            email: "hiroshitanaka@example.com",
            location: "Tokyo, Japan",
        },
        {
            key: "11",
            no: "11",
            name: "Fatima Ahmed",
            date: "14/12/2025",
            phone: "+971 501234567",
            email: "fatimaahmed@example.com",
            location: "Dubai, UAE",
        },
        {
            key: "12",
            no: "12",
            name: "Carlos Rodriguez",
            date: "19/01/2025",
            phone: "+52 9988776655",
            email: "carlosrodriguez@example.com",
            location: "Mexico City, Mexico",
        },
        {
            key: "13",
            no: "13",
            name: "Elena Petrova",
            date: "23/02/2025",
            phone: "+7 9054321987",
            email: "elenapetrova@example.com",
            location: "Moscow, Russia",
        },
        {
            key: "14",
            no: "14",
            name: "Mohammed Hassan",
            date: "28/03/2025",
            phone: "+20 1122334455",
            email: "mohammedhassan@example.com",
            location: "Cairo, Egypt",
        },
        {
            key: "15",
            no: "15",
            name: "Olivia Thompson",
            date: "06/04/2025",
            phone: "+27 601234567",
            email: "oliviathompson@example.com",
            location: "Cape Town, South Africa",
        },
        {
            key: "16",
            no: "16",
            name: "Lucas Kim",
            date: "12/05/2025",
            phone: "+82 1098765432",
            email: "lucaskim@example.com",
            location: "Busan, South Korea",
        },
        {
            key: "17",
            no: "17",
            name: "Isabella Rossi",
            date: "17/06/2025",
            phone: "+39 5556667778",
            email: "isabellarossi@example.com",
            location: "Rome, Italy",
        },
        {
            key: "18",
            no: "18",
            name: "Nathan Scott",
            date: "24/07/2025",
            phone: "+1 4156789012",
            email: "nathanscott@example.com",
            location: "San Francisco, USA",
        },
        {
            key: "19",
            no: "19",
            name: "Emma White",
            date: "29/08/2025",
            phone: "+61 412345678",
            email: "emmawhite@example.com",
            location: "Melbourne, Australia",
        },
        {
            key: "20",
            no: "20",
            name: "Sebastian Müller",
            date: "10/09/2025",
            phone: "+49 1712345678",
            email: "sebastianmuller@example.com",
            location: "Munich, Germany",
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
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Phone Number", dataIndex: "phone", key: "phone" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Location", dataIndex: "location", key: "location" },
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
                      <Link to={'/dashboard/manageShop/editNewShope'}>  <button
                            onClick={() => showModal(record)}
                            className="border border-[#212121]  rounded-lg p-1 bg-[#212121]"
                        >
                            <FaEdit className="w-8 h-8 text-white" />
                        </button></Link>
                        <button
                            onClick={() => showModal(record)}
                            className="border border-[red] text-[red] rounded-lg p-1 "
                        >
                            <MdDelete className="w-8 h-8 text-[red]" />
                        </button>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <div className='flex justify-between'>
            <Navigate title={'Manage Shop'}></Navigate>
            <Link to={'/dashboard/manageShop/addNewShop'}><button className='bg-[#212121] px-4 py-2 text-white'>+ Add New Shop</button></Link>
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }}
                scroll={{ x: "max-content" }}
            />

            <Modal
                open={isModalOpen2}
                centered
                onCancel={handleCancel2}
                footer={null}
            >
                <img src={img} alt="" />
                  <div className="space-y-4 text-gray-800">
        <h2 className="text-xl font-semibold">Benford Groceries</h2>

        <div>
          <h3 className="font-semibold">Shop Details</h3>
          <div className="flex justify-between">
            <p>— Location</p>
            <p>2972 Westheimer Rd. Santa Ana, Illinois</p>
          </div>
          <div className="flex justify-between">
            <p>— Contact Number</p>
            <p>+1 (312) 555–0198</p>
          </div>
          <div className="flex justify-between">
            <p>— Total Products</p>
            <p>12</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Shop Timing</h3>
          <div className="flex justify-between">
            <p>— Open Days</p>
            <p>Mon – Sun</p>
          </div>
          <div className="flex justify-between">
            <p>— Opening Time</p>
            <p>10:00 AM</p>
          </div>
          <div className="flex justify-between">
            <p>— Closing Time</p>
            <p>10:00 PM</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Available Product</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Soft Drinks & Beverages",
              "Chocolates & Snacks",
              "Personal Care Products",
              "Laundry & Cleaning Supplies",
              "Health & Hygiene Items",
              "Baby Products",
              "Groceries & Dry Food"
            ].map((item, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm border border-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
            </Modal></div>
    );
};

export default ManageShope;
