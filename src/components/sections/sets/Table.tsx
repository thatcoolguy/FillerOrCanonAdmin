/* eslint-disable import/no-unresolved */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// import { EyeIcon } from '@heroicons/react/24/solid';
// import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { openModal } from '@/redux/features/sidebar/modalConfig';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// import TableAction from '../../CustomTable/table-action';

const tableHead = [
  '_id',
  'createdAt',
  'title',
  'duration',
  'questions',
  'action',
];

interface Sets {
  _id: string;
  title: string;
  // duration: number;
  createdAt: string;
  updatedAt: string;
}

function SetsTable({
  data,
  isLoading,
}: {
  data: Sets[];

  isLoading: boolean;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
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
            data.map((admin: Sets, index: number) => (
              <>
                <TableRow key={`th-${index + 1}`}>
                  {tableHead.map((head, idx) => {
                    if (head === 'createdAt' || head === 'updatedAt') {
                      const date = new Date(admin[head]);
                      return (
                        <TableCell key={`tr-${idx + 1}`}>
                          {date.toLocaleString()}
                        </TableCell>
                      );
                    }
                    if (head === '_id') {
                      return (
                        <TableCell key={`tr-${idx + 1}`}>
                          {admin[head].substring(0, 8)}
                        </TableCell>
                      );
                    }
                    if (head === 'action') {
                      return (
                        <TableCell key={`${index + 1}`}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                              >
                                <DotsHorizontalIcon className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-[160px]"
                            >
                              <DropdownMenuItem
                                onClick={() => {
                                  router.push(`/sets/edit/${admin._id}`);
                                }}
                              >
                                Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => {
                                  dispatch(
                                    openModal({
                                      type: 'delete',
                                      id: admin._id,
                                    }),
                                  );
                                }}
                              >
                                Delete
                                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      );
                    }

                    if (head === 'questions') {
                      return (
                        <TableCell className="" key={`tr-${idx + 1}`}>
                          {admin[head as keyof Sets].length}{' '}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={`tr-${idx + 1}`}>
                        {admin[head as keyof Sets]}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <span className=" hidden">siam</span>
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default SetsTable;
