// assets
import { IconPackage } from '@tabler/icons';

// constant
const icons = {
    IconPackage
};

// ===========================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||=========================== //

const customtools = {
    id: 'custom-tools',
    type: 'group',
    children: [
        {
            id: 'artifact-browser',
            title: 'Artifact Browser',
            type: 'item',
            url: '/artifact-browser',
            icon: icons.IconPackage,
            breadcrumbs: false
        }
    ]
};

export default customtools;
