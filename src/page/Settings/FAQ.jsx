import React, { useState } from "react";
import { Modal, message } from "antd";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
} from "../redux/api/metaDataApi";

const FAQ = () => {
  const { data: faqData = [] } = useGetFaqQuery();
  const [deleteFaq] = useDeleteFaqMutation();
  const [addFaq] = useAddFaqMutation();
  const [updateFaq] = useUpdateFaqMutation();

  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleClick = (index) => {
    setIsAccordionOpen((prev) => (prev === index ? null : index));
  };

  const handleAddFaq = async () => {
    if (!question || !answer) return message.error("All fields are required");
    try {
      const res = await addFaq({ question, answer }).unwrap();
      message.success(res?.message );
      setAddModalOpen(false);
      setQuestion("");
      setAnswer("");
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  const handleUpdateFaq = async () => {
    if (!question || !answer || !selectedFaq?._id) return;
    try {
      const res = await updateFaq({ id: selectedFaq._id, data: { question, answer } }).unwrap();
      message.success(res?.message );
      setUpdateModalOpen(false);
      setSelectedFaq(null);
      setQuestion("");
      setAnswer("");
    } catch (err) {
      message.error(err?.data?.message );
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      const res = await deleteFaq(id).unwrap();
      message.success(res?.message || "FAQ deleted successfully");
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete FAQ");
    }
  };

  const openUpdateModal = (faq) => {
    setSelectedFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setUpdateModalOpen(true);
  };

  return (
    <div className="relative p-5 z-0">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#212121] text-white font-semibold px-5 py-2 rounded"
        >
          + Add FAQ
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-5 bg-white p-5">
        {faqData?.data?.map((faq, index) => (
          <div key={faq._id} className="border-b py-3">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => handleClick(index)}>
              <h2 className="text-lg font-semibold flex gap-2 items-center">
                <FaRegQuestionCircle /> {faq.question}
              </h2>
              <div className="flex gap-3 items-center">
                <FaChevronDown className={`transition-transform ${isAccordionOpen === index ? "rotate-180" : ""}`} />
                <CiEdit
                  className="text-2xl text-green-600 cursor-pointer"
                  onClick={() => openUpdateModal(faq)}
                />
                <RiDeleteBin6Line
                  className="text-2xl text-red-500 cursor-pointer"
                  onClick={() => handleDeleteFaq(faq._id)}
                />
              </div>
            </div>
            {isAccordionOpen === index && (
              <p className="mt-3 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal open={addModalOpen} onCancel={() => setAddModalOpen(false)} footer={null} centered>
        <div className="p-5">
          <h2 className="text-xl font-bold mb-4">Add FAQ</h2>
          <input
            className="w-full border p-2 mb-4"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <textarea
            className="w-full border p-2 mb-4"
            placeholder="Answer"
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button onClick={() => setAddModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={handleAddFaq} className="px-4 py-2 bg-[#212121] text-white rounded">Save</button>
          </div>
        </div>
      </Modal>

      {/* Update Modal */}
      <Modal open={updateModalOpen} onCancel={() => setUpdateModalOpen(false)} footer={null} centered>
        <div className="p-5">
          <h2 className="text-xl font-bold mb-4">Update FAQ</h2>
          <input
            className="w-full border p-2 mb-4"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <textarea
            className="w-full border p-2 mb-4"
            placeholder="Answer"
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button onClick={() => setUpdateModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={handleUpdateFaq} className="px-4 py-2 bg-[#212121] text-white rounded">Update</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
