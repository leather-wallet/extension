import { Square, SquareProps } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

import { Svg } from '../svg';

export function BitcoinContractIcon({ size = token('icons.icon.xl'), ...props }: SquareProps) {
  return (
    <Square size={size} {...props}>
      <Svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_7_6)">
          <path
            d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
            fill="url(#paint0_radial_7_6)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.5527 10.9136C14.5527 9.77371 14.8658 8.93453 15.373 8.38673C15.8725 7.84728 16.6434 7.5 17.7519 7.5C18.861 7.5 19.6308 7.84662 20.129 8.38479C20.635 8.93138 20.9474 9.76945 20.9474 10.91V13.114H14.5527V10.9136ZM13.0527 13.114V10.9136C13.0527 9.50789 13.4413 8.26526 14.2723 7.36767C15.1111 6.46172 16.3148 6 17.7519 6C19.1886 6 20.3916 6.46045 21.2297 7.3658C22.06 8.26274 22.4474 9.50467 22.4474 10.91V13.114H24.4071C25.127 13.114 25.7105 13.6976 25.7105 14.4174V16.4298H24.2105V14.614H11.5V23.3772H17.8553L17.4307 24.9307L11.3034 24.8772C10.5836 24.8772 10 24.2936 10 23.5737V14.4174C10 13.6976 10.5836 13.114 11.3034 13.114H13.0527Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.3811 19.1028C24.703 19.2333 25.7395 19.6373 25.8544 20.8407C25.9324 21.7181 25.5625 22.2401 24.9509 22.5343C25.9384 22.7807 26.539 23.3602 26.4149 24.6457C26.2638 26.2569 25.0584 26.6753 23.3351 26.7636L23.3379 28.427L22.3229 28.4284L22.3202 26.7649C22.2093 26.7633 22.0934 26.765 21.9745 26.7667H21.9744C21.8155 26.769 21.6512 26.7713 21.4866 26.766L21.4893 28.4294L20.4763 28.4307L20.4736 26.7673L18.4439 26.7272L18.615 25.5115C18.615 25.5115 19.3815 25.5284 19.3673 25.5196C19.6495 25.5181 19.7333 25.318 19.7541 25.1866L19.7491 22.5201L19.7571 20.6223C19.7259 20.4245 19.5913 20.1871 19.1764 20.1799C19.199 20.1597 18.4333 20.1809 18.4333 20.1809L18.4307 19.0664L20.5106 19.0638L20.508 17.4344L21.5558 17.4331L21.5584 19.0624C21.7607 19.0568 21.9602 19.0584 22.162 19.06C22.2283 19.0606 22.2947 19.0611 22.3616 19.0614L22.359 17.432L23.3784 17.4307L23.3811 19.1028ZM21.5707 22.2764L21.615 22.2784C22.1453 22.3015 23.7176 22.37 23.72 21.4167C23.7176 20.5117 22.3794 20.5409 21.7577 20.5545C21.6842 20.5561 21.6208 20.5574 21.5707 20.557V22.2764ZM21.6451 25.0843C21.6173 25.0832 21.5916 25.0821 21.5683 25.0812L21.5683 23.3618C21.6237 23.3623 21.6934 23.3615 21.7739 23.3605C22.5087 23.3513 24.15 23.3309 24.1422 24.2433C24.1505 25.1871 22.2979 25.1111 21.6451 25.0843Z"
            fill="white"
          />
        </g>
        <defs>
          <radialGradient
            id="paint0_radial_7_6"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(6.9471 1.64) scale(37.7884)"
          >
            <stop offset="0.1011" stopColor="#93009E" />
            <stop offset="1" stopColor="#001FBA" />
          </radialGradient>
          <clipPath id="clip0_7_6">
            <rect width="36" height="36" fill="white" />
          </clipPath>
        </defs>
      </Svg>
    </Square>
  );
}
