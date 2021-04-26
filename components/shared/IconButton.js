import { IconButton } from "@chakra-ui/react";
import MainIcon from "./Icon";

const MainIconButton = ({ label, icon, ...props }) => {
  return (
    <IconButton aria-label={label} icon={<MainIcon as={icon} />} {...props} />
  );
};

export default MainIconButton;
