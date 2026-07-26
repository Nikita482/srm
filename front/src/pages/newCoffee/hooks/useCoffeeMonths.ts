// создание месяца
import { useDispatch, useSelector } from "react-redux";
import { useCreateMonthMutation, useGetMonthsQuery } from "../api/coffeeApi";
import type { RootState } from "../../../app/store/store";
import { useEffect } from "react";
import { setSelectedMonthId } from "../../../app/store/slices/coffeeSlice";

export const useCoffeeMonth = () => {
  const { data: months } = useGetMonthsQuery();
  const [createMonthRequest] = useCreateMonthMutation();
  const selectedMonthId = useSelector(
    (state: RootState) => state.coffee.selectedMonthId,
  );
  const dispatch = useDispatch();

  // создать пустой месяц
  const createMonth = async (monthName: string) => {
    const newMonth = await createMonthRequest({
      month: monthName,
      data: [],
    }).unwrap();
    dispatch(setSelectedMonthId(newMonth._id));
  };

  // ищу выбраный месяц по селекту
  const currentMonth = months?.find((month) => month._id === selectedMonthId);

  // опции для выбора месяца (селекта)
  const monthOptions =
    months
      ?.slice()
      .reverse()
      .map((month) => ({
        value: month._id,
        label: month.month,
      })) ?? [];

  // авто-выбор первого месяца для селекта
  useEffect(() => {
    if (!selectedMonthId && months?.length) {
      dispatch(setSelectedMonthId(months[months.length - 1]._id));
    }
  }, [months, selectedMonthId, dispatch]);

  return { createMonth, months, monthOptions, selectedMonthId, currentMonth };
};
