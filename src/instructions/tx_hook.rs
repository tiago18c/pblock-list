use pinocchio::{account_info::AccountInfo, ProgramResult};

use crate::BlockListError;



pub struct TxHook<'a> {
    pub source: &'a AccountInfo,
    pub destination: &'a AccountInfo,
    pub mint: &'a AccountInfo,
    pub authority: &'a AccountInfo,
    pub remaining_accounts: &'a [AccountInfo],
}

impl<'a> TxHook<'a> {
    pub const DISCRIMINATOR: u8 = 0x69;

    pub fn handler(&self) -> ProgramResult {
        Ok(())
    }

}

impl<'a> TryFrom<&'a [AccountInfo]> for TxHook<'a> {
    type Error = BlockListError;

    fn try_from(accounts: &'a [AccountInfo]) -> Result<Self, Self::Error> {
        let [source, destination, mint, authority, remaining_accounts @ ..] = accounts else {
            return Err(BlockListError::NotEnoughAccounts);
        };

        

        Ok(Self {
            source,
            destination,
            mint,
            authority,
            remaining_accounts,
        })
    }
}