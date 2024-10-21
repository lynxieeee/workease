// notificationHelper.tsx
import { message } from 'antd';
import { ReactNode, CSSProperties } from 'react';

let msgInstance: any = null;

export type MessageType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface ShowMessageProps {
  type: MessageType;
  content?: ReactNode;
  title?: string;
  desc?: ReactNode;
  actions?: {
    text: string;
    callback: () => void;
  }[];
  duration?: number;
  onClose?: () => void;
  style?: CSSProperties;
  className?: string;
}

export const initMessage = (): ReactNode => {
  const [messageApi, contextHolder] = message.useMessage();
  msgInstance = messageApi;
  return contextHolder;
};

export const showMessage = ({
  type = 'info',
  content,
  title,
  desc,
  actions,
  duration = 3,
  onClose,
  style = {},
  className = '',
}: ShowMessageProps): void => {
  if (!msgInstance) {
    console.error('Message API has not been initialized.');
    return;
  }

  const customStyles: CSSProperties = {
    ...style,
    fontSize: '16px', // You can add default styles if needed
  };

  const customClassName = `workease-alerts alerts-${type} ${className}`;

  msgInstance[type]({
    content: content || (
      <div className="alerts-content">
        <h3 className="title">{title}</h3>
        {desc && <div className="desc">{desc}</div>}
        {actions && (
          <div className="action-wrapper">
            {actions.map((action) => (
              <button>{action.text}</button>
            ))}
          </div>
        )}
      </div>
    ),
    duration,
    onClose,
    style: customStyles,
    className: customClassName,
  });
};
