import { Flex, Typography } from "antd";

type TotalRowProps = {
  label: string;
  value: string;
  strong?: boolean;
};

const TotalRow = ({ label, value, strong }: TotalRowProps) => {
  return (
    <Flex justify="space-between">
      <Typography.Text type={strong ? undefined : "secondary"} strong={strong}>
        {label}:
      </Typography.Text>
      <Typography.Text strong={strong}>{value}</Typography.Text>
    </Flex>
  );
};

export default TotalRow;
