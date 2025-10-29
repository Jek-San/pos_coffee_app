// projects/pos_coffee_shop/features/stalls/stalls.route.js
const express = require("express");
const router = express.Router();
const stallsController = require("./stalls.controller");
const uploadFields = require("../../middleware/upload/universalUpload");

router.get("/ping", (req, res) => {
  res.json({ message: "Stalls Route OK" });
})

// create menu in stall
router.post(
  "/create-menu-item", uploadFields([
    { name: 'gallery', maxCount: 5 },
    { name: 'thumbnail', maxCount: 1 }]), stallsController.createMenuStalls
)


// get menu stalls
router.get("/initMenuStalls/:stallId", stallsController.initMenuStalls);

// stall-setting
router.get("/initSettingsStall/:stallId", stallsController.initSettingsStalls);
router.put(
  "/update-settings-stall/:stallId", uploadFields([
    { name: 'logo', maxCount: 5 }]), stallsController.updateSettingsStall
)


router.get("/initUserStalls/:merchantId", stallsController.initUserStalls);
router.get("/initStalls/:merchantId", stallsController.initStalls);
router.post(
  "/reset-password/:stallId", stallsController.resetPassword
)
router.patch(
  "/toggle-status/:stallId", stallsController.toggleStatus
)
router.post(
  "/create-user-stalls/:merchantId",

  stallsController.createUserStall
);
router.post(
  "/create-user-stalls/:merchantId",

  stallsController.createUserStall
);
router.post(
  "/create-bulk-user-stalls/:merchantId",

  stallsController.createBulkUserStalls
);

module.exports = router;