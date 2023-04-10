import "./App.css";
import ExpandableTable from "../ExpandableTable";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

function App() {
  const simpleColumns = [
    {
      title: "Location",
      key: "location"
    },
    {
      title: "Population",
      key: "population"
    },
    { title: "Party", key: "party" }
  ];

  const simpleData = [
    {
      location: "Texas",
      population: "29 million",
      party: "Republican",
      child: [
        { location: "Houston", population: "2 million", party: "Democrat" },
        { location: "Austin", population: "1 million", party: "Democrat" }
      ]
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
        },
        { location: "San Jose", population: "1 million", party: "Democrat" }
      ]
    }
  ];

  const simpleDataLiteral = `
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
        party: "Republican",
        child: [
          { 
            location: "Houston", 
            population: "2 million", 
            party: "Democrat" 
          },
          { 
            location: "Austin", 
            population: "1 million", 
            party: "Democrat" 
          }
        ]
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
          },
          { 
            location: "San Jose", 
            population: "1 million", 
            party: "Democrat" 
          }
        ]
      }
    ];

    return(
      <ExpandableTable
        columns={columns}
        data={data}
        rowKey={"location"}
      ></ExpandableTable>
    );
  }


  `;

  const columns = [
    {
      title: "Field",
      key: ["field", "type"],
      class: ["field", "type"]
    },
    {
      title: "Description",
      key: "description",
      class: "description"
    },
    { title: "Tags", key: "tags", class: "tags" }
  ];

  const rowColor = (rowData: {
    source: string | string[];
  }): string | undefined => {
    if (
      rowData.source?.includes("schema_A") &&
      !rowData.source?.includes("schema_B")
    ) {
      return "rgba(51, 255, 0, 0.15)";
    } else if (
      rowData.source?.includes("schema_B") &&
      !rowData.source?.includes("schema_A")
    ) {
      return "rgba(255, 0, 0, 0.15)";
    }
  };

  const visibleOnInit = (rowData: { source: string | string[] }): boolean => {
    if (
      (rowData.source?.includes("schema_A") &&
        !rowData.source?.includes("schema_B")) ||
      (rowData.source?.includes("schema_B") &&
        !rowData.source?.includes("schema_A"))
    ) {
      return true;
    } else {
      return false;
    }
  };
  const data = [
    {
      field: "item_info",
      fieldPath: "item_info",
      type: "Struct",
      tags: ["Item"],
      source: ["schema_B", "schema_A"],
      child: [
        {
          field: "item_name",
          fieldPath: "item_info.item_name",
          type: "String",
          description: "The name of the item",
          source: ["schema_B", "schema_A"]
        },
        {
          field: "item_description",
          fieldPath: "item_info.item_description",
          type: "String",
          description: "The description of the item",
          source: ["schema_B", "schema_A"]
        }
      ]
    },
    {
      field: "shipment_info",
      fieldPath: "shipment_info",
      type: "Struct",
      source: ["schema_B", "schema_A"],
      child: [
        {
          field: "source",
          fieldPath: "shipment_info.source",
          type: "Struct",
          description: "metadata about the source of shipment",
          source: ["schema_B"],
          child: [
            {
              field: "name",
              fieldPath: "shipment_info.source.name",
              type: "String",
              source: ["schema_B"]
            },
            {
              field: "metadata",
              fieldPath: "shipment_info.source.metadata",
              type: "Struct",
              source: ["schema_B"],
              child: [
                {
                  field: "properties",
                  fieldPath: "shipment_info.source.metadata.properties",
                  type: "String",
                  source: ["schema_B"]
                }
              ]
            }
          ]
        },
        {
          field: "desination",
          fieldPath: "shipment_info.desination",
          type: "Struct",
          description: "metadata about the destination of shipment",
          source: ["schema_B", "schema_A"],
          child: [
            {
              field: "name",
              fieldPath: "shipment_info.desination.name",
              type: "String",
              source: ["schema_B", "schema_A"]
            },
            {
              field: "metadata",
              fieldPath: "shipment_info.desination.metadata",
              type: "Struct",
              source: ["schema_B", "schema_A"],
              child: [
                {
                  field: "properties",
                  fieldPath: "shipment_info.desination.metadata.properties",
                  type: "String",
                  source: ["schema_B", "schema_A"]
                }
              ]
            },
            {
              field: "payment_info",
              fieldPath: "shipment_info.desination.payment_info",
              type: "String",
              tags: ["Payment"],
              source: ["schema_B", "schema_A"],
              child: [
                {
                  field: "price",
                  fieldPath: "shipment_info.desination.payment_info.price",
                  type: "Number",
                  source: ["schema_B", "schema_A"]
                },
                {
                  field: "currency",
                  fieldPath: "shipment_info.desination.payment_info.currency",
                  type: "String",
                  source: ["schema_B", "schema_A"]
                }
              ]
            },
            {
              field: "geo_info",
              fieldPath: "shipment_info.desination.geo_info",
              type: "Struct",
              source: ["schema_A"],
              child: [
                {
                  field: "lat",
                  fieldPath: "shipment_info.desination.geo_info.lat",
                  type: "Number",
                  tags: ["Latitude"],
                  source: ["schema_A"]
                },
                {
                  field: "lng",
                  fieldPath: "shipment_info.desination.geo_info.lng",
                  type: "Number",
                  tags: ["Longitude"],
                  source: ["schema_A"]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const dataLiteral = `
  const columns = [
    {
      title: "Field",
      key: ["field", "type"],
      class: ["field", "type"]
    },
    {
      title: "Description",
      key: "description",
      class: "description"
    },
    { title: "Tags", key: "tags", class: "tags" }
  ];

  const rowColor = (rowData: {
    source: string | string[];
  }): string | undefined => {
    if (
      rowData.source?.includes("schema_A") &&
      !rowData.source?.includes("schema_B")
    ) {
      return "rgba(51, 255, 0, 0.15)";
    } else if (
      rowData.source?.includes("schema_B") &&
      !rowData.source?.includes("schema_A")
    ) {
      return "rgba(255, 0, 0, 0.15)";
    }
  };

  const visibleOnInit = (rowData: { source: string | string[] }): boolean => {
    if (
      (rowData.source?.includes("schema_A") &&
        !rowData.source?.includes("schema_B")) ||
      (rowData.source?.includes("schema_B") &&
        !rowData.source?.includes("schema_A"))
    ) {
      return true;
    } else {
      return false;
    }
  };
  const data = [
    {
      field: "item_info",
      fieldPath: "item_info",
      type: "Struct",
      tags: ["Item"],
      source: ["schema_B", "schema_A"],
      child: [
        {
          field: "item_name",
          fieldPath: "item_info.item_name",
          type: "String",
          description: "The name of the item",
          source: ["schema_B", "schema_A"]
        },
        {
          field: "item_description",
          fieldPath: "item_info.item_description",
          type: "String",
          description: "The description of the item",
          source: ["schema_B", "schema_A"]
        }
      ]
    },
    {
      field: "shipment_info",
      fieldPath: "shipment_info",
      type: "Struct",
      source: ["schema_B", "schema_A"],
      child: [
        {
          field: "source",
          fieldPath: "shipment_info.source",
          type: "Struct",
          description: "metadata about the source of shipment",
          source: ["schema_B"],
          child: [
            {
              field: "name",
              fieldPath: "shipment_info.source.name",
              type: "String",
              source: ["schema_B"]
            },
            {
              field: "metadata",
              fieldPath: "shipment_info.source.metadata",
              type: "Struct",
              source: ["schema_B"],
              child: [
                {
                  field: "properties",
                  fieldPath: "shipment_info.source.metadata.properties",
                  type: "String",
                  source: ["schema_B"]
                }
              ]
            }
          ]
        },
        {
          field: "desination",
          fieldPath: "shipment_info.desination",
          type: "Struct",
          description: "metadata about the destination of shipment",
          source: ["schema_B", "schema_A"],
          child: [
            {
              field: "name",
              fieldPath: "shipment_info.desination.name",
              type: "String",
              source: ["schema_B", "schema_A"]
            },
            {
              field: "metadata",
              fieldPath: "shipment_info.desination.metadata",
              type: "Struct",
              source: ["schema_B", "schema_A"],
              child: [
                {
                  field: "properties",
                  fieldPath: "shipment_info.desination.metadata.properties",
                  type: "String",
                  source: ["schema_B", "schema_A"]
                }
              ]
            },
            {
              field: "payment_info",
              fieldPath: "shipment_info.desination.payment_info",
              type: "String",
              tags: ["Payment"],
              source: ["schema_B", "schema_A"],
              child: [
                {
                  field: "price",
                  fieldPath: "shipment_info.desination.payment_info.price",
                  type: "Number",
                  source: ["schema_B", "schema_A"]
                },
                {
                  field: "currency",
                  fieldPath: "shipment_info.desination.payment_info.currency",
                  type: "String",
                  source: ["schema_B", "schema_A"]
                }
              ]
            },
            {
              field: "geo_info",
              fieldPath: "shipment_info.desination.geo_info",
              type: "Struct",
              source: ["schema_A"],
              child: [
                {
                  field: "lat",
                  fieldPath: "shipment_info.desination.geo_info.lat",
                  type: "Number",
                  tags: ["Latitude"],
                  source: ["schema_A"]
                },
                {
                  field: "lng",
                  fieldPath: "shipment_info.desination.geo_info.lng",
                  type: "Number",
                  tags: ["Longitude"],
                  source: ["schema_A"]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return (
    <ExpandableTable
        columns={columns}
        data={data}
        childDataKey={"child"}
        rowKey={"fieldPath"}
        rowColor={rowColor}
        visibleOnInit={visibleOnInit}
      ></ExpandableTable>
  );
  `;

  const installText = `npm i react-exp-table`;
  return (
    <div className="App">
      <h1>react-exp-table</h1>
      <hr></hr>

      <div>
        A react table component with expandable rows. This table uses consistent
        columns across all child rows and does not nest tables within rows.
      </div>
      <div style={{ padding: 10 }}></div>
      <div>
        For questions contact{" "}
        <a href="mailto: clapidas@gmail.com">clapidas@gmail.com</a>
      </div>
      <div>
        Want to support this library?{" "}
        <a href="https://ko-fi.com/chrislapidas">Buy me a coffee on Ko-Fi!</a>
      </div>
      <h3>
        NPM:{" "}
        <a href="https://www.npmjs.com/package/react-exp-table">
          https://www.npmjs.com/package/react-exp-table
        </a>
      </h3>
      <h3>
        Github:{" "}
        <a href="https://github.com/chrislapidas/react-expandable-rows">
          https://github.com/chrislapidas/react-expandable-rows
        </a>
      </h3>
      <div style={{ padding: 10 }}></div>
      <h2>Installation</h2>
      <SyntaxHighlighter language="javascript" style={prism}>
        {installText}
      </SyntaxHighlighter>
      <div style={{ padding: 20 }}></div>
      <h2>Simple Example</h2>
      <hr />
      <ExpandableTable
        columns={simpleColumns}
        data={simpleData}
        rowKey={"location"}
      ></ExpandableTable>
      <div style={{ padding: 10 }}></div>

      <SyntaxHighlighter language="javascript" style={prism}>
        {simpleDataLiteral}
      </SyntaxHighlighter>
      <div style={{ padding: 20 }}></div>

      <h2>Advanced Example</h2>
      <hr />
      <ExpandableTable
        columns={columns}
        data={data}
        childDataKey={"child"}
        rowKey={"fieldPath"}
        rowColor={rowColor}
        visibleOnInit={visibleOnInit}
      ></ExpandableTable>

      <div style={{ padding: 10 }}></div>

      <SyntaxHighlighter language="javascript" style={prism}>
        {dataLiteral}
      </SyntaxHighlighter>
    </div>
  );
}

export default App;
