const express =
  require("express");

const router =
  express.Router();

const Notification =
  require(
    "../models/Notification"
  );

// ======================
// GET PATIENT NOTIFICATIONS
// ======================

router.get(

  "/:patientId",

  async (req, res) => {

    try {

      const notifications =

        await Notification.find({

          patientId:
            req.params.patientId

        })

        .sort({

          createdAt: -1

        });

      res.json(
        notifications
      );

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch notifications"

      });

    }

  }

);

// ======================
// UPDATE NOTIFICATION
// ======================

router.put(

  "/:id",

  async (req, res) => {

    try {

      const notification =

        await Notification.findByIdAndUpdate(

          req.params.id,

          {

            read:
              req.body.read,

            actionTaken:
              req.body.actionTaken

          },

          {

            new: true

          }

        );

      if (!notification) {

        return res.status(404).json({

          message:
            "Notification not found"

        });

      }

      res.json(
        notification
      );

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to update notification"

      });

    }

  }

);

// ======================
// MARK ALL AS READ
// ======================

router.put(

  "/mark-all/:patientId",

  async (req, res) => {

    try {

      await Notification.updateMany(

        {

          patientId:
            req.params.patientId

        },

        {

          read: true

        }

      );

      res.json({

        message:
          "All notifications marked as read"

      });

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to update notifications"

      });

    }

  }

);

module.exports =
  router;