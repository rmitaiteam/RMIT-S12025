import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface WordData {
  Word: string;
  Title_Frequency?: number;
  Description_Frequency?: number;
}

interface DataProps {
  title_data: WordData[];
  description_data: WordData[];
}

const CompTable: React.FC<{ data: DataProps }> = ({ data }) => {
  const { title_data, description_data } = data;

  if (!title_data && !description_data) {
    return null;
  }

  return (
    <div>
      {/* Title Word Frequencies Table */}
      <h2 className="mb-2">Title Frequencies</h2>
      <Table aria-label="Title Word Frequencies Table">
        <TableHeader>
          <TableColumn>Word</TableColumn>
          <TableColumn>Frequency</TableColumn>
        </TableHeader>
        <TableBody>
          {title_data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.Word}</TableCell>
              <TableCell>{item.Title_Frequency ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Description Word Frequencies Table */}
      <h2 className="mt-2 mb-2">Description Frequencies</h2>
      <Table aria-label="Description Word Frequencies Table">
        <TableHeader>
          <TableColumn>Word</TableColumn>
          <TableColumn>Frequency</TableColumn>
        </TableHeader>
        <TableBody>
          {description_data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.Word}</TableCell>
              <TableCell>{item.Description_Frequency ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompTable;
