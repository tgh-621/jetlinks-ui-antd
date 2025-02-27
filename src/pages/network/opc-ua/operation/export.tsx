import React, { useEffect, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import Form from 'antd/es/form';
import { Modal, Radio, Select } from 'antd';
import apis from '@/services';
import { DeviceProduct } from '@/pages/device/product/data';
import { getAccessToken } from '@/utils/authority';
import encodeQueryParam from '@/utils/encodeParam';

interface Props extends FormComponentProps {
  close: Function;
  searchParam: any;
}

interface State {
  productList: DeviceProduct[];
  product: string;
  fileType: string;
}

const Export: React.FC<Props> = props => {
  const initState: State = {
    productList: [],
    product: '',
    fileType: 'xlsx',
  };
  const [productList, setProductList] = useState(initState.productList);
  const [product, setProduct] = useState(initState.product);
  const [fileType, setFileType] = useState(initState.fileType);

  useEffect(() => {
    // 获取下拉框数据
    apis.deviceProdcut
      .queryNoPagin(encodeQueryParam({
        paging: false,
        terms: {
          messageProtocol: 'opc-ua'
        }
      }))
      .then(response => {
        setProductList(response.result);
      })
      .catch(() => {
      });
  }, []);


  const downloadTemplate = () => {
    const formElement = document.createElement('form');
    formElement.style.display = 'display:none;';
    formElement.method = 'get';
    if (product) {
      formElement.action = `/jetlinks/opc/device-bind/product/${product}/template.${fileType}`;
    } else {
      formElement.action = `/jetlinks/opc/device-bind/template.${fileType}`;
    }
    delete props.searchParam.pageSize;
    delete props.searchParam.pageIndex;
    const params = encodeQueryParam(props.searchParam);
    Object.keys(params).forEach((key: string) => {
      const inputElement = document.createElement('input');
      inputElement.type = 'hidden';
      inputElement.name = key;
      inputElement.value = params[key];
      formElement.appendChild(inputElement);
    });
    const inputElement = document.createElement('input');
    inputElement.type = 'hidden';
    inputElement.name = ':X_Access_Token';
    inputElement.value = getAccessToken();
    formElement.appendChild(inputElement);

    document.body.appendChild(formElement);
    formElement.submit();
    document.body.removeChild(formElement);
  };

  return (
    <Modal
      title='批量导出设备'
      visible
      okText="确定"
      cancelText="取消"
      onOk={() => {
        downloadTemplate();
      }}
      onCancel={() => {
        props.close();
      }}
    >
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item key="productId" label="产品">
          <Select placeholder="请选择产品"
                  onChange={(event: string) => {
                    setProduct(event);
                  }}>
            {(productList || []).map(item => (
              <Select.Option
                key={JSON.stringify({ productId: item.id, productName: item.name })}
                value={item.id}
              >
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {product && (
          <div>
            <Form.Item label="文件格式">
              <Radio.Group onChange={e => {
                setFileType(e.target.value);
              }} defaultValue="xlsx">
                <Radio.Button value="xlsx">xlsx</Radio.Button>
                <Radio.Button value="csv">csv</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(Export);
