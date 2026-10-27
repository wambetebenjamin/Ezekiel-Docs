import {
  Briefcase,
  Building2,
  FileText,
  Handshake,
  Home,
  Key,
  KeyRound,
  Laptop,
  Landmark,
  Lock,
  MailCheck,
  MessagesSquare,
  ShoppingBag,
  Shield,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'

export const DOCUMENT_ICONS: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  'building-2': Building2,
  'file-text': FileText,
  handshake: Handshake,
  home: Home,
  key: Key,
  'key-round': KeyRound,
  laptop: Laptop,
  landmark: Landmark,
  lock: Lock,
  'mail-check': MailCheck,
  'messages-square': MessagesSquare,
  'shopping-bag': ShoppingBag,
  shield: Shield,
  'user-check': UserCheck,
  users: Users,
}

export function getDocumentIcon(iconKey: string): LucideIcon {
  return DOCUMENT_ICONS[iconKey] ?? FileText
}
