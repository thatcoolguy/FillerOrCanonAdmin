/* eslint-disable import/no-unresolved */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import TableAction from '../../CustomTable/table-action';

const tableHead = [
  '_id',
  'createdAt',
  'name',
  'username',
  'email',
  'phone',
  'action',
];

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

function UsersTable({
  data,
  isLoading,
}: {
  data: User[];

  isLoading: boolean;
}) {
  return (
    <div className=" rounded border">
      {' '}
      <Table className="">
        <TableHeader>
          <TableRow>
            {tableHead.map((head, index) => (
              <TableHead key={`${index + 1}`}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                className="py-10 text-center text-xl font-thin"
                colSpan={tableHead.length}
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            data.map((user: User, index: number) => (
              <TableRow key={`th-${index + 1}`}>
                {tableHead.map((head, idx) => {
                  if (head === 'createdAt' || head === 'updatedAt') {
                    const date = new Date(user[head]);
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        {date.toLocaleString()}
                      </TableCell>
                    );
                  }
                  if (head === '_id') {
                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        {user[head].substring(0, 8)}
                      </TableCell>
                    );
                  }
                  if (head === 'action') {
                    return (
                      <TableCell key={`${index + 1}`}>
                        <TableAction id={user._id} />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={`tr-${idx + 1}`}>
                      {user[head as keyof User]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersTable;
