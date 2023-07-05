import { Button, Col, Upload, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectPublicKey } from '@/containers/Home/homeSlice';
import { convertNumberToBase64, powerModulo } from '@/utils/commonFunction';
import * as actions from '@/containers/Home/actions';
import { Title, TextAreaCustom } from './styles';
import React, { useEffect, useState } from 'react';

const EnCode = () => {
  const [x, setX] = useState('');
  const [cipherText, setCipherText] = useState('');
  const dispatch = useAppDispatch();
  const publicKey = useAppSelector(selectPublicKey);
  const { alpha, beta, p } = publicKey;

  const handleEnCode = (x: string) => {
    const k = 12; //
    const y1 = powerModulo(alpha, k, p);
    // Tách chuỗi x thành mảng string ("abc" => ["a", "b", "c"])
    const arrX = x.split('');
    const cipherArr: {
      y1: number;
      y2: number;
    }[] = [];
    arrX.forEach((item) => {
      // Chuyển từ string thành số
      const convert = item.charCodeAt(0);
      const y2 = (convert * powerModulo(beta, k, p)) % p;
      cipherArr.push({
        y1,
        y2,
      });
    });
    // Chuỗi bản mã
    let res = '';
    // Lặp qua từ cặp (y1, y2) để chuyển về dạng base64
    cipherArr.forEach((item) => {
      const y1Base64 = convertNumberToBase64(item.y1 % p);
      const y2Base64 = convertNumberToBase64(item.y2 % p);
      res += y1Base64;
      res += y2Base64;
    });
    setCipherText(res);
    dispatch(actions.getCipherArr(cipherArr));
  };
  useEffect(() => {
    setCipherText('');
  }, [x]);
  return (
    <div>
      <h1>Mã hoá</h1>
      <Row>
        <Col span={24}>
          <Title>Thông điệp</Title>
          <TextAreaCustom
            allowClear
            onChange={(e) => {
              setX(e.target.value);
              dispatch(actions.getCipherText(''));
            }}
            disabled={!(alpha && beta && p)}
            value={x}
            autoSize
          />
          <Button
            style={{ marginTop: 20, marginRight: 20 }}
            type="primary"
            onClick={() => handleEnCode(x)}
            disabled={!(alpha && beta && p && x)}
          >
            Mã hoá
          </Button>
          <Upload
            disabled={!(alpha && beta && p)}
            maxCount={1}
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                // @ts-ignore
                setX(e.target.result);
              };
              // @ts-ignore
              reader.readAsText(e.file.originFileObj);
            }}
          >
            <Button disabled={!(alpha && beta && p)} icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </Col>
        <Col span={24}>
          <Title>Bản mã</Title>
          <TextAreaCustom value={cipherText} disabled autoSize />
          <Button
            style={{ marginTop: 20 }}
            type="primary"
            onClick={() => {
              dispatch(actions.getCipherText(cipherText));
            }}
            disabled={!cipherText}
          >
            Chuyển
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default EnCode;
