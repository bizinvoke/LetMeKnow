import ImageUploadInput from '@/components/common/upload';
import {
  CameraFilled,
  MenuOutlined,
  RadiusSettingOutlined,
} from '@ant-design/icons';
import { Button, Divider, Drawer, Form, Image, Select } from 'antd';
import { Fragment, useState } from 'react';
const { Option } = Select;
function Home() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [language, setLanguage] = useState(1);
  const [type, setType] = useState(1);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = () => {
    const messages = [];
    images.forEach((i) => {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: 'What’s in this image?' },
          {
            type: 'image_url',
            image_url: {
              url: i,
            },
          },
        ],
      });
    });
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages,
        temperature: 0,
        max_tokens: 256,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsRotate((old) => !old);
        console.log(data);

        if (data?.choices[0]?.message?.content) {
          setContent(data?.choices[0]?.message?.content);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const optionDrawer = (
    <Drawer
      title="Options"
      placement="left"
      width="80vw"
      onClose={() => setOpen(false)}
      open={open}
    >
      <Form.Item name="type" label="模式">
        <Select onChange={setType} value={type} defaultValue={1}>
          <Option value={1}>简单</Option>
          <Option value={2}>复杂</Option>
        </Select>
      </Form.Item>
      <Divider />
      <Form.Item name="language" label="语言">
        <Select onChange={setLanguage} value={language} defaultValue={1}>
          <Option value={1}>日语</Option>
          <Option value={2}>英语</Option>
          <Option value={3}>汉语</Option>
        </Select>
      </Form.Item>
      <Divider />
    </Drawer>
  );

  const imageBox = (src: string) => (
    <div className="h-24 w-24 rounded-md border p-2">
      <Image src={src} />
    </div>
  );

  return (
    <div id="home" className="flex h-full w-full flex-col bg-slate-50">
      <div className="flex h-16 items-center justify-between bg-white p-4 shadow-sm">
        <MenuOutlined
          onClick={() => {
            setOpen(true);
          }}
        />
        <RadiusSettingOutlined />
      </div>
      <div className="w-full flex-1 overflow-hidden p-2">
        <div
          className="h-full w-full rounded bg-white shadow-md"
          style={{
            transition: 'transform 1s',
            transform: isRotate ? 'rotateY(180deg)' : undefined,
          }}
        >
          {isRotate ? (
            <div
              className="h-full w-full rounded border bg-slate-100 p-2"
              style={{ transform: 'rotateY(180deg)' }}
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          ) : (
            <div className="flex h-full w-full flex-col items-center">
              {/* <div className="h-8 w-full bg-indigo-100">

            </div> */}
              <CameraFilled
                style={{
                  fontSize: '16rem',
                  color: 'var(--primary-color)',
                  marginTop: '4rem',
                }}
                onClick={() => setIsOpen(true)}
              />
              <div
                className="flex flex-wrap gap-2 p-2"
                style={{ minHeight: '6rem', marginTop: '6rem' }}
              >
                <Divider />
                {images.map((i) => (
                  <Fragment key={i.slice(10)}>{imageBox(i)}</Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full px-2 pb-2">
        <Button onClick={handleSubmit} className="w-full" type="primary">
          Submit
        </Button>
      </div>
      {optionDrawer}
      <ImageUploadInput
        isOpen={isOpen}
        onChange={setImages}
        onFinally={() => setIsOpen(false)}
        isCompress
      />
    </div>
  );
}

export default Home;
