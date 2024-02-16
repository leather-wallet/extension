import { Icon, IconProps, IconSmall } from './icon/icon';

export function KeyIcon({ variant, ...props }: IconProps) {
  if (variant === 'small')
    return (
      <IconSmall {...props}>
        <path
          d="M1.1665 8C1.1665 9.933 2.73351 11.5 4.6665 11.5C5.72692 11.5 6.67718 11.0284 7.31903 10.2835C7.54559 10.0206 7.85988 9.83333 8.20696 9.83333H9.04637C9.23379 9.83333 9.41744 9.78066 9.57637 9.68133L10.1365 9.33125C10.4608 9.12858 10.8722 9.12858 11.1965 9.33125L11.7566 9.68133C11.9156 9.78066 12.0992 9.83333 12.2866 9.83333H13.1926C13.4926 9.83333 13.7767 9.69871 13.9666 9.46657L14.6484 8.63324C14.9498 8.26487 14.9498 7.73513 14.6484 7.36676L13.9666 6.53343C13.7767 6.30129 13.4926 6.16667 13.1926 6.16667H8.20696C7.85988 6.16667 7.54559 5.97939 7.31903 5.71646C6.67718 4.97158 5.72692 4.5 4.6665 4.5C2.73351 4.5 1.1665 6.067 1.1665 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M5.1665 8C5.1665 8.27614 4.94265 8.5 4.6665 8.5C4.39036 8.5 4.1665 8.27614 4.1665 8C4.1665 7.72386 4.39036 7.5 4.6665 7.5C4.94265 7.5 5.1665 7.72386 5.1665 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </IconSmall>
    );

  return (
    <Icon {...props}>
      <circle cx="7" cy="12" r="1.5" fill="currentColor" />
      <path
        d="M2 12C2 14.7614 4.23858 17 7 17C8.64408 17 10.1028 16.2065 11.0141 14.9816C11.2272 14.6952 11.5509 14.5 11.9079 14.5H14L16 13.5L18 14.5H20.0194C20.3232 14.5 20.6105 14.3619 20.8002 14.1247L22.0002 12.6247C22.2924 12.2595 22.2924 11.7405 22.0002 11.3753L20.8002 9.8753C20.6105 9.63809 20.3232 9.5 20.0194 9.5H11.9079C11.5509 9.5 11.2272 9.30482 11.0141 9.01843C10.1028 7.79351 8.64408 7 7 7C4.23858 7 2 9.23858 2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
