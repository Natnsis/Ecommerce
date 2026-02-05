import { getAllAuthUsers } from "@/app/conrollers/auth.data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export async function UsersTable() {
  const users = await getAllAuthUsers()
  return (
    <div className="mt-10 px-10">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>UUID</TableHead>
            <TableHead>Povider</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Last Signed In</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u, index) => (
            <TableRow key={u.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.app_metadata?.provider}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.last_sign_in_at}</TableCell>
              <TableCell>{u.phone ? u.phone : "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
