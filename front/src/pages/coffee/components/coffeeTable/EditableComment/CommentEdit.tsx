// import { Button } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";

// const AddComment = ({ onList }) => {
//   return (
// <>
//   <h1>AddComment</h1>
//   <Button
//     type="text"
//     size="small"
//     icon={<ArrowLeftOutlined />}
//     onClick={onList}
//   />
//   <h1>add</h1>
// </>
//   );
// };

// export default AddComment;
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const EditComment = ({ onList }) => {
  return (
    <>
      <h1>EditComment</h1>
      <Button
        type="text"
        size="small"
        icon={<ArrowLeftOutlined />}
        onClick={onList}
      />
    </>
  );
};

export default EditComment;
