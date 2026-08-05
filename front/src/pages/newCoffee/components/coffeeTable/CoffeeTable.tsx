import { Spin, Table, Typography } from "antd";
import { useCoffeeMonth } from "../../hooks/useCoffeeMonths";
import { useCoffeeRows } from "../../hooks/useCoffeeRows";
import EditableNumber from "./EditableNumber";
import EditableDates from "./EditableDates";
import EditableComment from "./EditableComment";

const CoffeeTable = () => {
  const { months, currentMonth } = useCoffeeMonth();
  const {
    editingRow,
    setEditingRow,
    removeEditDate,
    saveEditingRow,
    addEditDate,
    operationDraft,
    setOperationDraft,
    removeComment,
    hasChanges,
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
      render: (comments, record) => {
        return (
          <EditableComment
            comments={comments}
            record={record}
            setEditingRow={setEditingRow}
            operationDraft={operationDraft}
            setOperationDraft={setOperationDraft}
            hasChanges={hasChanges}
            saveEditingRow={saveEditingRow}
            editingRow={editingRow}
            removeComment={removeComment}
          />
        );
      },
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
      />

      <div style={{ height: "1000px" }}></div>
    </>
  );
};

export default CoffeeTable;
