import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonnel } from '../../store/slices/personnel-slices';
import { Outlet } from 'react-router-dom';
import EHeader from './EHeader';
import ESidebar from './ESidebar';
import './EPage.scss';

const EmployeePage = () => {
  // Thêm trạng thái để theo dõi trạng thái của sidebar
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Hàm để thay đổi trạng thái sidebar
  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { data: personnel, loading, error } = useSelector((state) => state.personnel);

  useEffect(() => {
    if (user?.accountId) {
      dispatch(fetchPersonnel(user.accountId));
    }
  }, [user, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <ESidebar expanded={isSidebarExpanded} toggleSidebar={toggleSidebar} personnel={personnel} />
      <div
        className={`main-content ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
      >
        <EHeader personnel={personnel} /> {/* Header positioned at the top, next to the sidebar */}
        <div className="content">
          <Outlet context={{ personnel }} />
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;

