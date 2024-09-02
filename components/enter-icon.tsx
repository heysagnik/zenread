export default function EnterKeyOrionIcon({ color = "#202020", size = 18 }) {
  return (
    <svg
      aria-labelledby="title"
      role="img"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <title id="title">Enter Key Icon</title>
      <rect
        data-name="layer2"
        fill="none"
        height="60"
        rx="7.8"
        ry="7.8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={2}
        width="60"
        x="2"
        y="2"
      />
      <path
        d="M16 32h30v-8"
        data-name="layer1"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={2}
      />
      <path
        d="M24 40l-8-8 8-8"
        data-name="layer1"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth={2}
      />
    </svg>
  );
}
