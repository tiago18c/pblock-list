

pub struct BlockWallet<'a> {
    pub authority: &'a AccountInfo,
    pub config: &'a AccountInfo,
    pub system_program: &'a AccountInfo,
}

impl<'a> Discriminator for BlockWallet<'a> {
    const DISCRIMINATOR: u8 = 0xF2;
}

impl<'a> TryFrom<&'a [AccountInfo]> for BlockWallet<'a> {
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