use bytemuck::{Pod, Zeroable};
use pinocchio::pubkey::Pubkey;

use crate::BlockListError;

pub trait Transmutable {
    const LEN: usize;
}

pub trait Initializable {
    fn is_initialized(&self) -> Result<bool, BlockListError>;
}

pub trait Discriminator {
    const DISCRIMINATOR: u8;
}

/// Return a reference for an initialized `T` from the given bytes.
///
/// # Safety
///
/// The caller must ensure that `bytes` contains a valid representation of `T`.
#[inline(always)]
pub unsafe fn load<T: Initializable + Transmutable>(bytes: &[u8]) -> Result<&T, BlockListError> {
    load_unchecked(bytes).and_then(|t: &T| {
        // checks if the data is initialized
        if t.is_initialized()? {
            Ok(t)
        } else {
            Err(BlockListError::UninitializedAccount)
        }
    })
}

/// Return a `T` reference from the given bytes.
///
/// This function does not check if the data is initialized.
///
/// # Safety
///
/// The caller must ensure that `bytes` contains a valid representation of `T`.
#[inline(always)]
pub unsafe fn load_unchecked<T: Transmutable>(bytes: &[u8]) -> Result<&T, BlockListError> {
    if bytes.len() != T::LEN {
        return Err(BlockListError::InvalidAccountData);
    }
    Ok(&*(bytes.as_ptr() as *const T))
}

/// Return a mutable reference for an initialized `T` from the given bytes.
///
/// # Safety
///
/// The caller must ensure that `bytes` contains a valid representation of `T`.
#[inline(always)]
pub unsafe fn load_mut<T: Initializable + Transmutable>(
    bytes: &mut [u8],
) -> Result<&mut T, BlockListError> {
    load_mut_unchecked(bytes).and_then(|t: &mut T| {
        // checks if the data is initialized
        if t.is_initialized()? {
            Ok(t)
        } else {
            Err(BlockListError::UninitializedAccount)
        }
    })
}

/// Return a mutable `T` reference from the given bytes.
///
/// This function does not check if the data is initialized.
///
/// # Safety
///
/// The caller must ensure that `bytes` contains a valid representation of `T`.
#[inline(always)]
pub unsafe fn load_mut_unchecked<T: Transmutable>(
    bytes: &mut [u8],
) -> Result<&mut T, BlockListError> {
    if bytes.len() != T::LEN {
        return Err(BlockListError::InvalidAccountData);
    }
    Ok(&mut *(bytes.as_mut_ptr() as *mut T))
}


#[repr(C)]
pub struct BlockWallet {
    pub discriminator: u8,
    pub address: Pubkey,
}

#[repr(C)]
pub struct Config {
    pub discriminator: u8,
    pub authority: Pubkey,
}

impl Config {
    pub const SEED_PREFIX: &[u8] = b"config";
    pub const DISCRIMINATOR: u8 = 0x00;
}

impl Transmutable for Config {
    const LEN: usize = 8 + 32;
}

impl BlockWallet {
    pub const SEED_PREFIX: &[u8] = b"block_wallet";
    pub const DISCRIMINATOR: u8 = 0x01;
}

impl Transmutable for BlockWallet {
    const LEN: usize = 8 + 32;
}

/*
impl TryFrom<&[u8]> for BlockWallet {
    type Error = BlockListError;

    fn try_from(bytes: &[u8]) -> Result<Self, Self::Error> {
        let acc = bytemuck::try_pod_read_unaligned::<Self>(bytes).map_err(|_| BlockListError::InvalidInstruction)?;

        Ok(acc)
    }
}

impl TryFrom<&[u8]> for Config {
    type Error = BlockListError;

    fn try_from(bytes: &[u8]) -> Result<Self, Self::Error> {
        let [discriminator, authority] = bytes else {
            return Err(BlockListError::InvalidInstruction);
        };
    }
}*/