import { prisma } from "./db";

export interface PricingConfig {
  memberIndividual: number;
  memberIndividualEarlyBird: number;
  nonMemberIndividual: number;
  nonMemberIndividualEarlyBird: number;
  memberGroup: number;
  memberGroupEarlyBird: number;
  nonMemberGroup: number;
  nonMemberGroupEarlyBird: number;
  earlyBirdDeadline: string;
  groupMinimum: number;
  currency: string;
}

const DEFAULT_PRICING: PricingConfig = {
  memberIndividual: 800,
  memberIndividualEarlyBird: 700,
  nonMemberIndividual: 1000,
  nonMemberIndividualEarlyBird: 900,
  memberGroup: 700,
  memberGroupEarlyBird: 600,
  nonMemberGroup: 900,
  nonMemberGroupEarlyBird: 800,
  earlyBirdDeadline: "2026-06-30",
  groupMinimum: 3,
  currency: "USD",
};

export async function getPricingConfig(): Promise<PricingConfig> {
  const configs = await prisma.siteConfig.findMany({
    where: { group: "pricing" },
  });

  const configMap = new Map(configs.map((c) => [c.key, c.value]));

  return {
    memberIndividual: Number(configMap.get("member_individual") ?? DEFAULT_PRICING.memberIndividual),
    memberIndividualEarlyBird: Number(configMap.get("member_individual_early_bird") ?? DEFAULT_PRICING.memberIndividualEarlyBird),
    nonMemberIndividual: Number(configMap.get("non_member_individual") ?? DEFAULT_PRICING.nonMemberIndividual),
    nonMemberIndividualEarlyBird: Number(configMap.get("non_member_individual_early_bird") ?? DEFAULT_PRICING.nonMemberIndividualEarlyBird),
    memberGroup: Number(configMap.get("member_group") ?? DEFAULT_PRICING.memberGroup),
    memberGroupEarlyBird: Number(configMap.get("member_group_early_bird") ?? DEFAULT_PRICING.memberGroupEarlyBird),
    nonMemberGroup: Number(configMap.get("non_member_group") ?? DEFAULT_PRICING.nonMemberGroup),
    nonMemberGroupEarlyBird: Number(configMap.get("non_member_group_early_bird") ?? DEFAULT_PRICING.nonMemberGroupEarlyBird),
    earlyBirdDeadline: configMap.get("early_bird_deadline") ?? DEFAULT_PRICING.earlyBirdDeadline,
    groupMinimum: Number(configMap.get("group_minimum") ?? DEFAULT_PRICING.groupMinimum),
    currency: configMap.get("currency") ?? DEFAULT_PRICING.currency,
  };
}

export function isEarlyBird(deadline: string): boolean {
  return new Date() < new Date(deadline);
}

export function calculateFee(
  config: PricingConfig,
  membershipType: "MEMBER" | "NON_MEMBER",
  registrationType: "INDIVIDUAL" | "GROUP",
  delegateCount: number
): { perPerson: number; total: number; earlyBird: boolean } {
  const earlyBird = isEarlyBird(config.earlyBirdDeadline);

  let perPerson: number;

  if (registrationType === "INDIVIDUAL") {
    if (membershipType === "MEMBER") {
      perPerson = earlyBird ? config.memberIndividualEarlyBird : config.memberIndividual;
    } else {
      perPerson = earlyBird ? config.nonMemberIndividualEarlyBird : config.nonMemberIndividual;
    }
  } else {
    if (membershipType === "MEMBER") {
      perPerson = earlyBird ? config.memberGroupEarlyBird : config.memberGroup;
    } else {
      perPerson = earlyBird ? config.nonMemberGroupEarlyBird : config.nonMemberGroup;
    }
  }

  return {
    perPerson,
    total: perPerson * delegateCount,
    earlyBird,
  };
}
