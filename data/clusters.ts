import { Cluster, LocalizedString } from '@/types';
import { i18n } from '@/lib/i18n';

/**
 * A map providing the localized names for each Cluster enum member.
 */
export const clusterNames: Record<Cluster, LocalizedString> = {
    [Cluster.HongKongEast]: i18n('Hong Kong East', '港島東'),
    [Cluster.HongKongWest]: i18n('Hong Kong West', '港島西'),
    [Cluster.KowloonCentral]: i18n('Kowloon Central', '九龍中'),
    [Cluster.KowloonEast]: i18n('Kowloon East', '九龍東'),
    [Cluster.KowloonWest]: i18n('Kowloon West', '九龍西'),
    [Cluster.NewTerritoriesEast]: i18n('New Territories East', '新界東'),
    [Cluster.NewTerritoriesWest]: i18n('New Territories West', '新界西'),
  };