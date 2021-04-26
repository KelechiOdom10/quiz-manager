import PropTypes from "prop-types";
import { useRouter } from "next/router";
import LoadingScreen from "../components/shared/Loading";
import { useAuth } from "./auth";
import { useEffect } from "react";

const withAuthentication = WrappedComponent => {
  const RequiresAuthentication = props => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) router.push("/login");
    }, [user]);

    // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    return user ? <WrappedComponent {...props} /> : <LoadingScreen />;
  };

  return RequiresAuthentication;
};

withAuthentication.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withAuthentication;
