import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const handleNaviagteHome = () => {
    navigate("/HomeScreen", { replace: true });
  };

  const handleNaviagteSignout = () => {
    navigate("/Login", { replace: true });
  };

  return (
    <div className="bg-primary  sticky">
      <Navbar fluid rounded className="lg:mx-32 bg-primary">
        <Navbar.Brand href="/">
          <span className="self-center text-xl font-semibold dark:text-white">
            Stone Detector
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button onClick={handleNaviagteSignout}>Sign Out</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="" active onClick={handleNaviagteHome}>
            Home
          </Navbar.Link>
          <Navbar.Link href="#prediction">Prediction</Navbar.Link>
          <Navbar.Link href="#faq">FAQ</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
