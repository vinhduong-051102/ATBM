import { powerModulo } from '@/utils/commonFunction';
import { Button, Divider, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks';
import * as actions from '@/containers/Home/actions';

const CreateKey = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [beta, setBeta] = useState(0);
  const [p, setP] = useState<number | string>('');
  const [alpha, setAlpha] = useState<number | string>('');
  const [a, setA] = useState<number | string>('');
  const [isNotValid, setIsNotValid] = useState(true);
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const beta = powerModulo(+alpha, +a, +p);
      setIsCreated(true);
      setBeta(beta);
      dispatch(
        actions.getPublicKey({
          p: +p,
          alpha: +alpha,
          beta,
        }),
      );
      dispatch(actions.getPrivateKey(+a));
    });
  };

  const isPrime = (n: number) => {
    if (n <= 1) {
      return false;
    }
    if (n === 2) {
      return true;
    }
    if (n % 2 === 0) {
      return false;
    }
    const sqrtN = Math.sqrt(n);
    for (let i = 3; i <= sqrtN; i += 2) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  };

  const randomRange = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const handleRandom = () => {
    function randomPrimeNumber() {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 1000000) + 1;
      } while (!isPrime(randomNumber));
      return randomNumber;
    }
    const randomP = randomPrimeNumber();
    const randomAlpha = randomRange(1, randomP - 1);
    const randomA = randomRange(2, randomP - 2);
    form.setFieldValue('p', randomP);
    form.setFieldValue('alpha', randomAlpha);
    form.setFieldValue('a', randomA);
    setP(randomP);
    setA(randomA);
    setAlpha(randomAlpha);
    setIsCreated(false);
    dispatch(actions.resetRedux());
  };

  useEffect(() => {
    if (p && a && alpha) {
      form
        .validateFields()
        .then(() => {
          setIsNotValid(false);
        })
        .catch(() => {
          setIsNotValid(true);
          setIsCreated(false);
        });
    }
  }, [alpha, a, p, form]);

  return (
    <div>
      <h1>Tạo khoá</h1>
      <Form form={form} layout="vertical">
        <Form.Item
          name="p"
          label="Số nguyên tố p"
          rules={[
            {
              required: true,
              message: 'Số nguyên tố p không được để trống',
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'Chỉ truyền số',
            },
            {
              validator: (_, value) => {
                if (!isPrime(+value)) {
                  return Promise.reject('Vui lòng truyền số nguyên tố');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input onChange={(e) => setP(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="alpha"
          label="Phần tử nguyên thuỷ"
          rules={[
            {
              required: true,
              message: 'Số alpha không được để trống',
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'Chỉ truyền số',
            },
            {
              validator: (_, value) => {
                if (value > +p - 1 && /^[1-9]\d*$/.test(value)) {
                  return Promise.reject(`Giá trị không vượt quá ${+p - 1}`);
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            disabled={!(!!p && !isNaN(+p) && isPrime(+p))}
            onChange={(e) => setAlpha(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="a"
          label="Số bí mật"
          rules={[
            {
              required: true,
              message: 'Số bí mật không được để trống',
            },
            {
              pattern: /^[1-9]\d*$/,
              message: 'Chỉ truyền số',
            },
            {
              validator: (_, value) => {
                if (value > +p - 2 && /^[1-9]\d*$/.test(value)) {
                  return Promise.reject(`Giá trị không vượt quá ${+p - 2}`);
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            disabled={!(!!p && !isNaN(+p) && isPrime(+p))}
            onChange={(e) => setA(e.target.value)}
          />
        </Form.Item>
      </Form>
      <Divider />
      <div style={{ marginBottom: 20 }}>
        <Button onClick={handleRandom} type="primary">
          Sinh ngẫu nhiên giá trị
        </Button>
      </div>

      <Button onClick={handleSubmit} type="primary" disabled={isNotValid}>
        Tạo khoá
      </Button>
      <br />
      <Divider />
      {isCreated && (
        <>
          <h3>Beta: {beta}</h3>
          <h3>Khoá công khai: {`{${p}, ${alpha}, ${beta}}`}</h3>
          <h3>Khoá bí mật: {`{${a}}`}</h3>
        </>
      )}
    </div>
  );
};

export default CreateKey;
