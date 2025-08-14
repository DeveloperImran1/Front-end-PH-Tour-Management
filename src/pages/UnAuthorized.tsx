import { Link } from "react-router";

const UnAuthorized = () => {
  return (
    <div>
      unauthorized page <Link to="/">Home</Link>{" "}
    </div>
  );
};

export default UnAuthorized;
