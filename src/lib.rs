#![no_std]
 
use pinocchio::{account_info::AccountInfo, entrypoint, no_allocator, nostd_panic_handler, program_entrypoint, program_error::ProgramError, pubkey::Pubkey, ProgramResult};
use pinocchio_pubkey::declare_id;
 
program_entrypoint!(process_instruction);
// Do not allocate memory.
no_allocator!();
// Use the no_std panic handler.
nostd_panic_handler!();
 
pub mod instructions;
pub use instructions::*;
pub mod error;
pub use error::*;
pub mod state;
pub use state::*;
 
// 22222222222222222222222222222222222222222222
// pub const ID: Pubkey = [
//     0x0f, 0x1e, 0x6b, 0x14, 0x21, 0xc0, 0x4a, 0x07,
//     0x04, 0x31, 0x26, 0x5c, 0x19, 0xc5, 0xbb, 0xee,
//     0x19, 0x92, 0xba, 0xe8, 0xaf, 0xd1, 0xcd, 0x07,
//     0x8e, 0xf8, 0xaf, 0x70, 0x47, 0xdc, 0x11, 0xf7,
// ];
declare_id!("22222222222222222222222222222222222222222222");

pub const U64_BYTES: usize = 8;

//pub const TX_HOOK_DISCRIMINATOR: [u8; 8] = [0x69, 0x25, 0x65, 0xC5, 0x4B, 0xFB, 0x00, 0x00];
//pub const TX_HOOK_DISC: u64 = 0x692565C54BFB0000;

//pub const INIT_DISCRIMINATOR: [u8; 8] = [0x01, 0x25, 0x65, 0xC5, 0x4B, 0xFB, 0x00, 0x00];
//pub const INIT_DISC: u64 = 0x012565C54BFB0000;
//pub const _DISCRIMINATOR: [u8; 8] = [0x69, 0x25, 0x65, 0xC5, 0x4B, 0xFB, 0x00, 0x00];
 
#[inline(always)]
fn process_instruction(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let [disc, remaining_data @ ..] = instruction_data else {
        return Err(BlockListError::InvalidInstruction.into());
    };
    
    
    match *disc {
        105u8 => {
            // TODO: implement tx 
            return Err(ProgramError::Custom(3));
        }
        150u8 => {
            // TODO: implement init
            return Err(ProgramError::Custom(6));
        }
        _ => return Err(ProgramError::Custom(15)),
    }

    Ok(())
}