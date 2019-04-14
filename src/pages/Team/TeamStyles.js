import styled from "styled-components";
import tinycolor from "tinycolor2";

export const TeamHeaderStyles = styled.header`
  &.header-team {
    .team__nav ul li a.active::after {
      background-color: ${({ theme }) => `#${theme.PrimaryColor}`};
    }

    .team__name,
    .team__social .team__social--item a {
      .fill {
        &--bg {
          fill: ${({ theme }) => `#${theme.PrimaryColor}`};
        }

        &--text {
          fill: ${({ theme }) => {
            if (
              tinycolor.isReadable(
                `#${theme.PrimaryColor}`,
                `#${theme.SecondaryColor}`,
                {}
              )
            ) {
              return `#${theme.SecondaryColor}`;
            }
            return tinycolor
              .mostReadable(`#${theme.PrimaryColor}`, [
                `#${theme.SecondaryColor}`,
                `#${theme.QuaternaryColor}`,
                `#${theme.TertiaryColor}`,
              ])
              .toHexString();
          }};
        }
      }

      &:hover {
        .fill {
          &--bg {
            fill: ${({ theme }) => `#${theme.SecondaryColor}`};
          }

          &--text {
            fill: ${({ theme }) =>
              tinycolor
                .mostReadable(`#${theme.SecondaryColor}`, [
                  `#${theme.PrimaryColor}`,
                  `#${theme.QuaternaryColor}`,
                  `#${theme.TertiaryColor}`,
                ])
                .toHexString()};
          }
        }
      }
    }
  }
`;

export const TeamGlobalStyles = styled.div`
  .card__headline {
    background: ${({ theme }) => `#${theme.PrimaryColor}`};
    color: ${({ theme }) => {
      if (
        tinycolor.isReadable(
          `#${theme.PrimaryColor}`,
          `#${theme.SecondaryColor}`,
          {}
        )
      ) {
        return `#${theme.SecondaryColor}`;
      }
      return tinycolor
        .mostReadable(`#${theme.PrimaryColor}`, [
          `#${theme.SecondaryColor}`,
          `#${theme.QuaternaryColor}`,
          `#${theme.TertiaryColor}`,
        ])
        .toHexString();
    }};
  }

  .card__footer a {
    color: ${({ theme }) => `#${theme.PrimaryColor}`};
  }
  .tabs-item.is-selected {
    border-bottom-color: ${({ theme }) => `#${theme.PrimaryColor}`};
  }
  .news-card__cta,
  .table--roster__avatar > figure,
  .depth-chart__position--image,
  .news-card__label {
    background-color: ${({ theme }) => `#${theme.SecondaryColor}`};
  }

  .news-card__label {
    background-color: ${({ theme }) => `#${theme.Color}`};
    color: ${({ theme }) => {
      if (
        tinycolor.isReadable(
          `#${theme.SecondaryColor}`,
          `#${theme.PrimaryColor}`,
          {}
        )
      ) {
        return `#${theme.PrimaryColor}`;
      }
      return tinycolor
        .mostReadable(`#${theme.SecondaryColor}`, [
          `#${theme.PrimaryColor}`,
          `#${theme.QuaternaryColor}`,
          `#${theme.TertiaryColor}`,
        ])
        .toHexString();
    }};
  }

  .calendar__header {
    background-color: ${({ theme }) => `#${theme.PrimaryColor}`};
    color: ${({ theme }) => {
      if (
        tinycolor.isReadable(
          `#${theme.PrimaryColor}`,
          `#${theme.SecondaryColor}`,
          {}
        )
      ) {
        return `#${theme.SecondaryColor}`;
      }
      return tinycolor
        .mostReadable(`#${theme.PrimaryColor}`, [
          `#${theme.SecondaryColor}`,
          `#${theme.QuaternaryColor}`,
          `#${theme.TertiaryColor}`,
        ])
        .toHexString();
    }};

    .btn-icon {
      svg {
        fill: ${({ theme }) => {
          if (
            tinycolor.isReadable(
              `#${theme.PrimaryColor}`,
              `#${theme.SecondaryColor}`,
              {}
            )
          ) {
            return `#${theme.SecondaryColor}`;
          }
          return tinycolor
            .mostReadable(`#${theme.PrimaryColor}`, [
              `#${theme.SecondaryColor}`,
              `#${theme.QuaternaryColor}`,
              `#${theme.TertiaryColor}`,
            ])
            .toHexString();
        }};
      }
      &:hover {
        svg {
          fill: ${({ theme }) => `#${theme.SecondaryColor}`};
        }
      }
    }
  }
`;
