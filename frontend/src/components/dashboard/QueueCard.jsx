function QueueCard() {

  return (

    <div className="bg-white rounded-3xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Queue Status
      </h2>

      <div className="space-y-3">

        <p>
          Current Position:
          <span className="font-bold text-blue-600 ml-2">
            8
          </span>
        </p>

        <p>
          Estimated Wait:
          <span className="font-bold text-green-600 ml-2">
            20 Minutes
          </span>
        </p>

        <p>
          Doctor:
          <span className="font-bold ml-2">
            Dr. Smith
          </span>
        </p>

      </div>

    </div>

  );
}

export default QueueCard;