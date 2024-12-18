import pool from "../config/db.js";

const getallPDF = async () => {
  const pdflist = await pool.query(
    "SELECT * FROM pdf_lists order by pdf_id desc",
  );
  return pdflist.rows;
};

const getPDFbyUserID = async (user_id) => {
  const pdflist = await pool.query(
    "SELECT * FROM pdf_lists WHERE user_id = $1 ORDER BY pdf_id DESC",
    [user_id],
  );
  return pdflist.rows;
};

const storePDF = async (pdf_name, pdf_file, user_id, summary) => {
  const result = await pool.query(
    "INSERT INTO pdf_lists (pdf_name, pdf_file, user_id, summary) VALUES ($1, $2, $3, $4) RETURNING *",
    [pdf_name, pdf_file, user_id, summary],
  );
  return result.rows[0];
};

export { getPDFbyUserID, getallPDF, storePDF };
