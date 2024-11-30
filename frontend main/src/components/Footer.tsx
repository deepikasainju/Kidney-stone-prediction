import { FaGithub, FaEnvelope } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-secondaryAccent" id="contact">
      <div className="lg:mx-32  py-8">
        <ul className="flex flex-wrap justify-center items-center  text-white">
          <li>
            <a href="/" className="mr-8 hover:underline md:mr-20 ">
              Home
            </a>
          </li>
          <li>
            <a href="#faq" className="mr-4 hover:underline md:mr-20">
              FAQ
            </a>
          </li>
          <li>
            <a href="#prediction" className="mr-4 hover:underline md:mr-20 ">
              Prediction
            </a>
          </li>
        </ul>
        <div className="flex justify-start items-center pt-5">
          <a
            href="https://github.com/deepikasainju/Kidney-stone-prediction"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mr-4 hover:underline md:mr-20 text-white"
          >
            <FaGithub className="mr-3" /> GitHub repository
          </a>
          <div className="flex items-center  mr-4 hover:underline md:mr-20">
            <FaEnvelope className="mr-3  text-white " />
            <span className="text-white">binisha4200@gmail.com</span>
          </div>
          <div className="flex items-center  mr-4 hover:underline md:mr-20">
            <FaEnvelope className="mr-3  text-white " />
            <span className="text-white">dpkasainju@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
