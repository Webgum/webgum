import multiparty from "multiparty";
import { Web3Storage, File, getFilesFromPath } from "web3.storage";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
const fs = require("fs");
import { FileObject } from "files-from-path";
const { resolve, join, dirname } = require("path");

const handler = nc<NextApiRequest, NextApiResponse>();

interface ExtendedRequest {
  files: any;
}

handler.use<ExtendedRequest>((req, res, next) => {
  const form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    req.body = fields;
    req.files = files;
    next();
  });
});

handler.post<ExtendedRequest>(async (req, res) => {
  try {
    const files = await makeFileObjects(req.body, req.files);
    const cid = await storeFiles(files);
    // const cid = "123"

    // return res.status(200).json({ success: true, cid: "123" });
    return res.status(200).json({ success: true, cid: cid });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error storing the file", success: false });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

async function storeFiles(files: FileObject[]) {
  const client = makeStorageClient();
  try {
    const cid = await client.put(files);
    return cid;
  } catch (error) {
    console.log("ERROR", error);
  }
}

async function getNewPath(item: any) {
  if (item[0].originalFilename && item[0].originalFilename !== "") {
    const filePath = resolve(process.cwd(), item[0].path);
    let newPath;
    if(item[0].fieldName.startsWith("preview")){
      newPath = join(dirname(filePath), "preview-" + item[0].originalFilename);
    } else {
      newPath = join(dirname(filePath), item[0].originalFilename);
    }
    await fs.promises.rename(filePath, newPath);
    return newPath;
  }
}

async function makeFileObjects(text: string, myFiles: File[]) {
  let files: FileObject[] = [];
  const buffer = Buffer.from(JSON.stringify(text));
  for (let item of Object.values(myFiles)) {
    let newPath = await getNewPath(item);
    if (files.length < 1) {
      files = await getFilesFromPath(newPath);
    } else {
      let newFiles = await getFilesFromPath(newPath);
      files = [...files, ...newFiles];
    }
  }

  files.push(new File([buffer], "data.json"));

  return files;
}

function makeStorageClient() {
  return new Web3Storage({
    token: process.env.WEB3STORAGE_TOKEN!,
  });
}
