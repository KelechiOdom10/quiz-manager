import { Button } from "@chakra-ui/react";

const MainButton = ({ variant, children, refs, ...props }) => {
  return (
    <Button
      variant={variant}
      colorScheme="purple"
      fontSize={{ base: "sm", md: "md" }}
      ref={refs}
      px={8}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MainButton;
