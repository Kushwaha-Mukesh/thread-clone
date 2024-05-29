import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost likes={401} replies={50} postImage={"/post1.png"} />
      <UserPost likes={32} replies={10} postImage={"/post2.png"} />
      <UserPost likes={921} replies={368} postImage={"/post3.png"} />
    </>
  );
};

export default UserPage;
