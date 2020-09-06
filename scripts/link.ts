export interface Libraries {
  [name: string]: string,
};

export interface SimpleContractJSON {
  abi: any[];
  bytecode: string;
  linkReferences: object;
};

// link bytecode with libraries
export default function link(artifact: SimpleContractJSON, libraries: Libraries):SimpleContractJSON {
  let bytecode = artifact.bytecode;

  for (const [fileName, fileReferences] of Object.entries(
    artifact.linkReferences,
  )) {
    for (const [libName, fixups] of Object.entries(fileReferences as object)) {
      const addr:string = libraries[libName] as string;
      if (addr === undefined) {
        continue;
      }

      for (const fixup of fixups) {
        bytecode =
          bytecode.substr(0, 2 + fixup.start * 2) +
          addr.substr(2) +
          bytecode.substr(2 + (fixup.start + fixup.length) * 2);
      }
    }
  }

  return {
    ...artifact,
    bytecode,
  };
}
