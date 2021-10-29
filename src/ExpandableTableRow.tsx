import React = require("react");
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CollapseEvent } from "./ExpandableTable";
import { Column } from "./ExpandableTableColumn";

interface Props {
  data: any;
  hidden: boolean;
  columns: Column[];
  childLevel: number;
  childDataKey: string;
  collapseAllEvent: CollapseEvent;
  rowKey?: string;
  rowColor?: (rowData: any) => string | undefined;
  visibleOnInit?: (rowData: any) => boolean;
  expandParent: () => void;
}

const ExpandableTableRow: React.FC<Props> = ({
  data,
  hidden,
  columns,
  childLevel,
  childDataKey,
  collapseAllEvent,
  rowKey,
  rowColor,
  visibleOnInit,
  expandParent
}) => {
  //controls whether child rows are displayed as well as the rotated state of the collapse icon
  const [collapsed, setCollapsed] = useState(true);

  //function to be passed to the child rows, expands the parent
  const expand =
    //if this row is to be displayed on initialization, we do not want to expand it or any
    //of its children. this check can be removed to make visible all children that return true from visibleOnInit
    visibleOnInit && visibleOnInit(data)
      ? () => {}
      : () => {
          setCollapsed(false);
          hidden = false;
          expandParent();
        };

  const collapseIconClasses = `icon-button ${collapsed ? "collapsed" : ""}`;
  const childLevelClasses = `child-${childLevel}`;
  const trClasses = `expandableRow ${
    hidden && childLevel !== 0 ? "displayNone" : ""
  } `;
  const trStyles =
    rowColor && rowColor(data) ? { backgroundColor: rowColor(data) } : {};

  //componentDidMount
  useEffect(() => {
    if (visibleOnInit && visibleOnInit(data)) {
      expandParent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hidden) {
      setCollapsed(true);
    }
  }, [hidden]);

  useEffect(() => {
    if (typeof collapseAllEvent.collapse == "boolean") {
      setCollapsed(collapseAllEvent.collapse);
    }
  }, [collapseAllEvent]);

  const childRows: any = data[childDataKey || "child"]?.map((data: any) => {
    const rowKeyValue = () => {
      if (rowKey) {
        return data[rowKey];
      } else {
        return childLevel + Object.values(data).join();
      }
    };

    return (
      <ExpandableTableRow
        key={rowKeyValue()}
        collapseAllEvent={collapseAllEvent}
        hidden={collapsed}
        columns={columns}
        data={data}
        childLevel={childLevel + 1}
        childDataKey={childDataKey}
        rowKey={rowKey}
        rowColor={rowColor}
        visibleOnInit={visibleOnInit}
        expandParent={expand}
      ></ExpandableTableRow>
    );
  });

  const renderCollapse = (rowData: any) => {
    if (rowData.child && rowData.child.length > 0) {
      return (
        <button
          className={collapseIconClasses}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <DownOutlined />
        </button>
      );
    } else {
      return (
        <button className={"visHidden " + collapseIconClasses}>
          <DownOutlined />
        </button>
      );
    }
  };

  const renderTableDataContents = (column: Column) => {
    return column.columnData.map((columnData, columnDataIndex) => {
      if (data[columnData.key]) {
        return (
          <span
            //key={data[rowKey] + columnData.key + columnDataIndex}
            className={columnData.class}
          >
            {data[columnData.key]}
          </span>
        );
      }
      return undefined;
    });
  };

  const rowData = columns?.map((column, index, arr) => {
    const rowKeyValue = () => {
      if (rowKey) {
        return data[rowKey];
      } else {
        return childLevel + Object.values(data).join();
      }
    };

    //first td in the row
    if (index === 0) {
      return (
        <td key={rowKeyValue() + index} className={childLevelClasses}>
          <div className={"row-underline"}>
            <div className={"row-background-first"} style={trStyles}>
              {renderCollapse(data)}
              {renderTableDataContents(column)}
            </div>
          </div>
        </td>
      );
      //last td in the row
    } else if (index === columns.length - 1) {
      return (
        <td key={rowKeyValue() + index}>
          <div className={"row-underline"}>
            <div className={"row-background-last"} style={trStyles}>
              {renderTableDataContents(column)}
            </div>
          </div>
        </td>
      );
    } else {
      //middle tds in the row
      return (
        <td key={rowKeyValue() + index}>
          <div className={"row-underline"}>
            <div className={"row-background-middle"} style={trStyles}>
              {renderTableDataContents(column)}
            </div>
          </div>
        </td>
      );
    }
  });

  return (
    <>
      <tr
        className={trClasses}
        key={childLevel + data[columns[0].columnData[0].key]}
      >
        {rowData}
      </tr>
      {childRows}
    </>
  );
};

export default ExpandableTableRow;
