import { SynapseConstants } from 'synapse-react-client'
import { HomeExploreConfig } from '../../types/portal-config'
import loadingScreen from '../loadingScreen'
import { GenericCardSchema } from 'synapse-react-client/dist/containers/GenericCard'
const unitDescription = 'studies'
export const studiesSql = `SELECT * FROM syn18483791 WHERE ( ( "is.study" = 'TRUE' ) )`
const sql = studiesSql
const rgbIndex = 1

export const studySchema: GenericCardSchema = {
  type: SynapseConstants.STUDY,
  title: 'name',
  subTitle: 'centerName',
  description: 'description',
  secondaryLabels: {
    0: { key: 'Theme' },
    1: { key: 'tumorType', alias: 'Disease' },
    2: { key: 'experimentalStrategy', alias: 'Assay' },
    3: { key: 'consortium', alias: 'Program' },
    4: { key: 'grantType', alias: 'Grant Type' },
  },
  link: 'id',
}

export const studies: HomeExploreConfig = {
  homePageSynapseObject: {
    name: 'QueryWrapperFlattened',
    props: {
      rgbIndex,
      unitDescription,
      loadingScreen,
      facet: 'grantType',
      facetAliases: {
        grantType: 'Grant Type',
      },
      link: 'Explore/Studies',
      linkText: 'Explore Studies',
      initQueryRequest : {
        concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
        partMask: SynapseConstants.BUNDLE_MASK_QUERY_FACETS
          | SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
        query: {
          sql,
          isConsistent: false,
          limit: 25,
          offset: 0,
        }
      },
    }
  },
  explorePageSynapseObject: {
    name: 'QueryWrapperMenu',
    props: {
      rgbIndex,
      unitDescription,
      cardConfiguration: {
        type: SynapseConstants.GENERIC_CARD,
        genericCardSchema: studySchema
      },
      stackedBarChartConfiguration: {
        loadingScreen
      },
      name: 'Studies',
      facetAliases: {
        grantType: 'Grant Type',
        consortium: 'Program',
        experimentalStrategy: 'Assay',
        tumorType: 'Disease Type',
      },
      menuConfig: [
        {
          sql,
          facet: 'grantType'
        },
        {
          sql,
          facet: 'consortium'
        },
        {
          sql,
          facet: 'Theme'
        },
        {
          sql,
          facet: 'experimentalStrategy'
        },
        {
          sql,
          facet: 'tumorType'
        },
      ],
    }
  }
}
