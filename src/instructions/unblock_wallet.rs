use pinocchio::account_info::AccountInfo;

use crate::{BlockListError, Discriminator};


pub struct UnblockWallet<'a> {
    pub authority: &'a AccountInfo,
    pub config: &'a AccountInfo,
    pub system_program: &'a AccountInfo,
}

impl<'a> Discriminator for UnblockWallet<'a> {
    const DISCRIMINATOR: u8 = 0xF2;
}

impl<'a> TryFrom<&'a [AccountInfo]> for UnblockWallet<'a> {
    type Error = BlockListError;

    fn try_from(accounts: &'a [AccountInfo]) -> Result<Self, Self::Error> {
        let [authority, config, system_program] = accounts else {
            return Err(BlockListError::NotEnoughAccounts);
        };

        Ok(Self {
            authority,
            config,
            system_program,
        })
    }
}