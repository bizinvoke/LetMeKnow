// import type { ResponseModel } from '@/types/shared';
// import fetcher from '@/util/request';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';

export type UploadFilePathModel = {
  createDate: dayjs.Dayjs;
  base64: string;
  file: File;
  id: string;
};

type Props = {
  onChange: (files: UploadFilePathModel[]) => void;
  // onSuccess: (files: UploadFilePathModel[]) => void;
  onFinally?: () => void;
  isCompress?: boolean;
  isOpen?: boolean;
  multiple?: boolean;
};

export default function ImageUploadInput({
  isOpen,
  multiple,
  onChange,
  isCompress,
  // onSuccess,
  onFinally,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpdateImage = () => {
    if (fileInputRef) fileInputRef.current?.click();
  };

  useEffect(() => {
    if (isOpen) {
      handleUpdateImage();
      if (onFinally !== undefined) {
        onFinally();
      }
    }
  }, [isOpen, onFinally]);

  // const requestUpload = (file: File, createDate: dayjs.Dayjs) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   fetcher({
  //     uri: `/common/file/upload?biz_code=${type}`,
  //     headers: {
  //       Accept: '*/*',
  //     },
  //     method: 'PUT',
  //     parameters: formData,
  //   }).then((res: ResponseModel<PureValue>) => {
  //     if (res.code === 1000) {
  //       onSuccess([
  //         {
  //           createDate,
  //           path: res.data.filePath,
  //           url: res.data.fileUrl,
  //         },
  //       ]);
  //     }
  //   });
  // };

  function compressImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const maxSize = 1024; // 你想要的最大文件大小，单位为KB
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

          const maxWidth = 800; // 你想要的最大宽度
          const maxHeight = 600; // 你想要的最大高度

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob as Blob], file.name, {
                type: file.type,
              });
              resolve(compressedFile);
            },
            file.type,
            0.7,
          ); // 0.7 是压缩质量，可以调整
        };

        img.onerror = reject;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = reject;

      if (isCompress === true) {
        compressImage(file)
          .then((compressedFile) => reader.readAsDataURL(compressedFile))
          .catch(reject);
      } else reader.readAsDataURL(file);
    });
  }

  async function convertFilesToBase64(
    files: File[],
  ): Promise<UploadFilePathModel[]> {
    const base64Strings: UploadFilePathModel[] = [];

    for (const file of files) {
      const base64String = await readFileAsBase64(file);
      base64Strings.push({
        base64: base64String,
        file,
        createDate: dayjs(),
        id: base64String.slice(-10),
      });
    }

    return base64Strings;
  }

  const handleSendMediaMessage = async (files: FileList) => {
    const fileArray = Array.from(files);

    onChange(await convertFilesToBase64(fileArray));
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple ?? true}
        hidden
        onChange={() => {
          if (
            fileInputRef.current?.files &&
            fileInputRef.current?.files.length > 0
          ) {
            handleSendMediaMessage(fileInputRef.current?.files);
          }
        }}
      />
    </>
  );
}
