import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "../ui/progress";

export default function DataTable({ columnName, data }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {columnName.map((name, index) => (
            <TableHead key={index}>{name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow className={"hover:bg-gray-200  "} key={index}>
            <TableCell key={index}>{item.projectName}</TableCell>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>{item.budget}</TableCell>
            <TableCell>
              <Progress value={item.progress} />
            </TableCell>
            <TableCell
              className={`${
                item.status === "In Progress"
                  ? " bg-blue-400 p-1 rounded-2xl w-fit"
                  : "bg-green-400  p-1 rounded-2xl w-fit"
              } flex justify-center items-center text-black ml-5`}
            >
              {item.status}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-eye w-4 h-4 mr-1"
                    aria-hidden="true"
                  >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <ViewDialoge data={item} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ViewDialoge({ data }) {
  return (
    <Dialog>
      <DialogTrigger>View</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Project Name</h1>
              <p>{data.projectName}</p>
            </div>
            <div>
              <h1 className="font-semibold">Status</h1>
              <p
                className={`${
                  data.status === "In Progress"
                    ? " bg-blue-400 p-1 rounded-2xl w-fit"
                    : "bg-green-400  p-1 rounded-2xl w-fit"
                }`}
              >
                {data.status}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Start Date</h1>
              <p>{data.startDate}</p>
            </div>
            <div>
              <h1 className="font-semibold">End Date</h1>
              <p>{data.endDate}</p>
            </div>
          </div>
          <div>
            <h1 className="font-semibold">Budget</h1>
            <p>{data.budget}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Progess</h1>
            </div>
            <div>
              <h1 className="font-semibold mr-5">{data.progress}%</h1>
            </div>
          </div>

          <div>
            <Progress value={data.progress} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

// function ViewDialoge({ data }) {
//   return (
//     <Dialog>
//       <DialogTrigger>view</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Project Details</DialogTitle>
//           <div>
//             <div className="flex">
//               <div>
//                 <p>Project Name</p>
//                 <p>{data.projectName}</p>
//               </div>

//               <div>
//                 <p>status</p>
//                 <p
//                   className={`${
//                     data.status === "In Progress"
//                       ? " bg-blue-400 p-1 rounded-2xl w-fit"
//                       : "bg-green-400  p-1 rounded-2xl w-fit"
//                   }`}
//                 >
//                   {data.status}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }
