import {
  // ChatBubbleLeftRightIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid';

import {
  ClipboardDocumentIcon,
  CogIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const sidebar = [
  {
    path: '/dashboard',
    icon: Squares2X2Icon,
    name: 'dashboard',
  },
  {
    path: '/add-heardle',
    icon: ClipboardDocumentIcon,
    name: 'Add Heardle',
  },
  {
    path: '/all-heardles',
    icon: ClipboardDocumentIcon,
    name: 'All Heardles',
  },
  {
    path: '/add-blog',
    icon: ClipboardDocumentIcon,
    name: 'Add Blog',
  },
  {
    path: '/all-blogs',
    icon: ClipboardDocumentIcon,
    name: 'All Blogs',
  },
  {
    path: '/add-metadata',
    icon: ClipboardDocumentIcon,
    name: 'Add Metadata',
  },
  {
    path: '/admins',
    icon: UsersIcon,
    name: 'Admins',
  },

  {
    path: '/settings',
    icon: CogIcon,
    name: 'Settings',
  },

  // {
  //   path: '/dashboard/dealer',
  //   icon: GlobeAsiaAustraliaIcon,
  //   name: 'Dealers',
  // },
];

export default sidebar;
