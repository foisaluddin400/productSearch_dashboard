import React, { useState } from "react";
import { Modal, Pagination, Table } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Navigate } from "../Navigate";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { useDeleteProductMutation, useGetProductAllQuery, useGetProductQuery } from "../redux/api/productManageApi";

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteProduct] = useDeleteProductMutation()
const [selectedProduct, setSelectedProduct] = useState(null);
  const handleEdit = (record) => {
    console.log(record)
    setSelectedProduct(record);
    setEditModal(true);
    // Edit logic goes here
  };
 const handleDeleteFaq = async (id) => {
    try {
      const res = await deleteProduct(id).unwrap();
      message.success(res?.message );
    } catch (err) {
      message.error(err?.data?.message );
    }
  };
  const { data: allProduct, isLoading } = useGetProductAllQuery({
    page: currentPage,
    limit: pageSize,
  });

  const products = allProduct?.data?.result || [];

  const dataSource = products.map((item, index) => ({
    key: item._id,
    no: index + 1,
    name: item.name,
    price: `$${item.price}`, // optional: add $ sign
  }));

  const columns = [
    { title: "No", dataIndex: "no", key: "no", align: "start" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "end",
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleEdit(record)}
            className="border border-[#212121] rounded-lg p-1 bg-[#212121]"
          >
            <FaEdit className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => handleDeleteFaq(record?.key)} className="border border-[red] text-[red] rounded-lg p-1 ">
            <MdDelete className="w-5 h-5 " />
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <Navigate title={"Product Management"} />
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-[#212121] px-4 py-2 text-white rounded"
        >
          + Add New Product
        </button>
      </div>

      <div className="pt-5">
        <Table
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
        pagination={false}
        scroll={{ x: "max-content" }}
        bordered
      />
      </div>
       <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={allProduct?.data?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}

        />
      </div>

      <AddProduct
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      />
      <EditProduct editModal={editModal} setEditModal={setEditModal} selectedProduct={selectedProduct}/>
    </div>
  );
};

export default ManageProduct;
