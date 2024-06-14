const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");


app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/pdf");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});


app.post("/form-data", upload.single("file"), (req, res) => {
  const pdf = req.file;

  console.log("PDF:", pdf);

  if (!pdf) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const jsonData = {
    "Sent to": "สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์",
    "Subject": "ขอเชิญเข้าร่วมประชุมระดมสมอง (Focus Group) ผ่านช่องทางออนไลน์ ครั้งที่ 2 เพื่อรับฟังการ นำเสนอร่างแผนแม่บทเพื่อขับเคลื่อนการพัฒนาระบบอำนวยความสะดวกในการประกอบธุรกิจแบบ ครบวงจร (Doing Business Portal) และแสดงความคิดเห็นหรือข้อเสนอแนะ",
    "Summary": "ข้อความนี้เป็นคำเชิญเข้าร่วมประชุมระดมสมอง (Focus Group) ครั้งที่ 2 ผ่านช่องทางออนไลน์ ที่จัดโดยสถาบันวิจัยและให้คำปรึกษาแห่งมหาวิทยาลัยธรรมศาสตร์ ประชุมจะเกี่ยวกับการนำเสนอร่างแผนแม่บทเพื่อขับเคลื่อนการพัฒนาระบบอำนวยความสะดวกในการประกอบธุรกิจแบบครบวงจร (Doing Business Portal) และให้ความเห็นหรือเสนอแนะเกี่ยวกับแผนงาน. ประชุมจะจัดขึ้นในวันที่ 8 กุมภาพันธ์ 2566 เวลา 9:00 - 12:00น. และสามารถสอบถามเพิ่มเติมได้ผ่านทางอีเมล์ หรือโทรศัพท์ ที่ระบุไว้ในข้อความ."
  };

  return res.status(200).json(jsonData);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
