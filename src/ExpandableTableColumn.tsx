export interface Column {
  title: string;
  columnData: ColumnData[];
}

interface ColumnData {
  key: string;
  class?: string;
}
