import { PageConfigType, FormSettings } from '@/typings/transForm2Text';
import dayjs from 'dayjs';

export const DefaultFormSettings: FormSettings = {
  listNo: 'auto',
  cascaderSeparator: '-',
  datetimeFormat: 'YYYY-MM-DD HH:mm:ss',
};

export const PageConfig: PageConfigType[] = [
  {
    page: 'leave-request',
    title: 'Leave Application',
    desc: 'This is an example form to generate leave application email content.',
    imageUrl: '',
    formItems: [
      {
        key: 'leaveType',
        label: 'Leave Type',
        type: 'select',
        placeholder: 'Select leave type',
        required: true,
        options: [
          { label: 'Sick Leave', value: 'Sick Leave' },
          { label: 'Personal Leave', value: 'Personal Leave' },
        ],
      },
      {
        key: 'reason',
        label: 'Reason for Sick Leave',
        type: 'textarea',
        placeholder: 'Please provide the reason for sick leave',
      },
      {
        key: 'department',
        label: 'Department',
        type: 'cascader',
        cascaderOptions: [
          {
            label: 'Department 1',
            value: 'dep1',
            children: [
              { label: 'Business Group 1', value: 'group1' },
              { label: 'Business Group 2', value: 'group2' },
            ],
          },
          {
            label: 'Department 2',
            value: 'dep2',
            children: [
              { label: 'Business Group 1', value: 'group1' },
              { label: 'Business Group 2', value: 'group2' },
            ],
          },
        ],
        required: true,
        defaultValue: 'dep2-group1',
      },
      {
        key: 'starttime',
        label: 'Start Time',
        type: 'datetime',
        required: true,
        // defaultValue: '2024-10-18 09:00:00',
        defaultValueGenerator: () => {
          const todayAt = dayjs()
            .set('hour', 9)
            .set('minute', 0)
            .set('second', 0);
          return todayAt.format('YYYY-MM-DD HH:mm:ss');
        },
        tips: 'The start time of the leave',
      },
      {
        key: 'endtime',
        label: 'End Time',
        type: 'datetime',
        required: true,
        defaultValueGenerator: () => {
          const todayAt = dayjs()
            .set('hour', 18)
            .set('minute', 0)
            .set('second', 0);
          return todayAt.format('YYYY-MM-DD HH:mm:ss');
        },
        tips: 'The end time of the leave',
      },
      {
        key: 'hasWorkToDelegate',
        label: 'Is there work to delegate',
        type: 'radio',
        required: true,
        options: [
          { label: 'Yes', value: 'Yes' },
          { label: 'No', value: 'No' },
        ],
        defaultValue: 'No',
      },
      {
        key: 'delegatedTasks',
        label: 'Delegated Work Items',
        type: 'textarea',
        isList: true,
        outputLabelSuffix: 'Work Item',
      },
      {
        key: 'medicalCertificate',
        label: 'Medical Certificate',
        type: 'textarea',
        placeholder: 'Please attach the medical certificate from the hospital',
      },
    ],
    bottomTips:
      'Recipients:\nHR Team: lexiewen@example.com \n\nCC:\nBusiness Group XX: lexiewen@example.com \nDepartment XX: lexiewen@example.com',
  },
  {
    page: 'daily-standup',
    title: 'Daily Standup',
    desc: 'Daily standup, used to report work progress',
    imageUrl: '',
    formSettings: {
      ...DefaultFormSettings,
      listNo: 'must',
    },
    formItems: [
      {
        key: 'yesterday',
        label: "Yesterday's progress",
        type: 'textarea',
        isList: true,
        required: true,
      },
      {
        key: 'today',
        label: "Today's plan",
        type: 'textarea',
        isList: true,
        required: true,
      },
      {
        key: 'risk',
        label: 'Risk or issues',
        type: 'textarea',
      },
    ],
    bottomTips: 'Send to group chat before 10:00 AM every working day',
  },
];

export default PageConfig;
