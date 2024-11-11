import { Avatar, Dropdown, Navbar } from "flowbite-react";

const Navigation = () => {
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
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
