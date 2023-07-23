const { pool, executequery } = require("../DB/sql");

const gettingAllUsers = async (req, res) => {
  try {
    const getting = "SELECT * FROM sql_db_api";
    const data = await executequery(getting);
    res
      .status(200)
      .json({ data, message: "Successfully got the data from SQL DB" });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const gettingSingleUser = async (req, res) => {
  const userId = req.params.id; // Get the ID from the request parameters

  try {
    const getting = "SELECT * FROM sql_db_api WHERE id = ?";
    const data = await executequery(getting, [userId]);

    if (data.length === 0) {
      // No user with the specified ID was found
      return res.status(404).json({
        message: "No user found with the specified ID",
      });
    }

    res.status(200).json({
      data,
      message: "Successfully got the user from SQL DB",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const creatingNewUsers = async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const creating = "INSERT INTO sql_db_api (name, age, email) VALUES (?,?,?)";
    const querying = await executequery(creating, [name, age, email]);

    //Visualize the inserted data
    // Fetch the inserted user data from the database
    const data = querying.insertId; //Insertid is actually the auto increment id
    const selectQuery = "SELECT * FROM sql_db_api WHERE id = ?";
    const userData = await executequery(selectQuery, [data]);

    res.status(200).json({
      data: userData[0],
      message: "Successfully added data to DB",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const updatingUsers = async (req, res) => {
  const userId = req.params.id;
  const { name, age, email } = req.body;
  try {
    const updating = "UPDATE sql_db_api SET name=?, age=?, email=? WHERE id=?";
    await executequery(updating, [name, age, email, userId]);
    // Fetch the inserted updated data from the database
    const selectQuery = "SELECT * FROM sql_db_api WHERE id = ?";
    const userUpdate = await executequery(selectQuery, [userId]);

    if (userUpdate.length === 0) {
      // User with the specified ID was not found
      return res.status(404).json({
        message: "ID not found",
      });
    }

    res.status(200).json({
      Updated: userUpdate[0],
      message: "Successfully updated data in DB",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

const deletingUsers = async (req, res) => {
  const userId = req.params.id;
  try {
    // Check if the user exists before attempting to delete
    const checkUserQuery = "SELECT * FROM sql_db_api WHERE id = ?";
    const user = await executequery(checkUserQuery, [userId]);

    if (user.length === 0) {
      // User with the specified ID was not found
      return res.status(404).json({
        message: "ID not found in DB",
      });
    }

    const deleting = "DELETE FROM sql_db_api WHERE id=?";
    await executequery(deleting, [userId]);

    res.status(200).json({
      message: "Successfully deleted from DB",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const searchingUsers = async (req, res) => {
  const searchName = req.query.name; // Get the name to search from the query parameters

  try {
    const searchQuery = "SELECT * FROM sql_db_api WHERE name LIKE ?";
    const data = await executequery(searchQuery, [`%${searchName}%`]);

    if (data.length === 0) {
      // No user with the specified name was found
      return res.status(404).json({
        message: "No user found with the specified name",
      });
    }

    res.status(200).json({
      data,
      message: "Successfully found users with the specified name",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  gettingAllUsers,
  gettingSingleUser,
  creatingNewUsers,
  updatingUsers,
  deletingUsers,
  searchingUsers,
};
