import { Icon, IconProps, IconSmall } from './icon/icon';

export function QuestionCircleIcon({ variant, ...props }: IconProps) {
  if (variant === 'small')
    return (
      <IconSmall {...props}>
        <path
          d="M8.36683 7.93325L8.16683 8.08325V8.33325V8.66659C8.16683 8.75863 8.09221 8.83325 8.00016 8.83325C7.90812 8.83325 7.8335 8.75863 7.8335 8.66659V8.33325C7.8335 8.07095 7.95699 7.82396 8.16683 7.66659L8.96683 7.06659L9.16683 6.91659V6.66659V5.99992V5.49992H8.66683H7.3335H6.8335V5.99992V6.66659C6.8335 6.75863 6.75888 6.83325 6.66683 6.83325C6.57478 6.83325 6.50016 6.75863 6.50016 6.66659V5.99992C6.50016 5.53968 6.87326 5.16659 7.3335 5.16659H8.66683C9.12707 5.16659 9.50016 5.53968 9.50016 5.99992V6.66659C9.50016 6.92888 9.37667 7.17587 9.16683 7.33325L8.36683 7.93325ZM8.00016 2.16659C4.7785 2.16659 2.16683 4.77826 2.16683 7.99992C2.16683 11.2216 4.7785 13.8333 8.00016 13.8333C11.2218 13.8333 13.8335 11.2216 13.8335 7.99992C13.8335 4.77826 11.2218 2.16659 8.00016 2.16659ZM1.8335 7.99992C1.8335 4.59416 4.59441 1.83325 8.00016 1.83325C11.4059 1.83325 14.1668 4.59416 14.1668 7.99992C14.1668 11.4057 11.4059 14.1666 8.00016 14.1666C4.59441 14.1666 1.8335 11.4057 1.8335 7.99992ZM8.16683 10.6666C8.16683 10.7586 8.09221 10.8333 8.00016 10.8333C7.90812 10.8333 7.8335 10.7586 7.8335 10.6666C7.8335 10.5745 7.90812 10.4999 8.00016 10.4999C8.09221 10.4999 8.16683 10.5745 8.16683 10.6666Z"
          fill="currentColor"
          stroke="currentColor"
        />
      </IconSmall>
    );

  return (
    <Icon {...props}>
      <path
        d="M12.7 12.1L12.5 12.25V12.5V13C12.5 13.2761 12.2761 13.5 12 13.5C11.7239 13.5 11.5 13.2761 11.5 13V12.5C11.5 12.0279 11.7223 11.5833 12.1 11.3L13.3 10.4L13.5 10.25V10V9V8.5H13H11H10.5V9V10C10.5 10.2761 10.2761 10.5 10 10.5C9.72386 10.5 9.5 10.2761 9.5 10V9C9.5 8.17157 10.1716 7.5 11 7.5H13C13.8284 7.5 14.5 8.17157 14.5 9V10C14.5 10.4721 14.2777 10.9167 13.9 11.2L12.7 12.1ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM2.5 12C2.5 6.7533 6.7533 2.5 12 2.5C17.2467 2.5 21.5 6.7533 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.7533 21.5 2.5 17.2467 2.5 12ZM12.5 16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16C11.5 15.7239 11.7239 15.5 12 15.5C12.2761 15.5 12.5 15.7239 12.5 16Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </Icon>
  );
}
