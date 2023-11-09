import {
  CameraFilled,
  MenuOutlined,
  RadiusSettingOutlined,
} from '@ant-design/icons';
import { Button, Divider, Drawer, Form, Image, Select } from 'antd';
import { useState } from 'react';
const { Option } = Select;
function Home() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(1);
  const [type, setType] = useState(1);

  const handleSubmit = () => {
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-1106',
        messages: [
          {
            role: 'user',
            content: ['批改作业'],
          },
        ],
        temperature: 0,
        max_tokens: 256,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.choices[0].text);
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

  const imageBox = (
    <div className="h-24 w-24 rounded-md border p-2">
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
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
        <div className="h-full w-full rounded bg-white shadow-md">
          <div className="flex h-full w-full flex-col items-center">
            {/* <div className="h-8 w-full bg-indigo-100">

            </div> */}
            <CameraFilled
              style={{
                fontSize: '16rem',
                color: 'var(--primary-color)',
                marginTop: '4rem',
              }}
            />
            <div
              className="flex flex-wrap gap-2 p-2"
              style={{ minHeight: '6rem', marginTop: '6rem' }}
            >
              <Divider />
              {imageBox}
              {imageBox}
              {imageBox}
              {imageBox}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-2 pb-2">
        <Button onClick={handleSubmit} className="w-full" type="primary">
          Submit
        </Button>
      </div>
      {optionDrawer}
    </div>
  );
}

export default Home;
