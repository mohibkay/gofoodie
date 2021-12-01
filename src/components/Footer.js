const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <div className="footer">
      &copy; {currentYear}. All Rights Reserved.
    </div>
  );
};

export default Footer;
