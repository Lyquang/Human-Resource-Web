import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonnel } from '../../store/slices/personnel-slices';
import { Outlet } from 'react-router-dom';
import ESidebar from './ESidebar';
import './EPage.scss'; // Assuming you have some styles for the EmployeePage

const EmployeePage = () => {
  // Thêm trạng thái để theo dõi trạng thái của sidebar
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Hàm để thay đổi trạng thái sidebar
  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const { user } = useSelector((state) => state);
  const { data: personnel, loading, error } = useSelector((state) => state.personnel);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <ESidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar} personnel={personnel} />
        <div className="content" >
          <Outlet context={{ personnel }} />
        </div>
  
    </div>
  );
};

export default EmployeePage;

