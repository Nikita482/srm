import { useCoffeeMonth } from "../../hooks/useCoffeeMonths";
import { Card, Flex, Select, Space, Spin, Table, Typography } from "antd";
import { useCoffeeRows } from "../../hooks/useCoffeeRows";
import { operationOptions } from "../../constants/operationOptions";
import OperationFields from "./OperationFields";
import { formatComment } from "../../utils/formatComment";
import EditableNumber from "./EditableNumber";
import EditableDates from "./EditableDates";

const CoffeeTable = () => {
  const { months, currentMonth } = useCoffeeMonth();
  const {
    editingRow,
    setEditingRow,
    removeEditDate,
    saveEditingRow,
    addEditDate,
    setOperationDraft,
    operationDraft,
    commentOptions,
    resetOperationDraft,
    setSelectedCommentId,
    selectedCommentId,
  } = useCoffeeRows();

  // поработать над визуалом ибо колонки сейчас плавуют и не одинаковые (уменьшить размер полей)
  // добавботать коменты
  // доработать итоги (Начислено и Осталось)
  // убрать из ui лишний визуал и логику
  // убрать из кастомных хуков все лишнюю логику

  const columns = [
    {
      title: "Число",
      dataIndex: "date",
      render: (dates, record) => (
        <EditableDates
          dates={dates}
          record={record}
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          addEditDate={addEditDate}
          removeEditDate={removeEditDate}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Зп",
      dataIndex: "salary",
      render: (_, record) => (
        <Typography.Text>{record.date.length * 3000} ₽</Typography.Text>
      ),
    },
    {
      title: "Траты",
      dataIndex: "expenses",
      render: (_, record) => (
        <EditableNumber
          record={record}
          field="expenses"
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Инкас",
      dataIndex: "cashCollection",
      render: (_, record) => (
        <EditableNumber
          record={record}
          field="cashCollection"
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Заплатили",
      dataIndex: "paid",
      render: (_, record) => (
        <EditableNumber
          record={record}
          field="paid"
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Комент",
      dataIndex: "comment",
      render: (comments) =>
        comments.map((comment) => (
          <div key={comment._id} style={{ display: "flex" }}>
            <p>{formatComment(comment)}</p>
          </div>
        )),
    },
    {
      title: "Начислено",
      dataIndex: "accrued",
    },
    { title: "Осталось", dataIndex: "remaining" },
  ];

  if (!months) return <Spin />;
  return (
    <>
      <Table
        columns={columns}
        dataSource={[...(currentMonth?.data ?? [])]}
        rowKey="_id"
        expandable={{
          onExpand: (expanded) => {
            if (expanded) {
              resetOperationDraft();
            }
          },
          expandedRowRender: () => {
            return (
              <Flex align="center" justify="space-between">
                <Card style={{ flex: 1 }}>
                  <Space>
                    <Typography.Text strong>Операция:</Typography.Text>

                    <Select
                      style={{ width: "150px" }}
                      size="small"
                      value={operationDraft.type}
                      options={operationOptions}
                      onChange={(operation) =>
                        setOperationDraft((prev) => ({
                          ...prev,
                          type: operation,
                        }))
                      }
                    />

                    <OperationFields
                      operationDraft={operationDraft}
                      setOperationDraft={setOperationDraft}
                    />

                    <Select
                      size="small"
                      placeholder="Выбрать комент:"
                      style={{ width: 300 }}
                      value={selectedCommentId}
                      options={commentOptions}
                      onChange={(comId) => {
                        setSelectedCommentId(comId);
                      }}
                    />
                  </Space>
                </Card>
              </Flex>
            );
          },
        }}
      />

      <div style={{ height: "1000px" }}></div>
    </>
  );
};

export default CoffeeTable;
