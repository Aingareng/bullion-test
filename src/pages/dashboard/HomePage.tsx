import UserList from "@/features/dashboard/components/Table/UserList";

export default function HomePage() {
  return (
    <div className=" w-full px-5 pt-3 grid grid-cols-1 gap-5">
      <header className="py-8 px-9 bg-white rounded-md">
        <h1 className="font-bold">User Aktif</h1>
      </header>
      <UserList />
    </div>
  );
}
