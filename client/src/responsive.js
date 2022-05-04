import { css } from 'styled-components';

export const mq = (props, mw) => {
  return css`
    @media only screen and (min-width: ${mw}px) {
      ${props}
    }
  `;
};
