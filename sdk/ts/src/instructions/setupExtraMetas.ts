/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getBooleanDecoder,
  getBooleanEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { findConfigPda, findExtraMetasPda } from '../pdas';
import { BLOCK_LIST_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const SETUP_EXTRA_METAS_DISCRIMINATOR = 106;

export function getSetupExtraMetasDiscriminatorBytes() {
  return getU8Encoder().encode(SETUP_EXTRA_METAS_DISCRIMINATOR);
}

export type SetupExtraMetasInstruction<
  TProgram extends string = typeof BLOCK_LIST_PROGRAM_ADDRESS,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountExtraMetas extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? WritableSignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountConfig extends string
        ? ReadonlyAccount<TAccountConfig>
        : TAccountConfig,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountExtraMetas extends string
        ? WritableAccount<TAccountExtraMetas>
        : TAccountExtraMetas,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type SetupExtraMetasInstructionData = {
  discriminator: number;
  checkBothWallets: boolean;
};

export type SetupExtraMetasInstructionDataArgs = { checkBothWallets?: boolean };

export function getSetupExtraMetasInstructionDataEncoder(): Encoder<SetupExtraMetasInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['checkBothWallets', getBooleanEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: 106,
      checkBothWallets: value.checkBothWallets ?? false,
    })
  );
}

export function getSetupExtraMetasInstructionDataDecoder(): Decoder<SetupExtraMetasInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['checkBothWallets', getBooleanDecoder()],
  ]);
}

export function getSetupExtraMetasInstructionDataCodec(): Codec<
  SetupExtraMetasInstructionDataArgs,
  SetupExtraMetasInstructionData
> {
  return combineCodec(
    getSetupExtraMetasInstructionDataEncoder(),
    getSetupExtraMetasInstructionDataDecoder()
  );
}

export type SetupExtraMetasAsyncInput<
  TAccountAuthority extends string = string,
  TAccountConfig extends string = string,
  TAccountMint extends string = string,
  TAccountExtraMetas extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  authority: TransactionSigner<TAccountAuthority>;
  config?: Address<TAccountConfig>;
  mint: Address<TAccountMint>;
  extraMetas?: Address<TAccountExtraMetas>;
  systemProgram?: Address<TAccountSystemProgram>;
  checkBothWallets?: SetupExtraMetasInstructionDataArgs['checkBothWallets'];
};

export async function getSetupExtraMetasInstructionAsync<
  TAccountAuthority extends string,
  TAccountConfig extends string,
  TAccountMint extends string,
  TAccountExtraMetas extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof BLOCK_LIST_PROGRAM_ADDRESS,
>(
  input: SetupExtraMetasAsyncInput<
    TAccountAuthority,
    TAccountConfig,
    TAccountMint,
    TAccountExtraMetas,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): Promise<
  SetupExtraMetasInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountConfig,
    TAccountMint,
    TAccountExtraMetas,
    TAccountSystemProgram
  >
> {
  // Program address.
  const programAddress = config?.programAddress ?? BLOCK_LIST_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: true },
    config: { value: input.config ?? null, isWritable: false },
    mint: { value: input.mint ?? null, isWritable: false },
    extraMetas: { value: input.extraMetas ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.config.value) {
    accounts.config.value = await findConfigPda();
  }
  if (!accounts.extraMetas.value) {
    accounts.extraMetas.value = await findExtraMetasPda();
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.extraMetas),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getSetupExtraMetasInstructionDataEncoder().encode(
      args as SetupExtraMetasInstructionDataArgs
    ),
  } as SetupExtraMetasInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountConfig,
    TAccountMint,
    TAccountExtraMetas,
    TAccountSystemProgram
  >;

  return instruction;
}

export type SetupExtraMetasInput<
  TAccountAuthority extends string = string,
  TAccountConfig extends string = string,
  TAccountMint extends string = string,
  TAccountExtraMetas extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  authority: TransactionSigner<TAccountAuthority>;
  config: Address<TAccountConfig>;
  mint: Address<TAccountMint>;
  extraMetas: Address<TAccountExtraMetas>;
  systemProgram?: Address<TAccountSystemProgram>;
  checkBothWallets?: SetupExtraMetasInstructionDataArgs['checkBothWallets'];
};

export function getSetupExtraMetasInstruction<
  TAccountAuthority extends string,
  TAccountConfig extends string,
  TAccountMint extends string,
  TAccountExtraMetas extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof BLOCK_LIST_PROGRAM_ADDRESS,
>(
  input: SetupExtraMetasInput<
    TAccountAuthority,
    TAccountConfig,
    TAccountMint,
    TAccountExtraMetas,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): SetupExtraMetasInstruction<
  TProgramAddress,
  TAccountAuthority,
  TAccountConfig,
  TAccountMint,
  TAccountExtraMetas,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? BLOCK_LIST_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: true },
    config: { value: input.config ?? null, isWritable: false },
    mint: { value: input.mint ?? null, isWritable: false },
    extraMetas: { value: input.extraMetas ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.extraMetas),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getSetupExtraMetasInstructionDataEncoder().encode(
      args as SetupExtraMetasInstructionDataArgs
    ),
  } as SetupExtraMetasInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountConfig,
    TAccountMint,
    TAccountExtraMetas,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedSetupExtraMetasInstruction<
  TProgram extends string = typeof BLOCK_LIST_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    authority: TAccountMetas[0];
    config: TAccountMetas[1];
    mint: TAccountMetas[2];
    extraMetas: TAccountMetas[3];
    systemProgram: TAccountMetas[4];
  };
  data: SetupExtraMetasInstructionData;
};

export function parseSetupExtraMetasInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetupExtraMetasInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 5) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      authority: getNextAccount(),
      config: getNextAccount(),
      mint: getNextAccount(),
      extraMetas: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getSetupExtraMetasInstructionDataDecoder().decode(instruction.data),
  };
}
