import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function IconArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  )
}

export function IconArrowLeft(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </Icon>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 12.5 5 5L20 6.5" />
    </Icon>
  )
}

export function IconClose(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  )
}

export function IconMenu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  )
}

export function IconCompass(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.2 8.8-1.9 4.4-4.4 1.9 1.9-4.4z" />
    </Icon>
  )
}

export function IconRoute(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M8.4 6h4.1a3.5 3.5 0 0 1 0 7H9.5a3.5 3.5 0 0 0 0 7h6.1" />
    </Icon>
  )
}

export function IconFlask(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 3h4v5.2l4.5 8.3A2.6 2.6 0 0 1 16.2 21H7.8a2.6 2.6 0 0 1-2.3-4.5L10 8.2z" />
      <path d="M8 14h8" />
    </Icon>
  )
}

export function IconCode(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
    </Icon>
  )
}

export function IconNetwork(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9" y="3" width="6" height="5" rx="1.4" />
      <rect x="2.5" y="16" width="6" height="5" rx="1.4" />
      <rect x="15.5" y="16" width="6" height="5" rx="1.4" />
      <path d="M12 8v4M5.5 16v-2h13v2" />
    </Icon>
  )
}

export function IconPalette(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.9 2-1.9 0-1.2-.9-1.6-.9-2.6 0-1 .8-1.8 1.9-1.8H17a4 4 0 0 0 4-4c0-4.2-4-7.7-9-7.7Z" />
      <circle cx="8" cy="9" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconChip(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </Icon>
  )
}

export function IconClock(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </Icon>
  )
}

export function IconWrench(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15.5 3.5a5.5 5.5 0 0 0-5 7.6L3.8 17.8a2 2 0 1 0 2.4 2.4l6.7-6.7a5.5 5.5 0 0 0 7.6-5l-3.3 3.3-3-3z" />
    </Icon>
  )
}

export function IconInfo(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <circle cx="12" cy="7.9" r="1" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconAlert(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10.6 3.9 2.9 17.2A1.6 1.6 0 0 0 4.3 19.6h15.4a1.6 1.6 0 0 0 1.4-2.4L13.4 3.9a1.6 1.6 0 0 0-2.8 0Z" />
      <path d="M12 9v4.5" />
      <circle cx="12" cy="16.6" r="1" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconTarget(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function IconBook(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 18.2h15V21H6.5A2.5 2.5 0 0 1 4 18.5z" />
    </Icon>
  )
}

export function IconUsers(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3.5 20a6 6 0 0 1 12 0" />
      <path d="M16 6.2a3.2 3.2 0 0 1 0 6.1M17.5 14.6a5.6 5.6 0 0 1 3 5.4" />
    </Icon>
  )
}

export function IconShieldCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.2 5 6v6c0 4.2 2.9 7.6 7 8.8 4.1-1.2 7-4.6 7-8.8V6z" />
      <path d="m9.2 12.2 2 2 3.6-3.8" />
    </Icon>
  )
}

export function IconSpark(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9z" />
    </Icon>
  )
}

export function IconEye(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.8 12S6.2 5.8 12 5.8 21.2 12 21.2 12 17.8 18.2 12 18.2 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </Icon>
  )
}

export function IconCalendar(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.4" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
    </Icon>
  )
}

export function IconSettings(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
    </Icon>
  )
}
