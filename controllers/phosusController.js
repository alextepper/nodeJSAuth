const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dk98nlyp4",
  api_key: "228756186924527",
  api_secret: "87PrnJGKDEbPn7LuXnepozxqx5I",
});

// phosus api-key
const apiKey = "3e7c70fbce9e89f2b039f4a6c129a67b";

const ackeyId = 448;

const token = jwt.sign(
  {
    account_key_id: ackeyId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
    iat: Math.floor(Date.now() / 1000),
  },
  apiKey,
  { algorithm: "HS256" }
);

module.exports.removeBG = async (imageUrl) => {
  console.log(imageUrl);
  const res = await axios({
    method: "POST",
    url: "https://api.phosus.com/bgremove/v1",
    headers: {
      authorizationToken: token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      image_url: imageUrl,
    }),
  });
  const base64Data = res.data.results.mask;
  const binaryData = Buffer.from(base64Data, "base64");
  const tempFilePath = "/tmp/temp_image.png";
  fs.writeFileSync(tempFilePath, binaryData);

  console.log(token);
  cloudinary.v2.uploader.upload(
    tempFilePath,
    { public_id: "olympic_flag" },
    function (error, result) {
      if (error) {
        console.error("Error uploading to Cloudinary:", error);
      } else {
        console.log(result);
      }

      // Optionally, delete the temporary file after uploading
      // fs.unlinkSync(tempFilePath);
    }
  );

  console.log(res.data.results.mask); // {'ok': ..., 'result': ..., 'error': ...}
};
