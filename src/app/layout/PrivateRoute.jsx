// Components
import UnauthModal from "../../features/auth/UnauthModal";

// library
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

function PrivateRoute({ component: Component, prevLocation, ...rest }) {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <UnauthModal {...props} />
      }
    />
  );
}

export default PrivateRoute;
