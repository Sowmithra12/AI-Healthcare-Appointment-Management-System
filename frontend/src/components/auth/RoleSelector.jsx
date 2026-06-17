function RoleSelector({ role, setRole }) {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => setRole("patient")}
        className={`px-4 py-2 rounded ${
          role === "patient"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        Patient
      </button>

      <button
        onClick={() => setRole("doctor")}
        className={`px-4 py-2 rounded ${
          role === "doctor"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        Doctor
      </button>

      <button
        onClick={() => setRole("admin")}
        className={`px-4 py-2 rounded ${
          role === "admin"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        Admin
      </button>
    </div>
  );
}

export default RoleSelector;