const slots = {

  // Cardiologists

  "Dr. Rajesh Kumar": [
    "Mon, 15 Jun 2026 - 10:00 AM",
    "Mon, 15 Jun 2026 - 11:00 AM",
    "Tue, 16 Jun 2026 - 02:00 PM",
  ],

  "Dr. Anitha Menon": [
    "Mon, 15 Jun 2026 - 09:30 AM",
    "Wed, 17 Jun 2026 - 11:30 AM",
    "Thu, 18 Jun 2026 - 04:00 PM",
  ],

  // Dermatologists

  "Dr. Priya Sharma": [
    "Thu, 18 Jun 2026 - 10:30 AM",
    "Thu, 18 Jun 2026 - 03:00 PM",
    "Fri, 19 Jun 2026 - 05:00 PM",
  ],

  "Dr. Kavya Reddy": [
    "Tue, 16 Jun 2026 - 10:00 AM",
    "Wed, 17 Jun 2026 - 01:00 PM",
    "Fri, 19 Jun 2026 - 03:30 PM",
  ],

  // Neurologists

  "Dr. Arjun Nair": [
    "Mon, 15 Jun 2026 - 12:00 PM",
    "Wed, 17 Jun 2026 - 02:30 PM",
    "Thu, 18 Jun 2026 - 04:30 PM",
  ],

  "Dr. Meera Iyer": [
    "Tue, 16 Jun 2026 - 11:00 AM",
    "Thu, 18 Jun 2026 - 01:00 PM",
    "Fri, 19 Jun 2026 - 04:00 PM",
  ],

  // Orthopedic Specialists

  "Dr. Vikram Singh": [
    "Mon, 15 Jun 2026 - 09:00 AM",
    "Wed, 17 Jun 2026 - 12:00 PM",
    "Fri, 19 Jun 2026 - 03:00 PM",
  ],

  "Dr. Sanjay Patel": [
    "Tue, 16 Jun 2026 - 10:30 AM",
    "Thu, 18 Jun 2026 - 02:30 PM",
    "Fri, 19 Jun 2026 - 05:30 PM",
  ],

  // Pediatricians

  "Dr. Lakshmi Devi": [
    "Mon, 15 Jun 2026 - 11:00 AM",
    "Tue, 16 Jun 2026 - 03:00 PM",
    "Thu, 18 Jun 2026 - 05:00 PM",
  ],

  "Dr. Rohit Verma": [
    "Wed, 17 Jun 2026 - 10:00 AM",
    "Thu, 18 Jun 2026 - 12:30 PM",
    "Fri, 19 Jun 2026 - 02:00 PM",
  ],

};

function getSlots(
  doctorName
) {

  return (
    slots[
      doctorName
    ] || []
  );

}

module.exports =
  getSlots;