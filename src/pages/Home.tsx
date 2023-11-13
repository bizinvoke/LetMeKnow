import ImageUploadInput from '@/components/common/upload';
import { useFirebase } from '@/hook/controller/common/useFirebase';
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
import { Fragment, useEffect, useState } from 'react';

const { Text } = Typography;
function Home() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTitle, setIsOpenTitle] = useState(false);
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [hasAttached, setHasAttached] = useState(false);
  const [isOpenAttached, setIsOpenAttached] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [isRotateRender, setIsRotateRender] = useState(false);
  const [language, setLanguage] = useState(1);
  const [type, setType] = useState(1);
  const [subject, setSubject] = useState(1);
  const [content, setContent] = useState('');
  const [key, setKey] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [titleImages, setTitleImages] = useState<string[]>([]);
  const [questionImages, setQuestionImages] = useState<string[]>([]);
  const [attachedImages, setAttachedImages] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setIsRotateRender(isRotate);
      setLoading(false);
    }, 400);
  }, [isRotate]);

  const { uploadString, storageReference } = useFirebase();

  const handleSubmit = () => {
    setLoading(true);
    const messages: any[] = [];
    messages.push({
      role: 'system',
      content: `请按照下面的约束条件，对上传的内容进行理解并给出解读和答案。图片中的文本语言为「英语」,图片中的文本为从左到右、从上到下的格式排列,如果遇到技术问题无法打开某张图片或者无法从某张图片中提取文本内容时，请忽略该图片。用英语给出问题的答案，请用中文对每一题的答案进行详细解释并写在答案后边用『』包起来,解读和解答的过程中，可对原文本进行复述,如果问题是填空题，请用英语给出填空题的答案
        `,
    });
    images.forEach((i) => {
      messages.push({
        role: 'user',
        content: [
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
        setIsRotate(true);
        console.log(data);

        if (data?.choices[0]?.message?.content) {
          setContent(data?.choices[0]?.message?.content);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
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
        <Select
          onChange={setSubject}
          value={subject}
          defaultValue={1}
          options={subjectOptions}
        />
      </Form.Item>
      <Divider />
      <Form.Item name="language" label="输出">
        <Select
          onChange={setLanguage}
          value={language}
          defaultValue={1}
          options={languageOptions}
        ></Select>
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
          {isRotateRender ? (
            <div
              className="h-full w-full  whitespace-pre-wrap rounded border bg-slate-100 p-2"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="h-full w-full overflow-auto whitespace-pre-wrap rounded  p-2">
                {content}
              </div>
            </div>
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
                    精准模式:
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
      <div className="flex w-full gap-2 px-2 pb-2">
        {content && (
          <Button onClick={() => setIsRotate((old) => !old)} disabled={loading}>
            Toggle
          </Button>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full"
          type="primary"
          loading={loading}
          disabled={!key}
        >
          {content ? 'Continue to the next' : 'Submit'}
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
        onChange={(files) => {
          console.log(files[0]);

          uploadString(storageReference('test123'), files[0], 'base64').then(
            (snapshot) => {
              console.log('Uploaded a base64 string!', snapshot);
            },
          );
        }}
        // onChange={(files) => setAttachedImages((old) => [...old, ...files])}
        onFinally={() => setIsOpenAttached(false)}
        multiple={false}
      />
    </div>
  );
}

export default Home;
