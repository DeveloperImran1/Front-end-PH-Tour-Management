import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Verify = () => {
  const location = useLocation();
  console.log(location.state); // aikhane sei state ta pabo. Jeita navigate() er second perameter a patha hoisilo.

  const navigate = useNavigate();
  const [email] = useState(location.state);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  return <div>Verify page</div>;
};

export default Verify;
