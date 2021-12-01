# react-exp-table

A react table component with expandable rows. This table uses consistent columns across all child rows and does not nest tables within rows.

[![NPM](https://nodei.co/npm/react-exp-table.png)](https://npmjs.org/package/react-exp-table)

## Features

- Nested expandable rows
- Child row key mapping
- Conditional initial expand/collapse state by row
- Conditional row background colors
- Columns can include multiple entries per column
- All rows are loaded on initial load to ensure high performance when expanding/collapsing rows

## Installation

```
npm i react-exp-table
```

## Example

[https://main.d1ckh0bbpylcrw.amplifyapp.com/](https://main.d1ckh0bbpylcrw.amplifyapp.com/)

## Usage

```
import ExpandableTable from "react-exp-table";

function App(){
  const columns = [
    {
      title: "Location",
      key: "location"
    },
    {
      title: "Population",
      key: "population"
    },
    {
      title: "Party",
      key: "party"
    }
  ];

  const data = [
    {
      location: "Texas",
      population: "29 million",
      party: "Republican"
    },
    {
      location: "California",
      population: "39 million",
      party: "Democrat",
      child: [
        {
          location: "Los Angeles",
          population: "4 million",
          party: "Democrat"
        }
      ]
    }
  ];

  return (
    <ExpandableTable
      columns={columns}
      data={data}
      childDataKey={"child"}
      rowKey={"location"}
    ></ExpandableTable>
  );

}
```

## Result

![Example picture of the expandable table](example.JPG)

## Props

| Prop          |        Type        |                                                               Description                                                               |
| ------------- | :----------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
| columns       | column (see below) |                                      definition for column titles, keys, and optional css classes                                       |
| data          |        [ ]         |                                                 data to be displayed in the table rows                                                  |
| childDataKey  |       string       |                                         key used to identify the child row within a row's data                                          |
| rowKey        |       string       |                                  key used for react to identify each row of the table - must be unique                                  |
| rowColor      | function(rowData)  |              returns the css class used to set the background color of the row - uses the row data object as the parameter              |
| visibleOnInit | function(rowData)  | returns a boolean to identify if the row should be visible on the initial load of the table - uses the row's js object as the parameter |

## Column definition

```
export interface Column {
  title: string;
  key: string | string[];
  class?: string | string[]; //optional
}
```

## Changelog

2.0.0 (30 Nov 2021) - Simplify column definition

## Authors

- [Chris Lapidas](https://github.com/chrislapidas) - _Development_

## Questions

- [clapidas@gmail.com](mailto:clapidas@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/chrislapidas/react-expandable-rows/blob/main/LICENSE) file for details
