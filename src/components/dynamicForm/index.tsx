import React from 'react';
import {
  FormItems,
  FormSettings,
  StringKeyMap,
  FormItemsValue,
} from '@/typings/transForm2Text';
import {
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  Cascader,
  Button,
  message,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { showMessage } from '@/utils/notificationHelper';

type AntdFormItemProps = {
  formItem: FormItems;
  dateTimeFormat: string;
  itemOnChange: (
    formItem: FormItems,
    value: string | number | undefined | boolean | any[],
  ) => void;
  [key: string]: any;
};

const FormItemContent = ({
  formItem,
  itemOnChange,
  value,
  onChange,
  dateTimeFormat,
  ...rest
}: AntdFormItemProps & { value?: any; onChange?: (value: any) => void }) => {
  const { type, placeholder, options, cascaderOptions, tips } = formItem;
  return (
    <div {...rest}>
      {tips&&<p className='text-slate-500 mb-2'>{tips}</p>}
      {type === 'text' && (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      {type === 'textarea' && (
        <Input.TextArea
          placeholder={placeholder}
          rows={4}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}
      {type === 'select' && (
        <Select
          placeholder={placeholder}
          className="w-96"
          value={value}
          onChange={onChange}
        >
          {options?.map((option) => (
            <Select.Option value={option.value} key={option.value + ''}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      )}
      {type === 'datetime' && (
        <DatePicker
          className="w-full"
          showTime
          placeholder={placeholder}
          format={dateTimeFormat}
          value={value ? dayjs(value) : undefined}
          onChange={(date: Dayjs, dateString: string | string[]) => {
            itemOnChange(formItem, dateString);
            onChange?.(dateString);
          }}
        />
      )}
      {type === 'radio' && (
        <Radio.Group
          value={value}
          onChange={(e) => {
            itemOnChange(formItem, e.target.value);
            onChange?.(e.target.value);
          }}
        >
          {options?.map((option) => (
            <Radio value={option.value} key={option.value + ''}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      )}
      {type === 'cascader' && (
        <Cascader
          placeholder={placeholder}
          options={cascaderOptions}
          value={value}
          onChange={(value: string[], options: any[]) => {
            itemOnChange(formItem, value);
            onChange?.(value);
          }}
        />
      )}
    </div>
  );
};

const AntdFormItem = ({
  formItem,
  itemOnChange,
  dateTimeFormat,
}: AntdFormItemProps) => {
  const { key, label, isList, atLast, required } = formItem;

  if (isList) {
    return (
      <Form.Item label={label} required={required} name={key}>
        <Form.List
          name={key}
          rules={[
            {
              validator: async (_, values) => {
                if (atLast && (!values || values?.length < atLast)) {
                  return Promise.reject(new Error(`At least ${atLast} items`));
                }
                if (required && (!values || values?.length < 1)) {
                  return Promise.reject(new Error(`Please add field`));
                }
                return;
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item required={required} key={field.key}>
                  <Form.Item
                    style={{ display: 'flex' }}
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: required,
                        whitespace: true,
                        message: 'Please input or delete this field.',
                      },
                    ]}
                    noStyle
                  >
                    <div className="flex items-center">
                      <FormItemContent
                        className="w-3/5"
                        formItem={formItem}
                        itemOnChange={itemOnChange}
                        dateTimeFormat={dateTimeFormat}
                      />
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button ml-5"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </div>
                  </Form.Item>
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  className="w-3/5"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                {/* <Button
                  type="dashed"
                  className="w-3/5 mt-3"
                  onClick={() => {
                    add('The head item', 0);
                  }}
                  icon={<PlusOutlined />}
                >
                  Add field at head
                </Button> */}
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
    );
  }

  return (
    <Form.Item
      label={label}
      name={key}
      rules={[
        {
          required: required,
          whitespace: true,
          message: 'Please input',
          validator: (rule: any, value: any) => {
            if (
              required &&
              (value === null || value === '' || value === undefined)
            ) {
              return Promise.reject(new Error('Please input'));
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <FormItemContent
        formItem={formItem}
        itemOnChange={itemOnChange}
        dateTimeFormat={dateTimeFormat}
      />
    </Form.Item>
  );
};

interface DynamicFormProps {
  formItems: FormItems[];
  formFinish: (val: StringKeyMap<FormItems>) => void;
  formCancel: () => void;
  formSettings: FormSettings;
}
const DynamicForm: React.FC<DynamicFormProps> = ({
  formItems,
  formFinish,
  formCancel,
  formSettings,
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const initialValue: StringKeyMap<FormItemsValue> = formItems.reduce(
    (acc: StringKeyMap<FormItemsValue>, formItem: FormItems) => {
      if (formItem.hasOwnProperty('defaultValueGenerator')) {
        acc[formItem.key] = formItem.defaultValueGenerator?.() || undefined;
      } else if (formItem.hasOwnProperty('defaultValue')) {
        let value = formItem.defaultValue as FormItemsValue;

        switch (formItem.type) {
          case 'cascader':
            const cascaderVal = value as string | undefined;
            value = cascaderVal ? cascaderVal.split('-') : [];
            break;
          case 'datetime':
            const datetimeVal = value as string | undefined;
            value =
              (datetimeVal && dayjs(datetimeVal, 'YYYY-MM-DD HH:mm:ss')) ||
              undefined;
            break;
        }

        acc[formItem.key] = value;
      }
      return acc;
    },
    {},
  );

  const onFormChange = (changedValues: any, allValues: any) => {
    // console.log('onFormChange ---- ', changedValues, allValues);
  };

  const onCancel = () => {
    formCancel();
  };

  const onFinish = (values: any) => {
    formFinish(values);
  };

  const onFinishFailed = (values: any) => {
    showMessage({
      type: 'warning',
      title: 'Please fill out all required fields.',
      duration: 3,
    });
  };

  const itemOnChange = (formItem: FormItems, value: FormItemsValue) => {};

  return (
    <Form
      layout="vertical"
      form={form}
      onValuesChange={onFormChange}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValue}
    >
      {contextHolder}
      <div className="border-b border-gray-900/10 pb-10">
        {formItems.map((formItem: FormItems) => (
          <AntdFormItem
            key={formItem.key}
            formItem={formItem}
            itemOnChange={itemOnChange}
            dateTimeFormat={formSettings.datetimeFormat}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold text-indigo-500"
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </button>
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Confirm
        </button>
      </div>
    </Form>
  );
};

export default DynamicForm;
