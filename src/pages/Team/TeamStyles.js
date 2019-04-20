import styled from "styled-components";

export const TeamHeaderStyles = styled.header`
  &.header-team {
    .team__nav ul li a.active::after {
      background-color: ${({ theme }) => `${theme.PrimaryColor}`};
    }

    .team__name,
    .team__social .team__social--item a {
      .fill {
        &--bg {
          fill: ${({ theme }) => `${theme.PrimaryColor}`};
        }

        &--text {
          fill: ${({ theme }) => `${theme.SecondaryTextOnPrimaryBg}`};
        }
      }

      &:hover {
        .fill {
          &--bg {
            fill: ${({ theme }) => `${theme.SecondaryColor}`};
          }

          &--text {
            fill: ${({ theme }) => `${theme.MostReadableOnSecondary}`};
          }
        }
      }
    }
  }
`;

export const TeamGlobalStyles = styled.div`
  .loading-spinner__inner {
    background-color: ${({ theme }) => `${theme.PrimaryOrSecondaryOnWhite}`};
  }

  .calendar__cell--bg {
    color: ${({ theme }) => `${theme.PrimaryOrSecondaryOnWhite}`};
  }

  .calendar__cell.cell-selected::before {
    background-image: linear-gradient(
      45deg,
      ${({ theme }) => `${theme.SecondaryColor}`} 0,
      ${({ theme }) => `${theme.SecondaryColorHover}`} 40%
    );
  }

  .calendar__cell.cell-selected {
    border-image: linear-gradient(
      45deg,
      ${({ theme }) => `${theme.SecondaryColor}`} 0,
      ${({ theme }) => `${theme.SecondaryColorHover}`} 40%
    );
    border-image-slice: 1;
  }

  .card__headline {
    background: ${({ theme }) => `${theme.PrimaryColor}`};
    color: ${({ theme }) => `${theme.SecondaryTextOnPrimaryBg}`};
  }

  .card {
    a {
      color: ${({ theme }) => `${theme.PrimaryOrSecondaryOnWhiteHover}`};
    }
  }

  .card__footer a {
    color: ${({ theme }) => `${theme.PrimaryColor}`};
  }
  .tabs-item.is-selected {
    border-bottom-color: ${({ theme }) => `${theme.PrimaryColor}`};
  }
  .news-card__cta,
  .table--roster__avatar > figure,
  .depth-chart__position--image,
  .news-card__label {
    background-color: ${({ theme }) => `${theme.SecondaryColor}`};
  }

  .news-card__label {
    background-color: ${({ theme }) => `${theme.SecondaryColor}`};
    color: ${({ theme }) => `${theme.PrimaryTextOnSecondaryBg}`};
  }

  .calendar__header {
    background-color: ${({ theme }) => `${theme.PrimaryColor}`};
    color: ${({ theme }) => `${theme.SecondaryTextOnPrimaryBg}`};

    .btn-icon {
      svg {
        fill: ${({ theme }) => `${theme.SecondaryTextOnPrimaryBg}`};
      }
      &:hover {
        svg {
          fill: ${({ theme }) => `${theme.SecondaryTextOnPrimaryBgHover}`};
        }
      }
    }
  }

  .table--roster__avatar {
    color: ${({ theme }) => `${theme.TableRosterPlayerLinkColor}`};

    &:hover {
      color: ${({ theme }) => `${theme.TableRosterPlayerLinkColorHover}`};
    }
  }
`;
