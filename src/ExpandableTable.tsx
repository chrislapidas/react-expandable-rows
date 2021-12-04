import React from "react";
import { useState } from "react";
import ExpandableTableRow from "./ExpandableTableRow";
import { Column } from "./ExpandableTableColumn";
import "./expandableTable.css";

export interface CollapseEvent {
  timestamp: number;
  collapse: boolean | undefined;
}

interface Props {
  columns: Column[];
  data: { [key: string]: any }[];
  childDataKey?: string; //default is "child"
  rowKey?: string;
  rowColor?: (rowData: any) => string | undefined;
  visibleOnInit?: (rowData: any) => boolean;
  hideCollapseExpandButtons?: boolean;
}

const ExpandableTable: React.FC<Props> = ({
  columns,
  data,
  childDataKey,
  rowKey,
  rowColor,
  visibleOnInit,
  hideCollapseExpandButtons,
}) => {
  /** An "event" used to collapse or expand all rows in the table */
  const [collapseAllEvent, setCollapseAllEvent] = useState<CollapseEvent>({
    timestamp: 0,
    collapse: undefined,
  });

  const rows = data.map((value) => {
    const rowKeyValue = () => {
      if (rowKey) {
        return value[rowKey];
      } else {
        return "0" + Object.values(value).join();
      }
    };
    return (
      <ExpandableTableRow
        key={rowKeyValue()}
        collapseAllEvent={collapseAllEvent}
        hidden={false}
        data={value}
        columns={columns}
        childDataKey={childDataKey || "child"}
        childLevel={0}
        rowKey={rowKey}
        rowColor={rowColor}
        visibleOnInit={visibleOnInit}
        expandParent={() => {}}
      ></ExpandableTableRow>
    );
  });

  const renderHeaders = () => {
    return columns?.map((column) => {
      return <th key={column.title}>{column.title}</th>;
    });
  };

  let buttons;
  if (!hideCollapseExpandButtons) {
    buttons = (
      <div className={"expandCollapseAllRow"}>
        <button
          className={"expandCollapseAll"}
          onClick={(e) => {
            setCollapseAllEvent({ timestamp: e.timeStamp, collapse: false });
          }}
        >
          Expand All
        </button>
        <button
          className={"expandCollapseAll"}
          onClick={(e) => {
            setCollapseAllEvent({ timestamp: e.timeStamp, collapse: true });
          }}
        >
          Collapse All
        </button>
      </div>
    );
  }

  return (
    <>
      <div>{buttons}</div>
      <table>
        <thead>
          <tr>{renderHeaders()}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

export default ExpandableTable;
