import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CollapseEvent } from "./ExpandableTable";
import { Column } from "./ExpandableTableColumn";

interface Props {
  data: any;
  hidden: boolean;
  columns: Column[];
  childLevel: number;
  childDataKey?: string;
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
    if (typeof column.key == "string") {
      let className =
        typeof column.class == "string" ? column.class : column.class?.[0];
      return <span className={className}>{data[column.key]}</span>;
    } else {
      return column.key.map((key, keyIndex) => {
        if (data[key]) {
          let className =
            typeof column.class == "string"
              ? column.class
              : column.class?.[keyIndex];
          //let className = classNames[columnDataIndex] || column.class;
          return (
            <span
              //key={data[rowKey] + columnData.key + columnDataIndex}
              className={className}
            >
              {data[key]}
            </span>
          );
        }
        return undefined;
      });
    }
  };

  const mapRowTd = (rowKeyValue: any, index: number, column: Column) => {
    let childClasses;
    let collapse;
    let className;

    if (index === 0) {
      childClasses = childLevelClasses;
      collapse = renderCollapse(data);
      className = "row-background-first";
    } else if (index === columns.length - 1) {
      className = "row-background-last";
    } else {
      className = "row-background-middle";
    }

    return (
      <td key={rowKeyValue + index} className={childClasses}>
        <div className={"row-underline"}>
          <div className={className} style={trStyles}>
            {collapse}
            {renderTableDataContents(column)}
          </div>
        </div>
      </td>
    );
  };

  const rowData = columns?.map((column, index, arr) => {
    const rowKeyValue = () => {
      if (rowKey) {
        return data[rowKey];
      } else {
        return childLevel + Object.values(data).join();
      }
    };

    return mapRowTd(rowKeyValue(), index, column);
  });

  const key =
    typeof columns[0].key == "string" ? columns[0].key : columns[0].key[0];
  return (
    <>
      <tr className={trClasses} key={childLevel + data[key]}>
        {rowData}
      </tr>
      {childRows}
    </>
  );
};

export default ExpandableTableRow;
