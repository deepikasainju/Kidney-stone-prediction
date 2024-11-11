import { Avatar, Dropdown, Navbar } from "flowbite-react";
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
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://cdn-icons-png.flaticon.com/512/753/753354.png"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Your Name</span>
              <span className="block truncate text-sm font-medium">
                youremail@email.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleNaviagteSignout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active onClick={handleNaviagteHome}>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">Prediction</Navbar.Link>
          <Navbar.Link href="#">FAQ</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
