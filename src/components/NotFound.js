import ErrMes from "Mando.jpg";

const NotFound = () => {
  return (
    <div>
      <img src={ErrMes} style={{ height: "100vh", width: "calc(100vw - 240px)" }} />
    </div>
  );
};

export default NotFound;