function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
      <h3 className="text-gray-400 text-sm">
        {title}
      </h3>

      <p className="text-white text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;