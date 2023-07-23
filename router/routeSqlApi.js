const express = require("express");
const router = express.Router();
const apiController = require("../controller/api");

router.get("/", apiController.gettingAllUsers);
router.get("/:id", apiController.gettingSingleUser)
router.post("/", apiController.creatingNewUsers);
router.patch("/:id", apiController.updatingUsers);
router.delete("/:id", apiController.deletingUsers);
router.get("/search", apiController.searchingUsers);


module.exports = router;
