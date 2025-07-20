import "bootstrap/dist/css/bootstrap.min.css";
import { PersonelInforCard } from "./PersonelInforCard";

const PersonelInfor = () => {
  return (
    <div className="container my-4 ">
       <h2 className="text-center text-primary mb-4 fw-bold">My Information</h2>
      <PersonelInforCard />
    </div>
  );
};
export default PersonelInfor;
