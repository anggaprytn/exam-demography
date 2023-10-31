type NumToString = (num: number) => string;
type FlagData = (string | number)[];
type StateData = {
  'ID State': string;
  State: string;
  'ID Year': number;
  Year: string;
  Population: number;
  'Slug State': string;
};

export const formatNumber: NumToString = num => {
  return num.toLocaleString('id-ID');
};

export function isSvgImage(url: string): boolean {
  return url.split('.').pop() === 'svg';
}

export function getStateFlagUrl(
  state: string,
  stateData: StateData[],
  flagData: FlagData[],
): string | null {
  const foundState = stateData.find(item => item.State === state);
  if (!foundState) return null;

  const foundFlag = flagData.find(item => item[0] === foundState.State);
  return foundFlag ? (foundFlag[1] as string) : null;
}
