import  { useState, useRef, useEffect, } from 'react';
import JoditEditor from 'jodit-react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetPrivecyQuery, usePostPrivecyMutation } from '../redux/api/metaDataApi';
import { message, Spin } from 'antd';
import { Navigate } from '../Navigate';


const PrivacyPolicy = () => {

 const [addTerms] = usePostPrivecyMutation()
const {data:termData} = useGetPrivecyQuery()
console.log(termData)
  const editor = useRef(null);
  const [content, setContent] = useState('');
   const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate(); 
  const handleTerms = async () => {
    const data = {
      description: content,
     
    };
   
    setLoading(true);
    const res = await addTerms(data).unwrap();
    setLoading(false);
   
    message.success(res?.message);
  };
  const config = {
      readonly: false,
      placeholder: 'Start typings...',
      style: {
          height: 600,
      },
      buttons: [
          'image', 'fontsize', 'bold', 'italic', 'underline', '|',
          'font', 'brush',
          'align'
      ]
  }

   useEffect(() => {
    setContent(termData?.data?.description);
  }, [termData]);

  return (
    <div className=" mx-auto ">
      <div className="flex justify-between">
     <Navigate title={'Privecy & Policy'}></Navigate>
        
      </div>
 <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={newContent => setContent(newContent)}
        onChange={newContent => { }}
      />
      

      <div className="mt-5 flex justify-center">
        <button
       onClick={handleTerms}
       disabled={isLoading}
          className="bg-[#212121] py-2 px-4 rounded text-white"
        >
            {isLoading ? (
                <Spin size="small" /> 
              ) : (
                "Update"
              )}
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
