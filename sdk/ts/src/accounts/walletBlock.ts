/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  assertAccountExists,
  assertAccountsExist,
  combineCodec,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
  getAddressDecoder,
  getAddressEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Encoder,
  type Account,
  type Address,
  type Codec,
  type Decoder,
  type EncodedAccount,
  type Encoder,
  type FetchAccountConfig,
  type FetchAccountsConfig,
  type MaybeAccount,
  type MaybeEncodedAccount,
} from '@solana/kit';
import { WalletBlockSeeds, findWalletBlockPda } from '../pdas';

export const WALLET_BLOCK_DISCRIMINATOR = 1;

export function getWalletBlockDiscriminatorBytes() {
  return getU8Encoder().encode(WALLET_BLOCK_DISCRIMINATOR);
}

export type WalletBlock = { authority: Address };

export type WalletBlockArgs = WalletBlock;

export function getWalletBlockEncoder(): Encoder<WalletBlockArgs> {
  return getStructEncoder([['authority', getAddressEncoder()]]);
}

export function getWalletBlockDecoder(): Decoder<WalletBlock> {
  return getStructDecoder([['authority', getAddressDecoder()]]);
}

export function getWalletBlockCodec(): Codec<WalletBlockArgs, WalletBlock> {
  return combineCodec(getWalletBlockEncoder(), getWalletBlockDecoder());
}

export function decodeWalletBlock<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<WalletBlock, TAddress>;
export function decodeWalletBlock<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<WalletBlock, TAddress>;
export function decodeWalletBlock<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<WalletBlock, TAddress> | MaybeAccount<WalletBlock, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getWalletBlockDecoder()
  );
}

export async function fetchWalletBlock<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<WalletBlock, TAddress>> {
  const maybeAccount = await fetchMaybeWalletBlock(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeWalletBlock<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<WalletBlock, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeWalletBlock(maybeAccount);
}

export async function fetchAllWalletBlock(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<WalletBlock>[]> {
  const maybeAccounts = await fetchAllMaybeWalletBlock(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeWalletBlock(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<WalletBlock>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeWalletBlock(maybeAccount));
}

export function getWalletBlockSize(): number {
  return 33;
}

export async function fetchWalletBlockFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: WalletBlockSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<Account<WalletBlock>> {
  const maybeAccount = await fetchMaybeWalletBlockFromSeeds(rpc, seeds, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeWalletBlockFromSeeds(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  seeds: WalletBlockSeeds,
  config: FetchAccountConfig & { programAddress?: Address } = {}
): Promise<MaybeAccount<WalletBlock>> {
  const { programAddress, ...fetchConfig } = config;
  const [address] = await findWalletBlockPda(seeds, { programAddress });
  return await fetchMaybeWalletBlock(rpc, address, fetchConfig);
}
