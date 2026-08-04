import { Button, DatePicker, Flex, Popover, Space, Tag } from "antd";
import { useState } from "react";

const EditableDates = ({
  dates,
  record,
  editingRow,
  setEditingRow,
  addEditDate,
  removeEditDate,
  saveEditingRow,
}) => {
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  return (
    <Space>
      {dates.map((day) => (
        <Tag key={day}>{day}</Tag>
      ))}

      <Popover
        trigger="click"
        open={openRowId === record._id}
        onOpenChange={(open) => {
          if (open) {
            setOpenRowId(record._id);
            setEditingRow(record);
          } else {
            setOpenRowId(null);
            setEditingRow(null);
          }
        }}
        content={
          <Flex gap={10} vertical>
            <Flex gap={10} justify="space-between">
              <DatePicker
                size="small"
                placeholder="+ день"
                format="D"
                onChange={(day) => {
                  if (!day) return;
                  addEditDate(day.date());
                }}
              />

              <Button
                onClick={() => {
                  saveEditingRow(record._id);
                  setOpenRowId(null);
                }}
              >
                Сохранить
              </Button>
            </Flex>

            <Space>
              {editingRow?.date.map((day) => (
                <Tag key={day} closable onClose={() => removeEditDate(day)}>
                  {day}
                </Tag>
              ))}
            </Space>
          </Flex>
        }
      >
        <Button size="small">✏️</Button>
      </Popover>
    </Space>
  );
};

export default EditableDates;
