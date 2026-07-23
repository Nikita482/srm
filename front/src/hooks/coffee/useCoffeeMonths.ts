// currentMonth

import { useEffect, useState } from "react";
import type { Month } from "../../types/coffee";
import { apiCreateMonth, apiGetMonths } from "../../api/coffee";

export const useCoffeeMonths = () => {
  const [months, setMonths] = useState<Month[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // получение всех месяцев
  useEffect(() => {
    const getMonths = async () => {
      const data = await apiGetMonths();
      const reversedMonths = [...data].reverse();
      setMonths(reversedMonths);

      // выбрать последний месяц для селекта
      if (reversedMonths.length === 0) return;
      setSelectedMonth(reversedMonths[0]._id);
    };

    getMonths();
  }, []);

  // создание месяца
  const createMonth = async (monthName) => {
    const newMonth = {
      month: monthName,
      data: [],
    };

    const data = await apiCreateMonth(newMonth);

    setMonths((prev) => [data, ...prev]);
    setSelectedMonth(data._id);
  };

  // обновляем месяц в months
  const updateMonth = (data: Month) => {
    setMonths((prev) =>
      prev.map((month) => (month._id === data._id ? data : month)),
    );
  };

  // ищу выбраный месяц
  const currentMonth = months.find((month) => month._id === selectedMonth);

  // опции для селекта
  const monthOptions = months.map((month) => ({
    value: month._id,
    label: month.month,
  }));

  // убрать - setMonths
  return {
    months,
    selectedMonth,
    currentMonth,
    monthOptions,
    setSelectedMonth,
    createMonth,
    updateMonth,
  };
};
