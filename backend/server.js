const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");

const app = express();

const rekognition = new AWS.Rekognition({
    region: "ap-south-1"
});

const upload = multer();

app.post("/recognize", upload.single("image"), async (req, res) => {

    const params = {
        CollectionId: "hyder-collection",
        Image: {
            Bytes: req.file.buffer
        }
    };

    try {

        const result = await rekognition.searchFacesByImage(params).promise();

        if(result.FaceMatches.length > 0){

            res.json({
                person: result.FaceMatches[0].Face.ExternalImageId,
                confidence: result.FaceMatches[0].Similarity
            });

        }else{

            res.json({
                person: "Unknown"
            });

        }

    } catch(error){

        res.status(500).send(error);

    }

});

app.listen(5000, () =>
console.log("Server running on port 5000"));
