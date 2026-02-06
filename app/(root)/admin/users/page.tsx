import Sidebar from "@/components/Sidebar";
import { UsersTable } from "@/components/UsersTable";

const Users = () => {
  return (
    <main className="grid grid-cols-8 h-screen">
      <Sidebar pageName="users" />
      <section className="px-5 col-span-7 p-5">
        <h1 className="text-4xl">Users</h1>
        <p className="text-sm text-gray-700 mt-2 dark:text-gray-500">
          List of customers within the platform
        </p>
        <div>
          <UsersTable />
        </div>
      </section>
    </main>
  )
}

export default Users
