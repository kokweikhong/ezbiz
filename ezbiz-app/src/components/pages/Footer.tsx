import ClientEnquiryForm from "./ClientEnquiryForm";

type FooterProps = {
  themeColor?: string;
};

const Footer: React.FC<FooterProps> = ({ themeColor }) => {
  return (
    <footer className="text-white">
      <div className="text-center py-[30px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-semibold text-[22px] mb-[20px]">
          Sign Up for Our Newsletter
        </h2>
        <p className="font-normal">{`Subscribe to us to always stay in touch with us and get the latest news about our company and all of our promotions!`}</p>
      </div>

      <div className="py-[20px] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ClientEnquiryForm themeColor={themeColor} />
      </div>

      <div className="bg-[#1d1d1d] text-center">
        <div className="max-w-[500px] py-[20px] mx-auto">
          <a href="#">
            Copyright © 2023 Maejic Media. Powered by Maejic Ezbiz.
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
