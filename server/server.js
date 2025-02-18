const express = require("express")

const app = express();
app.get("/record", get_all_error_records);
app.get("/record/:id", get_error_record);
app.post("/record", save_error_record);
app.put("/record/:id", update_error_record);
app.delete("/record", delete_all_error_records);
app.delete("/record/:id", delete_error_record)

app.listen(3000, () => console.log(`server listening on port ${3000}`))