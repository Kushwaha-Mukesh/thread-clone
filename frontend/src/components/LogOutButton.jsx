import { Button } from "@chakra-ui/react";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const LogOutButton = () => {
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/user/signout");
      if (res.data.success) {
        localStorage.removeItem("thread-user");
        setUser(null);
        showToast("Success", res.data.message, "success");
      } else {
        showToast("Error", res.data.message, "error");
      }
    } catch (error) {
      showToast("Error", error.response.data.message, "error");
    }
  };
  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
