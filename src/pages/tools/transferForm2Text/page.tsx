import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormItems,
  PageConfigType,
  SelectOption,
  StringKeyMap,
  FormSettings,
} from '@/typings/transForm2Text';
import { message } from 'antd';
import DynamicForm from '../../../components/dynamicForm';
import { scrollToElement } from '@/utils/base';
import moment from 'moment'

interface TransferForm2TextProps {
  formConfig: PageConfigType;
  defaultFormSettings: FormSettings;
}

const TransferForm2Text: React.FC<TransferForm2TextProps> = ({
  formConfig,
  defaultFormSettings,
}) => {
  const navigate = useNavigate();
  const formSettings = formConfig.formSettings || defaultFormSettings;
  const [configMap] = useState<StringKeyMap<FormItems>>(
    formConfig.formItems.reduce((acc, item) => {
      acc[item.key] = item;
      return acc;
    }, {} as StringKeyMap<FormItems>),
  );

  const [textRes, setSextRes] = useState<string | undefined>(undefined);

  const formatText = (
    data: StringKeyMap<any>,
    config: StringKeyMap<FormItems>,
  ): string => {
    const getText = (
      type: string,
      value: any,
      options: SelectOption[] | undefined,
    ): string => {
      if (!value) return '';
      switch (type) {
        case 'cascader':
          return value.join(formSettings.cascaderSeparator);
        case 'datetime':
          return moment(value, 'YYYY-MM-DD HH:mm:ss').format(formSettings.datetimeFormat);
        case 'radio': {
          const option = options?.find((opt) => opt.value === value);
          return option ? option.label + '' : '';
        }
        default:
          return value;
      }
    };

    return Object.entries(config)
      .map(([key, { label, type, isList, options, outputLabelSuffix = '' }]) => {
        const value = data[key];
        if (isList && Array.isArray(value)) {
          if(!value.length){
            return ''
          }
          if (value.length > 1 || formSettings.listNo == 'must') {
            const content = value
              .map(
                (item, index) => `${index + 1}.${getText(type, item, options)}`,
              )
              .join('\n');
            return `${label}${outputLabelSuffix}：\n${content}`;
          } else {
            return `${label}${outputLabelSuffix}：${value[0]}`;
          }
        }
        return `${label}${outputLabelSuffix}：${getText(type, value, options)}`;
      })
      .join('\n');
  };

  const onFinish = (values: any) => {
    const res = formatText(values, configMap);
    setSextRes(res);
    copyToClipboard(res);
    setTimeout(() => {
      scrollToElement('text-result');
    }, 300);
  };

  const onCancel = () => {
    navigate('/tools/transfer-form-to-text');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success('Copied!');
      },
      (err) => {
        message.error('Failed to copy!');
      },
    );
  };

  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-2 text-sm leading-6 font-semibold">
        <Link
          to="/tools"
          className="text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400"
        >
          Tools
        </Link>
        <span className="mx-1">/</span>
        <Link
          to="/tools/transfer-form-to-text"
          className="text-slate-500 hover:text-slate-600"
        >
          Transfer Form to Text
        </Link>
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
        {formConfig.title}
      </h1>
      <h2 className="mb-4 mt-4 max-w-4xl text-base leading-7 text-slate-700">
        {formConfig.desc}
      </h2>
      <div className="my-20">
        <DynamicForm
          formItems={formConfig.formItems}
          formFinish={onFinish}
          formCancel={onCancel}
          formSettings={formSettings}
        />
      </div>

      {textRes && (
        <div className="my-20" id="text-result">
          <h1 className="my-3 text-3xl font-extrabold tracking-tight text-slate-900">
            Copied to clipboard！
          </h1>

          <div className="rounded border border-gray-900/10 p-5 ">
            <pre>{textRes}</pre>
          </div>

          <h2 className="my-5 max-w-4xl text-base leading-7 text-slate-700">
            <pre>{formConfig.bottomTips}</pre>
          </h2>
        </div>
      )}
    </div>
  );
};

export default TransferForm2Text;
