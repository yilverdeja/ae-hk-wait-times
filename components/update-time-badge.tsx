import moment from "moment";
import { Badge } from "./ui/badge";

interface Props {
  updateTime: Date | null;
  isLoading: boolean;
}

export default function UpdateTimeBadge({ updateTime, isLoading }: Props) {
  if (updateTime === null && isLoading)
    return <Badge variant="outline">Retrieving data...</Badge>;
  if (updateTime === null)
    return <Badge variant="outline">Unable to retrieve data</Badge>;
  return (
    <Badge variant="outline">
      Updated on{" "}
      {moment(updateTime, "D/M/YYYY h:mma").format("MMM Do YYYY, h:mma")}
    </Badge>
  );
}
