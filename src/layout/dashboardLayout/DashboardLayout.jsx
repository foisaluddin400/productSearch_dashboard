import { Outlet } from "react-router-dom";
import Header from "../../components/LayoutComponents/Header";
import SidBar from "../../components/LayoutComponents/SidBar";

const DashboardLayout = () => {
  return (
    <div className="lg:flex ">
    
      <div className="lg:w-80 bg-[#FEFEFE] overflow-auto lg:fixed lg:top-0 lg:left-0 lg:bottom-0 hidden lg:block no-scrollbar">
        <SidBar />
      </div>

     
      <div className="lg:flex-1 lg:ml-80">
        <Header />
        <div className="p-2 bg-[#f6fdf6]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
