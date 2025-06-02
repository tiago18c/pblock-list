use pinocchio::{account_info::AccountInfo, ProgramResult};

use crate::BlockListError;



pub struct TxHook<'a> {
    pub source: &'a AccountInfo,
    pub destination: &'a AccountInfo,
    pub mint: &'a AccountInfo,
    pub authority: &'a AccountInfo,
    pub source_wallet_block: Option<&'a AccountInfo>,
    //pub remaining_accounts: &'a [AccountInfo],
}

impl<'a> TxHook<'a> {
    pub const DISCRIMINATOR: u8 = 0x69;

    pub fn process(&self) -> ProgramResult {
        if let Some(_source_wallet_block) = self.source_wallet_block {
            /*if source_wallet_block.is_signer() {
                return Err(BlockListError::InvalidSourceWalletBlock.into());
            }*/
            return Err(BlockListError::AccountBlocked.into());
        }

        Ok(())
    }

}

impl<'a> TryFrom<&'a [AccountInfo]> for TxHook<'a> {
    type Error = BlockListError;

    fn try_from(accounts: &'a [AccountInfo]) -> Result<Self, Self::Error> {

        /*
        TX HOOK GETS CALLED WITH:
         1- source TA
         2- destination TA
         3- mint
         4- authority (either src owner or src delegate)
         5- extra account metas
         6- (optional) source wallet block 
         */

        let [source, destination, mint, authority, remaining_accounts @ ..] = accounts else {
            return Err(BlockListError::NotEnoughAccounts);
        };

        let source_wallet_block = if remaining_accounts.len() == 2 {
            Some(&remaining_accounts[1])
        } else {
            None
        };



        Ok(Self {
            source,
            destination,
            mint,
            authority,
            source_wallet_block,
        })
    }
}