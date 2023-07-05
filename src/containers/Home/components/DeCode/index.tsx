import { useAppSelector } from '@/hooks';
import * as selectors from '@/containers/Home/homeSlice';
import { egcd, powerModulo } from '@/utils/commonFunction';
import { Button, Col, Row } from 'antd';
import {
  TextAreaCustom,
  Title,
} from '@/containers/Home/components/EnCode/styles';
import { useEffect, useRef, useState } from 'react';

const DeCode = () => {
  const publicKey = useAppSelector(selectors.selectPublicKey);
  const privateKey = useAppSelector(selectors.selectPrivateKey);
  const cipherArr = useAppSelector(selectors.selectCipherArr);
  const cipherText = useAppSelector(selectors.selectCipherText);
  const { p, alpha, beta } = publicKey;
  const [msg, setMsg] = useState('');
  const aRef = useRef<HTMLAnchorElement>(null);
  const a = aRef.current;
  const handleDeCode = () => {
    let init = '';
    cipherArr.forEach((item) => {
      const res = (item.y2 * egcd(p, powerModulo(item.y1, privateKey, p))) % p;
      const convert = String.fromCharCode(res);
      init += convert;
      setMsg(init);
    });
  };

  const handleDownloadFile = () => {
    if (cipherText) {
      const fileContent = `
      Khoá công khai: {${p}, ${alpha}, ${beta}}
      Khoá bí mật: {${privateKey}}
      Bản mã: ${cipherText}
      Thông điệp: ${msg}
    `;

      // Tạo một đối tượng Blob từ nội dung tệp tin
      const blob = new Blob([fileContent], { type: 'text/plain' });

      // Tạo đường dẫn URL cho Blob
      const url = URL.createObjectURL(blob);
      if (a !== null) {
        a.href = url;
        a.download = 'file.txt';
      }
    }
  };

  useEffect(() => {
    setMsg('');
  }, [cipherText]);

  return (
    <div>
      <h1>Giải mã</h1>
      <Row>
        <Col span={24}>
          <Title>Bản mã</Title>
          <TextAreaCustom allowClear disabled value={cipherText} autoSize />
          <Button
            style={{ marginTop: 20 }}
            type="primary"
            onClick={handleDeCode}
            disabled={!cipherText}
          >
            Giải mã
          </Button>
        </Col>
        <Col span={24}>
          <Title>Thông điệp</Title>
          <TextAreaCustom value={msg} disabled autoSize />
          <Button
            style={{ marginTop: 20 }}
            type="primary"
            disabled={!cipherText}
          >
            <a onClick={handleDownloadFile} ref={aRef}>
              Lưu kết quả
            </a>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DeCode;
