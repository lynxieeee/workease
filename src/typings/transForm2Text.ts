import type { Dayjs } from 'dayjs';

export type FormItemTypes =
  | 'text'
  | 'select'
  | 'datetime'
  | 'textarea'
  | 'cascader'
  | 'radio';

export interface SelectOption {
  label: string | number | boolean;
  value: string | number | boolean;
}

export interface CascaderOptions {
  value: string;
  label: string;
  children?: CascaderOptions[];
}

export interface StringKeyMap<T> {
  [key: string]: T;
}

export type Value = string | number | boolean | any[] | Dayjs;

export type FormItemsValue = Value | undefined;

export interface FormItems {
  key: string;
  label: string;
  type: FormItemTypes;
  isList?: boolean;
  atLast?: number;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  cascaderOptions?: CascaderOptions[];
  defaultValue?: FormItemsValue;
  defaultValueGenerator?: (() => Value) ;
  outputLabelSuffix?: string
  tips?: string
}

export interface FormSettings {
  listNo: 'auto' | 'must',
  cascaderSeparator: string,
  datetimeFormat: string
}

export interface PageConfigType {
  page: string;
  title: string;
  desc: string;
  imageUrl?: string;
  formSettings?: FormSettings;
  formItems: FormItems[];
  bottomTips?: string;
}
