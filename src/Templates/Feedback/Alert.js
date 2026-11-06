import "./Alert.css";

const Alert = ({ el }) => {
  return (
    <div className="alertMessage alert-error" role="alert">
      <span className="alertIcon">!</span>
      <p className="alertText">{el.msg}</p>
    </div>
  );
};

export default Alert;
