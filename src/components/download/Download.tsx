import { useState, useEffect } from "react";

interface DownloadProps {
  cid: string;
}

export default function Download({ cid }: DownloadProps) {
  const [loading, setLoading] = useState(false);
  const [encrypted, setEncrypted] = useState(false);
  const [rawFiles, setRawFiles] = useState<any[]>();
  const [returnedFiles, setReturnedFiles] = useState(null);
  const [downloadFileName, setDownloadFileName] = useState("");
  const [links, setLinks] = useState<any[]>();

  useEffect(() => {
    async function runGetLinks() {
      // const myLinks = await getLinks(cid);
      // setLinks(myLinks);
      // TODO: get links
    }
    if (cid) {
      runGetLinks();
    }
  }, [cid]);

  const prepareDownload = async () => {
    setLoading(true);
    if (!encrypted) {
      let raw = [];
      if (links) {
        for await (const link of links) {
          if (link.name !== "data.json" && !link.name.startsWith("preview")) {
            let res = await fetch(`https://ipfs.io/ipfs/${link.path}`);
            let blob = await res.blob();
            const file = {
              path: URL.createObjectURL(blob),
              name: link.name,
            };
            raw.push(file);
          }
        }
        setRawFiles(raw);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {!returnedFiles && !downloadFileName && !loading && (
        <button onClick={() => prepareDownload()}>Prepare Download</button>
      )}

      {/* <button
        onClick={() => {
          console.log(links);
        }}
      >
        Links
      </button> */}

      {loading && <div> Loading.... </div>}

      {rawFiles && !loading && (
        <div>
          {rawFiles.map((file: any) => (
            <a
              href={file.path}
              download={file.name}
              key={file.path}
              style={{ marginBottom: "20px", display: "block" }}
            >
              Download {file.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
