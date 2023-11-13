import ImageUploadInput from '@/components/common/upload';
import {
  languageMap,
  languageOptions,
  subjectMap,
  subjectOptions,
} from '@/types/home/map';
import {
  CameraFilled,
  MenuOutlined,
  PlusOutlined,
  RadiusSettingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  Select,
  Switch,
  Typography,
} from 'antd';
import { Fragment, useState } from 'react';
const { Option } = Select;
const { Text } = Typography;
function Home() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTitle, setIsOpenTitle] = useState(false);
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [hasAttached, setHasAttached] = useState(false);
  const [isOpenAttached, setIsOpenAttached] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [language, setLanguage] = useState(1);
  const [type, setType] = useState(1);
  const [subject, setSubject] = useState(1);
  const [content, setContent] = useState('');
  const [key, setKey] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [titleImages, setTitleImages] = useState<string[]>([]);
  const [questionImages, setQuestionImages] = useState<string[]>([]);
  const [attachedImages, setAttachedImages] = useState<string[]>([]);

  const handleSubmit = () => {
    const messages: any[] = [];
    images.forEach((i) => {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: '识别图片中的题目，并批改作业，详细解释每道题目',
          },
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
        Authorization: `Bearer ${key}`,
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
      title={`Options(${__APP_VERSION__})`}
      placement="left"
      width="80vw"
      onClose={() => setOpen(false)}
      open={open}
    >
      <Form.Item name="key" label="密钥">
        <Input value={key} onChange={(e) => setKey(e.target.value)} />
      </Form.Item>
      <Divider />
      <Form.Item name="subject" label="科目">
        <Select onChange={setSubject} value={subject} defaultValue={1}>
          {subjectOptions.map((i) => (
            <Option value={i.value} key={i.value}>
              {i.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Divider />
      <Form.Item name="language" label="输出">
        <Select onChange={setLanguage} value={language} defaultValue={1}>
          {languageOptions.map((i) => (
            <Option value={i.value} key={i.value}>
              {i.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Divider />
    </Drawer>
  );

  const imageBox = (src: string) => (
    <div className="h-24 w-24 rounded-md border p-2">
      <Image
        src={src}
        width="100%"
        height="100%"
        style={{ objectFit: 'cover' }}
      />
    </div>
  );

  const uploadBox = (handleClick: () => void) => (
    <div
      className="anticon flex h-24 w-24 items-center justify-center rounded-md border-2 border-dashed p-2"
      onClick={handleClick}
    >
      <PlusOutlined />
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
              <div
                className={`flex h-8 w-full items-center justify-between rounded ${
                  type === 2 ? 'bg-indigo-100' : 'bg-gray-100'
                } px-4`}
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <Text type="secondary" strong>
                  科目:{subjectMap.get(subject)} | 输出:
                  {languageMap.get(language)}
                </Text>
                <div className="flex items-center">
                  <Text type="secondary" strong>
                    精准模式：
                  </Text>
                  <Switch
                    checked={type === 2}
                    onChange={(isCheck) => setType(isCheck ? 2 : 1)}
                  ></Switch>
                </div>
              </div>
              {type === 2 ? (
                <div className="h-full w-full p-2">
                  <div className=" w-full rounded bg-slate-50 p-2">
                    <div className="mb-2 flex items-center gap-1">
                      <div className=" h-4 w-2 bg-yellow-400" />
                      <Text strong style={{ marginRight: '8px' }}>
                        题目
                      </Text>
                      <Text type="secondary">附图</Text>
                      <Checkbox
                        checked={hasAttached}
                        onChange={(e) => setHasAttached(e.target.checked)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {titleImages.map((i) => (
                        <Fragment key={i.slice(10)}>{imageBox(i)}</Fragment>
                      ))}
                      {uploadBox(() => setIsOpenTitle(true))}
                    </div>
                  </div>
                  {hasAttached && (
                    <div className=" my-2 w-full rounded bg-slate-50 p-2">
                      <div className="mb-2 flex items-center gap-1">
                        <div className=" h-4 w-2 bg-blue-400" />
                        <Text strong>附图</Text>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {attachedImages.map((i) => (
                          <Fragment key={i.slice(10)}>{imageBox(i)}</Fragment>
                        ))}
                        {uploadBox(() => setIsOpenAttached(true))}
                      </div>
                    </div>
                  )}

                  <div className=" w-full rounded bg-slate-50 p-2">
                    <div className="mb-2 flex items-center gap-1">
                      <div className=" h-4 w-2 bg-green-400" />
                      <Text strong>问题</Text>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {questionImages.map((i) => (
                        <Fragment key={i.slice(10)}>{imageBox(i)}</Fragment>
                      ))}
                      {uploadBox(() => setIsOpenQuestion(true))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
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
        multiple={false}
      />
      <ImageUploadInput
        isOpen={isOpenQuestion}
        onChange={(files) => setQuestionImages((old) => [...old, ...files])}
        onFinally={() => setIsOpenQuestion(false)}
        multiple={false}
      />
      <ImageUploadInput
        isOpen={isOpenTitle}
        onChange={(files) => setTitleImages((old) => [...old, ...files])}
        onFinally={() => setIsOpenTitle(false)}
        multiple={false}
      />
      <ImageUploadInput
        isOpen={isOpenAttached}
        onChange={(files) => setAttachedImages((old) => [...old, ...files])}
        onFinally={() => setIsOpenAttached(false)}
        multiple={false}
      />
    </div>
  );
}

export default Home;
