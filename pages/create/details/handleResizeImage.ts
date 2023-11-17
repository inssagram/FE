import Resizer from "react-image-file-resizer";

export const handleResizeImage = (file: any) =>
    new Promise((res) => {
      Resizer.imageFileResizer(
        file, // target file
        1500, // maxWidth
        1500, // maxHeight
        "JPEG", // compressFormat : Can be either JPEG, PNG or WEBP.
        80, // quality : 0 and 100. Used for the JPEG compression
        0, // rotation
        (uri) => res(uri), // responseUriFunc
        "file" // outputType : Can be either base64, blob or file.(Default type is base64)	
      );
    });

    // https://github.com/onurzorluer/react-image-file-resizer