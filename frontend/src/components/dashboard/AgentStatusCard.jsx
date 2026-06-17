function AgentStatusCard() {
  const agents = [
    "Intent Agent",
    "Reminder Agent",
    "Availability Agent",
    "Queue Agent"
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h3 className="font-bold text-lg mb-4">
        AI Agents
      </h3>

      {agents.map((agent) => (
        <div
          key={agent}
          className="flex justify-between mb-2"
        >
          <span>{agent}</span>

          <span className="text-green-600">
            Active
          </span>
        </div>
      ))}
    </div>
  );
}

export default AgentStatusCard;