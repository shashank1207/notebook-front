import ErrMes from "404.png";

const NotFound = () => {
  return (
    <div>
      <img src={ErrMes} style={{ height: "100vh", width: "100%" }} />
    </div>
  );
};

export default NotFound;