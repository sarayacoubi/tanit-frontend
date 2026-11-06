import { useSelector } from "react-redux";
import Alert from "./Alert";
import "./Alert.css";

const DisplayErrors = () => {
  const tabErrors = useSelector((state) => state.ErrorsReducer);
  return (
    <div>
      {tabErrors.map((el, i, t) => (
        <Alert el={el} key={i}></Alert>
      ))}
    </div>
  );
};

export default DisplayErrors;
