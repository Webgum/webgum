import { create } from 'ipfs-http-client';

export async function getLinks(ipfsPath: string) {
  const url = 'https://dweb.link/api/v0';
  const ipfs = create({ url });

  const links = [];
  for await (const link of ipfs.ls(ipfsPath)) {
    links.push(link);
  }
  console.log("LINKS", links);
  return links;
}
