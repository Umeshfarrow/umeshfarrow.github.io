import "./Table.css";

function Table({
  rows = 3,
  columns = 3,
  headers = [],
  data = [],
}) {
  const hasHeader = headers.length > 0;

  return (
    <div className="table-wrapper">
      <table className="table">
        {hasHeader && (
          <thead>
            <tr>
              {headers.slice(0, columns).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map(
                (_, columnIndex) => (
                  <td key={columnIndex}>
                    {data[rowIndex]?.[columnIndex] ?? ""}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
