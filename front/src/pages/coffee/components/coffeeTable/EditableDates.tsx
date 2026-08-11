import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Popconfirm,
  Popover,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const EditableDates = ({
  dates,
  record,
  editingRow,
  setEditingRow,
  addEditDate,
  removeEditDate,
}) => {
  return (
    <Space>
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
          <Flex gap={10} vertical style={{ maxWidth: "270px" }}>
            {/* добовление дней недели */}
            <DatePicker
              getPopupContainer={(trigger) => trigger.parentElement!}
              size="small"
              placeholder="+ день"
              format="D"
              placement="bottomLeft"
              style={{ flex: 1 }}
              onChange={(day) => {
                if (!day) return;
                addEditDate(day.date());
              }}
              disabled={editingRow?.date.length >= 7}
            />

            {/* удаление дней недели */}
            <Flex vertical>
              {editingRow?.date.map((day, index) => (
                <Flex key={day} vertical>
                  {index > 0 && <Divider style={{ margin: "5px 0" }} />}

                  <Flex align="center" justify="space-between" gap={10}>
                    <Typography.Text>
                      <CalendarOutlined /> День: {day}
                    </Typography.Text>

                    <Popconfirm
                      getPopupContainer={(trigger) => trigger.parentElement!}
                      title={`Удалить день «${day}»?`}
                      okText="Удалить"
                      description="День будет удален безвозвратно!"
                      okButtonProps={{ danger: true }}
                      onConfirm={() => {
                        removeEditDate(day);
                      }}
                    >
                      <Button danger size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        }
      >
        <Button size="small">
          <EditOutlined />
        </Button>
      </Popover>

      <Space wrap>
        {dates.map((day) => (
          <Tag
            key={day}
            style={{
              width: 25,
              height: 25,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {day}
          </Tag>
        ))}
      </Space>
    </Space>
  );
};

export default EditableDates;
