use pinocchio::pubkey::Pubkey;

use super::{Discriminator, Transmutable};


#[repr(C)]
pub struct Config {
    pub discriminator: u8,
    pub authority: Pubkey,
}

impl Config {
    pub const SEED_PREFIX: &'static [u8] = b"config";
    pub const DISCRIMINATOR: u8 = 0x00;
}

impl Transmutable for Config {
    const LEN: usize = 8 + 32;
}

impl Discriminator for Config {
    const DISCRIMINATOR: u8 = 0x00;
}

