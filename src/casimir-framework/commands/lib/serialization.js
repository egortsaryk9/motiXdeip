import { APP_CMD } from '@/casimir-framework/vars';

import CreateNftCollectionCmd from './impl/nft-collections/CreateNftCollectionCmd';
import UpdateNftCollectionCmd from './impl/nft-collections/UpdateNftCollectionCmd';

import CreateNftItemCmd from './impl/nft-items/CreateNftItemCmd';
import UpdateNftItemCmd from './impl/nft-items/UpdateNftItemCmd';
import DeleteNftItemCmd from './impl/nft-items/DeleteNftItemCmd';
import ModerateNftItemCmd from './impl/nft-items/ModerateNftItemCmd';

import CreateUserCmd from './impl/users/CreateUserCmd';
import UpdateUserCmd from './impl/users/UpdateUserCmd';

import CreateDaoCmd from './impl/CreateDaoCmd';
import ImportDAOCmd from './impl/ImportDAOCmd';
import AddDaoMemberCmd from './impl/AddDaoMemberCmd';
import CreateProposalCmd from './impl/CreateProposalCmd';
import AcceptProposalCmd from './impl/AcceptProposalCmd';
import DeclineProposalCmd from './impl/DeclineProposalCmd';
import UpdateDaoCmd from './impl/UpdateDaoCmd';
import AlterDaoAuthorityCmd from './impl/AlterDaoAuthorityCmd';
import CreateAttributeCmd from './impl/CreateAttributeCmd';
import UpdateAttributeCmd from './impl/UpdateAttributeCmd';
import DeleteAttributeCmd from './impl/DeleteAttributeCmd';
import RemoveDaoMemberCmd from './impl/RemoveDaoMemberCmd';
import CreateInvestmentOpportunityCmd from './impl/CreateInvestmentOpportunityCmd';
import InvestCmd from './impl/InvestCmd';
import TransferFTCmd from './impl/TransferFTCmd';
import TransferNFTCmd from './impl/TransferNFTCmd';
import CreateDocumentTemplateCmd from './impl/CreateDocumentTemplateCmd';
import UpdateDocumentTemplateCmd from './impl/UpdateDocumentTemplateCmd';
import DeleteDocumentTemplateCmd from './impl/DeleteDocumentTemplateCmd';
import CreateFTClassCmd from './impl/CreateFTClassCmd';
import IssueFTCmd from './impl/IssueFTCmd';
import CreateContractAgreementCmd from './impl/CreateContractAgreementCmd';
import AcceptContractAgreementCmd from './impl/AcceptContractAgreementCmd';
import RejectContractAgreementCmd from './impl/RejectContractAgreementCmd';
import DeleteUserProfileCmd from './impl/DeleteUserProfileCmd';
import UpdateAttributeSettingsCmd from './impl/UpdateAttributeSettingsCmd';
import CreateLayoutCmd from './impl/CreateLayoutCmd';
import UpdateLayoutCmd from './impl/UpdateLayoutCmd';
import DeleteLayoutCmd from './impl/DeleteLayoutCmd';
import UpdateLayoutSettingsCmd from './impl/UpdateLayoutSettingsCmd';
import UpdatePortalProfileCmd from './impl/UpdatePortalProfileCmd';
import UpdatePortalSettingsCmd from './impl/UpdatePortalSettingsCmd';


const APP_CMD_INFO = {

  [APP_CMD.CREATE_NFT_COLLECTION]: { class: CreateNftCollectionCmd },
  [APP_CMD.UPDATE_NFT_COLLECTION]: { class: UpdateNftCollectionCmd },

  [APP_CMD.CREATE_NFT_ITEM]: { class: CreateNftItemCmd },
  [APP_CMD.UPDATE_NFT_ITEM]: { class: UpdateNftItemCmd },
  [APP_CMD.DELETE_NFT_ITEM]: { class: DeleteNftItemCmd },
  [APP_CMD.MODERATE_NFT_ITEM]: { class: ModerateNftItemCmd },

  [APP_CMD.CREATE_USER]: { class: CreateUserCmd },
  [APP_CMD.UPDATE_USER]: { class: UpdateUserCmd },

  [APP_CMD.CREATE_DAO]: { class: CreateDaoCmd },
  [APP_CMD.UPDATE_DAO]: { class: UpdateDaoCmd },
  [APP_CMD.IMPORT_DAO]: { class: ImportDAOCmd },
  [APP_CMD.ALTER_DAO_AUTHORITY]: { class: AlterDaoAuthorityCmd },
  [APP_CMD.ADD_DAO_MEMBER]: { class: AddDaoMemberCmd },
  [APP_CMD.CREATE_PROPOSAL]: { class: CreateProposalCmd },
  [APP_CMD.ACCEPT_PROPOSAL]: { class: AcceptProposalCmd },
  [APP_CMD.DECLINE_PROPOSAL]: { class: DeclineProposalCmd },
  [APP_CMD.CREATE_ATTRIBUTE]: { class: CreateAttributeCmd },
  [APP_CMD.UPDATE_ATTRIBUTE]: { class: UpdateAttributeCmd },
  [APP_CMD.DELETE_ATTRIBUTE]: { class: DeleteAttributeCmd },
  [APP_CMD.REMOVE_DAO_MEMBER]: { class: RemoveDaoMemberCmd },
  [APP_CMD.CREATE_INVESTMENT_OPPORTUNITY]: { class: CreateInvestmentOpportunityCmd },
  [APP_CMD.INVEST]: { class: InvestCmd },
  [APP_CMD.TRANSFER_FT]: { class: TransferFTCmd },
  [APP_CMD.TRANSFER_NFT]: { class: TransferNFTCmd },
  [APP_CMD.CREATE_DOCUMENT_TEMPLATE]: { class: CreateDocumentTemplateCmd },
  [APP_CMD.UPDATE_DOCUMENT_TEMPLATE]: { class: UpdateDocumentTemplateCmd },
  [APP_CMD.DELETE_DOCUMENT_TEMPLATE]: { class: DeleteDocumentTemplateCmd },
  [APP_CMD.CREATE_FT]: { class: CreateFTClassCmd },
  [APP_CMD.ISSUE_FT]: { class: IssueFTCmd },
  [APP_CMD.CREATE_CONTRACT_AGREEMENT]: { class: CreateContractAgreementCmd },
  [APP_CMD.ACCEPT_CONTRACT_AGREEMENT]: { class: AcceptContractAgreementCmd },
  [APP_CMD.REJECT_CONTRACT_AGREEMENT]: { class: RejectContractAgreementCmd },
  [APP_CMD.UPDATE_PORTAL_PROFILE]: { class: UpdatePortalProfileCmd },
  [APP_CMD.UPDATE_PORTAL_SETTINGS]: { class: UpdatePortalSettingsCmd },
  [APP_CMD.CREATE_LAYOUT]: { class: CreateLayoutCmd },
  [APP_CMD.UPDATE_LAYOUT]: { class: UpdateLayoutCmd },
  [APP_CMD.DELETE_LAYOUT]: { class: DeleteLayoutCmd },
  [APP_CMD.UPDATE_LAYOUT_SETTINGS]: { class: UpdateLayoutSettingsCmd },
  [APP_CMD.UPDATE_ATTRIBUTE_SETTINGS]: { class: UpdateAttributeSettingsCmd },
  [APP_CMD.DELETE_USER_PROFILE]: { class: DeleteUserProfileCmd },
};

export {
  APP_CMD_INFO
};
