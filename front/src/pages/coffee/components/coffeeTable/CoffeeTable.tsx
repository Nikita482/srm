import { Spin, Table } from "antd";
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
  // доработать итоги (Начислено и Осталось)
  // убрать из кастомных хуков все лишнюю логику и перенести часть в редакс
  //  ы
  const columns = [
    {
      title: "Число",
      dataIndex: "date",
      width: 250,
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
        // Добавить кнопку удаления в Popover самой недели (рядом с Tag дат).
        // При открытии недели через кнопку "+ неделя" показывать список существующих недель с удалением.
      ),
    },
    {
      title: "Зп",
      dataIndex: "salary",
      onCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
      onHeaderCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
      render: (_, record) => (
        <EditableNumber
          record={record}
          field="salary"
          editingRow={editingRow}
          setEditingRow={setEditingRow}
          saveEditingRow={saveEditingRow}
        />
      ),
    },
    {
      title: "Траты",
      dataIndex: "expenses",
      onCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
      onHeaderCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
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
      onCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
      onHeaderCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
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
      onCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
      onHeaderCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
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
      onCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
      onHeaderCell: () => ({
        style: {
          padding: "16px 0px",
        },
      }),
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
      render: (_, record) =>
        `${(record.cashCollection + record.paid).toLocaleString("ru-RU")} ₽`,
      onCell: () => ({
        style: {
          borderLeft: "1px solid #d9d9d9",
        },
      }),
    },
    {
      title: "Осталось",
      render: (_, record) =>
        `${(record.salary + record.expenses - (record.cashCollection + record.paid)).toLocaleString("ru-RU")} ₽`,
    },
  ];

  if (!months) return <Spin />;
  return (
    <>
      <Table
        columns={columns}
        dataSource={[...(currentMonth?.data ?? [])]}
        rowKey="_id"
        tableLayout="auto"
        pagination={false}
        scroll={{ x: "max-content" }}
      />

      <div style={{ height: "1000px" }}></div>
    </>
  );
};

export default CoffeeTable;
