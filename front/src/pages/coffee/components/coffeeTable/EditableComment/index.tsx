import { Button, Flex, Popover, Typography } from "antd";
import { MessageOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./CommentAdd";
import EditComment from "./CommentEdit";

const EditableComment = ({
  comments,
  record,
  setEditingRow,
  operationDraft,
  setOperationDraft,
  saveComment,
  editingRow,
  removeComment,
}) => {
  const [mode, setMode] = useState<"list" | "add" | "edit">("list");

  return (
    <Flex vertical gap={4} align="flex-start">
      <Flex gap={10}>
        <Typography.Text>
          <MessageOutlined /> {comments.length}
        </Typography.Text>

        <Popover
          trigger="click"
          styles={{ root: { position: "fixed" } }}
          onOpenChange={(open) => {
            if (open) {
              setEditingRow(record);
            } else {
              setEditingRow(null);
            }
          }}
          content={
            <Flex vertical gap={5} style={{ width: 300 }}>
              {mode === "list" && (
                <CommentList
                  editingRow={editingRow}
                  onAdd={() => setMode("add")}
                  onEdit={() => setMode("edit")}
                  onDelete={removeComment}
                />
              )}

              {mode === "edit" && (
                <EditComment onList={() => setMode("list")} />
              )}

              {mode === "add" && (
                <AddComment
                  onList={() => setMode("list")}
                  operationDraft={operationDraft}
                  setOperationDraft={setOperationDraft}
                  saveComment={saveComment}
                />
              )}
            </Flex>
          }
        >
          <Button size="small">
            <EditOutlined />
          </Button>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default EditableComment;
